const format_price_dot = require('../../src/helpers/formatPriceDot');

describe('Validação da saída dos preços', () => {
  test('Validação de cada tipo de valor', () => {
    const value1 = 29.1;
    const result1 = format_price_dot(Number(value1*4), 'xls').toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('.', ',')
    
    const value2 = 10;
    const result2 = format_price_dot(Number(value2*1), 'xls').toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace('.', ',')
    
    const value3 = 6;
    const result3 = format_price_dot(Number(value3 * 1), 'xls').toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('.', ',')
    
    const value4 = 1.40;
    const result4 = format_price_dot(Number(value4 * 1), 'xls').toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('.', ',')
    
    const value5 = 0.20;
    const result5 = format_price_dot(Number(value5 * 1), 'xls').toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('.', ',')
    
    const value6 = 1000.1;
    const result6 = format_price_dot(Number(value6 * 1), 'xls').toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('.', ',')
    
    expect(
      result1
    ).toBe('R$ 116,40');
    expect(
      result2
    ).toBe('R$ 10,00');
    expect(
      result3
    ).toBe('R$ 6,00');
    expect(
      result4
    ).toBe('R$ 1,40');
    expect(
      result5
    ).toBe('R$ 0,20');
    expect(
      result6
    ).toBe('R$ 1,000,10');
  })
})