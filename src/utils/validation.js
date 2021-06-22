const emailValidation = (str) => {
    return str.match(/([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?/)
}

const phoneValidation = (str) => {
    return str.match(/\d{3}[ -]?\d{3}[ -]?\d{4}/g)
}

module.exports = {
    emailValidation,
    phoneValidation
}