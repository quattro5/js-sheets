import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	toHTML() {
		return createTable(100)
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell)

		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})

		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell, true)
		this.$emit('table:select', $cell)
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(event, this)
		} else if (isCell(event)) {
			const $target = $(event.target)

			if (event.shiftKey) {
				this.selection.selectGroup(this.selection.current, $target)
			} else {
				event.ctrlKey
					? this.selection.select($target, false)
					: this.selection.select($target, true)
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown'
		]

		const { key } = event

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}
