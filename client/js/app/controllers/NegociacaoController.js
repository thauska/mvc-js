class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document)
        
        this._inputData = $('#data')
        this._inputQntd = $('#quantidade')
        this._inputValor = $('#valor')

    }

    adiciona(event) {
        event.preventDefault()

        let negociacao = new Negociacao(
            DateHelper.textToDate(this._inputData.value) ,
            this._inputQntd.value,
            this._inputValor.value
        )

        console.log(negociacao)

        console.log(DateHelper.dateToText(negociacao.data))

        }
}