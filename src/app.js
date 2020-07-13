import './styles/style.scss'
import 'materialize-css/dist/js/materialize'
import {getAuthForm, logicAuthForm} from './app/auth'
import {getMainPage, logicMainPage} from './app/mainPage'
import {Dish} from './app/menu'



const rootPage = document.getElementById('root')

Dish.validateAuthentication()

if (!localStorage.getItem('token')) {
    rootPage.innerHTML = getAuthForm()
    logicAuthForm()
} else {
    rootPage.innerHTML = getMainPage()
    logicMainPage()
    Dish.read()
}



