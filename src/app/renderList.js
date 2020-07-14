export function renderListDish(response) {
    document.getElementById('table-root').innerHTML += `
          <tr>
            <td>${response.dishType}</td>
            <td>${response.dishSubtype}</td>
            <td>${response.dishName}</td>
            <td>${response.dishDescription}</td>
            <td>${response.dishWeight}</td>
            <td>${response.dishPrice}</td>
           </tr>
    `
}

export function renderListDishTypeModal(response, tableId) {
    document.getElementById(tableId).innerHTML += `
              <tr>
                <td>${response}</td>
              </tr>
    `
}

export function renderListDishTypeList(response, count, listId) {
    const dishTypeList = document.getElementById(listId)
    dishTypeList.innerHTML += `
        <option value="${count}">${response}</option>
    `

}