
let backbtn= document.querySelector(".container .scientific-btns .back-btn")
let sciBtnBox= document.querySelector(".container .scientific-btns")
let lightModeBtn= document.querySelector(".container .input-box .toggle-btn #light-mode-btn")
let darkModeBtn= document.querySelector(".container .input-box .toggle-btn #dark-mode-btn")
let container= document.querySelector(".container")
let input= document.querySelector(".container .input-box input")
let result= document.querySelector(".container .input-box .result")
let allBtns= document.querySelectorAll(".container .btn")

for(let i of allBtns){
    i.addEventListener("click", (e)=>{
        let btnText= e.target.innerHTML;
        if(btnText=="x"){
            btnText='*';
        }
        input.value += btnText;
    })
}

let calculate = () => {
    try {
        if (isValidExpression(input.value)) {
            result.innerHTML = eval(input.value);
        } else {
            result.innerHTML = "error";
        }
    } catch (error) {
        result.innerHTML = "error";
    }
};

let backspace = () => {
    input.value = input.value.substr(0, input.value.length - 1);
    try {
        if (isValidExpression(input.value)) {
            result.innerHTML = input.value ? eval(input.value) : "0";
        } else if (!input.value) {
            result.innerHTML = "0";
        } else {
            result.innerHTML = "error";
        }
    } catch (error) {
        result.innerHTML = "error";
    }
};

let sin = () => {
    if (isValidNumber(result.innerHTML)) {
        result.innerHTML = formatNumber(Math.sin(toRadians(parseFloat(result.innerHTML))));
    } else {
        result.innerHTML = "error";
    }
};

let cos = () => {
    if (isValidNumber(result.innerHTML)) {
        result.innerHTML = formatNumber(Math.cos(toRadians(parseFloat(result.innerHTML))));
    } else {
        result.innerHTML = "error";
    }
};

let tan = () => {
    if (isValidNumber(result.innerHTML)) {
        result.innerHTML = formatNumber(Math.tan(toRadians(parseFloat(result.innerHTML))));
    } else {
        result.innerHTML = "error";
    }
};

let fact = () => {
    if (isValidNumber(result.innerHTML)) {
        let number = parseInt(result.innerHTML);
        if (number < 0 || !Number.isInteger(number)) {
            result.innerHTML = "error";
            return;
        }
        let x = 1;
        for (let i = 1; i <= number; i++) {
            x *= i;
        }
        result.innerHTML = formatNumber(x);
    } else {
        result.innerHTML = "error";
    }
};

let pi = () => {
    input.value = "3.14";
    result.innerHTML = formatNumber(3.14);
};

let log = () => {
    if (isValidNumber(result.innerHTML)) {
        let number = parseFloat(result.innerHTML);
        if (number <= 0) {
            result.innerHTML = "error";
            return;
        }
        result.innerHTML = formatNumber(Math.log(number));
    } else {
        result.innerHTML = "error";
    }
};

let root = () => {
    if (isValidNumber(result.innerHTML)) {
        let number = parseFloat(result.innerHTML);
        if (number < 0) {
            result.innerHTML = "error"; 
            return;
        }
        result.innerHTML = formatNumber(Math.sqrt(number));
    } else {
        result.innerHTML = "error";
    }
};

let e = () => {
    input.value = "2.71828";
    result.innerHTML = formatNumber(2.71828);
};

let pow = () => {
    if (isValidNumber(result.innerHTML)) {
        let number = parseFloat(result.innerHTML);
        result.innerHTML = formatNumber(Math.pow(number, 2));
    } else {
        result.innerHTML = "error";
    }
};

let isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== "" && value !== "error";
};

let toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
};

let formatNumber = (number) => {
    return parseFloat(number.toFixed(10));
};

let isValidExpression = (expression) => {
    return /^[\d\+\-\*\/\.\(\)\s]*$/.test(expression) &&
           !/[\+\-\*\/]{2,}/.test(expression) && 
           !/[\+\-\*\/\.]$/.test(expression) &&  
           (expression.match(/\(/g)?.length === expression.match(/\)/g)?.length);
};

backbtn.addEventListener("click", ()=>{
    sciBtnBox.classList.toggle("active");
})

lightModeBtn.addEventListener("click", ()=>{
    container.classList.add("light");
    lightModeBtn.style.display= "none";
    darkModeBtn.style.display="block";
})

darkModeBtn.addEventListener("click", ()=>{
    container.classList.remove("light");
    darkModeBtn.style.display= "none";
    lightModeBtn.style.display="block";
})

let clearInput =()=>{
    input.value='';
    result.innerHTML= 0;
}

