const screens = document.querySelectorAll('.screen')
const startBtn = document.getElementById('start-btn')
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

let seconds = 0
let score = 0
let selectedInsect = {}

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

chooseInsectBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    // const src = img.getAttribute('src')
    // const alt = img.getAttribute('alt')
    const [src, alt] = img
      .getAttributeNames()
      .map(attribute => img.getAttribute(attribute))

    selectedInsect = { src, alt }
    screens[1].classList.add('up')
    setTimeout(createInsect, 1000)
    startGame()
  })
})

function startGame() {
  setInterval(increaseTime, 1000)
}

function increaseTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = String(m).padStart(2, '0')
  s = String(s).padStart(2, '0')
  
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function createInsect() {
  const insect = document.createElement('div')
  insect.classList.add('insect')

  // RANDOM LOCATION
  const { x, y } = getRandomLocation()
  insect.style.top = `${x}px`
  insect.style.left = `${y}px`

  const { src, alt } = selectedInsect
  insect.innerHTML = `
    <img 
      src="${src}"
      alt="${alt}"
      style="transform: rotate(${Math.random() * 360}deg)" 
    />
  `
  insect.addEventListener('click', catchInsect)

  gameContainer.appendChild(insect)
}

function getRandomLocation() {
  const { innerHeight, innerWidth } = window
  const x = Math.random() * (innerWidth - 200) + 100
  const y = Math.random() * (innerHeight - 200) + 100
  return { x, y }
}

function catchInsect() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000);
  addInsects()
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++
  if (score > 19) {
    messageEl.classList.add('visible')
  }

  scoreEl.innerHTML = `Score: ${String(score).padStart(4, '0')}`
}