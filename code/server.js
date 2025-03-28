const express = require('express');
const fs = require('fs');
const app = express();



class  GerenciadorDeDadosFinanceiros {

    constructor(caminhoParaArquivo) {
        this.caminhoDoArquivo = caminhoParaArquivo;
    }
  
  
    lerArquivo() {
        return new Promise((resolve, reject) => {
          fs.readFile(this.caminhoDoArquivo, 'utf8', (erro, dados) => {
            if (erro) {
              reject('Erro ao ler dados');
            } else {
              resolve(JSON.parse(dados));
            }
          });
        });
      }


    escreverArquivo(dados) {
        return new Promise((resolve, reject) => {
          fs.writeFile(this.caminhoDoArquivo, JSON.stringify(dados), (erro) => {
            if (erro) {
              reject('Erro ao salvar dados');
            } else {
              resolve('Dados atualizados com sucesso!');
            }
          });
        });
      }
}

// Criar instância do gerenciador de dados financeiros
const instanciaDoGerenciador = new GerenciadorDeDadosFinanceiros('dados.json');

// Definir rotas da API
app.get('/dados', async (req, res) => {
  try {
    const data = await instanciaDoGerenciador.lerArquivo();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post('/atualizar', express.json(), async (req, res) => {
  try {
    const dados = req.body;
    const message = await instanciaDoGerenciador.escreverArquivo(dados);
    res.json({ success: message });
  } catch (error) {
    res.status(500).json({ error: error });
}
});

// Iniciar o servidor
app.listen(3000, () => {
console.log('Servidor rodando na porta 3000');
});
