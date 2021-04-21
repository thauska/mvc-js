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
    let service = new NegociacaoServices()

    service.obterNegociacaoSemana()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        this._mensagem.texto = 'Negociações da semana obtidas com sucesso!'
      })
      .catch(error => this._mensagem.texto = error)

    service.obterNegociacaoSemanaAnterior()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        this._mensagem.texto = 'Negociações da semana anterior obtidas com sucesso!'
      })
      .catch(error => this._mensagem.texto = error)

    service.obterNegociacaoSemanaRetrasada()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        this._mensagem.texto = 'Negociações da semana retrasada obtidas com sucesso!'
      })
      .catch(error => this._mensagem.texto = error)

    /* service.obterNegociacaoSemana((err, negociacoes) => {
      if(err) {
        this._mensagem.texto = err
        return
      }
      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))

      service.obterNegociacaoSemanaAnterior((err, negociacoes) => {
        if(err) {
          this._mensagem.texto = err
          return
        }
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))

        service.obterNegociacaoSemanaAnterior((err, negociacoes) => {
          if(err) {
            this._mensagem.texto = err
            return
          }
          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
          this._mensagem.texto = 'Negociações importadas com sucesso!'
        })
      })
    }) */
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
