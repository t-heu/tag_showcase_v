/* eslint-env browser */
const { ipcRenderer } = require('electron');

const print = document.getElementById('print');
if (print) print.addEventListener('click', () => window.print());

const backhome = document.querySelectorAll('.header__backhome')[0];
if (backhome)
  backhome.addEventListener('click', () => ipcRenderer.send('return:home'));

const toast = document.getElementById('toast');
if (toast)
  document.getElementsByClassName('toast__button--close')[0].onclick =
    function closeToast() {
      toast.style.display = 'none';
    };

function customInput(el) {
  const fileInput = document.querySelector('[type="file"]');
  const label = document.querySelector('[data-js-label]');

  if (!fileInput.value) return;

  const value = fileInput.value.replace(/^.*[\\/]/, '');
  el.className += ' -chosen';
  label.innerText = value;
}

function getFile() {
  const reader = new FileReader();
  const { name } = this.files[0];

  function getBuffer() {
    const arrayBuffer = this.result;

    if (!arrayBuffer) alert('Envie um arquivo!');

    const ext = name.split('.')[1];
    const extension = ['csv', 'xlsx', 'xls', 'ods'];

    if (!extension.includes(ext)) {
      return alert('Arquivo com formato inválido!');
    }

    return document
      .querySelectorAll('.file-input__button')[0]
      .addEventListener('click', () => {
        ipcRenderer.send('data:add', { arrayBuffer, ext });
      });
  }

  reader.onload = getBuffer;

  if (!this.files[0]) {
    return alert('Envie um arquivo!');
  }
  customInput(name);
  return reader.readAsArrayBuffer(this.files[0]);
}

const inputFile = document.querySelector('input');
if (inputFile) inputFile.addEventListener('change', getFile, false);
