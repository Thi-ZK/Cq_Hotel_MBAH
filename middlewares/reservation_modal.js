var reservation_data_validation = (req, res, next) => {
	var email_regex = /^[a-zA-Z0-9áéíóúçâêôã]{1,22}((-|_|\.)[0-9a-záéíóúçâêôã]{2,16}){0,3}@([a-z]{2,12})(\.[a-z]{2,8}){1,3}$/;
	var dates_regex = /^(([1-9])|(1[0-2]))\/(([1-9])|([1-2][0-9])|(3[0-1]))\/19$/;
	console.log(req.body.check_out + "        " + dates_regex.test(req.body.check_out));
	console.log(req.body.check_in + "        " + dates_regex.test(req.body.check_in));
	console.log(email_regex.test(req.body.email));
	if((email_regex.test(req.body.email)) && (dates_regex.test(req.body.check_in)) && (dates_regex.test(req.body.check_out))){
		next();
	}else{
		res.end("Sorry but your request could not be validated.");
	}
}

module.exports = {
	reservation_data_validation: reservation_data_validation
};  