import './context-menu.css';
const menus = []
export function contextMenu(element, items, onopen=()=>{})
{
    const menu = document.createElement('div')
    menus.push(menu)
    menu.classList.add('menu')

    for(const item of items)
    {
        
        const menuItem = document.createElement('div')
        if(item == 'separator')
        {
            menuItem.classList.add('menu-separator')
        }
        else
        {
            menuItem.classList.add('menu-item')
            menuItem.innerHTML = item.text
            menuItem.addEventListener('click', (e)=>{
                e.stopPropagation()
                menu.style.display = 'none'
                item.event()
            })
        }
        menu.appendChild(menuItem)
    }

    document.body.appendChild(menu)
    document.addEventListener("contextmenu", function(e){
        if(!element.contains(e.target))
        menu.style.display = 'none';
    })
    element.addEventListener('mousedown', e=>{
        if(e.button === 2)
        {
            e.stopPropagation()
            e.preventDefault()
        }
    } )
    element.addEventListener('mouseup', e=>{
        //right button
        if(e.button === 2)
        {
            e.stopPropagation()
            e.preventDefault()
        }
    })

    element.addEventListener("contextmenu", function(e) {      
        e.preventDefault();         
        e.stopPropagation();
        for(const menu of menus)
        {
            menu.style.display = 'none'
        }
        // show the menu        
        menu.style.display = 'block';
        // set the left and top position based on mouse event coordonates
        menu.style.left = e.x + 'px';
        menu.style.top = e.y + 'px';     
        onopen()   
    });

    // close the menu on document click
    // TODO verify if the click is in the menu boundaries
    document.addEventListener("click", function(e){
        
        menu.style.display = 'none';
    });

    return menu
}