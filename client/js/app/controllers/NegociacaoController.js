class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document)
        
        this._inputData = $('#data')
        this._inputQntd = $('#quantidade')
        this._inputValor = $('#valor')

    }

    adiciona(event) {
        event.preventDefault()

        let helper = new DateHelper()

        let negociacao = new Negociacao(
            helper.textToDate(this._inputData.value),
            this._inputQntd.value,
            this._inputValor.value
        )

        console.log(negociacao)

        console.log(helper.dateToText(negociacao.data))

        }
}