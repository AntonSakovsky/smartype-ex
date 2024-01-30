import { FC } from "react";
import { Accordion } from "../Accordion/Accordion";
import faqImg from '../../img/faq2.png';
import { IFaqItem } from "../../models/types";
import './FAQ.css';

interface IFAQProps {
    faqs: IFaqItem[];
}

export const FAQ: FC<IFAQProps> = ({
    faqs
})=> {
    return(
        <div className='FAQ'>
        <div className='FAQheader'>
            <h1 className='FAQtitle'>Популярные и часто задаваемые вопросы</h1>
            <img src={faqImg} alt="FAQ"/>
        </div>
        <Accordion arr={faqs}/>
    </div>
    )
}