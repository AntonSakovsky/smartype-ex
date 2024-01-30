import { FC } from "react";
import s from './Keyboard.module.css';
import { Row } from "./Row/Row";
import { ILayout } from "../../models/layouts/layouts";

interface IKeyboardProps {
    alt: boolean;
    currLayout: ILayout,
    keyToLight: string,
    pressedKey: string
}
export const Keyboard: FC<IKeyboardProps> = ({ alt, currLayout, keyToLight, pressedKey }) => {
    const currentLayout = alt ? currLayout.altLayout : currLayout.layout;
    const colors = currLayout.colors;
    const rowNames = Object.keys(currLayout.layout);

    return (
        <div className={s.keyboard} >
            {

                rowNames.map((rowName, ind) => <Row
                    data={currentLayout[rowName as keyof typeof currentLayout]}
                    colors={colors}
                    keyToLight={keyToLight}
                    pressedKey={pressedKey} 
                    key={ind}/>)
            }
            <Row data={[' ']} colors={null} keyToLight={keyToLight} pressedKey={pressedKey} />
        </div>
    )
}