import React, { useState, useEffect } from 'react';
import './Personal.css';

const Personal = () => {
    const [selectedCategory, setSelectedCategory] = useState('personalInfo');
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const studentId = localStorage.getItem('studentId');
            if (!studentId) {
                console.error('ID студента не найден в localStorage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/practice_offer?student_id=${studentId}`);
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            }
        };
        fetchApplications();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleDeleteApplication = async (offerId) => {
        try {
            await fetch(`http://localhost:5001/api/practice_offer/${offerId}`, {
                method: 'DELETE',
            });
            setApplications(applications.filter(app => app.offer_id !== offerId));
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
        }
    };

    return (
        <main className="section">
            <div className="container">
                <h1 className="title-4">Личный кабинет абитуриента</h1>
                
                <div className="personal-dashboard">
                    <div className="categories">
                        <h2 className="title-2">Выберите категорию</h2>
                        <ul>
                            <li onClick={() => handleCategoryChange('personalInfo')}>Личная информация</li>
                            <li onClick={() => handleCategoryChange('practice')}>Мои заявки</li>
                        </ul>
                    </div>

                    <div className="content">
                        {selectedCategory === 'personalInfo' && (
                            <div className="personal-info">
                                <h2 className="title-2">Личная информация</h2>
                                <input type="text" placeholder="Имя" />
                                <input type="text" placeholder="Фамилия" />
                                <input type="text" placeholder="Отчество" />
                                <input type="number" placeholder="Возраст" />
                                <p type="text">Пол</p>
                                <select>
                                    <option value=""></option>
                                    <option value="male">Мужской</option>
                                    <option value="female">Женский</option>
                                </select>

                                <input type="text" placeholder="Email" />
                                <input type="number" placeholder="Номер телефона" />
                                <button>Сохранить изменения</button>
                            </div>
                        )}

                        {selectedCategory === 'practice' && (
                            <div className="practice-section">
                                <h2 className="title-2">Мои заявки на программы обучения</h2>
                                <div className="practice-container">
                                    {applications.map(application => (
                                        <div key={application.offer_id} className="practice-item">
                                            <h3>{application.name}</h3>
                                            <p>Статус: {application.status}</p>
                                            <button onClick={() => handleDeleteApplication(application.offer_id)}>Удалить заявку</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Personal;