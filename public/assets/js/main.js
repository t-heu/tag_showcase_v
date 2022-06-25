/* eslint-env browser */

const print = document.getElementById('print');
if (print) print.addEventListener('click', () => window.print());

const toast = document.getElementById('toast');
if (toast)
  document.getElementsByClassName('toast__button--close')[0].onclick =
    function closeToast() {
      toast.style.display = 'none';
    };

const inputs = document.querySelectorAll('.content');

function customInput(el) {
  const fileInput = el.querySelector('[type="file"]');
  const label = el.querySelector('[data-js-label]');

  fileInput.onchange = () => {
    if (!fileInput.value) return;

    const value = fileInput.value.replace(/^.*[\\/]/, '');
    el.className += ' -chosen';
    const count = fileInput.files.length;

    if (count > 1) {
      label.innerText = `${count} arquivos selecionados`;
    } else {
      label.innerText = value;
    }
  };
}
customInput(inputs[0]);
customInput(inputs[1]);

// make the whole serviceworker process into a promise so later on we can
// listen to it and in case new content is available a toast will be shown
window.isUpdateAvailable = new Promise((resolve, reject) => {
  // lazy way of disabling service workers while developing
  if ('serviceWorker' in navigator && ['localhost', '127'].indexOf(window.location.hostname) === -1) {
    // register service worker file
    navigator.serviceWorker
      .register('service-worker.js')
      .then(reg => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // new update available
                resolve(true);
                console.log('new update available')
              } else {
                // no update available
                reject();
                console.log('no update available')
              }
            }
          };
        };
      })
      .catch(err => {
        console.error('[SW ERROR]', err);
        reject();
      });
  }
});
