function format_price_dot(value: number, ext: string): number {
  const valor = String(value);

  if (!(valor.indexOf('.') !== -1) && ext === 'csv') {
    const len = valor.length;
    const valorFormatado = `${valor.substring(0, len - 2)}.${valor.substring(
      len - 2,
    )}`;
    return Number(valorFormatado);
  }

  return Number(valor);
}

export default format_price_dot;
