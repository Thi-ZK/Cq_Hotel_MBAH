!function(){
	var newsletter_input = document.querySelector("#footer-newsletter-input-container input");
	var newsletter_send_button = document.querySelector("#footer-newsletter-input-container img");

	newsletter_send_button.addEventListener("click", function(){
		var newsletter_input_value = newsletter_input.value;
		var newsletters_validation = /^[a-zA-Z0-9áéíóúçâêôã]{1,22}((-|_|\.)[0-9a-záéíóúçâêôã]{2,16}){0,3}@([a-z]{2,12})(\.[a-z]{2,8}){1,3}$/.test(newsletter_input_value);
		var status_msg = document.querySelector("#newsletter_status_message_container p");

		if(newsletters_validation){
			newsletter_send_button.src = "imgs/general/loading.gif";
			var response = $.ajax({
				url: "/newsletter_submission",
				method: "POST",
				data: {email: newsletter_input_value}
			}).done(function(){
				newsletter_send_button.src = "imgs/general/newsletter_ap.png";
				if(response.responseText.includes("email_validated_successfuly")){
					status_msg.style.color = "green";
					status_msg.innerText = "Thank you very much! Signature for Newsletter successful!";
				}else{
					status_msg.style.color = "red";
					status_msg.innerText = "Apologies, but this format of email is not valid."
				}
			});
		}else{
			status_msg.style.color = "red";
			status_msg.innerText = "Apologies, but this format of email is not valid."
		}
	});
}();
