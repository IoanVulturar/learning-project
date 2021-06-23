const regExEmail = /([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/
const regExPhoneNumber = /\d{3}[ -]?\d{3}[ -]?\d{4}/g

const emailValidator = (email) => {
    return email.match(regExEmail)
}

const phoneValidator = (phoneNumber) => {
    return phoneNumber.match(regExPhoneNumber)
}

module.exports = {
    emailValidator,
    phoneValidator
}