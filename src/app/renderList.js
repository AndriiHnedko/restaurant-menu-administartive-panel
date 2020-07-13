export function renderListDish(response) {
    document.getElementById('table-root').innerHTML += `
          <tr>
            <td>${response.dishName}</td>
            <td>${response.dishDescription}</td>
            <td>${response.dishWeight}</td>
            <td>${response.dishPrice}</td>
           </tr>
    `
}

export function renderListDishTypeModal(response) {
    document.getElementById('dish-type-table').innerHTML += `
              <tr>
                <td>${response}</td>
              </tr>
    `
}

export function renderListDishTypeList(response) {

    const dishTypeList = document.getElementById('dish-type').querySelector('select')
    dishTypeList.innerHTML = `
        <option value="1">${response}</option>
    `

}