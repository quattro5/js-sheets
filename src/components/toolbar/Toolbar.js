import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar, colorPicker } from './toolbar.template'
import { defaultStyles } from '@/constants'
import { $ } from '@core/dom'

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar'

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options
		})
	}

	prepare() {
		this.initState(defaultStyles)
	}

	// eslint-disable-next-line getter-return
	get template() {
		return createToolbar(this.state) + colorPicker('color_pick', '#ffffff')
	}

	toHTML() {
		return this.template
	}

	storeChanged(changes) {
		if (!changes.currentStyles.textAlign) {
			changes.currentStyles.textAlign = 'left'
		}
		this.setState(changes.currentStyles)
	}

	onClick(event) {
		const $target = $(event.target)
		const buttonTypes = ['button', 'buttonColor']

		if (buttonTypes.includes($target.data.type)) {
			const value = JSON.parse($target.data.value)
			if ($target.data.type === 'buttonColor') {
				const key = Object.keys(value)[0]
				value[key] = document.querySelector('.color_pick').value
			}
			this.$emit('toolbar:applyStyle', value)
		}
	}
}
