import React, {useState, useEffect} from 'react'
import { FiDownload, FiSend, FiUpload } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

import * as serviceWorker from '../../serviceWorkerRegistration';
import {Footer, Text, Style, Header, Form, TextInput, BoxButtons, Modal, Button, Input, Main} from './styles'

function Screen() {
  const [buffer, setBuffer] = useState('');
  const [ext, setExt] = useState<string | void>('');
  const [nameFile, setNameFile] = useState('Clique aqui para enviar o arquivo.');
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const navigate = useNavigate();

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  };

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
    if (!buffer) {
      alert('Arquivo vazio!');
      return;
    }
    
    navigate(`/label`, {state: {buffer, ext}})
  }

  return (
    <>
      <Style />
      <Header>
        {showReload ? 
          (<Modal>
            <Text style={{marginBottom: '10px'}}>Nova atualização disponível <i>(talvez ela seja importante)</i></Text>
              <Button title="Atualizar" onClick={reloadPage}>
              <FiUpload size={18} />
            </Button>
          </Modal>)
         : null}
        <Text>
          <b>OBS: </b>O envio dos arquivos pode ser feita somente em: <b>.CSV</b>,{' '}
          <b>.XLSX</b>, <b>.XLS</b>, <b>.ODS</b>.
        </Text>
      </Header>

      <Main>
        <Form>
          <Input name="file" type="file" onChange={readFileDataAsBase64} />
            
          <BoxButtons>
            <Button
              title="baixar modelo"
              href="/ExModelo.xlsx"
              download
            >
              <FiDownload size={18} />
            </Button>
            <Button onClick={handleSubmit} title="Enviar">
              <FiSend size={18} />
            </Button>
          </BoxButtons>

          <TextInput>{nameFile}</TextInput>
        </Form>
      </Main>

      <Footer>
        <Text>
          <b>{'</>'}</b> with by <b>Matheus Batista</b>
        </Text>
      </Footer>
    </>
  )
}

export default Screen
