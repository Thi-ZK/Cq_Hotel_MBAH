!function(){
	var footer = document.querySelector("footer");
	var contents = document.querySelectorAll(".information-content-div");
	var content_direct_container = document.querySelector("#information-content-direct-container");
	var content_details_container = document.querySelector("#content-selected-details-container");
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

	var htm_1 = { // width > 1525
		"1": "0",
		"2": "0",
		"3": "0",
		"4": String((((window.innerHeight / 65) + 10) * -1)),
		"5": String((((window.innerHeight / 65) + 10) * -1)),
		"6": String((((window.innerHeight / 65) + 10) * -1))
	};

	var htm_2 = { // (window.innerWidth > 1022) && (window.innerWidth < 1525)
		"1": "0",
		"2": "0",
		"3": String((((window.innerHeight / 36) + 10) * -1)),
		"4": String((((window.innerHeight / 36) + 10) * -1)),
		"5": String((((window.innerHeight / 15) + 10) * -1)),
		"6": String((((window.innerHeight / 15) + 10) * -1))
	};

	var htm_3 = { // (window.innerWidth < 1022) && (window.innerWidth > 820)
		"1": "0",
		"2": String((((window.innerHeight / 36) + 10) * -1)),
		"3": String((((window.innerHeight / 18) + 10) * -1)),
		"4": String((((window.innerHeight / 9) + 10) * -1)),
		"5": String((((window.innerHeight / 4.5) + 10) * -1)),
		"6": String((((window.innerHeight / 2.25) + 10) * -1))
	};

	var htm_4 = { // < 820
		"1": "0",
		"2": "-36",
		"3": "-70",
		"4": "-106",
		"5": "-140",
		"6": "-178"
	};

	var contents_animation = function(target){ // takes care of all transitions effects, except for setting the height 0
		t_index = target.getAttribute("content_index");
		document.querySelector("#information-content-direct-container").style.position = "relative";
		if(window.innerWidth > 1525){
			if((t_index == "2") || (t_index == "5")){
				target.style.transform = "translate(-18vw," + htm_1[t_index] + "vh)";
			}
			if((t_index == "3") || (t_index == "6")){
				target.style.transform = "translate(-39vw," + htm_1[t_index] + "vh)";
			}
			if((t_index == "1") || (t_index == "4")){
				target.style.transform = "translate(3vw," + htm_1[t_index] + "vh)";
			}
		}else if((window.innerWidth > 1022) && (window.innerWidth < 1525)){
			if((t_index == "1") || (t_index == "3") || (t_index == "5")){
				target.style.transform = "translate(-9vw," + htm_2[t_index] + "vh)";
			}else{
				target.style.transform = "translate(-35vw," + htm_2[t_index] + "vh)";
			}
		}else if((window.innerWidth < 1022) && (window.innerWidth > 820)){
			target.style.transform = "translate(-24vw," + htm_3[t_index] + "vh)";
		}else{
			target.style.transform = "translate(0vw," + htm_4[t_index] + "vh)";
			content_direct_container.style.maxHeight = "310px";
		}

		target.querySelector(".option-selected-click-to-go-back").style.visibility = "visible"; // click again to go back to options
		target.querySelector(".option-selected-click-to-go-back").style.opacity = "1";

		setTimeout(function(){ // manager of the new content to be shown, the texts about the content chosen.
			var info_content_cont = document.querySelector("#informations-content-container");

			if(window.innerWidth >820){
				content_details_container.style.visibility = "visible";
				content_details_container.style.opacity = "1";
				window.innerWidth > 1450 ? footer.style.transform = "translateY(14em)" : footer.style.transform = "translateY(20em)";
			}

			if(window.innerWidth < 970){
				footer.style.transform = "translateY(24em)"
			}
			if(window.innerWidth < 820){
				content_details_container_mob.style.visibility = "visible";
				content_details_container_mob.style.opacity = "1";
				footer.style.transform = "translateY(0em)";
			}

			window.__option_click_flag = false;
		}, 500);
	}

	var reverse_contents_animations = function(target){ // go back to options, reverse animation code
		window.innerWidth <= 820 ? content_direct_container.style.maxHeight = "1100px" : undefined;
		var info_content_cont = document.querySelector("#informations-content-container");

		target.style.transform = "translate(0vw)";

		target.querySelector(".option-selected-click-to-go-back").style.visibility = "hidden"; // click again to go back to options
		target.querySelector(".option-selected-click-to-go-back").style.opacity = "0";

		window.innerWidth >= 820 ? content_details_container.style.visibility = "hidden" : content_details_container_mob.style.visibility = "hidden";
		window.innerWidth >= 820 ? content_details_container.style.opacity = "0" : content_details_container_mob.style.opacity = "0";
		// content_details_container_mob.style.height = "0px";

		footer.style.transform = "translateY(0em)"
	}

	for (var i = 0; i < contents.length; i++) {
		contents[i].addEventListener("click", function(){
			if(!window.__option_click_flag){
				window.__option_click_flag = true;
				if(content_direct_container.className === "options-mode"){ // to show the selected content and animations for that
					texts_manager(contents_texts, false, this);

					for (var y = 0; y < contents.length; y++) {
						if(contents[y] !== this){
			                contents[y].style.transform = "scale(0.02)";
			                contents[y].style.visibility = "hidden";
			                window.innerWidth <= 820 ? contents[y].style.margin = "0px" : undefined;
						}
					}
					if(window.innerWidth <= 820){
						$([document.documentElement, document.body]).animate({
					        scrollTop: $("#informations-titles-container p").offset().top
					    }, 850);
					}else{
						$([document.documentElement, document.body]).animate({
					        scrollTop: $("#informations-titles-container h1").offset().top
					    }, 850);
					}

					setTimeout(contents_animation.bind(null, this), 1100);
					content_direct_container.className = "option-selected-mode";
				}else{ // to hide last selected content and go back to options mode again
					reverse_contents_animations(this);

					for (var y = 0; y < contents.length; y++) {
						contents[y].style.transform = "scale(1)";
						contents[y].style.margin = "1em";
						contents[y].style.visibility = "visible";
					}

					setTimeout(function(){texts_manager(contents_texts, true, this); window.__option_click_flag = false}, 700);
					content_direct_container.className = "options-mode";
				}
			}
		});
	}
}();
window.__option_click_flag = false;