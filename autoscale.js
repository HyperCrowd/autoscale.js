const regsiteredElements = {}

const elements = {
	fullText: [
		'P',
		'H1',
		'H2',
		'H3',
		'H4',
		'H5',
		'H6',
		'H7',
		'H8',
		'BLOCKQUOTE',
		'Q',
		'LI',
		'PRE',
		'DT',
		'DL',
		'ADDRESS',
		'DETAILS',
		'SUMMARY'
	],
	text: [
		'SPAN',
		'LABEL',
		'A',
		'STRONG',
		'EM',
		'MARK',
		'SUB',
		'SUP',
		'CITE',
		'ABBR',
		'CODE'
	],
	containers: [
		'DIV',
		'HEADER',
		'FOOTER',
		'NAV',
		'SECTION',
		'ARTICLE',
		'ASIDE',
		'MAIN',
		'UL',
		'OL',
		'TABLE',
		'FORM',
		'IFRAME',
		'FIGURE',
		'FIGCAPTION',
		'CANVAS'
	],
	images: [
		'IMG'
	]
}

const selectors = {
	fullText: elements.fullText.join(','),
	text: elements.text.join(','),
	containers: elements.containers.join(','),
	images: elements.images.join(',')
}

selectors.content = selectors.fullText + ',' +
	selectors.text + ',' + 
	selectors.images + ',' + 
	'TABLE,UL,OL,FORM,IFRAME,CANVAS'

/**
 *
 */
function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

/**
 *
 */
function getDomDepth(element) {
  let depth = 0;
  let currentNode = element;

  while (currentNode.parentNode !== null && currentNode.parentNode !== document) {
    depth++;
    currentNode = currentNode.parentNode;
  }

  return depth;
}

/**
 *
 */
function getTextWidth(element) {
    const clone = element.cloneNode(true); // Clone the element
    clone.style.visibility = 'hidden'; // Make it invisible
    clone.style.position = 'absolute'; // Position it off-screen
    clone.style.width = 'auto'; // Allow natural width

    document.body.appendChild(clone); // Append to the body
    const width = clone.getBoundingClientRect().width; // Get its width
    document.body.removeChild(clone); // Remove the cloned element
    return width;
}

/**
 *
 */
function scaleImage (element, scaleFactor) {
	const ratio = 1
	const width = element.width
	const size = ratio * width * scaleFactor
	element.width = size
	element.style.width = ''
	return size
}

/**
 *
 */
function scaleContainer (element, scaleFactor) {
	const ratio = 1
	const width = element.offsetWidth
	const size = ratio * width * scaleFactor
	element.style.width = size + 'px'
	return size
}

/**
 *
 */
function scaleText (element, scaleFactor, textElement, referenceWidth) {
	const ratio = referenceWidth / element.offsetWidth
	const width = parseFloat(window.getComputedStyle(element).fontSize)
	const size = ratio * width * scaleFactor
	textElement.style.fontSize = size + 'px'
	return size
}

/**
 *
 */
function scaleFullWidthText (element, scaleFactor, textElement, referenceWidth) {
	const ratio = referenceWidth / getTextWidth(element)
	const width = parseFloat(window.getComputedStyle(element).fontSize)
	const size = ratio * width * scaleFactor
	textElement.style.fontSize = size + 'px'
	textElement.style.width = ((referenceWidth / element.offsetWidth) * element.offsetWidth) + 'px'
	return size
}

/**
 *
 */
function scale (element, useReference = false, scaleFactorOverride = false) {
	const scaleFactor = scaleFactorOverride === false
		? parseFloat(element.getAttribute('scale'), 10) || 1
		: scaleFactorOverride

	const referenceElement = useReference === false
		? document.getElementById(element.getAttribute('autoscale')) || element.parentNode
		: useReference

	const referenceStyles = window.getComputedStyle(referenceElement);
	const paddingLeft = parseFloat(referenceStyles.paddingLeft);
	const paddingRight = parseFloat(referenceStyles.paddingRight);
	const borderLeft = parseFloat(referenceStyles.borderLeft);
	const borderRight = parseFloat(referenceStyles.borderRight);

	const referenceWidth = referenceElement.offsetWidth - paddingLeft - paddingRight - borderLeft - borderRight

	// Most HTML elements can be categorized as text, full text, image, or containers
	// And each category has to address their own scaling rules

	let result

	if (elements.fullText.indexOf(element.tagName) > -1) {
		// Full text scaling
		result = scaleFullWidthText(element, scaleFactor, element, referenceWidth)
	} else if (elements.text.indexOf(element.tagName) > -1) {
		// Text scaling
		result = scaleText(element, scaleFactor, element, referenceWidth)
	} else if (elements.containers.indexOf(element.tagName) > -1) {
		// Container scaling
		result = scaleContainer(element, scaleFactor, element, referenceWidth)

		const shouldScaleContents = useReference === false && element.getAttribute('scaleContents') === ''

		if (shouldScaleContents) {
			// The children content should be scaled as well
			const children = element.querySelectorAll(selectors.content)

			if (children.length === 0) {
				// No children exists, this is just a text leaf, so scale only the text
				result = scaleText(element, 1, element, element.offsetWidth)
			} else {
				// Scale the children
				children.forEach(child => {
					scale(child, element, scaleFactor)
				})
			}
		}
	} else if (elements.images.indexOf(element.tagName) > -1) {
		// Image scaling
		if (element.complete) {
			// The imageis loaded, just scale it
			result = scaleImage(element, scaleFactor, element, referenceWidth)
		} else {
			// The image hasn't been loaded it, scale it after the dimensions are known
			element.addEventListener('load', () => {
				result = scaleImage(element, scaleFactor, element, referenceWidth)
			});
		}
	}
}

function register (element, width) {
	if (regsiteredElements[element] === undefined) {
		regsiteredElements[element] = {
			lastWidth: width,
			lastDepth: getDomDepth(element)
		}
	}
}

function resizeHandler (elements) {
}

/**
 *
 */
async function main () {
	const autoscaleElements = document.querySelectorAll('[autoscale]');
	autoscaleElements.forEach(element => scale(element))
}

ready(main)
