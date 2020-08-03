const CODES = {
	A: 65,
	Z: 90
}

/* function toCell(row, col) {
	return `
		<div class="cell" contenteditable data-col="${col}" data-row="${row}"></div>
	`
} */

function toCell(row) {
	// eslint-disable-next-line space-before-function-paren
	return function (_, col) {
		return `
			<div 
				class="cell" 
				contenteditable 
				data-col="${col}" 
				data-id="${row}:${col}"
			></div>
		`
	}
}

function toColumn(char, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${char}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(content, info = '') {
	const resize = info ? `<div class="row-resize" data-resize="row"></div>` : ''

	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
				${info}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')
	rows.push(createRow(cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			// .map((_, col) => toCell(row, col)) старая функция
			// .map((_, col) => toCell(row)(_, col)) новая функция развернуто
			.map(toCell(row)) // новая функция
			.join('')
		rows.push(createRow(cells, row + 1))
	}

	return rows.join('')
}
