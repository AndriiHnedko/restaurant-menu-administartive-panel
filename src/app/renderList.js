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