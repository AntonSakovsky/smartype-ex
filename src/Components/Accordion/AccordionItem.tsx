import { FC, useRef } from "react";
import s from './Accordion.module.css';
import { IFaqItem } from "../../models/types";

interface IAccordionItemProps {
    onClick: () => void,
    faqItem: IFaqItem,
    isOpen: boolean
}

export const AccordionItem: FC<IAccordionItemProps> = ({ onClick, faqItem, isOpen }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className={s.questionItem}>
            <p className={s.question} aria-expanded={!isOpen} onClick={onClick}>{faqItem.q}</p>
            <div className={s.collapse}
                style={isOpen ? { height: elementRef.current?.scrollHeight } : { height: 0 }}>
                <div className={s.answer}
                    ref={elementRef}>
                    <img className={faqItem.a.img.name === 'keyboard-large.png' ? s.img + ' ' + s.keyboardImg : s.img} src={'./img/' + faqItem.a.img.name} alt={faqItem.a.img.alt} />
                    <img src="" />
                    {
                        faqItem.a.p.map((text, ind) => <p key={ind}>{text}</p>)
                    }
                    {
                        faqItem.a.ul ?
                            <ul className={s.list}>
                                {
                                    faqItem.a.ul.map((text, ind) => <li className={s.listItem} key={ind}>{text}</li>)
                                }
                            </ul>
                            :
                            null

                    }
                </div>
            </div>

        </div>
    )
}