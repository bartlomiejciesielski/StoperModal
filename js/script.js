const infoBtn = document.querySelector('.info')
const playBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const archivesBtn = document.querySelector('.archives')
const closeModalBtn = document.querySelector('.close')
const stopWatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')
const modalShadow = document.querySelector('.modal-shadow')

let countTime
let minutes = 0
let seconds = 0
let timesArr = []

// 1. Funkcja startująca timer handleStart:

const handleStart = () => {
	clearInterval(countTime) // dzięki tej metodzie eliminujemy błąd pomiaru czasu przy wielokrotnym nacisnięciu przycisku 'play'.

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopWatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopWatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopWatch.textContent = `${minutes}:00`
		}
	}, 100)
}

//2. Funkcja pauzujaca timer handlePause:

const handlePause = () => {
	clearInterval(countTime)
}

//3. Funkcja zatrzymująca odlicznie, zerująca zegar, wstawiająca czas w paragraf i zapisująca go w tablicy handleStop:

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopWatch.textContent}`

	if (stopWatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopWatch.textContent)
	}
	clearStuff()
}

//4. Funkcja zerująca wszystkie dane, zerująca tablicę i ukrywająca zegar z ostanim czasem handleReset:

const handleReset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}

const clearStuff = () => {
	clearInterval(countTime)
	stopWatch.textContent = '0:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}

//5. Funkcja pokazująca historię pomiarów.

const showArchives = () => {
	timeList.textContent = ''
	let num = 1

	timesArr.forEach(time => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`
		timeList.appendChild(newTime)
		num++
	})
}

//6. Funkcja wyświetlająca modal z opisem działania poszczególnych przycisków showModal

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}

    modalShadow.classList.toggle('modal-animation')
}

playBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
archivesBtn.addEventListener('click', showArchives)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal) //użycie przycisku zamknij powoduje ponowne wywołanie funkcji showModal która sprawdza jaki styl mamy nadany, jeśli jest to display block zamienia go na display none.
window.addEventListener('click', e => e.target === modalShadow ? showModal() : false) // uruchomiliśmy nasłuchiwanie na oknie przeglądarki, wybraliśmy zdarzenie i zapytaliśmy czy kliknięto na modalShadow, jeśli tak uruchamiamy funkcję showModal, jeśli nie podajemy wartość false- nie robimy nic.
