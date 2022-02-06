const xlsx = require('xlsx');

const AppError = require('../utils/appError');

function read_file(file) {
  const wb = xlsx.read(file, { type: 'buffer', raw: true });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) throw new AppError('Arquivo não pode está vazio!');
  
  return data.map(info => {
    const variation_list = {
      desc: info['Descrição'] || info.Mercadoria,
      cad_and_ref:
        info['Ref/CAD'] ||
        info['Ref. Cód. Original/CAD'] ||
        info['Ref. CÃ³d. Original/CAD'],
      price: info['Preço'] || info['Preço Atual'] || info['PreÃ§o Atual'] || info['Preço de Venda'],
      mark: info.Marca || '',
      jogo: info.Jogo || 1,
      ref: info['Referência'] || info['ReferÃªncia'] || '',
    };

    if (!variation_list.desc)
      throw new AppError('Arquivo enviado faltando campo "Descrição"!');

    if (!variation_list.cad_and_ref)
      throw new AppError('Arquivo enviado faltando campo "Ref/CAD"!');

    if (!variation_list.price)
      throw new AppError('Arquivo enviado faltando campo "Preço"!');

    const join_cad_ref =
      typeof variation_list.cad_and_ref === 'string'
        ? `${variation_list.cad_and_ref} / ${variation_list.ref}`
        : variation_list.ref;

    const cad_or_ref = `${
      variation_list.ref ? join_cad_ref : variation_list.cad_and_ref
    }`;
    
    return {
      desc: String(variation_list.desc).toUpperCase().trim(),
      mark: String(variation_list.mark).toUpperCase().trim(),
      cad: cad_or_ref.trim(),
      price: String(variation_list.price).indexOf(',') !== -1 ? Number(variation_list.jogo * variation_list.price.replace(',', '.')) : Number(variation_list.jogo * variation_list.price),
      barcode: cad_or_ref.split('/')[0].trim(),
    };
  });
}

module.exports = read_file;
