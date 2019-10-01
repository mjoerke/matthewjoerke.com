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


function toggleTitle() {
	title = document.querySelector('.title')
	toggle(title, 'stretched')
	setTimeout(()=>toggle(title, 'stretched'), 800)
}

function gridInit() {
	let grid = Macy({
		container: '#grid',
		trueOrder: true,
		margin: 20,
		waitForImages: false,
		columns: 2
	})
}

window.addEventListener("turbolinks:load", function() {
	console.log('turbolinks:load')
  	setTimeout(()=>toggleTitle(), 250)
  	setTimeout(()=>activate())

  	if (document.querySelector('#grid')) {
  		setTimeout(()=>gridInit()) 
  	}
})