newsletter_verification = (req, res, next) => {
	var verf = /^[a-zA-Z0-9áéíóúçâêôã]{1,22}((-|_|\.)[0-9a-záéíóúçâêôã]{2,16}){0,3}@([a-z]{2,8})(\.[a-z]{2,8}){1,3}$/.test(req.body.email);
	verf ? next() : res.send("invalid_email");
}

module.exports = {
	newsletter_verification: newsletter_verification
};          
