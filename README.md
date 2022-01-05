# My-Task-BE

# Instruções de uso:

Instale as dependencias do projeto com :
```bash
npm i
```

Após a instalação de dependencias, navegue ate a pasta `src/config`, faça uma copia do arquivo `config.example.json`, preencha os campos de credenciais para o banco e ao fim lembre de renomear para `config.json`.

execute o seguinte comando de cli para deletar e criar o banco, alem de criar todas as tabelas e ao final popula-lo con alguns dados de teste:
  
  ⚠️**aviso 1**⚠️: o usuario deve ter previlegio de criação/deleção do banco de dados.

  ⚠️**aviso 2**⚠️: o banco será **deletado** de forma permanente, não use um banco importante, dê preferencia para um banco apenas para teste.

commando: 

```bash
npm run cli -- drop-db create-db create-tables populate-db
```

Para executar o servidor use o comando, ele sera iniciado por padrão no **localhost** na porta **3000**:
```bash
npm start
```