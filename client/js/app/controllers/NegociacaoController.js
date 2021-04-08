class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document)
        
        this._inputData = $('#data')
        this._inputQntd = $('#quantidade')
        this._inputValor = $('#valor')

    }

    adiciona(event) {
        event.preventDefault()

        // console.log(typeof(this._inputData.value)) -> é string e precisa ser objeto tipo date

        // '2016-11-12' sem split
        let data = new Date(...
            this._inputData.value
                .split('-')
                .map(function (item, indice) {
                    return item - indice % 2
                })
        )

        console.log(data)
    }
}