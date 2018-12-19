!function(){
	var contents = document.querySelectorAll(".information-content-div");
	var content_direct_container = document.querySelector("#information-content-direct-container");
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

	var contents_animation = function(target){
		document.querySelector("#information-content-direct-container").style.position = "relative";
		if(window.innerWidth > 1525){
			if((target.getAttribute("content_index") == "2") || (target.getAttribute("content_index") == "5")){
				content_direct_container.style.left = "-18%";
			}
			if((target.getAttribute("content_index") == "3") || (target.getAttribute("content_index") == "6")){
				content_direct_container.style.left = "-39%";
			}
			if((target.getAttribute("content_index") == "1") || (target.getAttribute("content_index") == "4")){
				content_direct_container.style.left = "3%";
			}
		}else if((window.innerWidth > 1022) && (window.innerWidth < 1525)){
			if((target.getAttribute("content_index") == "1") || (target.getAttribute("content_index") == "3") || (target.getAttribute("content_index") == "5")){
				content_direct_container.style.left = "-9%";
			}else{
				content_direct_container.style.left = "-35%";
			}
		}else if((window.innerWidth < 1022) && (window.innerWidth > 820)){
			content_direct_container.style.left = "-24%";
		}else if(window.innerWidth < 820){
		    
		}
		setTimeout(function(){
			var info_content_cont = document.querySelector("#informations-content-container");

			if(window.innerWidth >820){
				document.querySelector("#content-selected-details-container").style.visibility = "visible";
				document.querySelector("#content-selected-details-container").style.opacity = "1";
				window.innerWidth > 1450 ? info_content_cont.style.marginBottom = "14em" : info_content_cont.style.marginBottom = "20em";
			}

			if(window.innerWidth < 970){
				info_content_cont.style.marginBottom = "24em";
			}
			if(window.innerWidth < 820){
				document.querySelector("#content-selected-details-container-mob").style.height = "auto";
				document.querySelector("#content-selected-details-container-mob").style.visibility = "visible";
				document.querySelector("#content-selected-details-container-mob").style.opacity = "1";
				info_content_cont.style.marginBottom = "0em";
			}
		}, 500);
	}

	for (var i = 0; i < contents.length; i++) {
		contents[i].addEventListener("click", function(){
			texts_manager(contents_texts, false, this);

			for (var y = 0; y < contents.length; y++) {
				if(contents[y] !== this){
                    contents[y].style.height = "0px";
                    contents[y].style.visibility = "hidden";
                    window.innerWidth <= 820 ? contents[y].style.margin = "0px" : undefined;
				}
			}
			if(window.innerWidth <= 820){
				$([document.documentElement, document.body]).animate({
			        scrollTop: $("#informations-titles-container p").offset().top
			    }, 500);
			}
			setTimeout(contents_animation.bind(null, this), 1100);
		});
	}
}();
