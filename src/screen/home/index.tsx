import React, {useState} from 'react'
import { FiDownload, FiSend } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

import {Style} from './styles'

function Screen() {
  const [buffer, setBuffer] = useState('');
  const [ext, setExt] = useState<string | void>('');
  const [nameFile, setNameFile] = useState('Clique aqui para enviar o arquivo.');
  const navigate = useNavigate()

  function readFileDataAsBase64(e: any) {
    const file = e.target.files[0];
    
    setExt(file.name.split('.')[1])
    const extension = ['csv', 'xlsx', 'xls', 'ods'];

    if (!extension.includes(file.name.split('.')[1])) {
      alert('Arquivo com formato inválido!');
    }

    setNameFile(file.name)

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          setBuffer(event.target.result)
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
  }

  function handleSubmit() {
    navigate(`/label`, {state: {buffer, ext}})
  }

  return (
    <React.Fragment>
      <Style />
      <small className="obs">
        <b>OBS: </b>O envio dos arquivos pode ser feita somente em: <b>.CSV</b>,{' '}
        <b>.XLSX</b>, <b>.XLS</b>, <b>.ODS</b>.
      </small>

      <main className="file-input">
        <form className="file-input__form">
          <input name="file" type="file" onChange={readFileDataAsBase64} />
          <button onClick={handleSubmit} title="Enviar" type="button" className="file-input__button">
            <FiSend />
          </button>
          <a
            title="baixar modelo"
            className="file-input__button download"
            href="/ExModelo.xlsx"
            download
          >
            <FiDownload />
          </a>
          <span className="file-input__text">
            {nameFile}
          </span>
        </form>
      </main>

      <footer className="footer">
        <p className="footer__text">
          <b>{'</>'}</b> with by <b>Matheus Batista</b>
        </p>
      </footer>
    </React.Fragment>
  )
}

export default Screen
