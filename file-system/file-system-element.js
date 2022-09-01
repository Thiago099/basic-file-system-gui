import '@fortawesome/fontawesome-free/css/all.css'
import './file-system-element.css'
import { contextMenu } from './context-menu'

const types = {
'folder': ['fa-solid','fa-folder','folder-icon','icon'],
'file': ['fa-solid','fa-file','file-icon','icon'],
}
const elements = []

export function renderElement(parent,name,type, events = {})
{
    const element = document.createElement('div')
    // on drag start

    element.draggable = true
    
    element.classList.add('element')
    const elementIcon = document.createElement('i')
    elementIcon.classList.add(...types[type])
    element.appendChild(elementIcon)
    const elementName = document.createElement('div')
    elementName.classList.add('element-name')
    elementName.innerText = name
    element.appendChild(elementName)
    parent.appendChild(element)
    const current = {element,selected:false}
    elements.push(current)
    
    element.addEventListener('mousedown',(e) =>{
        e.stopPropagation()
    })
    element.addEventListener('click',(e) =>{
        if(ctrlPressed)
        {
            current.selected = !current.selected
            element.classList.toggle('element-selected')
        }
        else
        {
            for(const item of elements)
            {
                item.element.classList.remove('element-selected')
                item.selected = false
            }
            current.selected = true
            element.classList.add('element-selected')
        }
    })
    var clicked = false
    element.addEventListener('click',(e) =>{
        if(clicked)
        {
            if("open" in events)
            events["open"]()
        }
        clicked = true
        setTimeout(()=>{
            clicked = false
        },200)
    })
    contextMenu(element,[
    {
        text:'<span style="color:#0c0"><i class="fa-solid fa-play"></i> Open</span>',
        event:()=>{
            if("open" in events)
            events["open"](type)
        }
    },
    {
        text:'<i class="fa-solid fa-pen"></i> Rename',
        event:()=>{
            if("rename" in events)
            events["rename"]()
        }
    },
    {
        text:'<span style="color:#c00"><i class="fa-solid fa-trash"></i> Delete</span>',
        event:()=>{
            if("delete" in events)
            events["delete"]()
        }
    }],
    ()=>{
        if(!current.selected)
        {
            for(const element of elements)
            {
                element.element.classList.remove('element-selected')
                element.selected = false
            }
            current.selected = true
            element.classList.add('element-selected')
        }
    })
}
import {areaSelectionTool} from './area-selection.js'

var ctrlPressed = false
document.addEventListener('keydown',ev=>{
    if(ev.key === 'Control')
    {
        ctrlPressed = true
    }
})
document.addEventListener('keyup',ev=>{
if(ev.key === 'Control')
    {
        ctrlPressed = false
    }
})

document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState === 'visible')
    {
        ctrlPressed = false
    }
})
areaSelectionTool((left,top,right,bottom)=>{
    for(const current of elements)
    {
        const element = current.element
        // get element left top right and bottom
        const {offsetLeft,offsetTop,offsetWidth,offsetHeight} = element
        if(offsetLeft > right || offsetLeft + offsetWidth < left || offsetTop > bottom || offsetTop + offsetHeight < top)
        {
            if(!ctrlPressed)
            {
                current.selected = false
                element.classList.remove('element-selected')
            }
            }
            else
            {
                if(ctrlPressed)
                {
                    if(element.classList.contains('element-selected'))
                    {
                        element.classList.remove('element-selected')
                        current.selected = false
                    }
                    else
                    {
                        element.classList.add('element-selected')
                        current.selected = true
                    }
                }
                else
                {
                    element.classList.add('element-selected')
                    current.selected = true
                }
        }
    }
})