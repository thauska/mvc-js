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

    ConnectionFactory
      .getConnection()
      .then(connection => {

        let negociacao = this._criaNegociacao()

        new NegociacaoDao(connection)
          .adiciona(negociacao)
          .then(() => {
            this._listaNegociacoes.adiciona(negociacao)        
            this._mensagem.texto = 'Negociação adicionada com sucesso!'
            this._limpaFormulario()
          })

      })
      .catch(erro => this._mensagem.texto = erro)

  }

  importaNegociacoes() {
    let service = new NegociacaoServices()

    Promise.all([
      service.obterNegociacaoSemana(),
      service.obterNegociacaoSemanaAnterior(),
      service.obterNegociacaoSemanaRetrasada()
    ]).then(negociacoes => {
      // retorna 3 arrays com vários arrays dentro
      console.log(negociacoes)
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
      this._mensagem.texto = 'Negociações da semana obtidas com sucesso!'

    }).catch(error => this._mensagem.texto = error)

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

      this._listaNegociacoes.esvazia()
      this._mensagem.texto = 'Negociações apagadas com sucesso'
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
