import './styles/style.scss'
import 'materialize-css/dist/js/materialize'
import {getAuthForm, logicAuthForm} from './app/auth'
import {getMainPage, logicMainPage} from './app/mainPage'
import {Dish} from './app/menu'
import {getHeader, logicHeader} from './app/header'


const rootPage = document.getElementById('root')

Dish.validateAuthentication()

if (!localStorage.getItem('token')) {
    rootPage.innerHTML = getAuthForm()
    logicAuthForm()
} else {
    rootPage.innerHTML = getHeader()
    rootPage.innerHTML += getMainPage()

    logicMainPage()
    logicHeader()
    Dish.read()
}



