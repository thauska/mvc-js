class ListaNegociacoes {

    constructor(contexto, armadilha) {
        this._negociacoes = []
        this._armadilha = armadilha
        this._contexto = contexto
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao)
        // this._armadilha(this)
        Reflect.apply(this._armadilha, this._contexto, [this])
    }
    
    get negociacoes() {
        // garantindo uma programação defensiva
        return [].concat(this._negociacoes)
    }
    
    esvazia() {
        this._negociacoes = []
        // this._armadilha(this)
        Reflect.apply(this._armadilha, this._contexto, [this])
    }
}