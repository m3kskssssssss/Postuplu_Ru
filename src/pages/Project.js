import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { projects } from "./../helpers/projectList";
import './Project.css';

import img01 from '../img/projects/01-big.jpg';
import img02 from '../img/projects/02-big.jpg';
import img03 from '../img/projects/03-big.jpg';
import img04 from '../img/projects/04-big.jpg';
import img05 from '../img/projects/05-big.jpg';
import img06 from '../img/projects/06-big.jpg';
import img07 from '../img/projects/07-big.jpg';
import img08 from '../img/projects/08.jpg';

const images = [img01, img02, img03, img04, img05, img06, img07, img08];

const isStudent = () => {
    return localStorage.getItem('userCategory') === 'student';
};

const Project = () => {
    const { id } = useParams();
    const project = projects[id];

    useEffect(() => {
        // Запрос разрешения на отображение уведомлений
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const handleRegistration = () => {
        // Отправка уведомления
        if (Notification.permission === 'granted') {
            new Notification('Уведомление', {
                body: 'Вы успешно отправили заявку!',
                icon: 'path/to/icon.png' // Укажите путь к иконке, если нужно
            });
        }
    };

    const projectImage = images[id % images.length];

    return (
        <main className="section">
            <div className="container">
                {project && (
                    <div className="project-details">
                        <h2 className="title-1">Направление: {project.name}</h2>
                        <div className="project-details__content">
                            <img
                                src={projectImage}
                                alt={project.name}
                                className="project-details__cover"
                            />
                            <div className="project-details__desc">
                                <p><strong>Дата начала обучения: </strong> {project.start_date}</p>
                                <p><strong>Дата окончания обучения: </strong> {project.end_date}</p>
                                <p><strong>О направлении: </strong> {project.description}</p>
                                <p>
                                    <strong>Университет: </strong>
                                    <a href={project.link_university} target="_blank" rel="noopener noreferrer">
                                        УрФУ
                                    </a>
                                </p>
                                <p><strong>Количество мест: </strong> {project.places}</p>
                            </div>
                        </div>
                        {isStudent() && (
                            <button className="btn btn-primary" onClick={handleRegistration}>
                                Зарегистрироваться на направление
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Project;