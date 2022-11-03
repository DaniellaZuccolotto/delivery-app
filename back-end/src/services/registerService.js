const md5 = require('md5');
const { User, Sequelize } = require('../database/models');
const { userSchema } = require('../schemas');

const createUser = async (user) => {
  // faz a validação do formato dos dados de entrada
  const { error } = userSchema.validate(user);
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }

  // verifica se o usuário já existe no banco de dados
  const { name, email, password, role } = user;
  const result = await User.findOne({
    where: Sequelize.or({ name, email }), // material sobre uso do Sequelize.or: https://stackoverflow.com/questions/20695062/sequelize-or-condition-object#:~:text=Use%20Sequelize.or,%3A%2010%20%7D%20%7D%0A%20%20%20%20)%0A%20%20)%0A%7D%3B
    });
  if (result) return { code: 409, message: 'User already exists' };

  // cria o novo usuário no banco de dados
  await User.create({ name, email, password: md5(password), role });
  return { code: 201, message: 'Successfully created' };
};

const getSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' }});

  if (!sellers) return { code: 404, message: 'Not found user' };

  return { code: 200, sellers };
};

module.exports = { createUser, getSellers };
