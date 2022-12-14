import { contextMenu } from './context-menu'
import { renderElement, dragTarget, elements } from './file-system-element'
import {areaSelectionTool} from './area-selection.js'

import './file-system.css'
const ctx= {source:null,indexes:[],type:null}
export function fileSystem(element, data) {
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

    var selected = false
    document.addEventListener('click',(e)=>{
        if(selected)
        {
            selected = false
            return
        }
        // if it passed trought any element return
        for(const element of elements)
        {
            if(element.element.contains(e.target))
            {
                return
            }
        }
        for(const element of elements)
        {
            element.element.classList.remove('element-selected')
            element.selected = false
        }
    })
    
    areaSelectionTool(element,(left,top,right,bottom)=>{
        selected = true
        // if it did not passed trough the menu
        
        for(const current of elements)
        {
            const element = current.element
            var rect = element.getBoundingClientRect();
            // get element left top right and bottom
            const [offsetLeft,offsetTop,offsetWidth,offsetHeight] = [rect.left,rect.top,rect.width,rect.height]
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
    const control = document.createElement('div')
    control.classList.add('path-control')
    element.appendChild(control)
    const view = document.createElement('div')
    element.appendChild(view)
    const path = [{name:'root',children:data,current: true}]
    render(data)
    renderPath()
    function renderPath()
    {
        control.innerHTML = ''
        for(const item in path)
        {
            const button = document.createElement('span')
            button.classList.add('path-item')
            button.innerText = path[item].name
            button.addEventListener('click',()=>{
                path.splice(Number(item)+1)
                for(const x of path)
                {
                    x.current = false
                }
                path[path.length-1].current = true
                render(path[item].children)
                renderPath()
            })
            if(!path[item].current)
            {
                button.addEventListener('dragover',(e)=>{
                    dragTarget.value = {type:'route',index:item}  
                    e.preventDefault()
                })
                button.addEventListener('dragleave',(e) =>{
                    dragTarget.value = null
                })
            }
            control.appendChild(button)
        }
    }
    
    function render(data)
    {
        document.onkeyup = (e) =>{
            if(e.ctrlKey || e.metaKey)
            {
                if(e.key == 'x')
                {
                    cut()
                }
                if(e.key == 'c')
                {
                    copy()
                }
                if(e.key == 'v')
                {
                    paste()
                }
                if(e.key == 'a')
                {
                    e.preventDefault()
                    e.stopPropagation()
                }
            }
        }
        data = data.sort((a,b)=>{
            // make folders appear first
            if(a.type == 'folder' && b.type == 'file')
            {
                return -1
            }
            if(a.type == 'file' && b.type == 'folder')
            {
                return 1
            }
            return a.name.localeCompare(b.name)
        })
        const actions = {
            'folder':(item) => {
                render(item.children)       
                path.push(item)
                for(const x of path)
                {
                    x.current = false
                }
                path[path.length-1].current = true
                renderPath()
            },
            'file':(item) => alert(item.name)
        }
        view.innerHTML = ''
        elements.splice(0,elements.length)
        for(const item in data)
        {
            const events = {
                open: (type) => {
                    actions[data[item].type](data[item])
                },
                delete: (index) => {
                    data.splice(index,1)
                    render(data)
                },
                copy: () => {
                    copy()
                },
                cut: () => {
                    cut()
                },

                drop: (type, target, source) => {
                    // remove all index from source
                    var targetItem
                    if(type == 'sibling')
                    {
                        targetItem = data[target]
                    }
                    else
                    {
                        targetItem = path[target]
                    }
                    for (var i = source.length -1; i >= 0; i--)
                    {
                        const current = data[source[i]]
                        data.splice(source[i],1)
                        targetItem.children.push(current)
                    }
                    
                    render(data)
                },
            }
            renderElement(view,data[item].name, data[item].type,item,events,data,render)
        }
        contextMenu(document.body,[
            {
                text: '<i class="fas fa-folder"></i> New Folder',
                event: () => {
                    data.push({name:'New Folder',type:'folder',children:[]})
                    render(data)
                }
            },
            {
                text: '<i class="fas fa-file"></i> New File',
                event: () => {
                    data.push({name:'New File',type:'file'})
                    render(data)
                }
            },
            'separator'
            ,
            {
                text: '<i class="fas fa-paste"></i> Paste',
                event: () => {
                        paste()
                }
            }
        ])
        function cut()
        {
            ctx.source = data
            ctx.type = 'cut'
            ctx.indexes = []
            for(const index in elements)
            {
                if(elements[index].selected)
                {
                    elements[index].cropped = true
                    elements[index].sub.classList.add('element-cropped')
                    ctx.indexes.push(index)
                }
                else
                {
                    elements[index].cropped = false
                    elements[index].sub.classList.remove('element-cropped')
                }
            }
        }
        function copy()
        {
            ctx.source = []
            ctx.type = 'copy'
            for(const index in elements)
            {
                elements[index].cropped = false
                elements[index].sub.classList.remove('element-cropped')
            }
            for(var i=0;i<elements.length;i++)
            {
                if(elements[i].selected)
                {
                    ctx.source.push(data[i])
                }
            }
        }
        function paste()
        {
            if(ctx.type == 'cut')
            {
                console.log(ctx.indexes)
                for (var i = ctx.indexes.length -1; i >= 0; i--)
                {
                    const current = ctx.source[ctx.indexes[i]]
                    ctx.source.splice(ctx.indexes[i],1)
                    data.push(current)
                }
                render(data)
            }
            if(ctx.type == 'copy')
            {
                data.push(...JSON.parse(JSON.stringify(ctx.source)))
                render(data)
            }
        }
        // clear elements array
    }
    document.addEventListener('keydown',(e)=>{
        debugger    
        // if ctrl + a is pressed
        if(e.ctrlKey || e.metaKey)
        {
            if(e.key == 'a')
            {
                e.preventDefault()
                e.stopPropagation()
                for(const element of elements)
                {
                    element.selected = true
                    element.element.classList.add('element-selected')
                }
            }
        }
    })
    
}

