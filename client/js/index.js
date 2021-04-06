let campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
]

console.log(campos)


document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault() // evita carregamento da página
    let tbody = document.querySelector('table tbody')

    let tr = document.createElement('tr')

    campos.forEach(campo => {
        let td = document.createElement('td')
        td.textContent = campo.value
        tr.appendChild(td)
    })

    let tdVol = document.createElement('td')
    tdVol.textContent = campos[1].value * campos[2].value

    tr.appendChild(tdVol)

    tbody.appendChild(tr)

    campos[0].value = ''
    campos[1].value = 1
    campos[2].value = 0

    campos[0].focus()
})