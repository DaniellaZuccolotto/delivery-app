import React, { useEffect, useState } from 'react';
import FormAdmin from '../components/FormAdmin/FormAdmin';
import TableUsers from '../components/FormAdmin/TableUsers';
import requestData from '../utils/api/requests/requestData';
import requestDelete from '../utils/api/requests/requestDelete';
import requestCreate from '../utils/api/requests/requestCreate';

function Admin() {
  const [usersApi, setUsersApi] = useState([]);
  const [failedTryCreate, setFailedTryCreate] = useState(false);

  const apiData = async () => {
    const data = await requestData('http://localhost:3001/admin/manage');

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

      await requestCreate('/adm', body);

      apiData();
    } catch (error) {
      setFailedTryCreate(true);
    }
  };

  const deleteUser = async (email) => {
    try {
      console.log(email);

      await requestDelete(`/adm/${email}`);

      apiData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <>
      {
        (failedTryCreate)
          ? (
            <p data-testid="admin_manage__element-invalid-register">
              {
                `Os dados já foram utilizados em uma outra conta,
                  Por favor, tente novamente com outros dados.`
              }
            </p>
          )
          : null
      }
      <FormAdmin
        createUser={ createUser }
      />
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Tipo</td>
            <td>Excluir</td>
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
    </>
  );
}

export default Admin;
