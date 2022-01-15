import xlsx from 'xlsx';

import {IData} from '../dtos'

function read_file(file: any): string | (string | IData)[] {
  const wb = xlsx.read(file, { type: 'buffer', raw: true });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) {
    return 'Arquivo não pode está vazio!';
  }

  return data.map((info: any) => {
    const variation_list = {
      desc: info['Descrição'] || info.Mercadoria,
      cad_and_ref:
        info['Ref/CAD'] ||
        info['Ref. Cód. Original/CAD'] ||
        info['Ref. CÃ³d. Original/CAD'],
      price: info['Preço'] || info['Preço Atual'] || info['PreÃ§o Atual'],
      mark: info.Marca || '',
      jogo: info.Jogo || 1,
      ref: info['Referência'] || info['ReferÃªncia'] || '',
    };

    if (!variation_list.desc) {
      return 'Arquivo enviado faltando campo "Descrição"!';
    }

    if (!variation_list.cad_and_ref) {
      return 'Arquivo enviado faltando campo "Ref/CAD"!';
    }

    if (!variation_list.price) {
      return 'Arquivo enviado faltando campo "Preço"!';
    }

    const join_cad_ref =
      typeof variation_list.cad_and_ref === 'string'
        ? `${variation_list.cad_and_ref} / ${variation_list.ref}`
        : variation_list.ref;

    const cad_or_ref = `${
      variation_list.ref ? join_cad_ref : variation_list.cad_and_ref
    }`;

    return {
      desc: variation_list.desc.toUpperCase().trim(),
      mark: variation_list.mark.toUpperCase().trim(),
      cad: cad_or_ref.trim(),
      price: String(variation_list.price).indexOf(',') !== -1 ? Number(variation_list.jogo * variation_list.price.replace(',', '.')) : Number(variation_list.jogo * variation_list.price),
      barcode: cad_or_ref.split('/')[0].trim(),
    };
  });
}

export default read_file;
