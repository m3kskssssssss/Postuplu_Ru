import React, { useState } from 'react';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const response = await fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }), // Убираем userCategory
        });

        const data = await response.json();

        if (response.ok) {
            // Успешный вход
            localStorage.setItem('user', JSON.stringify(data.user)); // Сохраняем данные пользователя
            localStorage.setItem('userCategory', data.userCategory); // Сохраняем категорию пользователя

            // Можно перенаправить пользователя на его личный кабинет
            window.location.href = `/${data.userCategory}`; // Перенаправляем на соответствующий личный кабинет
        } else {
            // Ошибка входа
            setError(data.message);
        }
    };

    return (
        <main className="section">
            <div className="container">
                <h1 className="title-4">Вход:</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                            <button className="title-6" type="submit">Войти</button>
                        </form>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default Login;