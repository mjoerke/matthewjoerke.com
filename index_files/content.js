if (typeof Turbolinks == 'undefined') {
    activate()
}

function toggle(el, cls) {
	if (!el.classList.contains(cls)) {
		el.classList.add(cls)
	} else {
		el.classList.remove(cls)
	}
}

function activate() {
	stretchables = document.getElementsByClassName("stretchable")

	for (i=0; i < stretchables.length; i++) {
		el = stretchables[i]

		el.addEventListener("mouseenter", function(el) {
			toggle(this, 'stretched')
		});

		el.addEventListener("mouseleave", function(el) {
			toggle(this, 'stretched')
		});
	}
}