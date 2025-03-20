import React, { useState } from 'react';

const Personal = () => {
    const [selectedCategory, setSelectedCategory] = useState('personalInfo');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <main className="section">
            <div className="container">
                <h1 className="title-1">Личный кабинет ПРЕДПРИЯТИЯ</h1>

                <div className="personal-dashboard">
                    <div className="categories">
                        <h2 className="title-2">Выберите категорию</h2>
                        <ul>
                            <li onClick={() => handleCategoryChange('personalInfo')}>Информация о компании</li>
                            <li onClick={() => handleCategoryChange('interests')}>Мои интересы</li>
                        </ul>
                    </div>

                    <div className="content">
                        {selectedCategory === 'personalInfo' && (
                            <div className="personal-info">
                                <h2 className="title-2">Информация о компании</h2>
                                <input type="text" placeholder="Название" />
                                <input type="text" placeholder="Email" />
                                <input type="number" placeholder="Регистрационный номер" />
                                <input type="text" placeholder="ФИО Контактного лица" />
                                <input type="text" placeholder="Номер телефона" />
                                <input type="text" placeholder="Адрес" />
                                <input type="text" placeholder="Сайт компании" />
                                
                                

                                <button>Сохранить изменения</button>
                            </div>
                        )}

                        {selectedCategory === 'interests' && (
                            <div className="interests">
                                <h2 className="title-2">Мои интересы</h2>
                                <label>
</label>


                                <button>Сохранить изменения</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Personal;