import './area-selection.css'
export function areaSelectionTool(element, callback)
{
    var rectangle = document.createElement('div')
    rectangle.classList.add('rectangle')
    rectangle.style.display = 'none'
    element.appendChild(rectangle)
    
    var x = 0
    var y = 0
    var left = 0
    var top = 0
    var width = 0
    var height = 0  
    var drag = false
    function update_rectangle()
    {
        rectangle.style.left = left + 'px'
        rectangle.style.top = top + 'px'
        rectangle.style.width = width + 'px'
        rectangle.style.height = height + 'px'
    }
    var valid = false
    function mousemove(ev)
    {
        const {clientX, clientY} = ev
        if(clientX < x)
        {
            left = clientX
            width = x - clientX
        }
        else
        {
            width = clientX - x
        }
        if(clientY < y)
        {
            top = clientY
            height = y - clientY
        }
        else
        {
            height = clientY - y
        }
        if(width > 10 || height > 10)
        {
            rectangle.style.display = 'block'
        }
        update_rectangle()
        
    }
    element.addEventListener('mousedown', (ev)=>{
        if(ev.button === 0)
        {
            valid = true
            ev.preventDefault()
            const {clientX, clientY} = ev
            x = clientX
            y = clientY
            left = clientX
            top = clientY
            width = 0
            height = 0
            document.addEventListener('mousemove', mousemove)
            drag = true
            update_rectangle()
        }
    
    })
    document.addEventListener('mouseup',(ev)=>{
        if(!valid) return
        valid = false
        const {clientX, clientY} = ev
        let left, top, right, bottom
        if(clientX > x)
        {
            left = x
            right = clientX
        }
        else
        {
            left = clientX
            right = x
        }
        if(clientY > y)
        {
            top = y
            bottom = clientY
        }
        else
        {
            top = clientY
            bottom = y
        }
        
        
        document.removeEventListener('mousemove', mousemove)
        drag = false
        update_rectangle()
        if(rectangle.style.display === 'block')
        callback(left, top, right, bottom)
        rectangle.style.display = 'none'
    })
}