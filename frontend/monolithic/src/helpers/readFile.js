const xlsx = require('xlsx');

const AppError = require('../utils/appError');

function read_file(file) {
  const wb = xlsx.read(file, { type: 'buffer', raw: true });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) throw new AppError('Arquivo não pode está vazio!');
  
  return data.map(products => {
    const { cad, desc, price, mark, ref, jogo } = {
      desc: products['Descrição'] || products['Desc.'],
      cad: products['Ref/CAD'] || products['Ref. Cód. Original/CAD'] || products['Ref. CÃ³d. Original/CAD'] || products['CAD'],
      price: products['Preço'] || products['Preço Atual'] || products['PreÃ§o Atual'] || products['Preço de Venda'],
      mark: products.Marca || '',
      jogo: products.Jogo || 1,
      ref: products['Referência'] || products['ReferÃªncia'] || products['Ref'] || '',
    };

    if (!desc)
      throw new AppError('Arquivo enviado faltando campo "Descrição"!');

    if (!cad && !ref)
      throw new AppError('Arquivo enviado faltando campo "Ref ou CAD"!');

    if (!price)
      throw new AppError('Arquivo enviado faltando campo "Preço"!');


    function filterCodes() {
      if (cad && ref) {
        return  `${cad} / ${ref}`;
      } else if (cad) {
        return cad
      } else {
        return ref
      }
    }
    
    return {
      desc: String(desc).toUpperCase().trim(),
      mark: String(mark).toUpperCase().trim(),
      cad: filterCodes().trim(),
      price: String(price).indexOf(',') !== -1 ? Number(jogo * price.replace(',', '.')) : Number(jogo * price),
      barcode: filterCodes().split('/')[0].trim()
    };
  });
}

module.exports = read_file;
