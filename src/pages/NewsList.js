// components/NewsList.js
import React, { useState } from 'react';
import './style.css'; // Импортируем стили, если необходимо
import Img1 from "./../img/projects/16.png"
import Img2 from "./../img/projects/17.png"
import Img3 from "./../img/projects/18.png"
import Img4 from "./../img/projects/19.png"
import Img5 from "./../img/projects/20.png"
import Img6 from "./../img/projects/21.png"
import Img7 from "./../img/projects/22.png"



const initialNewsData = [
    {
        id: 1,
        title: "МГУ стал лидером в научных исследованиях",
        image: Img1, // Укажите путь к изображению
        content: "Недавно завершился конкурс на лучшее научное исследование среди вузов России...",
        fullContent: "Недавно завершился конкурс на лучшее научное исследование среди вузов России, в котором МГУ занял первое место благодаря инновационным разработкам в области экологии."
    },
    {
        id: 2,
        title: "СПбГУ открыл новый центр искусственного интеллекта",
        image: Img2,
        content: "В Санкт-Петербургском государственном университете состоялось открытие нового центра...",
        fullContent: "В Санкт-Петербургском государственном университете состоялось открытие нового центра искусственного интеллекта, который будет заниматься разработкой передовых технологий и обучением студентов."
    },
    {
        id: 3,
        title: "НГУ запустил программу обмена студентами",
        image: Img3,
        content: "Новосибирский государственный университет объявил о запуске новой программы обмена...",
        fullContent: "Новосибирский государственный университет объявил о запуске новой программы обмена студентами с ведущими университетами Европы, что позволит студентам получить международный опыт."
    },
    {
        id: 4,
        title: "КФУ выиграл грант на развитие IT-образования",
        image: Img4,
        content: "Казанский федеральный университет стал обладателем гранта...",
        fullContent: "Казанский федеральный университет стал обладателем гранта на развитие IT-образования, который позволит модернизировать учебные программы и привлечь лучших специалистов в области технологий."
    },
    {
        id: 5,
        title: "ВГУ запустил новый курс по устойчивому развитию",
        image: Img5,
        content: "В Воронежском государственном университете стартовал новый курс...",
        fullContent: "В Воронежском государственном университете стартовал новый курс по устойчивому развитию, направленный на подготовку специалистов, способных решать экологические и социальные проблемы современности."
    },
    
    // Добавьте больше новостей по мере необходимости
];

const NewsList = () => {
    const [newsData, setNewsData] = useState(initialNewsData);
    const [selectedNews, setSelectedNews] = useState(null);

    const handleNewsClick = (news) => {
        setSelectedNews(news);
    };

    const closeModal = () => {
        setSelectedNews(null);
    };

    const deleteNews = (id) => {
        setNewsData(newsData.filter(news => news.id !== id));
    };

    return (
        <div className="news-list">
            {newsData.map(news => (
                <div key={news.id} className="news-item" onClick={() => handleNewsClick(news)}>
                    <img src={news.image} alt={news.title} className="news-image" />
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-content">{news.content}</p>
                    
                </div>
            ))}

            {selectedNews && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedNews.title}</h2>
                        <img src={selectedNews.image} alt={selectedNews.title} className="modal-image" />
                        <p>{selectedNews.fullContent}</p>
                        <button className="close-button" onClick={closeModal}>х</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsList;