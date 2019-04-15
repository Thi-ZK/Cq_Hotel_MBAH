(function(){
	var reservation_modal = document.querySelector("#reservation-modal-container");
	var overlay = document.querySelector("#overlay");
	var calendar = document.querySelector("#calendar-container");
	var reservation_modal_texts = document.querySelectorAll(
		"#reservation-modal-first-block-title-container h1," +
		"#reservation-modal-first-block-title-container h2," +
		"#reservation-modal-first-block-texts-container p," +
		"#reservation-modal-stars-container img," +
		"#reservation-modal-stars-container p," +
		"#reservation-modal-footer-container ul a," +
		"#reservation-model-footer-title-container p," +
		"#reservation-modal-second-content-first-block-container"
	);
	var map = Array.prototype.map;
	var texts_manager = function(texts, decider){ // texts = array | decider = boolean
		map.call(texts, function(elem){
			decider ? elem.style.display = "block" : elem.style.display = "none";
		});
	}

	texts_manager(reservation_modal_texts, false);

	// fixing this: https://ibb.co/9y5Lxsd
	document.querySelector("#reservation-modal-email-container input").addEventListener("focus", function(){
		reservation_modal.style.minHeight = "480px";
	});
	document.querySelector("#reservation-modal-email-container input").addEventListener("focusout", function(){
		reservation_modal.style.minHeight = "auto";
	});

	document.querySelector(".make-reservation-container button").onclick = function(){
		reservation_modal.style.visibility = "visible";
		window.innerWidth <= 650 ? reservation_modal.style.height = "75vh" : reservation_modal.style.height = "80vh";
		window.innerWidth <= 480 ? reservation_modal.style.height = "70vh" : undefined;
		overlay.style.display = "block";
		
		setTimeout(function(){
			texts_manager(reservation_modal_texts, true);
		}, 450);
	}

	document.querySelector("#reservation-modal-title-and-close-button-container img").onclick = function(){
		reservation_modal.style.visibility = "hidden";
		reservation_modal.style.height = "0vh";
		overlay.style.display = "none";

		texts_manager(reservation_modal_texts, false);
	}

	document.querySelector("#check-out-div").addEventListener("click", function(){
		window.__calendar_selected = 1; // 1 = check-out
		if(calendar.style.display == "block"){
			return (calendar.style.display = "none");
		}
		calendar.style.display = "block";
		calendar.style.left = "48%";
	});
	document.querySelector("#check-in-div").addEventListener("click", function(){
		window.__calendar_selected = 2;
		if(calendar.style.display == "block"){
			return (calendar.style.display = "none");
		}
		calendar.style.display = "block";
		calendar.style.left = "48%";
	});

	var month_selected = document.querySelector("#month");
	var calendar_days = document.querySelectorAll("ul[class*='calenday-days-ul'] li");
	var months_map = {
		"january": "1",
		"february": "2",
		"march": "3",
		"april": "4",
		"may": "5",
		"june": "6",
		"july": "7",
		"august": "8",
		"september": "9",
		"october": "10",
		"november": "11",
		"december": "12"
	};

	for (var i = 0; i < calendar_days.length; i++) {
		calendar_days[i].addEventListener("click", (function(){
			var x = i;

			return function(){
				if(this.innerText.toLowerCase() !== "*"){
					if(window.__calendar_selected === 1){
						document.querySelector("#check-out-div").innerText = months_map[month_selected.innerText.toLowerCase()] + "/" + this.innerText + "/19";
						calendar.style.display = "none";
					}else if(window.__calendar_selected === 2){
						document.querySelector("#check-in-div").innerText = months_map[month_selected.innerText.toLowerCase()] + "/" + this.innerText + "/19";
						calendar.style.display = "none";
					}
				}
			}
		}()));
	}

	document.querySelector("#reservation-modal-send-button-container button").addEventListener("click", function(){
		var email = document.querySelector("#reservation-modal-email-container input").value;
		var check_in = document.querySelector("#check-out-div").innerText;
		var check_out = document.querySelector("#check-in-div").innerText;
		var people_number = document.querySelectorAll("#people-number-direct-container option").filter;

		if(email && (check_out.includes("19")) && (check_in.includes("19"))){ // needs to make REGEX front end verifications too
			var response = $.ajax({
				url: "/reservation_contact",
				method: "POST",
				data: {email: email, check_in: check_in, check_out: check_out}
			}).done(function(){
				console.log(response.responseText);
			});
		}
	});
}());
