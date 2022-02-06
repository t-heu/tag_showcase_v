const readFile = require('../../helpers/readFile');
const AppError = require('../../utils/appError');

module.exports = {
  async index(request, response) {
    return response.render('home', { css: '1', notice_updated_msg: process.env.NOTICE_UPDATED_MSG });
  },

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
      
      const data = readFile(file.buffer);
      data.map(tag => arr_data.push(tag));
    });
    
    return response.render('label', { data: arr_data, css: '2' });
  },
};
