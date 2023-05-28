const screens = document.querySelectorAll('.screen')
const play_btn = document.getElementById('play-btn')
const choose_insects = document.querySelectorAll('.choose-insect')
const game_container = document.getElementById('game-container')
const timeElement = document.getElementById('time')
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
const continue_gameElement = document.getElementById('continue-game')
const yes_select_btn = document.getElementById('yes')
const no_select_btn = document.getElementById('no')
const continue_btn = document.getElementById('continue')
// const originalMessage = messageElement.innerHTML

let seconds = 0
let score = 0
let selected_insect = {}
let messageShow = [9,]

play_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insects.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        console.log(src)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeElement.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg) "/>`

    insect.addEventListener('click', catchInsect)
    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    this.classList.add('caught')
    increaseScore()
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function increaseScore() {
    let x = 10
    console.log(x)
    score += 1
    if (score == x) {
        messageElement.classList.add('visible')

        yes_select_btn.addEventListener('click', yes)
        no_select_btn.addEventListener('click', no)
    }
    scoreElement.innerHTML = `Score: ${score}`
    x = x + 10
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function yes() {
    messageElement.classList.remove('visible')
    continue_gameElement.classList.add('visible')
    continue_btn.addEventListener('click', continue_game)
}

function no() {
    messageElement.classList.remove('visible')

    continue_gameElement.innerHTML = `<p>Congratulations, you earned <span>${score}</span> points!</p><button class="btn-select" id="continue">Continue Forever?</button>`
    continue_gameElement.classList.add('visible')

    const continue_btn = document.getElementById('continue')

    continue_btn.addEventListener('click', continue_game)
}

function continue_game() {
    setTimeout(continue_gameElement.classList.remove('visible'), 2000)
}
