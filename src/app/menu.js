import {renderListDish, renderListDishTypeModal, renderListDishTypeList} from './renderList'

const firebase = 'https://restaurant-menu-c2d19.firebaseio.com'
const token = localStorage.getItem('token')

export class Dish {
    static create (dish) {
        return fetch(`${firebase}/dishs.json?auth=${token}`, {
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
    static createDishType (dishType) {
        return fetch(`${firebase}/dishtype.json?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify(dishType),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => response)
    }

    static createDishSubtype (dishSubtype) {
        return fetch(`${firebase}/dishsubtype.json?auth=${token}`, {
            method: 'POST',
            body: JSON.stringify(dishSubtype),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => response)
    }

    static getDishType () {
        document.getElementById('dish-type-table').innerHTML = ''
        return fetch(`${firebase}/dishtype.json`)
            .then(response => response.json())
            .then(response => {
                for (let key in response) {
                    renderListDishTypeModal(response[key])
                    renderListDishTypeList(response[key])
                }
            })
    }

    static read () {
        document.getElementById('table-root').innerHTML = ''
        return fetch(`${firebase}/dishs.json`)
            .then(response => response.json())
            .then(response => {
                for (let key in response) {
                    renderListDish(response[key])
                }
            })
    }
    static validateAuthentication () {
        fetch(`${firebase}/dishs.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                   localStorage.removeItem('token')
                }
            })
    }
}

