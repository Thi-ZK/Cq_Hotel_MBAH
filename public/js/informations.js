!function(){
	var contents = document.querySelectorAll(".information-content-div");
	var contents_texts = document.querySelectorAll(
		".flip-card-back h2," +
		".information-content-title-container h2," +
		".information-content-text-container p," +
		".information-content-div img"
	);

	var check_parent = function(elem, SP_ELEM){ // checks if an element is a child of other specific element
		var parent = elem.parentElement;

		for (var i = 0; i < 7; i++) {
			if(parent.tagName == "BODY"){
				return false;
			}
			if(parent === SP_ELEM){
				return true;
			}
			parent = parent.parentElement;
		}
		return false;
	}

	var map = Array.prototype.map;
	var texts_manager = function(texts, decider, SP_ELEM){ // texts = array | decider = boolean
		map.call(texts, function(elem){
			if(!check_parent(elem, SP_ELEM)){
				decider ? elem.style.display = "block" : elem.style.display = "none";
			}
		});
	}

	for (var i = 0; i < contents.length; i++) {
		contents[i].addEventListener("click", function(){
			texts_manager(contents_texts, false, this);

			for (var y = 0; y < contents.length; y++) {
				if(contents[y] !== this){
                    contents[y].style.height = "0px";
                    contents[y].style.visibility = "hidden";
				}
			}
			setTimeout(function(){
				if(window.innerWidth > 1525){ // make conditions to see in what spot the div is
					document.querySelector("#information-content-direct-container").style.position = "relative";
					document.querySelector("#information-content-direct-container").style.left = "-15%";
				}else if(window.innerWidth > 1022){// make conditions to see in what spot the div is
					document.querySelector("#information-content-direct-container").style.position = "relative";
					document.querySelector("#information-content-direct-container").style.left = "-15%";
				}else{// condition not needed here, everyone is aligned
					document.querySelector("#information-content-direct-container").style.position = "relative";
					document.querySelector("#information-content-direct-container").style.left = "-15%";
				}
			}, 1000);
		});
	}
}();
