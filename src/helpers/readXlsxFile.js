const xlsx = require('xlsx');

const format_price_dot = require('./formatPriceDot');

function read_xlsx_file(file, ext) {
  const wb = xlsx.read(file, { type: 'buffer' });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) return alert('Arquivo não pode está vazio!');

  return data.map(info => {
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

    if (!variation_list.desc)
      return alert('Arquivo enviado faltando campo "Descrição"!');

    if (!variation_list.cad_and_ref)
      return alert('Arquivo enviado faltando campo "Ref/CAD"!');

    if (!variation_list.price)
      return alert('Arquivo enviado faltando campo "Preço"!');

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
      price: format_price_dot(
        Number(variation_list.jogo * variation_list.price),
        ext,
      ),
      barcode: cad_or_ref.split('/')[0].trim(),
    };
  });
}

module.exports = read_xlsx_file;
