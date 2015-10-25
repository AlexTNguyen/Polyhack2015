// Code to translate words that the user types in the popup. 

// Function that utilizes the API to find the definition. 
function UrbanDictDefinition(data, text){
	var xhr = new XMLHttpRequest(); 
	var link = "http://api.urbandictionary.com/v0/define?term=" + data; 
	xhr.open("GET", link, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			parsedJSON = JSON.parse(xhr.responseText);
			text.value = parsedJSON["list"][0]["definition"];
		} else {
			text.value = "Not found"; 
		}
	}
	xhr.send();
}

// Changes the word that the user types in into the definition. 
function pasteSelection() {
    var text = document.getElementById('text'); 
   	UrbanDictDefinition(text.value, text);
}

// Waits for user to press enter. Then calls a function to find the definition
// of the word they typed in. 
document.getElementById('text').addEventListener('keydown', function(e) {
	key = e.which || e.keyCode;
	if (key == 13) {
		console.log("Calling pasteSelection");
		pasteSelection();
	}
});

