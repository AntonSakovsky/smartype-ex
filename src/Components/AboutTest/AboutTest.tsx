import certifHand from '../../img/certification-hand.png';
import s from './AboutTest.module.css';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import { AboutTestFAQ } from './AboutTestFAQ/AboutTestFAQ';

export const AboutTest = () => {
    return (
        <>
            <Navbar />
            <div className={s.headerOverlay}></div>
            <main className={s.mainTest}>
                <div className={s.container}>
                    <div className={s.mainTestWrap}>
                        <div className={s.speedImg}>
                            <img src={certifHand} alt="Скорость" />
                        </div>
                        <div className={s.startTestWrap}>
                            <h1 className={s.mainTest__title}>Быстрый тест скорости печати</h1>
                            <p className={s.mainTest__description}>Набери небольшой текст. Проверь, сколько знаков в минуту ты печатаешь на русском, украинском или английском языке, и порази друзей или работодателей сертификатом скорости печати.</p>
                            <Link to="/testing" className={s.mainTest__btn}>Начать тестирование</Link>
                        </div>
                    </div>
                </div>
            </main>
            <section className={s.aboutTest}>
                <div className={s.container}>
                    <ul className={s.aboutTestList}>
                        <li className={s.aboutTestListItem}>
                            <h2 className={s.aboutTestTitle}>Зачем проходить тест скорости печати?</h2>
                            <p className={s.aboutTestDescr}>Чтобы узнать свою скорость и точность печати, понять нужно ли что-то улучшить. Средняя скорость печати составляет 200 зн./мин, попробуй ее превзойти! Ты можешь пройти тест несколько раз и увидеть, как твоя скорость печати улучшается со временем.</p>
                            <p className={s.aboutTestDescr}>После прохождения теста онлайн ты получишь сертификат скорости печати, который сможешь прикрепить к резюме, показать учителю или похвастаться друзьям.</p>
                        </li>
                        <li className={s.aboutTestListItem}>
                            <h2 className={s.aboutTestTitle}>Как мы измеряем скорость печати?</h2>
                            <p className={s.aboutTestDescr}>Мы измеряем скорость печати в зн./мин  — сколько знаков в минуту без опечаток ты набрал. «Знаком» считается любой символ, включая пробелы. Мы учитываем только правильно набранные слова.</p>
                            <p className={s.aboutTestDescr}>Поэтому, если сделана опечатка, подсчет символов останавливается, пока ты ее не исправишь.</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={s.startTest}>
                <h2 className={s.startTestTitle}>Тест займет всего 2-3 минуты</h2>
                <p className={s.startTestDescr}>Проходи тест, сколько хочешь. Ограничений нет.
                    Хватай клавиатуру и измеряй свою скорость печати!</p>
                <Link to="/testing" className={s.mainTest__btn}>Начать тестирование</Link>
            </section>

            <AboutTestFAQ />
            
            <Footer />
        </>

    )
}