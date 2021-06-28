const regExEmail = /([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/
const regExPhoneNumber = /\d{3}[ -]?\d{3}[ -]?\d{4}/g
const regExPassword = /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!?_])[0-9a-zA-Z!?_]{4,}/g
const regExUsername = /^[a-zA-Z]/g
const NAME_LENGTH = 2

const userNameValidator = (userName) => {
    if (userName.length > NAME_LENGTH && userName.match(regExUsername)) {
        return true
    }
    return false
}
const emailValidator = (email) => {
    return email.match(regExEmail)
}

const phoneValidator = (phoneNumber) => {
    return phoneNumber.match(regExPhoneNumber)
}

const passwordValidator = (password) => {
    return password.match(regExPassword)
}

module.exports = {
    userNameValidator,
    emailValidator,
    phoneValidator,
    passwordValidator
}