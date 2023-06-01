function format(n) {
  return `${n < 10 ? '0' + n : n}`
}

function gerarSequencia(dataWMS) {
  const arr = [];

  for (let rua = dataWMS.ruas.min; rua <= dataWMS.ruas.max; rua++) {
    for (let predio = dataWMS.predios.min.charCodeAt(0); predio <= dataWMS.predios.max.charCodeAt(0); predio++) {
      for (let andar = dataWMS.andares.min; andar <= dataWMS.andares.max; andar++) {
        for (let box = dataWMS.boxs.min.charCodeAt(0); box <= dataWMS.boxs.max.charCodeAt(0); box++) {
          arr.push(`${dataWMS.filial} ${dataWMS.edificio} ${format(rua)} ${String.fromCharCode(predio) + dataWMS.predios.direction} ${format(andar)} ${String.fromCharCode(box)}`);
        }
      }
    }
  }

  return arr;
}

module.exports = { gerarSequencia }