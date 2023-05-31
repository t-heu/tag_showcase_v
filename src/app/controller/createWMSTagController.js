const {gerarSequencia} = require('../../helpers/generateSequencial');
const AppError = require('../../utils/appError');

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

      if (!filial || !edificio || !rua_inicial || !rua_final || !predio_inicial || !predio_final || !andar_inicial || !andar_final || !box_inicial || !box_final)
          throw new AppError('Preencha todos os campos!');

    const data_res = gerarSequencia({
      filial: filial.toUpperCase().trim(),
      edificio: edificio.toUpperCase().trim(),
      ruas: {
        min: Number(rua_inicial.split(0).join("")),
        max: Number(rua_final.split(0).join(""))
      },
      predios: {
        min: predio_inicial.toUpperCase().trim(),
        max: predio_final.toUpperCase().trim()
      },
      andares: {
        min: Number(andar_inicial.split(0).join("")),
        max: Number(andar_final.split(0).join(""))
      },
      boxs: {
        min: box_inicial.toUpperCase().trim(),
        max: box_final.toUpperCase().trim()
      }
    });

    return response.render('tag_wms_template.njk', { css: '3', removePrefix: `${filial.toUpperCase().trim()} ${edificio.toUpperCase().trim()}`, data: data_res });
  },
};
