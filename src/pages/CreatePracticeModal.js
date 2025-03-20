import React, { useState } from 'react';
import axios from 'axios';
import './CreatePracticeModal.css';

const CreatePracticeModal = ({ onClose, addNewPractice }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [salary, setSalary] = useState(0);
    const [places, setPlaces] = useState(0);
    const [university, setUniversity] = useState(localStorage.getItem('user'));
    const [company, setCompany] = useState('');
    const [industry, setIndustry] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [education, setEducation] = useState('');
    const [internshipFormat, setInternshipFormat] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:');
        try {
            const response = await axios.post('http://localhost:5001/api/create-practice', {
                name,
                description,
                start_date,
                end_date,
                
                places,
                
                industry
            });
            console.log('Practice created:', response.data);

            const newPractice = {
                id: response.data.id,
                name,
                description,
                start_date,
                end_date,
                
                places,
                
                industry
            };

            addNewPractice(newPractice); // Добавляем новое направление в список
            onClose(); // Закрываем модальное окно после отправки
        } catch (error) {
            console.error('Error creating practice:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button">×</button>
                <h2>Создать направление</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Название направления:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Описание:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Дата начала обучения:</label>
                        <input
                            type="date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Дата окончания обучения:</label>
                        <input
                            type="date"
                            value={end_date}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Количество мест:</label>
                        <input
                            type="number"
                            value={places}
                            onChange={(e) => setPlaces(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Отрасль:</label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                        />
                    </div>
                    

                    <button type="submit">Создать направление</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePracticeModal;