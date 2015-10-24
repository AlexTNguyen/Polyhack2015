chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else
      sendResponse({}); // snub them.
});


// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
  	console.log("ubd called");
    UrbanDictDefinition(e.pageX, e.pageY, selection);
  }
}, false);

function UrbanDictDefinition(x, y, selection){
	var text; 
	var xhr = new XMLHttpRequest(); 
	var link = "http://api.urbandictionary.com/v0/define?term=" + selection; 
	console.log(link);
	xhr.open("GET", link, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log("i'm in");
			parsedJSON = JSON.parse(xhr.responseText);
			text = parsedJSON["list"][0]["definition"];
			console.log(JSON.stringify(parsedJSON));
			renderBubble(x, y, text); 
		}
	}
	console.log(selection);
	console.log("text is: " + text);
	xhr.send();
}


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, text) {
	//if(text != undefined) {
	  console.log("im in rendering bubble! text: " + text);
	  bubbleDOM.innerHTML = text;
	  bubbleDOM.style.top = mouseY + 15 + 'px';
	  console.log(mouseY);
	  console.log(mouseX);
	  bubbleDOM.style.left = mouseX + 15 + 'px';
	  bubbleDOM.style.visibility = 'visible';
	//}
}