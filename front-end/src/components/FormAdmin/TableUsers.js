import React from 'react';
import PropTypes from 'prop-types';

function TableUsers({ id, name: nome, email, type, deleteUser, index }) {
  const handleClick = async (emailToDelete) => {
    await deleteUser(emailToDelete);
  };

  return (
    <tr
      key={ id }
      className="border-solid border-[#b8b8b8] border-t-[1px]"
    >
      <td
        datatestid={ `admin_manage__element-user-table-item-number-${index}` }
        className="text-center py-2"
      >
        { index }
      </td>
      <td
        datatestid={ `admin_manage__element-user-table-name-${index}` }
        className="text-center py-2"
      >
        { nome }
      </td>
      <td
        datatestid={ `admin_manage__element-user-table-email-${index}` }
        className="text-center py-2"
      >
        { email }
      </td>
      <td
        datatestid={ `admin_manage__element-user-table-role-${index}` }
        className="text-center py-2"
      >
        { type }
      </td>
      <td className="flex justify-center items-center py-2">
        <form className="w-[100%] h-[100%]">
          <button
            className="font-medium rounded-md text-white bg-[#b74c48]
            w-[100%] h-[100%] text-center hover:bg-[#8d211e]"
            datatestid={ `admin_manage__element-user-table-remove-${index}` }
            type="button"
            name={ email }
            onClick={ () => handleClick(email) }
          >
            Excluir
          </button>
        </form>
      </td>
    </tr>
  );
}

TableUsers.propTypes = ({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
});

export default TableUsers;
