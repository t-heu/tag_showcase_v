const {gerarSequencia} = require('../../helpers/generateSequencial');

module.exports = {
  async store(request, response) {
    const { 
      filial,
      edificio,
      rua_inicial,     
      rua_final,       
      predio_inicial,
      predio_final,
      andar_inicial,
      andar_final,
      box_inicial,
      box_final } = request.body;

    const data_res = gerarSequencia({
      filial,
      edificio,
      ruas: {
        min: rua_inicial,
        max: rua_final
      },
      predios: {
        min: predio_inicial,
        max: predio_final
      },
      andares: {
        min: andar_inicial,
        max: andar_final
      },
      boxs: {
        min: box_inicial,
        max: box_final
      }
    });

    return response.render('wms.njk', { css: '3', removePrefix: `${filial} ${edificio }`, data: data_res });
  },
};
