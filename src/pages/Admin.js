// Admin.js
import React, { useState } from 'react';

const Personal = () => {
    const [selectedCategory, setSelectedCategory] = useState('userManagement');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <main className="section">
            <div className="container">
                <h1 className="title-1">Личный кабинет АДМИНИСТРАТОРА</h1>

                <div className="personal-dashboard">
                    <div className="categories">
                        <h2 className="title-2">Выберите категорию</h2>
                        <ul>
                            <li onClick={() => handleCategoryChange('userManagement')}>Управление пользователями</li>
                            <li onClick={() => handleCategoryChange('settings')}>Настройки</li>
                        </ul>
                    </div>

                    <div className="content">
                        {selectedCategory === 'userManagement' && (
                            <div className="user-management">
                                <h2 className="title-2">Управление пользователями</h2>
                                {/* Здесь можно добавить функционал для управления пользователями */}
                                <p>Здесь будет функционал для управления пользователями.</p>
                            </div>
                        )}

                        {selectedCategory === 'settings' && (
                            <div className="settings">
                                <h2 className="title-2">Настройки</h2>
                                {/* Здесь можно добавить функционал для настроек */}
                                <p>Здесь будут настройки администраторов.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Personal;