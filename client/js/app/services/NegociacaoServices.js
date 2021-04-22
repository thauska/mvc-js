class NegociacaoServices {

  constructor() {
    this._http = new HttpService()
  }
  
  obterNegociacaoSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes => {
        return negociacoes.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      })
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível obter as negociações da semana')
      })
  }

  obterNegociacaoSemanaAnterior() {
      
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes => {
        return negociacoes.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      })
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível obter as negociações da semana anterior')
      })
  }

  obterNegociacaoSemanaRetrasada() {

    return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes => {
        return negociacoes.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
      })
      .catch(error => {
        console.log(error)
        throw new Error('Não foi possível obter as negociações da semana retrasada')
      })

  }

  obterNegociacoes() {
        
    return Promise
      .all([
        this.obterNegociacaoSemana(),
        this.obterNegociacaoSemanaAnterior(),
        this.obterNegociacaoSemanaRetrasada()
      ])
      .then(periodos => {
        let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), [])
            .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ))
        return negociacoes
      })
      .catch(erro => {
        throw new Error(erro)
      })
  }
  
  cadastra(negociacao) {
    
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso')
      .catch(() => {
        throw new Error('Não foi possível adicionar a negociação')
      })

  }
  
}
