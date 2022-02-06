const request = require('supertest');
const path = require('path');

const { app } = require('../../src/app');

describe('Gerar etiquetas', () => {
  test('Envio do arquivo', () =>
    request(app)
      .post('/')
      .attach('file', 'public/ExModelo.xlsx')
      .then(res => {
        expect(res.status).toBe(200);
      }));

  test('Envio do arquivo vazio', async () => {
    const res = await request(app)
      .post('/')
      .attach('file', `${path.join(__dirname, './files/ArquivoVazio.xlsx')}`);

    expect(res.headers.error).toBe('Arquivo não pode está vazio!');
  });

  test('Envio do arquivo com outras informações ou faltando', async () => {
    const res = await request(app)
      .post('/')
      .attach('file', `${path.join(__dirname, './files/FaltandoInfo.xlsx')}`);

    expect(res.headers.error).toBe('Arquivo enviado faltando campo "Descrição"!');
  });

  test('Envio de nenhum arquivo', async () => {
    const res = await request(app).post('/');

    expect(res.headers.error).toBe('Envie um arquivo!');
  });

  test('Envio do arquivo com formato incorreto', async () => {
    const res = await request(app)
      .post('/')
      .attach('file', `${path.join(__dirname, './files/etiqueta.pdf')}`);

    expect(res.headers.error).toBe('Arquivo com formato inválido!');
  });
});
