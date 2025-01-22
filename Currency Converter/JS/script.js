
let fromOptionsBox = document.querySelector(".container .from-country-options");
let toOptionsBox = document.querySelector(".container .to-country-options");
let fromInputBox = document.querySelector(".container .from-input");
let toInputBox = document.querySelector(".container .to-input");
let fromInputFlag = document.querySelector(".container .from-flag img");
let toInputFlag = document.querySelector(".container .to-flag img");
let fromInput = document.querySelector(".container .from-input input");
let toInput = document.querySelector(".container .to-input input");
let convertBtn = document.querySelector(".container .converter-btn");
let amount = document.querySelector(".container .amount input");
let resultBox = document.querySelector(".container .result-box");
let result = document.querySelector(".container .result-box .result");
let switchBtn = document.querySelector(".container .switch-btn");

let curFromValue, curToValue, curFromFlagSrc, curToFlagSrc;

let getSymbols = () =>{
    let fromLi= "";
    let toLi= "";
    for(currency_code in country_list){
        fromLi += `<li onclick="getFromValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="Flag">${currency_code}</li>`
        toLi += `<li onclick="getToValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="Flag">${currency_code}</li>`
    }
    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;
}

fromInputBox.addEventListener("click", ()=>{
    fromOptionsBox.classList.toggle("active");
    toOptionsBox.classList.remove("active");
})

toInputBox.addEventListener("click", ()=>{
    toOptionsBox.classList.toggle("active");
    fromOptionsBox.classList.remove("active");
})

let getFromValue = (country) =>{
    fromInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`;
    fromInput.value = country;
    fromOptionsBox.classList.remove("active");
}

let getToValue = (country) =>{
    toInputFlag.src = `https://flagsapi.com/${country_list[country]}/flat/64.png`;
    toInput.value = country;
    toOptionsBox.classList.remove("active");
}

let getExchangeRate = () =>{
    result.innerHTML = "Getting Exchange Rate..."
    result.style.fontSize = "13px";
    result.style.fontWeight = "500"
    let url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromInput.value}`;
    fetch(url).then((res) => res.json()).then((data) =>{
        let exchangeRate = data.conversion_rates[toInput.value];
        let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
        result.innerHTML = `${amount.value} ${fromInput.value} = ${totalExchangeRate} ${toInput.value}`;
        result.style.fontSize = "15px";
        result.style.fontWeight = "600"
    })
    resultBox.style.display = "Block";
}

switchBtn.addEventListener("click", ()=>{
    curFromValue = fromInput.value;
    curToValue = toInput.value;

    curFromFlagSrc = fromInputFlag.src;
    curToFlagSrc = toInputFlag.src;

    fromInput.value = curToValue;
    toInput.value = curFromValue;

    fromInputFlag.src = curToFlagSrc;
    toInputFlag.src = curFromFlagSrc;

    getExchangeRate();
})

convertBtn.addEventListener("click", ()=>{
    if(amount.value!=""){
        getExchangeRate();
    }
})

getSymbols();
