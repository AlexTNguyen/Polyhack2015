
/*
function pasteSelection() {
  	chrome.tabs.query({"active":true, "currentWindow": true}, 
	  	function(tab) {
	    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
	    	function (response) {
	    	console.log(tab)
	    	console.log(response)
	    });
	});
}
*/


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


function pasteSelection() {
    var text = document.getElementById('text'); 
   	UrbanDictDefinition(text.value, text);
}

document.getElementById('btn').addEventListener('click', function() {
	pasteSelection();
})




