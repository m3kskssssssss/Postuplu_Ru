// В Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [userCategory, setUserCategory] = useState('student');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Регистрация пользователя
            const registerResponse = await axios.post('http://localhost:5001/api/register', {
                email,
                password,
                login,
                userCategory
            });
            console.log(registerResponse.data.message);

            // Вход в систему после успешной регистрации
            const loginResponse = await axios.post('http://localhost:5001/api/login', {
                login,
                password,
                userCategory
            });

            // Сохранение данных пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(loginResponse.data));
            localStorage.setItem('userCategory', userCategory);

            // Перенаправление на соответствующий личный кабинет
            navigate(`/${userCategory}`);
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.response?.data?.error || 'Ошибка регистрации');
        }
    };

    return (
        <main className="section">
            <div className="container">
                <h1 className="title-4">Регистрация:</h1>
                <ul className="content-list">
                    <li className="content-list__item">
                        <form onSubmit={handleSubmit}>
                            <input
                                className="title-2"
                                type="text"
                                placeholder="Логин"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                            <input
                                className="title-2"
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                className="title-2"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <select
                                className="title-2"
                                value={userCategory}
                                onChange={(e) => setUserCategory(e.target.value)}
                                required
                            >
                                <option value="student">Абитуриент</option>
                                <option value="teacher">Университет/СПО</option>

                            </select>
                            <button className="title-6" type="submit">Зарегистрироваться</button>
                        </form>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default Register;