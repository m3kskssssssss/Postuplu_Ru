import React, { useState } from "react";
import "./style.css";
import ellipse from "./../../img/icons/ellipse_text.svg";
import starAnimated from "./../../img/star_animated.svg"; // Импортируй анимированную звезду
import blickAnimated from "./../../img/blick_animated.svg"; // Импортируй анимированное изображение
import blickStatic from "./../../img/blick_static.svg"; // Импортируй статичное изображение
import starStatic from "./../../img/star_static.svg"; // Импортируй статичное изображение звезды

const Header = () => {
    const [isStatic, setIsStatic] = useState(false); // Состояние для управления статичным состоянием

    const stars = [
        { left: '5%', top: '25%' },
        { left: '90%', top: '40%' },
        { left: '55%', top: '12%' },
        { left: '30%', top: '57%' }
    ];

    const blicksAnimated = [
        { left: '95%', top: '30%' },
        { left: '20%', top: '40%' },
        { left: '45%', top: '25%' },
    ];

    const blicksStatic = [
        { left: '70%', top: '40%' }
    ];

    const starsStatic = [
        { left: '80%', top: '10%' },
        { left: '60%', top: '50%' },
    ];

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__background">

                    <div className="tab">
                        <h1>
                            Дорогие абитуриенты!


    Вы на пороге важного этапа в вашей жизни — выбора будущей профессии и учебного заведения.
    Этот путь может показаться сложным, но помните: каждый шаг приближает вас к вашей мечте.
    Ваше будущее в ваших руках! Удачи вам на этом увлекательном пути!
                            <div className="tickers">
                                <div className="ticker">
                                    {/* Повторяющийся текст */}
                                    {Array(9).fill(<h2 className="ticker__head">НОВОСТИ ВУЗОВ</h2>)}
                                </div>
                            </div>
                        </h1>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;
