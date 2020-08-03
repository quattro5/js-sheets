import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options
		})
	}

	toHTML() {
		return `
			<div>
				<img src="logo.png">
				<input type="text" class="input" value="Новая таблица">
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
}
