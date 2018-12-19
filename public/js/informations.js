!function(){
	var contents = document.querySelectorAll(".information-content-div");
	var content_direct_container = document.querySelector("#information-content-direct-container");
	var content_details_container_mob = document.querySelector("#content-selected-details-container-mob");
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

	var map = Array.prototype.map; // doc.querySelec retrieves a node list, not an array
	var texts_manager = function(texts, decider, SP_ELEM){ // texts = array | decider = boolean
		map.call(texts, function(elem){ // turns the display of a nodelist/array block or none
			if(!check_parent(elem, SP_ELEM)){
				decider ? elem.style.display = "block" : elem.style.display = "none";
			}
		});
	}

	var contents_animation = function(target){ // takes care of all transitions effects, except for setting the height 0
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
		}

		target.querySelector(".option-selected-click-to-go-back").style.visibility = "visible"; // click again to go back to options
		target.querySelector(".option-selected-click-to-go-back").style.opacity = "1";

		setTimeout(function(){ // manager of the new content to be shown, the texts about the content chosen.
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
				content_details_container_mob.style.height = "auto";
				content_details_container_mob.style.visibility = "visible";
				content_details_container_mob.style.opacity = "1";
				info_content_cont.style.marginBottom = "0em";
			}
		}, 500);
	}

	var reverse_contents_animations = function(target){
		var info_content_cont = document.querySelector("#informations-content-container");

		content_direct_container.style.left = "0%";

		target.querySelector(".option-selected-click-to-go-back").style.visibility = "hidden"; // click again to go back to options
		target.querySelector(".option-selected-click-to-go-back").style.opacity = "0";

		document.querySelector("#content-selected-details-container").style.visibility = "hidden";
		document.querySelector("#content-selected-details-container").style.opacity = "0";
		info_content_cont.style.marginBottom = "0em";
	}

	for (var i = 0; i < contents.length; i++) {
		contents[i].addEventListener("click", function(){
			if(content_direct_container.className === "options-mode"){ // to show the selected content and animations for that
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
				content_direct_container.className = "option-selected-mode";
			}else{ // to hide last selected content and go back to options mode again
				reverse_contents_animations(this);

				for (var y = 0; y < contents.length; y++) {
					contents[y].style.height = "240px";
					contents[y].style.margin = "1em";
					contents[y].style.visibility = "visible";
				}

				setTimeout(function(){texts_manager(contents_texts, true, this);}, 700);
				content_direct_container.className = "options-mode";
			}
		});
	}
}();