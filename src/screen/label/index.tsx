import React, { useState, useEffect } from 'react'
import { FiArrowLeft, FiPrinter } from 'react-icons/fi'
import {useLocation, useNavigate} from 'react-router-dom'

import {Style} from  './styles'
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
      <Style />
      <div className="header">
        <button onClick={() =>  navigate('/')} title="voltar" className="header__backhome">
          <FiArrowLeft color={"#333"} size={30} />
        </button>
        <button onClick={() => window.print()} title="imprimir" className="header__print">
          <FiPrinter color={"#333"} size={30} />
        </button>
      </div>

      <article className="container">
        {data && data.length > 0 ? data.map((dataObj: IData, i: number) => (<Tag key={i} data={dataObj} />)) : <p>Empty :C</p>}
      </article>
    </React.Fragment>
  )
}

export default Label
