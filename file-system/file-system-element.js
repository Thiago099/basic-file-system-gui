import '@fortawesome/fontawesome-free/css/all.css'
import './file-system-element.css'
import { contextMenu } from './context-menu'

const types = {
'folder': ['fa-solid','fa-folder','folder-icon','icon'],
'file': ['fa-solid','fa-file','file-icon','icon'],
}
export const elements = []
export const dragTarget = {value:null}

var menu = null
export function renderElement(parent,name,type,index, events = {})
{
    
    const element = document.createElement('div')
    element.classList.add('element')
    const sub = document.createElement('div')
    element.appendChild(sub)
    // on drag start

    element.draggable = true
    
    sub.classList.add('sub')
    const elementIcon = document.createElement('i')
    elementIcon.classList.add(...types[type])
    sub.appendChild(elementIcon)
    const elementName = document.createElement('div')
    elementName.classList.add('element-name')
    elementName.innerText = name
    function editName()
    {
        elementName.setAttribute('contenteditable',true)
        elementName.draggable = false
        elementName.classList.add('element-name-edit')
        elementName.focus()
        // select all text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(elementName);
        selection.removeAllRanges();
        selection.addRange(range);  
        function cancelEditName(e)
        {
            // if not passed trough elementName
            if(!elementName.contains(e.target))
            {
                elementName.setAttribute('contenteditable',false)
                elementName.draggable = true
                elementName.classList.remove('element-name-edit')
                document.removeEventListener('mousedown',cancelEditName)
            }
        }
        elementName.addEventListener('keydown',e=>{
            if(e.key === 'Enter')
            {
                elementName.setAttribute('contenteditable',false)
                elementName.draggable = true
                elementName.classList.remove('element-name-edit')
                document.removeEventListener('mousedown',cancelEditName)
            }
        })
        document.addEventListener('mousedown',cancelEditName)
    }
    

    

    sub.appendChild(elementName)
    parent.appendChild(element)
    const current = {element,sub,index,selected:false,cropped:false}
    elements.push(current)
    
    element.addEventListener('mousedown',(e) =>{
        e.stopPropagation()
    })
    // ctrl + x
    
            

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
    element.addEventListener('dragstart',(e) =>{
        if(ctrlPressed)
        {
            current.selected = true
            element.classList.add('element-selected')
        }
        else
        {
            if(!current.selected)
            {
                for(const item of elements)
                {
                    item.element.classList.remove('element-selected')
                    item.selected = false
                }
                current.selected = true
                element.classList.add('element-selected')
            }
        }
    })
    element.addEventListener('dragover',(e) =>{
        if(!current.selected && type == 'folder')
        {
            dragTarget.value = {index,type:'sibling'}
            // allow drop
            e.preventDefault()
                
        }
    })
    element.addEventListener('dragleave',(e) =>{
        dragTarget.value = null
    })
    element.addEventListener('dragend',(e) =>{
        if(dragTarget.value != null)
        {
            events['drop'](
                dragTarget.value.type,
                dragTarget.value.index,
                elements.filter(item => item.selected).map(item => item.index))
        }
        dragTarget.value = null
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
        },500)
    })
    menu = contextMenu(element,[
    {
        text:'<span style="color:#0c0"><i class="fa-solid fa-play"></i> Open</span>',
        event:()=>{
            if("open" in events)
            events["open"](type)
        }
    },
    {
        text:'<span style="color:#c00"><i class="fa-solid fa-trash"></i> Delete</span>',
        event:()=>{
            if("delete" in events)
            events["delete"](index)
        }
    },
    {
        text:'<i class="fa-solid fa-pen"></i> Rename',
        event:()=>{
            editName()
        }
    },
    'separator',
    // copy
    {
        text:'<i class="fa-solid fa-copy"></i> Copy',
        event:()=>{
            if("copy" in events)
            events["copy"]()
        }
    },
    // cut
    {
        text:'<i class="fa-solid fa-cut"></i> Cut',
        event:()=>{
            if("cut" in events)
            events["cut"]()
        }
    }
],
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
