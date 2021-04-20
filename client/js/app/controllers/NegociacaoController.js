class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQntd = $('#quantidade')
    this._inputValor = $('#valor')
    
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    )
    
  }

  adiciona(event) {
    event.preventDefault(); 

    this._listaNegociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso!'
    this._limpaFormulario()

  }

  importaNegociacoes() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'negociacoes/semana')

    /** configurações */
    xhr.onreadystatechange = () => {
      /** Tipos de estados: 
        0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição está concluída e a resposta está pronta
       */
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {

          console.log('Obtendo as negociações do servidor')

        } else {
          console.log('Não foi possível obter negociações do servidor')
        }
      }
    }

    xhr.send()
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.textToDate(this._inputData.value),
      this._inputQntd.value,
      this._inputValor.value
    )
  }

  _limpaFormulario() {
      this._inputData.value = ''
      this._inputQntd.value = 1
      this._inputValor.value = 0.0

      this._inputData.focus()
  }

  apaga() {

      this._listaNegociacoes.esvazia();
      this._mensagem.texto = 'Negociações apagadas com sucesso';
  }
}
