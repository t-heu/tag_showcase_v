/* eslint-env browser */

const print = document.getElementById('print');
if (print) print.addEventListener('click', () => window.print());

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
