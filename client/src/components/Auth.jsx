import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
     
}


const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => { 
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { fullName, username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://fintalk-teste-3873bcd50219.herokuapp.com/auth';
        
        const { data: {token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL,
        });
        
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

  return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup ? 'Cadastre-se' : 'Login' }</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Nome Completo</label>
                            <input
                                name="fullName"
                                type="text"
                                placeholder="Seu nome completo"
                                onChange={handleChange}
                                required
                            />
    
                         </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Nome de Usuário</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Usuário"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Celular</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                placeholder="Número do celular"
                                onChange={handleChange}
                                required
                            />
    
                        </div>
                    )}
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">URL Imagem de Perfil</label>
                            <input
                                name="avatarURL"
                                type="text"
                                placeholder="Link"
                                onChange={handleChange}
                                required
                            />
    
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Senha</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Senha"
                                onChange={handleChange}
                                required
                            />
    
                        </div>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirme a sua senha</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirme a sua senha"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Cadastre-se": "Login"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup
                            ? "Você já possui uma conta?"
                            : "Não possui uma conta?"
                        }
                        <span onClick={switchMode}>
                            {isSignup ? 'Faça o seu Login' : 'Cadastre-se'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
      <div className="auth__form-container_image">
            <img src={signinImage} alt="Sign in" />
      </div>
    </div>
    )
}

export default Auth
