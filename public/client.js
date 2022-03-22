const socket = io()
  
const messages = document.getElementById('number')
const button = document.getElementById('form')
const getNumber = () => Math.floor(Math.random() * 12)
const color = "#000"
const cards = document.querySelectorAll(".card")

cards.forEach((card, idx, array) => {
  card.addEventListener("click", ({ target }) => {
    target.style.backgroundColor = color
    socket.emit('config', {
      backgroundColor: color,
      idx
    })
  })
})

button.addEventListener('click', e => {
  const number =  getNumber()
  e.preventDefault()
    socket.emit('message', number)
})

socket.on('message', msg => {
  messages.textContent = msg
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on('config', ({ backgroundColor, idx }) => {
  cards[idx].style.backgroundColor = backgroundColor
})
