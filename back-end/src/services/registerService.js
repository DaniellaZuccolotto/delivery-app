const md5 = require('md5');
const { User } = require('../database/models');
const userSchema = require('../schemas');

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
    where: {
      $or: [{ name }, { email }], // material sobre o uso do operador OR no sequelize: https://stackoverflow.com/questions/20695062/sequelize-or-condition-object#:~:text=Seems%20there%20is%20another%20format%20now
    },
  });
  if (result) return { code: 409, message: 'User already exists' };

  // cria o novo usuário no banco de dados
  const createdUser = await User.create({ name, email, password: md5(password), role });
  return { code: 201, message: 'Successfully created' };
};

module.exports = { createUser };

