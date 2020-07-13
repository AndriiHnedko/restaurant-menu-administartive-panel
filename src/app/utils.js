
export function isValid(input) {
    return input[0].value.length >= 4 && input[1].value.length >= 4 && input[2].value.length >= 2 && input[3].value.length >= 1
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export function validateDropdownList(dropdownList) {
    if (dropdownList.querySelector('.disabled').classList.value === 'disabled') {
        return true
    }
}

export function validatePassword(input) {
    return input.length >= 8
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyAAzF7dxXNPWb-cvG5jPh3y61-iHhU1DuM'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(responce => responce.json())
        .then(data => data.idToken)
}
