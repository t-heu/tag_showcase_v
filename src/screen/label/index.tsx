import React, { useState, useEffect } from 'react'
import { FiArrowLeft, FiPrinter } from 'react-icons/fi'
import {useLocation, useNavigate} from 'react-router-dom'

import {Header, ButtonHeader, Container} from  './styles'
import {IData} from '../../dtos'
import Tag from '../../components/tag'
import readXlsxFile from '../../helpers/readXlsxFile'

const Label = () => {
  const [data, setData] = useState<IData[]>([])
  const navigate = useNavigate()
  const {state} = useLocation()

  useEffect(() => {
    const result = readXlsxFile(state.buffer, state.ext)
    if (result) {
      setData(result as IData[])
    }
  }, [state.buffer, state.ext])

  return (
    <React.Fragment>
      <Header>
        <ButtonHeader onClick={() =>  navigate('/')} title="voltar">
          <FiArrowLeft color={"#333"} size={30} />
        </ButtonHeader>
        <ButtonHeader onClick={() => window.print()} title="imprimir">
          <FiPrinter color={"#333"} size={30} />
        </ButtonHeader>
      </Header>

      <Container>
        {data && data.length > 0 ? data.map((dataObj: IData, i: number) => (<Tag key={i} data={dataObj} />)) : null}
      </Container>
    </React.Fragment>
  )
}

export default Label
