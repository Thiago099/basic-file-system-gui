import '@fortawesome/fontawesome-free/css/all.css'
import './element.css'
import { contextMenu } from './context-menu'

const types = {
'folder': ['fa-solid','fa-folder','folder-icon','icon'],
'file': ['fa-solid','fa-file','file-icon','icon'],
}
const elements = []

export function renderElement(parent,name,type, events = {})
{
    const element = document.createElement('div')
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
    elements.push(element)
    
    
    element.addEventListener('dblclick', ev => {
        if("open" in events)
        events["open"]()
    })
    contextMenu(element,[
        {
        text:'<i class="fa-solid fa-play"></i> Open',
        event:()=>{
            if("open" in events)
            events["open"]()
        }
    },
    {
        text:'<i class="fa-solid fa-trash"></i> Delete',
        event:()=>{
            if("delete" in events)
            events["delete"]()
        }
    }])
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
    for(const element of elements)
    {
        // get element left top right and bottom
        const {offsetLeft,offsetTop,offsetWidth,offsetHeight} = element
        if(offsetLeft > right || offsetLeft + offsetWidth < left || offsetTop > bottom || offsetTop + offsetHeight < top)
        {
        if(!ctrlPressed)
        {
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
            }
            else
            {
            element.classList.add('element-selected')
            }
        }
        else
        {
            element.classList.add('element-selected')
        }
        }
    }
})