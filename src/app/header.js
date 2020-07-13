export function getHeader() {
    return `
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

    //----------/Materialize scripts-----------
}