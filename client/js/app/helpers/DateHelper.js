class DateHelper {
    dateToText(date) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    textToDate(text) {
        return new Date(...text.split('-').map((item, indice) => item - indice % 2))
    }

}