const toast = document.getElementById('toast');
if (toast)
  document.getElementsByClassName('toast__button--close')[0].onclick =
    function closeToast() {
      toast.style.display = 'none';
    };

const inputs = document.querySelectorAll('.file-input__form');

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
