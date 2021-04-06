class Negociacao {
    // atributos da classe
    constructor(data, quantidade, valor) {
        // declarando parâmetros no constructor
        this.data = data
        this.quantidade = quantidade
        this.valor = valor
    }

    // métodos da classe
    obtemVolume() {
        return this.quantidade * this.valor
    }
}