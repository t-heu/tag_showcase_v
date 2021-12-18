import React from "react"

import {Style} from './styles'
import {IData} from '../../dtos'

interface IDataComponent {
  data: IData
}

function Tag({data}: IDataComponent) {
  return (
    <React.Fragment>
      <Style />
      <div className="tag">
        <p className="tag__description">{data.desc}</p>
        <p className="tag__mark">{data.mark}</p>
        <p className="tag__price">{data.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('.', ',')}</p>
        <p className="tag__codebar">*{data.barcode}*</p>
        <p className="tag__cad">{data.cad}</p>
      </div>
    </React.Fragment>
  )
}

export default Tag
