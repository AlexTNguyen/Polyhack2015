// Create the bubble overlay. 
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Listens for when a word gets highlighted, then calls a function to look up
// the definition and create the bubble overlay. 
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    UrbanDictDefinition(e.pageX, e.pageY, selection);
  }
}, false);

// Find the definition of the highlighted word using the API
function UrbanDictDefinition(x, y, selection){
	var text; 
	var xhr = new XMLHttpRequest(); 
	var link = "https://api.urbandictionary.com/v0/define?term=" + selection; 
	xhr.open("GET", link, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			parsedJSON = JSON.parse(xhr.responseText);
			text = parsedJSON["list"][0]["definition"];
			renderBubble(x, y, text); 
		}
	}
	xhr.send();
}


// Closes the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
}, false);

// Creates bubble overlay at mouse location given that the definition for 
// the highlighted word was found. 
function renderBubble(mouseX, mouseY, text) {
	  bubbleDOM.innerHTML = text;
	  if(bubbleDOM.clientWidth + mouseX > window.innerWidth)
	  	bubbleDOM.style.left = window.innerWidth - 320 + 'px';
	  else 
	  	bubbleDOM.style.left = mouseX + 15 + 'px';
	  bubbleDOM.style.top = mouseY + 15 + 'px';
	  bubbleDOM.style.visibility = 'visible';
}