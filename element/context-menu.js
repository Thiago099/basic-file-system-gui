import './context-menu.css';
export function contextMenu(element, items)
{
    const menu = document.createElement('div')
    menu.classList.add('menu')

    for(const item of items)
    {
        
        const menuItem = document.createElement('div')
        menuItem.classList.add('menu-item')
        menuItem.innerHTML = item.text
        menuItem.addEventListener('click', ()=>item.event())
        menu.appendChild(menuItem)
    }

    document.body.appendChild(menu)
    document.addEventListener("contextmenu", function(e){
        if(!element.contains(e.target))
        menu.style.display = 'none';
    })
    element.addEventListener("contextmenu", function(e) {      
        e.preventDefault();         
        // show the menu        
        menu.style.display = 'block';
        // set the left and top position based on mouse event coordonates
        menu.style.left = e.x + 'px';
        menu.style.top = e.y + 'px';        
    });

    // close the menu on document click
    // TODO verify if the click is in the menu boundaries
    document.addEventListener("click", function(e){
        menu.style.display = 'none';
    });
}