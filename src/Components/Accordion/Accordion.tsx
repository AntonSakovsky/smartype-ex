import { FC, useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { IFaqItem } from "../../models/types";

interface IAccordionProps {
    arr: IFaqItem[]
}

export const Accordion: FC<IAccordionProps> = ({ arr }) => {
    const [openId, setOpenId] = useState<number | null>(null);

    const clickHandler = (id: number) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    }

    return (
        <>
        {
            arr.map((item, ind) => <AccordionItem
            faqItem={item}
            isOpen={openId === ind}
            onClick={() => clickHandler(ind)}
            key={ind} />)
        }
        </>
        
    )
}