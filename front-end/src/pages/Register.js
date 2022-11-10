import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput, NameInput } from '../components/Inputs/Register';
import Button from '../components/Button/Button';
import registerUser from '../utils/api/requests/registerUser';
import setStorage from '../utils/storange/setStorange';

function Register() {
  const form = useForm({ mode: 'onChange' });
  const navigate = useNavigate();

  const [errMessage, setErrMessage] = useState();
  const [invalidUser, setInvalidUser] = useState(false);

  const { isValid } = form.formState;

  const formSubmitFunction = async (user) => {
    try {
      const { data } = await registerUser({ ...user, role: 'customer' });
      console.log(data);
      setStorage('user', data);
      navigate('/customer/products');
    } catch (err) {
      console.log(err);
      setErrMessage(err.response.data);
      setInvalidUser(true);
    }
  };

  return (
    <>
      <form onSubmit={ form.handleSubmit(formSubmitFunction) }>
        <NameInput
          dataId="common_register__input-name"
          handleForm={ form }
        />

        <EmailInput
          dataId="common_register__input-email"
          handleForm={ form }
        />

        <PasswordInput
          dataId="common_register__input-password"
          handleForm={ form }
        />

        <Button
          isSubmit
          disable={ !isValid }
          text="CADASTRAR"
          dataId="common_register__button-register"
        />
      </form>
      <div>
        {
          invalidUser
          && <p data-testid="common_register__element-invalid_register">{ errMessage }</p>
        }
      </div>
    </>
  );
}

export default Register;
