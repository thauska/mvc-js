class ListaNegociacoes {
    constructor() {
        this._negociacoes = []
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao)
    }

    get negociacoes() {
        // garantindo uma programação defensiva
        return [].concat(this._negociacoes)
    }
}