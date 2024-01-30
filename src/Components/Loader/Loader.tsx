import { CSSProperties, FC } from "react";
import { Oval } from "react-loader-spinner";

interface ILoaderProps {
    style: CSSProperties;
    width: number,
    height: number,
    strokeWidth: number,
}

export const Loader: FC<ILoaderProps> = ({style, width, height, strokeWidth}) => {
    return (
        <div style={style}>
            <Oval visible={true}
                height={height}
                width={width}
                color="#55c5ff"
                ariaLabel="oval-loading"
                secondaryColor="#8bd4f9"
                strokeWidth={strokeWidth} />
        </div>
    )
}