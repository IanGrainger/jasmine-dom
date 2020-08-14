import { checkHtmlElement, getTag } from './utils';
import { printSuccess, printSecSuccess, printError, printSecError } from './printers';

export function toBeInTheDocument() {
	return {
		compare: function (htmlElement) {
			if (htmlElement !== null) {
				checkHtmlElement(htmlElement);
			}
			let result = {};
			result.pass = htmlElement === null ? false : htmlElement.ownerDocument.contains(htmlElement);
			result.message = `${
				result.pass
					? `${printSuccess('PASSED')} ${printSecSuccess(
							`Expected the ${printSuccess(getTag(htmlElement))} element to be in the document and it ${printSuccess(
								'is in the document'
							)}.`
					  )}`
					: `${printError('FAILED')} ${printSecError(
							`The ${printError(getTag(htmlElement))} element provided ${printError(
								'could not be found in the document'
							)}.`
					  )}`
			}`;
			return result;
		},
		negativeCompare: function (htmlElement) {
			if (htmlElement !== null) {
				checkHtmlElement(htmlElement);
			}
			let result = {};
			result.pass = htmlElement === null ? true : !htmlElement.ownerDocument.contains(htmlElement);
			result.message = `${
				result.pass
					? `${printSuccess('PASSED')} ${printSecSuccess(
							`Expected the document not to contain the provided ${printSuccess(
								htmlElement !== null ? getTag(htmlElement) : null
							)} element.`
					  )}`
					: `${printError('FAILED')} ${printSecError(
							`Expected the document not to contain the provided ${printError(getTag(htmlElement))} element.`
					  )}`
			}`;
			return result;
		},
	};
}
