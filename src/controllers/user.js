const { database, initialize } = require("../models/database");
initialize();

async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const { User } = database.model;
  try {
    if (!username || !password) {
      return res.status(404).send({ error: "informe os campos" });
    }
    const [result] = await User.findByUsername(username);
    if (!result) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }
    console.log(result)
    const comparison = await User.compare(password, result.password);

    console.log(comparison)
    if (comparison) {
      const userInfo = {
        id: result.id,
        name: result.name,
        username: result.username,
        email: result.email
      };
      return res.status(200).send({ user: userInfo });
    }
    return res.status(404).send({ error: "usuario ou senha invalida" });

  } catch (error) {
    console.log(error)
    return res.sendStatus(500) // ERRO NO SERVIDOR
  }
}

async function signup(req, res) {
  const { name, username, email, password } = req.body
  const { User } = database.model;

  try {
    const result = await User.findUser(name, username, email);
    if (result.length > 0) {
      console.log("Usuário já existente");
      return res.sendStatus(403)
    } else {
      await User.insert({ name, username, password, email });
      console.log("Usuário inserido com sucesso!");
      return res.sendStatus(200)
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  const { email } = req.body
  const { User } = database.model;
  try {
    const user = await User.findByEmail(email);
    if (user.length > 0) {
      await User.deleteByEmail(email);
      return res.status(200).send({ status: "Usuario deletado" });
    } else {
      return res.status(404).send({ error: "Usuario Nao Encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function alterUser(req, res) {
  const { name, email } = req.body
  const userName = req.params.userName
  const { User } = database.model;
  try {
    if (name !== undefined) {
      if (name.trim().length < 3) {
        return res.status(403).send({ error: "Nome invalido" });
      }
    }
    if (email !== undefined) {
      const [user] = await User.findByEmail(email);
      
      if (user!= undefined && user.username != userName) {
        console.log("Email ja cadastrado");
        return res.status(403).send({ error: "Email ja cadastrado" });
      } else {
        return await updatateUserQuery(req, res);
      }
    } else {
      return await updatateUserQuery(req, res);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function updatateUserQuery(req, res) {
  const {name, email } = req.body
  const { User } = database.model;
  const userName = req.params.userName
  try {
    console.log("atualizando usuario");
    const user = await User.findByEmail(email);
    var newName = name !== undefined ? name : user[0].name;
    var newEmail = email !== undefined ? email : user[0].email;
    await User.updateByUsername(userName, newName, newEmail);
    console.log("Usuario Alterado - ", userName);
    return res.status(200).send({ status: "Alteracoes Realizadas" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Erro no update do usuario" });
  }
}

async function getuserByUsername(req, res) {
  const userName = req.params.username;
  console.log("Buscando usuario");
  const { User } = database.model

  try {
    const userReturn = await User.findByUsername(userName)
    return res.send( userReturn[0] );
  } catch (error) {
    return res.status(500).send({ error: "Erro na recuperação de usuários" })
  }

}

async function getAll(req, res) {
  const idUser = req.params.idUser

  const { User } = database.model

  try {
    const allUsers = await User.findAllUsers()
    return res.send({ allUsers })
  } catch (error) {
    return res.status(500).send({ error: "Erro na recuperação de usuários" })
  }

}

async function updatePassword(req, res){
  const userName = req.params.userName;
  const newPassword = req.body.newPassword;
  const actualPassword = req.body.actual;
  const { User } = database.model
  const [result] = await User.findByUsername(userName);
    const comparison = await User.compare(actualPassword, result.password);
    if (!comparison) {
      return res.status(400).send({error: "Senha inválida"});
    }
  if(newPassword < 6){
    return res.status(403).send({error: "Senha inválida"});
  }else{
    await User.updatePassword(userName,newPassword);
    return  res.status(200).send({ status: "Senha alterada" });
  }

}
module.exports = { login, signup, deleteUser, alterUser, updatateUserQuery, getAll, getuserByUsername, updatePassword}