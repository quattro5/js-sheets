import { $ } from '@core/dom'
import { range } from '@core/utils'

export class TableSelection {
	static className = 'selected'

	constructor() {
		this.group = []
		this.current = null
	}

	select($el, isClear) {
		isClear ? this.clear() : null
		$el.focus().addClass(TableSelection.className)
		this.group.push($el)
		this.current = $el
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className))
		this.group = []
	}

	selectGroup($start, $end) {
		this.clear()

		const start = $start.id(true)
		const end = $end.id(true)

		const cols = range(start.col, end.col)
		const rows = range(start.row, end.row)

		const ids = cols.reduce((acc, col) => {
			rows.forEach(row => acc.push(`${row}:${col}`))
			return acc
		}, [])

		ids.forEach(id => {
			const $el = $(`[data-id="${id}"]`)
			$el.addClass(TableSelection.className)
			this.group.push($el)
		})
	}
}
