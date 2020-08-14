import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { changeTitle } from '@/redux/actions'
import { $ } from '@core/dom'
import { debounce } from '../../core/utils'

export class Header extends ExcelStateComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['keyup'],
			...options
		})
	}

	prepare() {
		this.onKeyup = debounce(this.onKeyup, 300)
		document.title = `${this.title} - Google Таблицы`
	}

	toHTML() {
		return `
			<div>
				<img src="logo.png">
				<input type="text" class="input" value="${this.title}">
			</div>

			<div>
				<div class="button_advanced">
					<span class="material-icons">delete</span>Удалить
				</div>
				<div class="button_advanced">
					<span class="material-icons">exit_to_app</span>Выйти
				</div>
			</div>
		`
	}

	get title() {
		return this.store.getState().tableTitle || 'Новая таблица'
	}

	onKeyup(event) {
		const title = $(event.target).text()
		this.$dispatch(changeTitle(title))
		document.title = `${title} - Google Таблицы`
	}
}
