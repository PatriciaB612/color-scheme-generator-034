//Color and scheme type selection

const selectEl = document.querySelector('.select')
const caretEl = document.querySelector('.caret')
const menuEl = document.querySelector('.menu')
const options = document.querySelectorAll('.menu li')
const selectedEl = document.querySelector('.selected')

selectEl.addEventListener('click', () => {
  caretEl.classList.toggle('caret-rotate')
  menuEl.classList.toggle('menu-open')
})

options.forEach((option) => {
  option.addEventListener('click', () => {
    selectedEl.innerText = option.innerText
    menuEl.classList.remove('menu-open')
    caretEl.classList.remove('caret-rotate')
    options.forEach((option) => {
      option.classList.remove('active')
      option.children.item(0).classList.remove('checked')
    })
    option.classList.add('active')
    option.children.item(0).classList.add('checked')
  })
})

// Color scheme generator from Color API

const colorPicked = document.getElementById('color-picker')
const getColorSchemeBtn = document.querySelector('.color-scheme-btn')
let colorsArray = []
const colorBlocks = document.querySelectorAll('.color')
const hexNumbers = document.querySelectorAll('.hex-number')

getColorSchemeBtn.addEventListener('click', () => {
  const hexNumber = colorPicked.value.replace('#', '')
  const selectedScheme = selectEl.innerText.toLowerCase()
  const baseUrl = 'https://www.thecolorapi.com/'
  let finalUrl = `${baseUrl}scheme?hex=${hexNumber}&mode=${selectedScheme}&count=5`

  fetch(finalUrl)
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors
      displayColorScheme()
    })
})

function displayColorScheme() {
  for (let i = 0; i < 5; i++) {
    colorBlocks[i].style.backgroundColor = colorsArray[i].hex.value
    hexNumbers[i].innerHTML = `<p>${colorsArray[i].hex.value}</p>`
  }
}
