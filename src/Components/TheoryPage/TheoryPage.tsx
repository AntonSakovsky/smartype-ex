import { useEffect } from "react";
import rightSeat from '../../img/right-seat.png';
import fingers from '../../img/fingers.png';
import keybord from '../../img/keyboard.png';
import boy from '../../img/boy.png';
import s from './TheoryPage.module.css';
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { TheoryFAQ } from "./TheoryFAQ/TheoryFAQ";

export const TheoryPage = () => {
    


    useEffect(()=>{
        document.body.style.backgroundColor = 'var(--bg-body)';
    },[])
    return (
        <>
            <Navbar />
            <div className="container">
                <main className={s.theoryMain}>
                    <h1 className={s.theoryTitle}>Узнай, как печатать вслепую</h1>
                    <p className={s.theorySubtitle}>Главная идея слепой печати в том, что за каждым пальцем закреплена своя зона клавиш. Это позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной памяти, все твои десять пальцев будут знать, куда нажать.</p>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Зачем печатать вслепую?</h2>
                        <div className={s.whyDescriptionWrap}>
                            <p className={s.blockDescription}><strong>Во-первых</strong> — eсли набирать текст, все время переводя взгляд с монитора на кнопки и обратно, то глаза очень быстро начинают уставать. Причина в том, что расстояние от клавиатуры до экрана обычно разное, происходит постоянная перефокусировка. При плохом освещении ситуация еще хуже — сказывается большая разница в яркости и контрастности объектов, между которыми перемещается наш взгляд. Используя десятипальцевый метод печати, смотреть на клавиатуру не нужно совсем, поэтому Вы будете меньше уставать, не будет болеть шея и глаза.</p>
                            <p className={s.blockDescription}><strong>Во-вторых</strong>, при печати вслепую ввод текста становится совершенно механической работой — нужная буква безошибочно нажимается тем пальцем, которым она должна нажиматься. Вследствие чего ваше внимание фокусируется не на наборе текста, а только на том, чтобы изложить свои мысли наилучшим образом.</p>
                        </div>
                    </div>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Поза при печати текста</h2>
                        <div className={s.rightSeatWrap}>
                            <ul className={s.blockDescription + ' ' + s.descriptionList}>
                                <li className={s.blockDescriptionItem}>Сиди ровно и держи спину прямой.</li>
                                <li className={s.blockDescriptionItem}>Локти держи согнутыми под прямым углом.</li>
                                <li className={s.blockDescriptionItem}>Голова должна быть немного наклонена вперед.</li>
                                <li className={s.blockDescriptionItem}>Расстояние от глаз до экрана должно быть 45-70 см.</li>
                                <li className={s.blockDescriptionItem}>Расслабь мышцы плеч, рук и кистей. Кисти могут немного касаться стола в нижней части клавиатуры, но не переноси
                                    вес тела на руки, чтобы не перенапрягать кисти.</li>
                            </ul>
                            <img className={s.positionImg} src={rightSeat} alt="Правильная поза" />
                        </div>
                    </div>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Исходная позиция</h2>
                        <div className={s.initialWrap}>
                            <img className={s.initialImg} src={fingers} alt="Пальцы" />
                            <p className={s.blockDescription}>Немного согни пальцы и положи их на клавиши ФЫВА и ОЛДЖ, которые находятся в среднем ряду. Эта строка называется ОСНОВНОЙ СТРОКОЙ, потому что ты всегда будешь начинать с этих клавиш и возвращаться к ним.</p>
                            <p className={s.blockDescription}>На клавишах А и О, под указательными пальцами, находятся небольшие выступы. Они позволяют ориентироваться на клавиатуре вслепую.</p>
                        </div>
                    </div>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Схема клавиатуры</h2>
                        <div className={s.schemeWrap}>
                            <img className={s.schemeImg} src={keybord} alt="Клавиатура" />
                            <p className={s.blockDescription}>
                                Цвет клавиш на этой клавиатуре поможет тебе понять и запомнить, каким пальцем на какую клавишу нужно нажимать.
                            </p>
                            <ul className={s.blockDescription + ' ' + s.descriptionList}>
                                <li className={s.blockDescriptionItem}>Нажимай клавиши только тем пальцем, который для них предназначен.</li>
                                <li className={s.blockDescriptionItem}>Всегда возвращай пальцы в исходную позицию «ФЫВА – ОЛДЖ».</li>
                                <li className={s.blockDescriptionItem}>Клавишу SHIFT всегда нажимает мизинец с противоположной стороны от нужной буквы.</li>
                                <li className={s.blockDescriptionItem}>Пробел отбивай большим пальцем левой или правой руки, как тебе удобнее.</li>
                            </ul>
                            <p className={s.blockDescription}>
                                Сначала такой метод печати может показаться неудобным. Но не останавливайся. Со временем все будет получаться быстро, легко и удобно.
                            </p>
                        </div>
                    </div>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Движение пальцев</h2>
                        <div className={s.movefingWrap}>
                            <div>
                                <p className={s.blockDescription}>Не подглядывай на клавиатуру во время печати. Просто скользи пальцами по клавишам, пока не найдешь основную строку.</p>
                                <p className={s.blockDescription}>Ограничь движение кистей и пальцев до минимума, только чтобы нажимать нужные клавиши. Держи руки и пальцы как можно ближе к исходной позиции. Это увеличит скорость набора текста и снизит нагрузку на кисти.</p>
                                <p className={s.blockDescription}>Следи за безымянными пальцами и мизинцами, так как они часто остаются незадействованными.</p>
                            </div>
                            <img className={s.movefingImg} src={boy} alt="Мальчик" />
                        </div>
                    </div>
                    <div className={s.delimiter}></div>
                    <div className={s.block}>
                        <h2 className={s.blockTitle}>Скорость печати</h2>
                        <ul className={s.blockDescription + ' ' + s.descriptionList}>
                            <li className={s.blockDescriptionItem}>Не пытайся сразу печатать со скоростью света. Начинай ускоряться, только когда все 10 пальцев привыкнут нажимать правильные клавиши.</li>
                            <li className={s.blockDescriptionItem}>Не торопись когда печатаешь, чтобы избежать ошибок. Скорость будет возрастать постепенно.</li>
                            <li className={s.blockDescriptionItem}>Всегда просматривай текст на одно-два слова вперед.</li>
                            <li className={s.blockDescriptionItem}>Пройди все уроки на клавиатурном тренажере Smartype. И твоя скорость станет выше средней скорости печати.</li>
                        </ul>
                    </div>
                    {/* FAQ.render() */}
                    <TheoryFAQ />
                </main>
            </div>
            <Footer />
        </>
    )
}