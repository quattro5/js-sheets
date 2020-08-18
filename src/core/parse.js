const FormulaParser = require('hot-formula-parser').Parser
const parser = new FormulaParser()

export function parse(value = '') {
	if (value.startsWith('=')) {
		try {
			return parser.parse(value.slice(1)).result
		} catch (e) {
			return value
		}
	}
	return value
}
