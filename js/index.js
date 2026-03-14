/* STRETCH ANIMATION  */

var isTouchDevice = 'ontouchstart' in window
var stretchables = document.getElementsByClassName('stretchable')

for (var i = 0; i < stretchables.length; i++) {
	if (isTouchDevice) {
		stretchables[i].addEventListener('click', function () {
			var el = this
			el.classList.add('stretched')
			setTimeout(function () { el.classList.remove('stretched') }, 1000)
		})
	} else {
		stretchables[i].addEventListener('mouseenter', function () {
			this.classList.add('stretched')
		})
		stretchables[i].addEventListener('mouseleave', function () {
			this.classList.remove('stretched')
		})
	}
}

// title stretch on page load
var title = document.querySelector('.title')
setTimeout(function () {
	title.classList.add('stretched')
	setTimeout(function () { title.classList.remove('stretched') }, 800)
}, 250)

/* LINK GLOW */

var glows = []
var glowTarget = null
var glowFrame = null

function updateGlow() {
	if (!glowTarget) return
	var rects = glowTarget.getClientRects()

	while (glows.length < rects.length) {
		var el = document.createElement('div')
		el.className = 'link-glow'
		document.body.appendChild(el)
		glows.push(el)
	}
	while (glows.length > rects.length) {
		glows.pop().remove()
	}

	// position each glow at its line's underline
	var padL = parseFloat(getComputedStyle(glowTarget).paddingLeft) || 0
	var padR = parseFloat(getComputedStyle(glowTarget).paddingRight) || 0
	for (var i = 0; i < rects.length; i++) {
		glows[i].style.left = (rects[i].left + window.scrollX + padL) + 'px'
		glows[i].style.width = (rects[i].width - padL - padR) + 'px'
		glows[i].style.top = (rects[i].bottom + window.scrollY) + 'px'
	}

	glowFrame = requestAnimationFrame(updateGlow)
}

function startGlow(link) {
	glowTarget = link
	updateGlow()
}

function stopGlow() {
	glowTarget = null
	cancelAnimationFrame(glowFrame)
	for (var i = 0; i < glows.length; i++) {
		glows[i].remove()
	}
	glows = []
}

// clean up stale glows on back-navigation
window.addEventListener('pageshow', stopGlow)
document.addEventListener('visibilitychange', stopGlow)

// attach to all interactive links
var links = document.querySelectorAll('.bodyLink, .navLink')
for (var i = 0; i < links.length; i++) {
	links[i].addEventListener('mouseenter', function () { startGlow(this) })
	links[i].addEventListener('mouseleave', stopGlow)
}