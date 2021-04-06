class Negociacao {
    // atributos da classe
    constructor(data, quantidade, valor) {
        // declarando parâmetros no constructor
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
    }

    // métodos da classe
    obtemVolume() {
        return this._quantidade * this._valor
    }

    // métodos acessadores: GET. Acessam os atributos privados da classe
    getData() {
        return this._data
    }

    getQuantidade() {
        return this._quantidade
    }
    
    getValor() {
        return this._valor
    }
}