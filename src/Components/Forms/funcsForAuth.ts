import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { IUser } from "../../store/reducers/UserSlice";
import { db } from "../../firebase";

const addNewUserToDB = async (user: IUser) => {
    const userRef = doc(db, "users/", String(user.uid));
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        setDoc(userRef, user);
    }
};

export const initNewUserInDB = async (user: IUser) => {
    await addNewUserToDB(user);
    //Добавление русских уровней
    const userRuLevelsRef = doc(db, `ruLessons/`, "symbols");
    const ruLevelsSnap = await getDoc(userRuLevelsRef);
    const ruSymbols = ruLevelsSnap.data()?.arr;
    let ref = doc(db, "levels", `${user.uid}/`);
    let levelsArr = [];
    for (let i = 0; i < ruSymbols.length; i++) {
        const level = {
            symb: ruSymbols[i],
            count: 0,
            time: "0:00",
            speed: 0,
            accuracy: 0,
            id: i + 1,
        };
        levelsArr.push(level);
    }
    setDoc(ref, { ru: levelsArr });

    //Добавление английских уровней
    const userEnLevelsRef = doc(db, `enLessons/`, "symbols");
    const enLevelsSnap = await getDoc(userEnLevelsRef);
    const enSymbols = enLevelsSnap.data()?.arr;
    ref = doc(db, "levels", `${user.uid}/`);
    levelsArr = [];
    for (let i = 0; i < enSymbols.length; i++) {
        const level = {
            symb: enSymbols[i],
            count: 0,
            time: "0:00",
            speed: 0,
            accuracy: 0,
            id: i + 1,
        };
        levelsArr.push(level);
    }
    updateDoc(ref, { en: levelsArr });

    //Добавление практики
    const userPracticeRef = doc(db, `practiceLessons/`, "settings");
    const practiceSnap = await getDoc(userPracticeRef);
    const prLevels = practiceSnap.data()?.arr;
    ref = doc(db, "practice", `${user.uid}/`);
    levelsArr = [];
    for (let i = 0; i < prLevels.length; i++) {
        const obj = {
            lang: prLevels[i].name,
            short: prLevels[i].short,
            time: "0:00",
            speed: 0,
            accuracy: 0,
        };
        levelsArr.push(obj);
    }
    setDoc(ref, { practiceArr: levelsArr });

    //Добавление тестов
    ref = doc(db, "tests", `${user.uid}/`);
    setDoc(ref, { arr: [] });

    //Добавление прогресса по уровням
    ref = doc(db, "progress", `${user.uid}/`);
    setDoc(ref, { passed: [] });
};

export const isExist = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};
