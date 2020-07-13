import {renderListDish} from './renderList'

export class Dish {
    static create (dish) {
        const token = localStorage.getItem('token')
        return fetch(`https://restaurant-menu-c2d19.firebaseio.com/dishs.json?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify(dish),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                response.id = response.dishName
                return response
            })
    }
    static read () {
        document.getElementById('table-root').innerHTML = ''
        return fetch(`https://restaurant-menu-c2d19.firebaseio.com/dishs.json`)
            .then(response => response.json())
            .then(response => {
                for (let key in response) {
                    renderListDish(response[key])
                }
            })
    }
}

