import {isValid, validateDropdownList} from './utils'
import {Dish} from './menu'

export function getMainPage() {
    const root = document.getElementById('root')
    return root.innerHTML = `
     
      <div class="row form-dish">
        <form class="col s12" id="form">
          <div class="row">
                      
            <div class="input-field col s6 l2" id="dish-type">
              <select id="dish-type-list">
                <option value="" disabled selected>Choose dish type</option>
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


    //----------Materialize scripts-----------

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

