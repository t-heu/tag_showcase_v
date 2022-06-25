import xlsx from 'xlsx';

import {IData, IDataResponse} from '../dtos'

function read_file(file: any): string | IData[] {
  const wb = xlsx.read(file, { type: 'buffer', raw: true });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = xlsx.utils.sheet_to_json(ws);

  if (data.length === 0) {
    return 'Arquivo não pode está vazio!';
  }

  return data.map((products: any): string | IDataResponse[] => {
    const { cad, description, price, mark, reference, jogo }: IData = {
      description:
        products['Descrição'] || products.Mercadoria || products['Desc.'] || '',
      cad:
        products['Ref/CAD'] ||
        products['Ref. Cód. Original/CAD'] ||
        products['Ref. CÃ³d. Original/CAD'] ||
        products.CAD,
      price:
        products['Preço'] ||
        products['Preço Atual'] ||
        products['PreÃ§o Atual'] ||
        products['Preço de Venda'],
      mark: products.Marca || '',
      jogo: products.Jogo || "1",
      reference:
        products['Referência'] || products['ReferÃªncia'] || products['Ref.'] || products.Ref || '',
    };
/*
    if (!variation_list.desc) {
      return 'Arquivo enviado faltando campo "Descrição"!';
    }

    if (!variation_list.cad_and_ref) {
      return 'Arquivo enviado faltando campo "Ref/CAD"!';
    }

    if (!variation_list.price) {
      return 'Arquivo enviado faltando campo "Preço"!';
    }*/

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
      const jogoCalc = Number(jogo);
      const priceCalc = Number(price);

      const value = String(price).indexOf(',') !== -1 && price
      ? jogoCalc * Number(price.replace(',', '.'))
      : jogoCalc * priceCalc;
      
      return isNaN(value) ? "" : value;
    }

    return {
      description: String(description).toUpperCase().trim(),
      mark: String(mark).toUpperCase().trim(),
      cad: filterCodes().trim(),
      price: filterPrice(),
      barcode: filterCodes().split('/')[0].trim(),
    };
  });
}

export default read_file;
