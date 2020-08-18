export function createToolbar(state) {
	const buttons = [
		{
			icon: 'format_align_left',
			active: state['textAlign'] === 'left',
			value: { textAlign: 'left' }
		},
		{
			icon: 'format_align_center',
			active: state['textAlign'] === 'center',
			value: { textAlign: 'center' }
		},
		{
			icon: 'format_align_right',
			active: state['textAlign'] === 'right',
			value: { textAlign: 'right' }
		},
		{
			icon: 'format_bold',
			active: state['fontWeight'] === 'bold',
			value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' }
		},
		{
			icon: 'format_italic',
			active: state['fontStyle'] === 'italic',
			value: {
				fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'
			}
		},
		{
			icon: 'format_underlined',
			active: state['textDecoration'] === 'underline',
			value: {
				textDecoration:
					state['textDecoration'] === 'underline' ? 'none' : 'underline'
			}
		},
		{
			icon: 'format_color_text',
			active: false,
			value: {
				color: ''
			}
		},
		{
			icon: 'format_color_fill',
			active: false,
			value: {
				background: ''
			}
		}
	]

	return buttons.map(buttonToHTML).join('')
}

function buttonToHTML(button) {
	const meta = `
		data-type="${button.icon.includes('color') ? 'buttonColor' : 'button'}"
		data-value='${JSON.stringify(button.value)}'
	`
	return `
		<div class="button ${button.active ? 'active' : ''}" ${meta}>
			<span class="material-icons" ${meta}>${button.icon}</span>
		</div>
	`
}

export function colorPicker(id, color = '#fff') {
	return `
		<input type="color" class="${id}" list="${id}" value="${color}">

		<datalist id="${id}">
			<option value="#DC143C">
			<option value="#464565">
			<option value="#FF69B4">
			<option value="#FF8C00">
			<option value="#8B008B">
			<option value="#808080">
			<option value="#000000">
			<option value="#FFFFFF">
			<option value="#0000CD">
			<option value="#32CD32">
		</datalist>
	`
}
