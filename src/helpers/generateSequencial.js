function gerarSequencia(dataWMS) {
  const arr = [];

  for (let rua = dataWMS.ruas.min; rua <= dataWMS.ruas.max; rua++) {
    for (let predio = dataWMS.predios.min.charCodeAt(0); predio <= dataWMS.predios.max.charCodeAt(0); predio++) {
      for (let andar = dataWMS.andares.min; andar <= dataWMS.andares.max; andar++) {
        for (let box = dataWMS.boxs.min.charCodeAt(0); box <= dataWMS.boxs.max.charCodeAt(0); box++) {
          arr.push(`${dataWMS.filial} ${dataWMS.edificio} ${rua < 10 ? '0' + rua : rua} ${String.fromCharCode(predio)}E ${andar < 10 ? '0' + andar : andar} ${String.fromCharCode(box)}`);
        }
      }
    }
  }

  return arr;
}

module.exports = { gerarSequencia }