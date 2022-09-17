const button = document.getElementById ('convert') 
const select = document.getElementById ('currency-select')
const dolar = 5.29
const euro = 5.26
const bitcoin = 105.543


const convertValues= () => {
    const inputReal = document.getElementById ('input-real').value
    console.log(inputReal/dolar)
    
    const realValueText = document.getElementById ('real-value-text')
    const currencyValueText = document.getElementById ('currency-value-text')
    
   
  
   
   
  realValueText.innerHTML= new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }
  ).format(inputReal);
    

      
   if( select.value === "US$ Dólar Americano"){ currencyValueText.innerHTML= new Intl.NumberFormat('en-US',
   { style: 'currency', currency: 'USD' }
 ).format(inputReal/dolar);

  }
   if (select.value === '€ Euro'){ currencyValueText.innerHTML= new Intl.NumberFormat('de-DE',
   { style: 'currency', currency: 'EUR' }
 ).format(inputReal/euro);

   }

   if (select.value ==='₿ Bitcoin') {
    currencyValueText.innerHTML= new Intl.NumberFormat('de-DE',
    { style: 'currency', currency: 'BTC' }
  ).format(inputReal/bitcoin);
   }




  }



   

  

  

    changeCurrency = () => {
      const currencyName = document.getElementById ('currencyName')
      const currencyImg = document.getElementById ('currencyImg')

      
      if (select.value === '€ Euro'){
        currencyName.innerHTML = 'Euro'
        currencyImg.src= "./img/Design sem nome 1 (1).png"
}

     if( select.value === 'US$ Dólar Americano'){
      currencyName.innerHTML = 'Dólar americano'
      currencyImg.src = "./img/estados-unidos (1) 1.png"
     }
      
     if( select.value === '₿ Bitcoin'){
      currencyName.innerHTML = 'Bitcoin'
      currencyImg.src = "img/bitcoin.jpg"


    }
 
    convertValues()
 
  }


button.addEventListener('click',convertValues)
select.addEventListener('change',changeCurrency)

