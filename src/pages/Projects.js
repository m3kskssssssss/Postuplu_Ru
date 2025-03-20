import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "./Search";
import Filters from "./Filters";
import CreatePracticeModal from "./CreatePracticeModal";
import axios from 'axios';
import "./style.css";
import "./Projects.css";
import "./Filters.css";

import img01 from '../img/projects/01.jpg';
import img02 from '../img/projects/02.jpg';
import img03 from '../img/projects/03.jpg';
import img04 from '../img/projects/04.jpg';
import img05 from '../img/projects/05.jpg';
import img06 from '../img/projects/06.jpg';
import img07 from '../img/projects/07.jpg';
import img08 from '../img/projects/08.jpg';
import img09 from '../img/projects/09.jpg';

const images = [img01, img02, img03, img04, img05, img06, img07]; // Массив с изображениями

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Состояние для сообщения об успехе

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get('http://localhost:5001/api/practice');
            setProjects(response.data);
            setFilteredProjects(response.data);
        };
        fetchProjects();
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = projects.filter(project =>
            project.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProjects(filtered);
    };

    const handleFilter = (filters) => {
        // Логика фильтрации...
    };

    const refreshProjects = async () => {
        const response = await axios.get('http://localhost:5001/api/practice');
        setProjects(response.data);
        setFilteredProjects(response.data);
    };

    const handleCreatePractice = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const isUniversity = () => {
        return localStorage.getItem('userCategory') === 'teacher';
    };

    const addNewPractice = (newPractice) => {
        setProjects(prevProjects => [...prevProjects, newPractice]);
        setFilteredProjects(prevFiltered => [...prevFiltered, newPractice]);
        setSuccessMessage('Направление успешно создано!'); // Устанавливаем сообщение об успехе
        setTimeout(() => setSuccessMessage(''), 3000); // Убираем сообщение через 3 секунды
    };

    return (
        <main className="section">
            <div className="container">
                {isUniversity() && (
                    <button onClick={handleCreatePractice} className="create-practice-button">
                        Создать направление
                    </button>
                )}
                {successMessage && <div className="success-message">{successMessage}</div>} {/* Отображаем сообщение об успехе */}
                <div className="search-filters-container filter-container">
                    <Search onSearch={handleSearch} />
                    <Filters onFilter={handleFilter} />
                </div>

                <ul className="projects">
                    
                    {filteredProjects.map((project, index) => {
                        const image = images[index % images.length]
                        return (
                            <li key={index}>
                                <Link to={`/project/${index}`}>
                                    <div className="project">
                                        <img src={image} alt={project.title} />
                                        <h1 className="title-2">{project.name}</h1>
                                        <h1 className="title-2">{project.places} мест</h1>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {isModalOpen && <CreatePracticeModal onClose={closeModal} addNewPractice={addNewPractice} />} {/* Передаем функцию добавления нового направления */}
        </main>
    );
}

export default Projects;