const readFile = require('../../helpers/readFile');
const AppError = require('../../utils/appError');

module.exports = {
  async store(request, response) {
    const arr_data = [];

    if (request.files.length === 0) {
      throw new AppError('Envie um arquivo!');
    }

    request.files.forEach(file => {
      const ext = file.originalname.split('.')[1];
      const extension = ['xlsx', 'xls', 'ods', 'csv'];

      if (!extension.includes(ext)) {
        throw new AppError('Arquivo com formato inválido!');
      }

      const data = readFile(file.buffer, { descriptionOptional: false });
      data.map(tag => arr_data.push(tag));
    });

    return response.render('tag_price_template.njk', { data: arr_data, css: '1' });
  },
};
