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
      
      const data = readFile(file.buffer);

      data.map((info, index) => {
        if ((index + 1) > 84) return;

        data.push({
          id: (index + 1),
          ref: info.ref,
          price: info.price
        });
      });

      for (let i = (data.length + 1); i <= 84; i++) {
        data.push({
          id: i,
          ref: "",
          price: ""
        });
      }
    });

    const table1 = arr_data.slice(0,28);
    const table2 = arr_data.slice(28,56);
    const table3 = arr_data.slice(56,84);
    
    return response.render('hubcap_table_template', { table1, table2, table3, css: '3' });
  },
};
