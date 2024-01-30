export const STORAGE_USERNAME = '__STP_username__';
export const STORAGE_LEVEL_SYMBOLS = '__STP_level-symbols__';
export const STORAGE_LEVEL_COUNT = '__STP_level-count__';
export const STORAGE_LEVEL_ID = '__STP_level-id';
type TLangHash ={
    readonly [key: string]: string
}
export const langHash: TLangHash = {
    'ru': 'Русская раскладка',
    'en': 'English layout',
}

const someArr = ['Tab', 'CapsLock', 'Shift', 'Backspace', 'Control', 'Alt', 'Enter', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
const someMoreArr = ['Escape', 'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp', 'Meta', 'Insert', 'Delete'];
export const insignificantKeys = new Set([...someArr, ...someMoreArr]);