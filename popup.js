function pasteSelection() {
  	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.sendRequest(tab[0].id, {method: "getSelection"}, function(response){
	    	var text = response.data + text; 
	    	console.log(text); 
	    	UrbanDictDefinition(text.value, text);
	    });
	});
}

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

/*
function pasteSelection() {
    var text = document.getElementById('text'); 
   	UrbanDictDefinition(text.value, text);
}*/

document.getElementById('text').addEventListener('keydown', function(e) {
	console.log(e);
	key = e.which || e.keyCode;
	if (key == 13) {
		console.log(key); 
		pasteSelection();
	}
});




