/* Dados eles estão dispostos um objeto com a seguinte estrutura:
"Codigo":{
    "name": "",
    "value": 0,
    "symbol": ""
}
*/
let currencies = fetch('Data/currencyData.json')
//const cryptoCurrencies = require('./Data/cryptoCurrencyData.json')

// Botão para converter moedas
const buttonElement = document.getElementById('convert');
// Select para escolher a moeda de origem
const selectFromElement = document.getElementById('from');
// Selecionar a moeda destino
const selectToElement = document.getElementById('to');
// Input do valor
const inputAmountElement = document.getElementById('amount');
// Div para mostrar o resultado da conversão
const fromResultDiv = document.getElementById('from-result');
// Div para mostrar o resultado da conversão
const toResultDiv = document.getElementById('to-result');


// Função para converter moedas
const convertValues = () => {
    let value = inputAmountElement.value // Valor a ser convertido
    value = parseInt(value.replace(/\D/g, "")) // Remover todos os dígitos não-dígitos
    const from = selectFromElement.value // Moeda de origem
    const to = selectToElement.value // Moeda de destino
    // converter o valor de uma moeda para outra
    let fromValue = currencies.find(currency => currency.code === from)
    // converter para dólares americanos, moeda base das conversões
    let fromDollar = value / fromValue.value
    // converter para a moeda de destino
    let toValue = currencies.find(currency => currency.code === to)
    // converter para a moeda de destino
    return fromDollar * toValue.value
}

// Mascara para o input de valor
const mascaraInputMoeda = (value) => {
    const from = selectFromElement.value // Moeda de origem
    const fromValue = currencies.find(currency => currency.code === from)
    return `${fromValue.symbol} ${value.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
    /*
    Explicação do retorno:
    1. ${fromValue.symbol} será substituído pelo símbolo da moeda que você escolher no menu dropdown
    2. ${value.replace(/\D/g, "")} removerá todos os dígitos não-dígitos do valor
    3. ${value.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} adicionará um ponto após cada 3 dígitos usando uma expressão regular
    */
}

// função botão de conversão
const converter = () => {
    const result = convertValues()
    
    // Encontrar as moedas de origem e destino
    const from = currencies.find(currency => currency.code === selectFromElement.value);
    const to = currencies.find(currency => currency.code === selectToElement.value);
    
    // Elementos da moeda de origem
    const imagemFrom = document.createElement('div')
    imagemFrom.style.backgroundImage = `url(https://countryflagsapi.com/png/${from.code.toLowerCase().slice(0, -1)})`
    imagemFrom.classList.add('currancy-icon')
    const fromName = document.createElement('p')
    fromName.innerText = from.name
    fromName.classList.add('currancy-name')
    const fromValue = document.createElement('p')
    fromValue.innerText = `${inputAmountElement.value}`
    fromValue.classList.add('currancy-value')

    // Elementos do resultado da moeda de origem
    const imagemTo = document.createElement('div')
    imagemTo.style.backgroundImage = `url(https://countryflagsapi.com/png/${to.code.toLowerCase().slice(0, -1)})`
    imagemTo.classList.add('currancy-icon')
    const toName = document.createElement('p')
    toName.innerText = to.name
    toName.classList.add('currancy-name')
    const toValue = document.createElement('p')
    toValue.innerText = `${to.symbol} ${result.toFixed(0).replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
    toValue.classList.add('currancy-value')

    // Limpar os elementos
    fromResultDiv.innerHTML = ''
    toResultDiv.innerHTML = ''

    // Adicionar os elementos nas divs
    fromResultDiv.appendChild(imagemFrom)
    fromResultDiv.appendChild(fromName)
    fromResultDiv.appendChild(fromValue)

    toResultDiv.appendChild(imagemTo)
    toResultDiv.appendChild(toName)
    toResultDiv.appendChild(toValue)
}

// Função inicial
const init = async () => {
    // carregar os dados das moedas
    currencies = await currencies
    currencies = await currencies.json()
    currencies = Object.keys(currencies).map(key => {
        // converter o objeto em um array
        return {
            code: key,
            name: currencies[key].name,
            value: currencies[key].value,
            symbol: currencies[key].symbol
        }
    }).sort((a, b) => {
        // Ordena os objetos de acordo com o valor
        if (a.value < b.value) {
            return -1
        }
        if (a.value > b.value) {
            return 1
        }
        return 0
    });

    // Inserir as opções no select
    currencies.forEach(currency => {
        const option = document.createElement('option')
        option.value = currency.code
        option.innerText = `${currency.symbol} ${currency.name}`
        option.setAttribute('tooltip', currency.code)
        // Adicionar as opções no select
        selectFromElement.appendChild(option)
        selectToElement.appendChild(option.cloneNode(true))
    });

    // Selecione BRL como moeda de origem
    selectFromElement.value = 'BRL'

    // Selecione USD como moeda de destino
    selectToElement.value = 'USD'

    // adicionar mascara ao input
    inputAmountElement.addEventListener('keyup', (event) => {
        event.target.value = mascaraInputMoeda(event.target.value)
    });

    // colocar 10000 como valor padrão
    inputAmountElement.value = 10000

    // atualizar mascara
    inputAmountElement.dispatchEvent(new Event('keyup'))

    // adicionar evento a alteração no selectFromElement
    selectFromElement.addEventListener('change', () => {
        // atualizar mascara
        inputAmountElement.dispatchEvent(new Event('keyup'))
    });

    // adicionar evento de clique ao botão
    buttonElement.addEventListener('click', converter);

    buttonElement.dispatchEvent(new Event('click')); // Disparar o evento de clique
}

// Inicialização
init()

