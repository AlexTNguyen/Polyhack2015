function pasteSelection() {
	console.log("begin");
  	chrome.browserAction.onClicked.addListener(function(tab) {
  		console.log("2");
		chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
	    	console.log("3");
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
	key = e.which || e.keyCode;
	if (key == 13) {
		console.log("Calling pasteSelection");
		pasteSelection();
	}
});




