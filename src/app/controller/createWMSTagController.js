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

    if (predio_inicial.toUpperCase().trim().slice(1) != predio_final.toUpperCase().trim().slice(1)) {
      throw new AppError('Lados diferentes!');
    }

    const data_res = gerarSequencia({
      filial: filial.toUpperCase().trim(),
      edificio: edificio.toUpperCase().trim(),
      ruas: {
        min: Number(rua_inicial),
        max: Number(rua_final)
      },
      predios: {
        min: predio_inicial.toUpperCase().trim(),
        max: predio_final.toUpperCase().trim(),
        direction: predio_inicial.toUpperCase().trim().slice(1)
      },
      andares: {
        min: Number(andar_inicial),
        max: Number(andar_final)
      },
      boxs: {
        min: box_inicial.toUpperCase().trim(),
        max: box_final.toUpperCase().trim()
      }
    });

    return response.render('tag_wms_template.njk', { css: '3', removePrefix: `${filial.toUpperCase().trim()} ${edificio.toUpperCase().trim()}`, data: data_res });
  },
};
