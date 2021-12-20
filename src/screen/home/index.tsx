import React, {useState} from 'react'
import { FiDownload, FiSend } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'

import {Footer, Text, Style, Header, Form, TextInput, BoxButtons, Button, Input, Main} from './styles'

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
              <FiDownload />
            </Button>
            <Button onClick={handleSubmit} title="Enviar">
              <FiSend />
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
