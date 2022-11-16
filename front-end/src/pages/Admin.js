import React, { useEffect, useState } from 'react';
import FormAdmin from '../components/FormAdmin/FormAdmin';
import TableUsers from '../components/FormAdmin/TableUsers';
import requestData from '../utils/api/requests/requestData';
import requestDelete from '../utils/api/requests/requestDelete';
import { registerUserAdm } from '../utils/api/requests/registerUser';

const TABLE_HEAD_DATA_STYLE = 'text-center font-semibold';

function Admin() {
  const [usersApi, setUsersApi] = useState([]);
  const [failedTryCreate, setFailedTryCreate] = useState(false);

  const apiData = async () => {
    const data = await requestData('http://localhost:3001/users');
    setUsersApi(data);
  };

  const createUser = async ({ name, email, password, role }) => {
    try {
      const body = {
        name,
        email,
        password,
        role,
      };

      const result = await registerUserAdm(body);
      if (!result) { setFailedTryCreate(true); }
      apiData();
    } catch (error) {
      setFailedTryCreate(true);
    }
  };

  const deleteUser = async (email) => {
    try {
      console.log(email);

      await requestDelete({ email });

      apiData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <div
      className="w-[100%] px-[10%] py-[3%] flex justify-center flex-col"
    >
      <FormAdmin
        createUser={ createUser }
      />
      {
        failedTryCreate
          ? (
            <p
              data-testid="admin_manage__element-invalid-register"
              className="my-5 self-center font-medium text-center"
            >
              Os dados já foram utilizados em uma outra conta.
              <br />
              Por favor, tente novamente com outros dados.
            </p>
          )
          : null
      }
      <h1 className="m-3 text-lg font-bold self-center mt-10"> Usuários cadastrados </h1>
      <table
        className="w-[80%] self-center"
      >
        <thead
          className="bg-[#e8e8e7]"
        >
          <tr>
            <td className={ `${TABLE_HEAD_DATA_STYLE} rounded-tl-lg w-[10%]` }>ID</td>
            <td className={ `${TABLE_HEAD_DATA_STYLE} w-[25%]` }>Nome</td>
            <td className={ `${TABLE_HEAD_DATA_STYLE} w-[25%]` }>E-mail</td>
            <td className={ `${TABLE_HEAD_DATA_STYLE} w-[25%]` }>Tipo</td>
            <td
              className={ `${TABLE_HEAD_DATA_STYLE} rounded-tr-lg w-[15%]` }
            >
              Excluir
            </td>
          </tr>
        </thead>
        <tbody>
          {usersApi.filter((item) => (item.role !== 'administrator'))
            .map((item, index) => (
              <TableUsers
                index={ index }
                data-testid={ `admin_manage__element-user-table-item-number-${item.id}` }
                key={ item.id }
                id={ item.id }
                name={ item.name }
                email={ item.email }
                type={ item.role }
                deleteUser={ deleteUser }
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
