const cells = document.querySelectorAll('.cell');
const onePlayerBtn = document.querySelector('#one-player');
const twoPlayersBtn = document.querySelector('#two-players');
const restartBtn = document.querySelector('#restart');
let currentPlayer = 'x';
let gameEnd = false;
let onePlayerMode = false;

function handleClick(event) {
	if (!gameEnd && !event.target.classList.contains('x') && !event.target.classList.contains('o')) {
		event.target.classList.add(currentPlayer);
		event.target.textContent = currentPlayer;
		if (checkWin()) {
			if (onePlayerMode && currentPlayer === 'x') {
				alert('Wygrales z Komputerem!');
			} else {
				alert(`${currentPlayer.toUpperCase()} Wygrywa`);
			}
			gameEnd = true;
		} else if (checkTie()) {
			alert('Remis');
			gameEnd = true;
		} else {
			currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
			if (onePlayerMode && currentPlayer === 'o') {
				computerPlay();
			}
		}
	}
}

function computerPlay() {
	const emptyCells = [...cells].filter(cell => {
		return !cell.classList.contains('x') && !cell.classList.contains('o');
	});
	if (emptyCells.length > 0) {
		const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		randomCell.classList.add('o');
		randomCell.textContent = 'o';
		currentPlayer = 'x';
		if (checkWin()) {
			alert('Komputer wygral!');
			gameEnd = true;
		} else if (checkTie()) {
			alert('Remis!');
			gameEnd = true;
		}
	}
}

function checkWin() {
	const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	return winCombos.some(combo => {
		return combo.every(index => {
			return cells[index].classList.contains(currentPlayer);
		});
	});
}

function checkTie() {
	return [...cells].every(cell => {
		return cell.classList.contains('x') || cell.classList.contains('o');
	});
}

function init() {
	cells.forEach(cell => {
		cell.addEventListener('click', handleClick);
	});
	onePlayerBtn.addEventListener('click', () => {
		onePlayerMode = true;
	});
	twoPlayersBtn.addEventListener('click', () => {
		onePlayerMode = false;
	});
	restartBtn.addEventListener('click', () => {
		cells.forEach(cell => {
			cell.classList.remove('x', 'o');
			cell.textContent = '';
		});
		currentPlayer = 'x';
		gameEnd = false;
	});
}

init();
