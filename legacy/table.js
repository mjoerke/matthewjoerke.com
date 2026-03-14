var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var render = false;

// make sure Google fonts are loaded before rendering
WebFont.load({
    google: {
      families: ['IBM+Plex+Mono:300,300i,400,400i,700,700i'],
    },
    active: draw
});


if (window.innerWidth > 1000) {
	canvas.width = 940;
	canvas.height = 550
	render = true;
} else {
	canvas.width = 500;
	canvas.height = 200;
}

paper.setup(canvas);
paper.install(window)

function draw() {

	if (!render) {
		ctx.textAlign = "center";
		console.log("filling")
		ctx.font = "15px Arial"
		ctx.fillColor = 'black'
		ctx.fillText("Table not optimized for mobile devices.\n Please view on mobile. ", 250, 100);
		return
	}

	// Constants
	const titleMargin = 35
	const rowMargin = 20
	const columnMargin = [300, 300]
	const anchorMargin = [210, 250]
	const fontSize = '0.8em'

	const darkGrey = '#272727'
	const lightGrey = '#808080'
	const extraLightGrey = '#B0B0B0'
	const green = '#48ffa4'

	const sensorTitles = [
		"Camera (RGB)",
		"Depth Sensor (IR)",
		"Fingerprint Sensor",
		"Microphone",
		"Keyboard",
		"Mouse",
		"Touch Screen",
		"Gyrometer",
		"Accelerometer",
		"GPS",
		"Compass",
		"Light Level",
		"Barometer",
		"Date / Time (Clock)",
		"Blood Pressure Sensor",
		"Heart Rate Monitor",
		"Electrodermal Activity"
	]

	const informationTitles = [
		"Person/Face Detection",
		"Facial Recognition",
		"Facial Keypoint Tracking",
		"Biometric Processing",
		"Speech Recognition",
		"Speech-to-Text Translation",
		"Tone-of-Voice Analyzer",
		"Ambient Noise Monitor",
		"Location Trackers",
		"Climate/Weather Detection",
		"Reading & Search Time Monitor",
		"UI Navigation Speed Monitor",
		"UI Trace Tracker",
		"Movement Detection",
		"Caloric Consumption",
		"Sleep Monitoring",
		"Psychophysiological Processing"
	]

	const userModelTitles = [
		"Attentiveness / Flow",
		"Emotion",
		"Stress Level",
		"Identity",
		"Age",
		"Gender",
		"Height",
		"Health",
		"Usage Proficiency",
		"Usage Traces",
		"Current Location",
		"Important Locations & Common Trips",
		"Weather",
		"Single-/ Multi-User Context",
		"User Distance",
		"Private / Familiar / Public Setting",
		"Noise Level"
	]

	const sensorToInfo = {
		"Camera (RGB)": [
			"Person/Face Detection",
			"Facial Recognition",
			"Facial Keypoint Tracking",
			"Biometric Processing",
			"Movement Detection"
		],
		"Depth Sensor (IR)": [
			"Person/Face Detection",
			"Facial Recognition",
			"Facial Keypoint Tracking",
			"Biometric Processing",
			"Movement Detection"
		],
		"Fingerprint Sensor": ["Biometric Processing"],
		"Microphone": [
			"Speech Recognition",
			"Speech-to-Text Translation",
			"Tone-of-Voice Analyzer",
			"Ambient Noise Monitor"
		],
		"Keyboard": [
			"UI Navigation Speed Monitor",
			"Reading & Search Time Monitor",
			"UI Trace Tracker",
			"Psychophysiological Processing"
		],
		"Mouse": [
			"UI Navigation Speed Monitor",
			"Reading & Search Time Monitor",
			"UI Trace Tracker",
			"Psychophysiological Processing"
		],
		"Touch Screen": [
			"UI Navigation Speed Monitor",
			"Reading & Search Time Monitor",
			"UI Trace Tracker",
			"Psychophysiological Processing"
		],
		"Gyrometer": [
			"UI Navigation Speed Monitor",
			"Sleep Monitoring",
			"Psychophysiological Processing",
			"Movement Detection"
		],
		"Accelerometer": [
			"UI Navigation Speed Monitor",
			"Sleep Monitoring",
			"Psychophysiological Processing",
			"Movement Detection",
			"Caloric Consumption"
		],
		"GPS": [
			"Location Trackers",
			"Climate/Weather Detection"
		],
		"Compass": [
			"Location Trackers"
		],
		"Light Level": [
			"Climate/Weather Detection"
		],
		"Barometer": [
			"Climate/Weather Detection"
		],
		"Date / Time (Clock)": [
			"UI Navigation Speed Monitor",
			"Reading & Search Time Monitor",
			"Sleep Monitoring"
		],
		"Blood Pressure Sensor": [
			"Caloric Consumption",
			"Sleep Monitoring",
			"Psychophysiological Processing"
		],
		"Heart Rate Monitor": [
			"Caloric Consumption",
			"Sleep Monitoring",
			"Psychophysiological Processing"
		],
		"Electrodermal Activity": [
			"Caloric Consumption",
			"Sleep Monitoring",
			"Psychophysiological Processing"
		],
	}

	const infoToUserModel = {
		"Person/Face Detection": 
			["Height", 
			"Single-/ Multi-User Context", 
			"User Distance", 
			"Private / Familiar / Public Setting"
		],
		"Facial Recognition": [
			"Identity", 
			"Age", 
			"Gender", 
			"Private / Familiar / Public Setting"
		],
		"Facial Keypoint Tracking": [
			"Attentiveness / Flow", 
			"Emotion"
		],
		"Biometric Processing": [
			"Identity", 
			"Single-/ Multi-User Context", 
			"Private / Familiar / Public Setting"
		],
		"Speech Recognition": [
			"Single-/ Multi-User Context"
		],
		"Speech-to-Text Translation": [],
		"Tone-of-Voice Analyzer": [
			"Emotion", 
			"Identity"
		],
		"Ambient Noise Monitor": [
			"Attentiveness / Flow", 
			"Stress Level", 
			"Private / Familiar / Public Setting", 
			"Noise Level"
		],
		"Location Trackers": [
			"Current Location", 
			"Important Locations & Common Trips", 
			"Private / Familiar / Public Setting"
		],
		"Climate/Weather Detection": [
			"Weather"
		],
		"UI Navigation Speed Monitor": [
			"Attentiveness / Flow", 
			"Stress Level", 
			"Usage Proficiency"
		],
		"Reading & Search Time Monitor": [
			"Attentiveness / Flow", 
			"Stress Level", 
			"Usage Proficiency"
		],
		"UI Trace Tracker": [
			"Stress Level", 
			"Usage Proficiency", 
			"Usage Traces"
		],
		"Movement Detection": [
			"Stress Level"
		],
		"Caloric Consumption": [
			"Health"
		],
		"Sleep Monitoring": [
			"Stress Level", 
			"Health"
		],
		"Psychophysiological Processing": [
			"Attentiveness / Flow", 
			"Emotion", 
			"Stress Level", 
			"Health"
		]
	}

	// Upper left starting points
	var start = new Point(0, 30);

	// Sensorik column
	var sensorTitle = new PointText({
		point: start,
		fontSize: fontSize,
		fontWeight: 'bold',
		fontFamily: 'IBM Plex Mono',
		fillColor: lightGrey,
		content: "Sensors"
	})

	// Dictionary from
	//    title --> {el: paper.js element
	//               rightAnchor: paper.js Point}
	sensorData = {}
	sensorElements = {}

	for (i = 0; i < sensorTitles.length; i++) {
		label = sensorTitles[i]
		var el = new PointText({
			point: [sensorTitle.bounds.x,
					sensorTitle.bounds.y + 
					titleMargin + (i * rowMargin)],
			fontSize: fontSize,
			fontFamily: 'IBM Plex Mono',
			fillColor: lightGrey,
			content: label
		})
		
		var an = new Path.Circle({
			center: [anchorMargin[0],
					el.bounds.y + 
					(el.bounds.height / 2)],
			radius: 3,
			strokeColor: extraLightGrey,
			fillColor: 'white',
			fontFamily: 'IBM Plex Mono',
			strokeWidth: 1
		})
		
		sensorData[label] = {
			"el": el, 
			"rightAnchor": an   
		}
		sensorElements[el] = label
	}

	// Information column
	var InformationTitle = new PointText({
		point: [start.x + columnMargin[0], start.y],
		fontSize: fontSize,
		fontFamily: 'IBM Plex Mono',
		fontWeight: 'bold',
		fillColor: lightGrey,
		content: "Information Processing"
	})

	informationData = {}
	informationElements = {}

	for (i = 0; i < informationTitles.length; i++) {
		label = informationTitles[i]
		var el = new PointText({
			point: [InformationTitle.bounds.x,
					InformationTitle.bounds.y + 
					titleMargin + (i * rowMargin)],
			fontSize: fontSize,
			fontFamily: 'IBM Plex Mono',
			fillColor: lightGrey,
			content: label
		})
		
		var right = new Path.Circle({
			center: [InformationTitle.bounds.x + 
					 anchorMargin[1],
					el.bounds.y + 
					(el.bounds.height / 2)],
			radius: 3,
			strokeColor: extraLightGrey,
			fillColor: 'white',
			strokeWidth: 1
		})
		
		var left = new Path.Circle({
			center: [InformationTitle.bounds.x - 20,
					el.bounds.y + 
					(el.bounds.height / 2)],
			radius: 3,
			strokeColor: extraLightGrey,
			fillColor: 'white',
			strokeWidth: 1
		})
		
		informationData[label] = {
			"el": el,
			"leftAnchor": left,
			"rightAnchor": right
		}
		
		informationElements[el] = label
	}

	// User column
	var UserModelTitle = new PointText({
		point: [start.x + 2 * columnMargin[1] + 50, 
				start.y],
		fontSize: fontSize,
		fontFamily: 'IBM Plex Mono',
		fontWeight: 'bold',
		fillColor: lightGrey,
		content: "User Model"
	})

	userModelData = {}
	userModelElements = {}

	var sub = 0
	var offset = 0
	for (i = 0; i < userModelTitles.length + 4; i++) {
		if (i == 0) {
			var el = new PointText({
				point: [UserModelTitle.bounds.x,
						UserModelTitle.bounds.y + 
						titleMargin + ((i + offset) * rowMargin)],
				fontSize: fontSize,
				fontFamily: 'IBM Plex Mono',
				fontWeight: 'italic',
				fillColor: lightGrey,
				content: 'Mental State'
			})
			sub++
			continue
		} else if (i == 4) {
			offset++
			var el = new PointText({
				point: [UserModelTitle.bounds.x,
						UserModelTitle.bounds.y + 
						titleMargin + ((i + offset) * rowMargin)],
				fontSize: fontSize,
				fontFamily: 'IBM Plex Mono',
				fontWeight: 'italic',
				fillColor: lightGrey,
				content: 'Physical Traits'
			})
			sub++
			continue
		} else if (i == 10) {
			offset++
			var el = new PointText({
				point: [UserModelTitle.bounds.x,
						UserModelTitle.bounds.y + 
						titleMargin + ((i + offset) * rowMargin)],
				fontSize: fontSize,
				fontFamily: 'IBM Plex Mono',
				fontWeight: 'italic',
				fillColor: lightGrey,
				content: 'Habits & Abilities'
			})
			sub++
			continue
		} else if (i == 13) {
			offset++
			var el = new PointText({
				point: [UserModelTitle.bounds.x,
						UserModelTitle.bounds.y + 
						titleMargin + ((i + offset) * rowMargin)],
				fontSize: fontSize,
				fontFamily: 'IBM Plex Mono',
				fontWeight: 'italic',
				fillColor: lightGrey,
				content: 'Context & Surrounding'
			})
			sub++
			continue
		} 

		label = userModelTitles[i - sub]
		var el = new PointText({
			point: [UserModelTitle.bounds.x,
					UserModelTitle.bounds.y + 
					titleMargin + ((i + offset) * rowMargin)],
			fontSize: fontSize,
			fontFamily: 'IBM Plex Mono',
			fillColor: lightGrey,
			content: label
		})
		
		var an = new Path.Circle({
			center: [UserModelTitle.bounds.x - 20,
					el.bounds.y + 
					(el.bounds.height / 2)],
			radius: 3,
			strokeColor: extraLightGrey,
			fillColor: 'white',
			strokeWidth: 1
		})
		
		userModelData[label] = {
			"el": el,
			"leftAnchor": an
		}
		
		userModelElements[el] = label
	}

	// Update data with paths

	for (i = 0; i < sensorTitles.length; i++) {
		label = sensorTitles[i]
		sensorData[label]["rightPaths"] = []
		children = sensorToInfo[label]
		sensorData[label]["children"] = children
	}

	for (i = 0; i < informationTitles.length; i++) {
		label = informationTitles[i]
		informationData[label]["rightPaths"] = []
		informationData[label]["leftPaths"] = []
		children = infoToUserModel[label]
		informationData[label]["children"] = children
		informationData[label]["parents"] = []
	}

	for (i = 0; i < sensorTitles.length; i++) {
		label = sensorTitles[i]
		children = sensorToInfo[label]
		
		for (j = 0; j < children.length; j++) {
			informationData[children[j]]["parents"].push(label)
		}
	}

	for (i = 0; i < userModelTitles.length; i++) {
		label = userModelTitles[i]
		userModelData[label]["leftPaths"] = []
		userModelData[label]["parents"] = []
	}

	for (i = 0; i < informationTitles.length; i++) {
		label = informationTitles[i]
		children = infoToUserModel[label]
		
		for (j = 0; j < children.length; j++) {
			userModelData[children[j]]["parents"].push(label)
		}
	}




	// Draw lines and update data
	for (i = 0; i < sensorTitles.length; i++) {
		label = sensorTitles[i]
		parentAnchor = sensorData[label].rightAnchor

		children = sensorToInfo[label]
		
		for (j = 0; j < children.length; j++) {
			childAnchor = informationData[children[j]].leftAnchor
			start = parentAnchor.position
			end = childAnchor.position
			middleX = (start.x + end.x) / 2
			// console.log(start.x, end.x, middleX)

			h1 = new Point(middleX - start.x, 0)
			h2 = new Point(middleX - end.x, 0)
			// console.log(h1, h2)

			var seg1 = new Segment(start, null, h1)
			var seg2 = new Segment(end, h2, null)
			// console.log(seg1, seg2)

			var path = new Path(seg1, seg2)
			path.strokeColor = extraLightGrey
			path.strokeWidth = 1

			sensorData[label].rightPaths.push(path)
			informationData[children[j]].leftPaths.push(path)
		}
	}

	for (i = 0; i < informationTitles.length; i++) {
		label = informationTitles[i]
		parentAnchor = informationData[label].rightAnchor

		children = infoToUserModel[label]
		informationData[label]["rightPaths"] = []
		informationData[label]["children"] = children
		
		for (j = 0; j < children.length; j++) {
			childAnchor = userModelData[children[j]].leftAnchor
			start = parentAnchor.position
			end = childAnchor.position
			middleX = (start.x + end.x) / 2
			// console.log(start.x, end.x, middleX)

			h1 = new Point(middleX - start.x, 0)
			h2 = new Point(middleX - end.x, 0)
			// console.log(h1, h2)

			var seg1 = new Segment(start, null, h1)
			var seg2 = new Segment(end, h2, null)
			// console.log(seg1, seg2)

			var path = new Path(seg1, seg2)
			path.strokeColor = extraLightGrey
			path.strokeWidth = 1

			informationData[label].rightPaths.push(path)
			userModelData[children[j]].leftPaths.push(path)
		}
	}

	window.cache = {
		'text': [],
		'path': [],
		'anchor': []
	}

	for (i = 0; i < sensorTitles.length; i++) {
		label = sensorTitles[i]
		el = sensorData[label].el
		
		el.onMouseEnter = function(event) {
			clearCache()
			label = sensorElements[this]
			data = sensorData[label]
			
			window.cache.text.push(this)
			window.cache.anchor.push(data.rightAnchor)
			window.cache.path = window.cache.path
								.concat(data.rightPaths)
			
			children = data.children
			for (i = 0; i < children.length; i++) {
				childLabel = children[i]
				childData = informationData[childLabel]
				
				window.cache.text.push(childData.el)
				window.cache.anchor.push(childData.rightAnchor)
				window.cache.anchor.push(childData.leftAnchor)
				window.cache.path = window.cache.path
									.concat(childData.rightPaths)
				
				grandChildren = childData.children
				
				for (j = 0; j < grandChildren.length; j++) {
					grandChildLabel = grandChildren[j]
					gradChildData = userModelData[grandChildLabel]
					
					window.cache.text.push(gradChildData.el)
					window.cache.anchor.push(gradChildData.leftAnchor)
				}
			}
			window.cache.text.map(highlightText)
			window.cache.path.map(highlightPath)
			window.cache.anchor.map(highlightAnchor)
		}
		
		el.onMouseLeave = function(event) {
			clearCache()
		}
	}

	for (i = 0; i < informationTitles.length; i++) {
		label = informationTitles[i]
		el = informationData[label].el
		
		el.onMouseEnter = function(event) {
			clearCache()
			label = informationElements[this]
			data = informationData[label]
			
			window.cache.text.push(this)
			window.cache.anchor.push(data.rightAnchor)
			window.cache.anchor.push(data.leftAnchor)
			window.cache.path = window.cache.path
								.concat(data.rightPaths)
			window.cache.path = window.cache.path
								.concat(data.leftPaths)
			
			children = data.children
			for (i = 0; i < children.length; i++) {
				childLabel = children[i]
				childData = userModelData[childLabel]
				
				window.cache.text.push(childData.el)
				window.cache.anchor.push(childData.leftAnchor)
			}
			
			parents = data.parents
			for (i = 0; i < parents.length; i++) {
				parentLabel = parents[i]
				parentData = sensorData[parentLabel]
				
				window.cache.text.push(parentData.el)
				window.cache.anchor.push(parentData.rightAnchor)
			}
			
			window.cache.text.map(highlightText)
			window.cache.path.map(highlightPath)
			window.cache.anchor.map(highlightAnchor)
		}
		
		el.onMouseLeave = function(event) {
			clearCache()
		}
	}

	for (i = 0; i < userModelTitles.length; i++) {
		label = userModelTitles[i]
		el = userModelData[label].el
		
		el.onMouseEnter = function(event) {
			clearCache()
			label = userModelElements[this]
			data = userModelData[label]
			
			window.cache.text.push(this)
			window.cache.anchor.push(data.leftAnchor)
			window.cache.path = window.cache.path
								.concat(data.leftPaths)
			
			parents = data.parents
			
			for (i = 0; i < parents.length; i++) {
				parentLabel = parents[i]
				parentData = informationData[parentLabel]
				window.cache.text.push(parentData.el)
				window.cache.anchor.push(parentData.rightAnchor)
				window.cache.anchor.push(parentData.leftAnchor)
				window.cache.path = window.cache.path
									.concat(parentData.leftPaths)
				
				grandParents = parentData.parents
				for (j = 0; j < grandParents.length; j++) {
					grandParentLabel = grandParents[j]
					grandParentData = sensorData[grandParentLabel]
					window.cache.text.push(grandParentData.el)
					window.cache.anchor.push(grandParentData.rightAnchor)
				}
			}
			window.cache.text.map(highlightText)
			window.cache.path.map(highlightPath)
			window.cache.anchor.map(highlightAnchor)
		}
		
		el.onMouseLeave = function(event) {
			clearCache()
		}
	}

	function highlightText(el) {
		el.fillColor = green
		el.fontWeight = 'bold'
	}

	function resetText(el) {
		el.fillColor = lightGrey
		el.fontWeight = 'normal'
	}

	function highlightPath(el) {
		el.bringToFront()
		el.strokeColor = green
		el.strokeWidth = 2
	}

	function resetPath(el) {
		el.strokeColor = extraLightGrey
		el.strokeWidth = 1
	}

	function highlightAnchor(el) {
		el.strokeColor = green
	}

	function resetAnchor(el) {
		el.strokeColor = extraLightGrey
	}

	function clearCache() {
		window.cache.text.map(resetText)
		window.cache.path.map(resetPath)
		window.cache.anchor.map(resetAnchor)
		window.cache = {
			'text': [],
			'path': [],
			'anchor': []
		}
	}
}