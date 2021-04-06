class Negociacao {
    // atributos da classe
    constructor(data, quantidade, valor) {
        // declarando parâmetros no constructor
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this)
    }

    // métodos da classe
    get volume() {
        return this._quantidade * this._valor
    }

    // métodos acessadores: GET. Acessam os atributos privados da classe
    get data() {
        return new Date(this._data.getTime())
    }

    get quantidade() {
        return this._quantidade
    }
    
    get valor() {
        return this._valor
    }
}