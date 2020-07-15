import {isValid, validateInput} from './utils'
import {Dish} from './menu'

export function getHeader() {
    return `

        <!-- Header-->
      <nav>
        <div class="nav-wrapper">
          <a class="brand-logo">Your restaurant</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a class="dish-type-list modal-trigger" href="#dish-type-modal">Dish type list</a></li>
            <li><a class="dish-subtype-list modal-trigger" href="#dish-subtype-modal">Dish subtype list</a></li>
            <li><a>${localStorage.getItem('login')}</a></li>
            <li><a class="log-out">Log out</a></li>
          </ul>
        </div>
      </nav>
    
      <ul class="sidenav" id="mobile-demo">
        <li><a class="dish-type-list modal-trigger" href="#dish-type-modal">Dish type list</a></li>
        <li><a class="dish-subtype-list modal-trigger" href="#dish-subtype-modal">Dish subtype list</a></li>
        <li><a>${localStorage.getItem('login')}</a></li>
        <li><a class="log-out">Log out</a></li>
      </ul>
      
        <!-- /Header-->
        <!-- Modal Structure -->
        
      <div id="dish-type-modal" class="modal">
        <div class="modal-content">
          <div class="row form-dish-type">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12 l11">
                  <input id="input-dish-type" type="text" class="validate">
                  <label for="input-dish-type">Create dish type</label>
                </div>
                <button 
                class="btn waves-effect waves-light col s12 l1 btn-submit" 
                type="submit" 
                name="action" 
                id="submit-dish-type" 
                disabled
                >Submit</button>
              </div>
            </form>
          </div>
          
          <table  class="highlight">
            <thead>
              <tr>
                  <th>Dish type</th>
              </tr>
            </thead>
    
            <tbody id="dish-type-table"></tbody>
          </table>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
      
      <div id="dish-subtype-modal" class="modal">
        <div class="modal-content">
          <div class="row form-dish-subtype">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12 l11">
                  <input id="input-dish-subtype" type="text" class="validate">
                  <label for="input-dish-subtype">Create dish subtype</label>
                </div>
                <button 
                class="btn waves-effect waves-light col s12 l1 btn-submit" 
                type="submit" 
                name="action" 
                id="submit-dish-subtype" 
                disabled
                >Submit</button>
              </div>
            </form>
          </div>
        </div>
        
     
        <table  class="highlight">
            <thead>
              <tr>
                  <th>Dish subtype</th>
              </tr>
            </thead>
    
            <tbody id="dish-subtype-table"></tbody>
        </table>
    
        
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
      
      <!-- /Modal Structure -->
    `
}

export function logicHeader() {

    document.querySelectorAll('.log-out').forEach(e => {
        e.addEventListener('click', () => {
            localStorage.removeItem('token')
            location.reload()
        })
    })

    //----------Materialize scripts-----------

    document.addEventListener('DOMContentLoaded', () => {
        let elems = document.querySelectorAll('.sidenav')
        let instances = M.Sidenav.init(elems)
    })

    document.addEventListener('DOMContentLoaded', function() {
        let elems = document.querySelectorAll('.modal')
        let instances = M.Modal.init(elems)
    })

    //----------/Materialize scripts-----------

    //work with modal window

    const formDishType = document.querySelector('.form-dish-type')
    const inputDishType = formDishType.querySelector('#input-dish-type')
    const submitDishType = formDishType.querySelector('#submit-dish-type')

    formDishType.addEventListener('submit', submitDishTypeFormHandler)

    Dish.getDishType()

    inputDishType.addEventListener('input', () => {
        submitDishType.disabled = !validateInput(inputDishType)
    })

    function submitDishTypeFormHandler (event) {
        // turn off the auto reboot page when interacting with the form
        event.preventDefault()

        // create dish type object
        if (validateInput(inputDishType)) {
            const dishType = inputDishType.value.trim()
            submitDishType.disabled = true
            // async request to server to save dish type
            Dish.createDishType(dishType).then(() => {
                inputDishType.value = ''
                inputDishType.classList.remove('valid')
                submitDishType.disabled = false
                Dish.getDishType()
            })
        } else {
            console.log('err')
        }
    }


    const formDishSubtype = document.querySelector('.form-dish-subtype')
    const inputDishSubtype = formDishSubtype.querySelector('#input-dish-subtype')
    const submitDishSubtype = formDishSubtype.querySelector('#submit-dish-subtype')

    formDishSubtype.addEventListener('submit', submitDishSubtypeFormHandler)

    Dish.getDishSubtype()

    inputDishSubtype.addEventListener('input', () => {
        submitDishSubtype.disabled = !validateInput(inputDishSubtype)
    })

    function submitDishSubtypeFormHandler (event) {
        // turn off the auto reboot page when interacting with the form
        event.preventDefault()

        // create dish subtype object
        if (validateInput(inputDishSubtype)) {
            const dishType = inputDishSubtype.value.trim()
            submitDishSubtype.disabled = true
            // async request to server to save dish subtype
            Dish.createDishSubtype(dishType).then(() => {
                inputDishSubtype.value = ''
                inputDishSubtype.classList.remove('valid')
                submitDishSubtype.disabled = false
                Dish.getDishSubtype()
            })
        } else {
            console.log('err')
        }
    }

}