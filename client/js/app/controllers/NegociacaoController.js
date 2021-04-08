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
                .map((item, indice) => item - indice % 2)
        )

        let negociacao = new Negociacao(
            data,
            this._inputQntd.value,
            this._inputValor.value
        )

        console.log(negociacao)
        }
}