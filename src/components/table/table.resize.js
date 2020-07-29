import { $ } from '@core/dom'

export function resizeHandler(event, context) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const type = $resizer.data.resize
	$resizer.$el.classList.add('active')
	let delta = null
	let value = null

	document.onmousemove = e => {
		if (type === 'col') {
			delta = e.pageX - coords.right
			value = coords.width + delta > 0 ? coords.width + delta : 1
			$resizer.css({
				left: value + 'px'
			})
		} else {
			const delta = e.pageY - coords.bottom
			const value = coords.height + delta
			$parent.css({
				height: value + 'px'
			})
		}
	}
	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null
		$resizer.$el.classList.remove('active')
		if (type === 'col') {
			$resizer.$el.style.left = 'auto'
			// eslint-disable-next-line no-invalid-this
			context.$root
				.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => (el.style.width = value + 'px'))
		}
	}
}
