import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import { defaultStyles } from '@/constants'
import * as actions from '@/redux/actions'
import { parse } from '@core/parse'

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
		return createTable(100, this.store.getState())
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell)

		this.$on('formula:input', text => {
			this.selection.current.attr('data-value', text)
			console.log(this.selection.current.data.value)
			this.selection.current.$el.textContent = parse(text)
			this.updateTextInStore(text)
		})

		this.$on('formula:done', () => {
			this.selection.current.focus()
		})

		this.$on('toolbar:applyStyle', value => {
			console.warn(value)
			this.selection.applyStyle(value)
			this.$dispatch(
				actions.applyStyle({
					value,
					ids: this.selection.selectedIds
				})
			)
		})
	}

	selectCell($cell, clear) {
		this.selection.select($cell, clear)
		this.$emit('table:select', $cell)
		const styles = $cell.getStyles(Object.keys(defaultStyles))
		this.$dispatch(actions.changeStyles(styles))
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(event, this)
			this.$dispatch(actions.tableResize(data))
		} catch (e) {
			console.warn('Resize error', e.message)
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event)
		} else if (isCell(event)) {
			const $target = $(event.target)

			if (event.shiftKey) {
				this.selection.selectGroup(this.selection.current, $target)
			} else if (event.ctrlKey) {
				this.selection.selectCtrl(event.target)
			} else {
				this.selectCell($target, true)
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

		if (keys.includes(key) && !event.shiftKey && !event.ctrlKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next, true)
		}
	}

	onInput(event) {
		// this.$emit('table:input', $(event.target))
		this.updateTextInStore($(event.target).text())
	}

	updateTextInStore(value) {
		this.$dispatch(
			actions.changeText({
				id: this.selection.current.id(),
				value
			})
		)
	}
}
