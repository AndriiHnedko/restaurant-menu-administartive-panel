import {authWithEmailAndPassword, validateEmail, validatePassword} from './utils'

export function getAuthForm() {
    return `
    <div class="row container auth-form" id="auth-form">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate">
                    <label for="email">Email</label>
                    <div class="input-email-error"></div>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate">
                    <label for="password">Password</label>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action" id="login" disabled>login</button>
        </form>
    </div>
    `
}

export function logicAuthForm() {
    const root = document.getElementById('root')

    const authForm = document.getElementById('auth-form')
    const inputEmail = authForm.querySelector('#email')
    const inputPassword = authForm.querySelector('#password')
    const loginBtn = authForm.querySelector('#login')


    const inputAuth = [inputEmail, inputPassword]

// form validation, to enable the authorization button

    inputAuth.forEach(e => {
        e.addEventListener('input', () => {
            const turnBtn = validateEmail(inputEmail.value) && validatePassword(inputPassword.value)
            loginBtn.disabled = !turnBtn
        })
    })

    authForm.addEventListener('submit', authFormHandler)

    function authFormHandler(event) {
        event.preventDefault()

        const  email = inputEmail.value
        const  password = inputPassword.value

        authWithEmailAndPassword(email, password)
            .then(token => {
                if (token) {
                    localStorage.setItem('token', token)
                    localStorage.setItem('login', inputEmail.value)
                    location.reload()
                } else {
                    renderModalAfterAuth()
                }
            })
    }

    function renderModalAfterAuth() {
        root.querySelector('.input-email-error').innerHTML = `
            <span> The email or password is incorrect. </span>
        `
        root.querySelectorAll('.validate').forEach(e => {
            e.classList.add('invalid')
        })
    }

}