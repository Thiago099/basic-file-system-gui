import { renderElement, dragTarget } from './file-system-element'

import './file-system.css'
export function fileSystem(element, data) {
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
        for(const item in data)
        {
            const events = {
                open: (type) => {
                    actions[data[item].type](data[item])
                },
                delete: () => {
                    alert('delete')
                },
                rename: () => {
                    alert('rename')
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
                }
            }
            renderElement(view,data[item].name, data[item].type,item,events)
        
        }
    }
}

