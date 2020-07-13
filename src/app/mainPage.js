import {isValid, validateDropdownList} from './utils'
import {Dish} from './menu'

export function getMainPage() {
    const root = document.getElementById('root')
    return root.innerHTML = `
      <nav>
        <div class="nav-wrapper">
          <a class="brand-logo">Your restaurant</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a>${localStorage.getItem('login')}</a></li>
            <li><a class="log-out">Log out</a></li>
          </ul>
        </div>
      </nav>
    
      <ul class="sidenav" id="mobile-demo">
        <li><a>${localStorage.getItem('login')}</a></li>
        <li><a class="log-out">Log out</a></li>
      </ul>
      
    <div class="row form-dish-type">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s10 l11">
              <input id="input-dish-type" type="text" class="validate">
              <label for="input-dish-type">Create dish type</label>
            </div>
            <button 
            class="btn waves-effect waves-light col s2 l1 btn-submit" 
            type="submit" 
            name="action" 
            id="submit-dish-type" 
            disabled
            >Submit</button>
          </div>
        </form>
      </div>
      
      <div class="row form-dish-subtype">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s10 l11">
              <input id="input-dish-subtype" type="text" class="validate">
              <label for="input-dish-subtype">Create dish subtype</label>
            </div>
            <button 
            class="btn waves-effect waves-light col s2 l1 btn-submit" 
            type="submit" 
            name="action" 
            id="submit-dish-subtype" 
            disabled
            >Submit</button>
          </div>
        </form>
      </div>
      
      <div class="row form-dish">
        <form class="col s12" id="form">
          <div class="row">
                      
            <div class="input-field col s6 l2" id="dish-type">
              <select>
                <option value="" disabled selected>Choose dish type</option>
                <option value="1">Option 1.1</option>
                <option value="2">Option 1.2</option>
                <option value="3">Option 1.3</option>
              </select>
            </div>
      
            <div class="input-field col s6 l2" id="dish-subtype">
              <select>
                <option value="" disabled selected>Choose dish subtype</option>
                <option value="1">Option 2.1</option>
                <option value="2">Option 2.2</option>
                <option value="3">Option 2.3</option>
              </select>
            </div>
          
            <div class="input-field col s6 l2">
              <input id="dish-name" type="text" class="validate">
              <label for="dish-name">Dish name</label>
            </div>
            <div class="input-field col s6 l3">
              <input id="dish-description" type="text" class="validate">
              <label for="dish-description">Description</label>
            </div>
            <div class="input-field col s6 l1">
              <input id="dish-weight" type="text" class="validate">
              <label for="dish-weight">Weight</label>
            </div>
            <div class="input-field col s6 l1">
              <input id="dish-price" type="text" class="validate">
              <label for="dish-price">Price</label>
            </div>

            <button 
            class="btn waves-effect waves-light col s12 l1 btn-submit" 
            type="submit" 
            name="action" 
            id="submit" 
            disabled
            >Submit</button>
          </div>
        </form>
       </div>
      
      <table class="highlight">
        <thead>
          <tr>
            <th class="name">Name</th>
            <th class="description">Description</th>
            <th class="weight">Weight(g)</th>
            <th class="price">Price(UAH)</th>
          </tr>
        </thead>

        <tbody id="table-root"></tbody>
      </table>
       
      
    `
}

export function logicMainPage() {
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

    document.addEventListener('DOMContentLoaded', () => {
        let elems = document.querySelectorAll('select')
        let instances = M.FormSelect.init(elems)
    })




    //----------/Materialize scripts-----------

    const form = document.getElementById('form')
    const dishName = form.querySelector('#dish-name')
    const dishDescription = form.querySelector('#dish-description')
    const dishWeight = form.querySelector('#dish-weight')
    const dishPrice = form.querySelector('#dish-price')
    const submitBtn = form.querySelector('#submit')

    const dishType = form.querySelector('#dish-type')
    const dishSubtype = form.querySelector('#dish-subtype')


    form.addEventListener('submit', submitFormHandler)

    const input = [dishName, dishDescription, dishWeight, dishPrice]
    // valid form
    input.forEach(e => {
        e.addEventListener('input', () => {
            const typeList = dishType.querySelector('input')
            const subtypeList = dishSubtype.querySelector('input')

            submitBtn.disabled = !validateDropdownList(dishType)
            submitBtn.disabled = !validateDropdownList(dishSubtype)
            submitBtn.disabled = !isValid(input)
        })
    })
     

    function submitFormHandler(event) {
        // turn off the auto reboot page when interacting with the form
        event.preventDefault()

        //take information from dropdown list


        // create dish object
        if (isValid(input)) {
            const dish = {
                dishName: dishName.value.trim(),
                dishDescription: dishDescription.value.trim(),
                dishWeight: dishWeight.value.trim(),
                dishPrice: dishPrice.value.trim(),
                dishType: dishType.querySelector('input').value,
                dishSubtype: dishSubtype.querySelector('input').value
            }
            submitBtn.disabled = true
            // async request to server to save dish
            Dish.create(dish).then(() => {
                Dish.read()
                location.reload()
                submitBtn.disabled = false
            })
        } else {
            console.log('err')
        }
    }

}

