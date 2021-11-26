const board = document.querySelector('#board')
const board1 = document.querySelector('#board1')
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const restartBtn = document.querySelector('#restart-btn')

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    changeScreen(0)
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        changeScreen(1)
        startGame()
    }
})

function changeScreen(value) {
    screens[value].classList.add('up')
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (time < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    setTimeout(() => {
        changeScreen(2)
    }, 2000);
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score <span>${score}</span></h1>`
}


function createRandomCircle() {
    const circle = document.createElement('div')
    const { width, height } = board.getBoundingClientRect()

    const size = getRandomNumber(10, 60)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

restartBtn.addEventListener('click', (event) => {
    document.location.reload()
})
