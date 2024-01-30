export interface ILevelsPageState {
    layoutLang: string;
    levels: ILevels[];
    practice: IPractice[];
    levelsIsFetching: boolean;
    practiceIsFetching: boolean;
}
export interface ILevels {
    symb: string;
    count: number;
    time: string;
    speed: number;
    accuracy: number;
    id: number;
}
export interface IPractice {
    lang: string;
    short: string;
    time: string;
    speed: number;
    accuracy: number;
}

export interface ISingleLevel {
    symbols: string;
    lang: string;
    short: string;
    count: number;
    isPractice: boolean;
    lvlId?: number; //потому что у practice нет id
    textToWrite: string;
    writtenText: string;
    isLoading: boolean;
    delta: number;
    error: string;
}

export interface ITestSlice {
    lang: string;
    text: string;
    isLoading: boolean;
    delta: number;
    error: string;
    bestSpeed: number;
    bestAccuracy: number;
}

export interface ITest {
    accuracy: number;
    speed: number;
    date: string;
}

export interface IRatingItem {
    accuracy: number;
    speed: number;
    uid: string;
    username: string;
}

export interface IProfile {
    levelsCount: number,
    maxTestSpeed: number,
    maxTestAccuracy: number,
    passedLevels: ILevels[];
    tests: ITest[];
    ratingList: IRatingItem[];
    isPageLoading: boolean,
    isDataLoading: boolean,
}

export interface IFaqItem {
    q: string,
    a:{
        img: {
            name: string,
            alt: string,
        },
        p: string[],
        ul?: string[]
    }
}

export interface IFaqSlice {
    faqs: IFaqItem[],
}