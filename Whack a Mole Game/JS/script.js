
let startGameBtn = document.querySelector(".container .start-game-btn");
let container = document.querySelector(".container");
let allItems =  document.querySelectorAll(".container .all-items .item");
let scoreText = document.querySelector(".container .score-box .score span");
let timerText = document.querySelector(".container .timer span");
let gameOverBox = document.querySelector(".container .game-over");
let gameOverScore = document.querySelector(".container .game-over-score");
let exitGameBtn = document.querySelector(".container .game-over .exit-game-btn");
let playAgainBtn = document.querySelector(".container .game-over .play-again-btn");

let score = 0;
let gobalStartGame,timer;

container.addEventListener("click", (e)=>{
    if(e.target.classList.contains("mole-clicked")){
        score++;
        scoreText.innerHTML = score;

        let hole = e.target.parentElement.parentElement;
        let whackText = document.createElement("span");
        whackText.innerHTML = "Whack!";
        whackText.classList.add("whack-text");
        hole.appendChild(whackText);
        setTimeout(()=>{
            whackText.remove();
        }, 500)
    }
})

let startGame = () =>{
    startTimer(30);
    gobalStartGame = setInterval(() =>{
        showMole();
    }, 1000);

    startGameBtn.style.display = "none";
    container.style.height = "440px"
}

let showMole = () =>{
    let randomIndex  = Math.floor(Math.random() * allItems.length);
    let moleAppeared = allItems[randomIndex].querySelector(".hole img");
    moleAppeared.classList.add("mole-appeared");
    hideMole(moleAppeared);
}

let hideMole = (moleItem) =>{
    setTimeout(() =>{
        moleItem.classList.remove("mole-appeared");
    }, 950);
}

let startTimer = (time) =>{
    timer = setInterval(()=>{
        if(time>0){
            time--;
            timerText.innerHTML = time;
        }
        if(time == 0){
            clearInterval(gobalStartGame);
            clearInterval(timer);
            gameOverBox.style.display = "block";
            gameOverScore.innerHTML = score;
        }
    } , 1000);
}

exitGameBtn.addEventListener("click", ()=>{
    score = 0;
    scoreText.innerHTML = "0";
    timerText.innerHTML = "30";
    gameOverBox.style.display = "none";
    startGameBtn.style.display = "block";
    container.style.height = "470px";
})

playAgainBtn.addEventListener("click", ()=>{
    score = 0;
    scoreText.innerHTML = "0";
    timerText.innerHTML = "30";
    gameOverBox.style.display = "none";
    startGameBtn.click();
})

startGameBtn.addEventListener("click", startGame);
