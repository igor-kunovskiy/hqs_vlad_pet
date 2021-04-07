module.exports.nameRegExp = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
module.exports.passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
module.exports.emailRegExp = /\S+@\S+\.\S+/;