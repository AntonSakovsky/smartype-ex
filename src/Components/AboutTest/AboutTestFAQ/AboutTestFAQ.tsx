import { FC, useEffect } from "react"
import { FAQ } from "../../FAQ/FAQ"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux-hooks";
import { getTestFaqs } from "../../../store/reducers/FaqSlice";
import './AboutTestFAQ.css'

interface IAboutTestFAQProps { }

export const AboutTestFAQ: FC<IAboutTestFAQProps> = () => {
    const dispatch = useAppDispatch();
    const { faqs } = useAppSelector(state => state.theoryFaq)

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--bg-body)';
        dispatch(getTestFaqs());
    }, [])

    return (
        <section className='FAQsection'>
            <div className='container'>
               
                <FAQ faqs={faqs} />
            </div>
        </section>
    )
}