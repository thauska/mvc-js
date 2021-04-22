class NegociacaoController {
  constructor() {
    this._ordemAtual = ''
    let $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQntd = $('#quantidade')
    this._inputValor = $('#valor')
    
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    )

    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())          
      .then(negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
      .catch(error => {
        console.log(error)
        this._mensagem.texto = error
      })
    
  }

  adiciona(event) {

    event.preventDefault(); 

    let negociacao = this._criaNegociacao()

    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => {
            this._listaNegociacoes.adiciona(negociacao)        
            this._mensagem.texto = 'Negociação adicionada com sucesso!'
            this._limpaFormulario()
          })
      .catch(erro => this._mensagem.texto = erro)

  }

  importaNegociacoes() {

    let service = new NegociacaoServices()
    service
      .obterNegociacoes()
      .then(negociacoes => negociacoes.forEach(negociacao => {
        this._listaNegociacoes.adiciona(negociacao)
        this._mensagem.texto = 'Negociações do período importadas com sucesso!'
      }))
      .catch(error => this._mensagem.texto = error)

  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.textToDate(this._inputData.value),
      parseInt(this._inputQntd.value),
      parseFloat(this._inputValor.value)
    )
  }

  _limpaFormulario() {
      this._inputData.value = ''
      this._inputQntd.value = 1
      this._inputValor.value = 0.0

      this._inputData.focus()
  }

  apaga() {

    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(mensagem => {
        this._mensagem.texto = mensagem
        this._listaNegociacoes.esvazia()
      })
      .catch(error => this._mensagem.texto = error)

  }

  ordena(coluna) {
    if(this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem()
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
    }
    this._ordemAtual = coluna
  }

}
