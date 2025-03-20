import axios from 'axios';

const fetchPracticeData = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/practice');
        return response.data; // Возвращаем данные из базы данных
    } catch (error) {
        console.error('Error fetching practice data:', error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
};

// Вызов функции для получения данных при загрузке страницы
const projects = await fetchPracticeData(); // Используем await для получения данных

export { projects };