import React from "react"

import {Tag, Description, Mark, Price, Cad, Codebar} from './styles'
import {IData} from '../../dtos'

interface IDataComponent {
  data: IData
}

function TagComp({data}: IDataComponent) {
  return (
    <Tag>
      <Description>{data.desc}</Description>
      <Mark>{data.mark}</Mark>
      <Price>{data.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('.', ',')}</Price>
      <Codebar>*{data.barcode}*</Codebar>
      <Cad>{data.cad}</Cad>
    </Tag>
  )
}

export default TagComp
