import React from 'react';
import PropTypes from 'prop-types';

function TableUsers({ id, name: nome, email, type, deleteUser, index }) {
  const handleClick = async (emailToDelete) => {
    await deleteUser(emailToDelete);
  };

  return (
    <tr key={ id }>
      <td
        data-testid={ `admin_manage__element-user-table-item-number-${index}` }
      >
        { index}
      </td>
      <td data-testid={ `admin_manage__element-user-table-name-${index}` }>{ nome }</td>
      <td data-testid={ `admin_manage__element-user-table-email-${index}` }>{ email}</td>
      <td data-testid={ `admin_manage__element-user-table-role-${index}` }>{ type }</td>
      <td>
        <form>
          <button
            data-testid={ `admin_manage__element-user-table-remove-${index}` }
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
