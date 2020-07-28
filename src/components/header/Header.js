import { ExcelComponent } from '../../core/ExcelComponent'

export class Header extends ExcelComponent {
	static className = 'excel__header'

	toHTML() {
		return `
			<input type="text" class="input" value="Новая таблица">

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
