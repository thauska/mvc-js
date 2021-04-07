class NegociacaoController {

    adiciona(event) {
        event.preventDefault()

        let $ = document.querySelector.bind(document)
        
        let inputData = $('#data')
        let inputQntd = $('#quantidade')
        let inputValor = $('#valor')

        console.log(inputData.value)
        console.log(inputQntd.value)
        console.log(inputValor.value)
    }
}