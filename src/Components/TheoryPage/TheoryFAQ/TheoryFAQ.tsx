import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux-hooks";
import { getTheroyFaqs } from "../../../store/reducers/FaqSlice";
import { FAQ } from "../../FAQ/FAQ";

interface ITheoryFAQProps {}

export const TheoryFAQ: FC<ITheoryFAQProps> = ()=> {
    const dispatch = useAppDispatch();
    const {faqs} = useAppSelector(state => state.theoryFaq)

    useEffect(()=>{
        dispatch(getTheroyFaqs());
    },[]);

    return(
        <FAQ faqs={faqs}/>
    )
}