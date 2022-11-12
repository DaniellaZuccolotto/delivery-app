import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput, NameInput } from '../components/Inputs/Register';
import Button from '../components/Button/Button';
import registerUser from '../utils/api/requests/registerUser';
import setStorage from '../utils/storange/setStorange';
import delivery2 from '../images/delivery2.png';

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
    <div
      className="bg-gradient-to-r from-[#e99b9b] to-[#e9e38e]
    w-full h-screen flex justify-center"
    >
      <img src={ delivery2 } alt="delivery" className="w-96 h-96 mx-auto mt-36" />
      <form
        className="align-middle flex border-[1px] border-[#060605]
        shadow-xl
        shadow-slate-500
          flex-col w-96 h-96 mt-36 justify-center rounded-2xl mr-64"
        onSubmit={ form.handleSubmit(formSubmitFunction) }
      >
        <h1
          className="text-center text-2xl font-bold text-cyan-900 mb-5"
        >
          FAÇA SEU CADASTRO
        </h1>
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
    </div>
  );
}

export default Register;
