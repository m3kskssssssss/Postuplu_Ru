// Home.js
import Header from "./../components/header/Header";
import NewsList from "./NewsList"; // Импортируем новый компонент

const Home = () => {
    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <NewsList /> {/* Используем компонент новостной ленты */}
                </div>
            </main>
        </>
    );
};

export default Home;