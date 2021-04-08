class DateHelper {

    constructor() {
        throw new Error('This class cannot be instantiated')
    }

    static dateToText(date) {
        // com static, não preciso instanciar a classe, ela poderá ser invocada diretamente
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    static textToDate(text) {
        return new Date(...text.split('-').map((item, indice) => item - indice % 2))
    }

}