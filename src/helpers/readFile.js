const xlsx = require('xlsx');

const AppError = require('../utils/appError');

function read_file(file, { descriptionOptional }) {
  const wb = xlsx.read(file, { type: 'buffer', raw: true });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) throw new AppError('Arquivo não pode está vazio!');

  return data.map(products => {
    const { cad, description, price, mark, reference, jogo } = {
      description:
        products['Descrição'] || products['DescriÃ§Ã£o'] || products.Mercadoria || products['Desc.'] || '',
      cad:
        products['Ref/CAD'] ||
        products['Ref. Cód. Original/CAD'] ||
        products['Ref. CÃ³d. Original/CAD'] ||
        products.CAD,
      price:
        products['Preço'] ||
        products['PreÃ§o'] ||
        products['Preço Atual'] ||
        products['PreÃ§o Atual'] ||
        products['Preço de Venda'],
      mark: products.Marca || '',
      jogo: products.Jogo || 1,
      reference:
        products['Referência'] || products['ReferÃªncia'] || products['Ref.'] || products.Ref || '',
    };

    /*
        if (!description && !descriptionOptional)
          throw new AppError('Arquivo enviado faltando campo "Descrição"!');
    
        if (!cad && !reference)
          throw new AppError('Arquivo enviado faltando campo "Refência ou CAD"!');
    
        if (!price) throw new AppError('Arquivo enviado faltando campo "Preço"!');
    */

    function filterCodes() {
      if (cad && reference) {
        return `${cad} / ${reference}`;
      }
      if (cad) {
        return String(cad);
      }
      return String(reference);
    }

    function filterPrice() {
      const value = String(price).indexOf(',') !== -1
        ? Number(jogo * price.replace(',', '.'))
        : Number(jogo * price);

      return isNaN(value) ? "" : value;
    }

    return {
      description: String(description).toUpperCase().trim().slice(0, 92),
      mark: String(mark).toUpperCase().trim(),
      cad: filterCodes().trim().slice(0, 37),
      price: filterPrice(),
      barcode: filterCodes().split('/')[0].trim().slice(0, 15),
    };
  });
}

module.exports = read_file;
