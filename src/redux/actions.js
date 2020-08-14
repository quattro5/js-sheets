import {
	TABLE_RESIZE,
	CHANGE_TEXT,
	CHANGE_TITLE,
	CHANGE_STYLES,
	APPLY_STYLE
} from './types'

export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data
	}
}

export function changeText(text) {
	return {
		type: CHANGE_TEXT,
		data: text
	}
}

export function changeTitle(title) {
	return {
		type: CHANGE_TITLE,
		data: title
	}
}

export function changeStyles(data) {
	return {
		type: CHANGE_STYLES,
		data
	}
}

export function applyStyle(data) {
	return {
		type: APPLY_STYLE,
		data
	}
}
