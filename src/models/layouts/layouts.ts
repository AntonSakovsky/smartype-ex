export interface ILayout {
    layout: {
        firstrow: string[],
        secondrow: string[],
        thirdrow: string[],
        fourthrow: string[],
    },
    altLayout: {
        firstrow: string[],
        secondrow: string[],
        thirdrow: string[],
        fourthrow: string[],
    },
    colors: {
        darkblue: string[],
        green: string[],
        blue: string[],
        pink: string[],
        orange: string[],
        yellow: string[],
    },
}

export const ruLayout: ILayout = {
    layout: {
        firstrow: ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '←'],
        secondrow: ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\'],
        thirdrow: ['CAPS', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
        fourthrow: ['SHIFT', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'SHIFT'],
    },
    altLayout: {
        firstrow: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '←'],
        secondrow: ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/'],
        thirdrow: ['CAPS', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
        fourthrow: ['SHIFT', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'SHIFT'],
    },
    colors: {
        darkblue: ['Ё', 'TAB', 'CAPS', 'SHIFT', 'ENTER', '←'],
        green: ['1', '2', '!', '"', 'Й', 'Ф', 'Я', '0', '-', '=', ')', '_', '+', 'З', 'Х', 'Ъ', '\\', '/', 'Ж', 'Э', '.', ','],
        blue: ['3', '№', 'Ц', 'Ы', 'Ч', '9', '(', 'Щ', 'Д', 'Ю'],
        pink: ['4', ';', 'У', 'В', 'С', '8', '*', 'Ш', 'Л', 'Б', 'E'],
        orange: ['5', '6', '%', ':', 'К', 'Е', 'А', 'П', 'М', 'И'],
        yellow: ['7', '?', 'Н', 'Г', 'Р', 'О', 'Т', 'Ь'],
    },
}

export const enLayout: ILayout = {
    layout: {
        firstrow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '←'],
        secondrow: ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
        thirdrow: ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER'],
        fourthrow: ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    },
    altLayout: {
        firstrow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '←'],
        secondrow: ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
        thirdrow: ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'ENTER'],
        fourthrow: ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'SHIFT'],
    },
    colors: {
        darkblue: ['Ё', 'TAB', 'CAPS', 'SHIFT', 'ENTER', '←', '`', '~'],
        green: ['1', '2', '!', '@', '0', '-', '=', ')', '_', '+', 'Q', 'A', 'Z', 'P', ';', ':', '\\', '/', '[', '\'', '"', ']', '{', '}', '|', '?'],
        blue: ['3', '#', '9', '(', 'W', 'S', 'X', 'O', 'L', '.', '>'],
        pink: ['4', '8', 'D', 'C', 'E', 'I', 'K', ',', '$', '*', '<'],
        orange: ['5', '6', '%', 'R', 'F', 'B', 'V', 'T', 'G', 'V', '^'],
        yellow: ['7', '&', 'Y', 'H', 'N', 'U', 'J', 'M'],
    },
}

export interface IKeyboardColors {
    darkblue: string[]
    green: string[]
    blue: string[]
    pink: string[]
    orange: string[]
    yellow: string[]
}

export interface IKeyboard {
    layout: ILayout,
    altLayout: ILayout,
    colors: IKeyboardColors,
}
