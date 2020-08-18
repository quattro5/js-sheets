import { toInlineStyles } from '@core/utils'
import { parse } from '@core/parse'

const CODES = {
	A: 65,
	Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
	return state[index] || DEFAULT_HEIGHT
}

function toCell(row, state) {
	// eslint-disable-next-line space-before-function-paren
	return function ({ index: col, width }) {
		const id = `${row}:${col}`
		const value = state.dataState[id] || ''
		const styles = toInlineStyles(state.stylesState[id])
		return `
			<div
				class="cell"
				contenteditable
				data-col="${col}"
				data-id="${id}"
				data-value="${value}"
				style="${styles}; width: ${width}"
			>
				${parse(value)}
			</div>
		`
	}
}

function toColumn({ col, index, width }) {
	return `
		<div 
			class="column" 
			data-type="resizable" 
			data-col="${index}" 
			style="width: ${width}"
		>
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(content, index = '', heightValue) {
	const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
	const height = index ? heightValue + 'px' : ''

	return `
		<div 
			class="row" 
			data-row="${index - 1}" 
			data-type="resizable" 
			style="height: ${height}"
		>
			<div class="row-info">
				${index}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
	// eslint-disable-next-line space-before-function-paren
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(toColumn)
		.join('')
	rows.push(createRow(cols))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(withWidthFrom(state))
			// .map((_, col) => toCell(row)(_, col)) // развернуто
			.map(toCell(row, state))
			.join('')
		const height = getHeight(state.rowState, row)
		rows.push(createRow(cells, row + 1, height))
	}

	return rows.join('')
}
