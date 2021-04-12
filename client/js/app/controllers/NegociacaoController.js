class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document)

    this._inputData = $("#data")
    this._inputQntd = $("#quantidade")
    this._inputValor = $("#valor")
    this._listaNegociacoes = new ListaNegociacoes()
  }

  adiciona(event) {
    event.preventDefault(); 

    this._listaNegociacoes.adiciona(this._criaNegociacao())
    this._limpaFormulario()

    console.log(this._listaNegociacoes.negociacoes)
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQntd.value,
      this._inputValor.value
    )
  }

  _limpaFormulario() {
      this._inputData.value = ""
      this._inputQntd.value = 1
      this._inputValor.value = 0.0

      this._inputData.focus()
  }
}
