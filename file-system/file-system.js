import { renderElement } from './file-system-element'

import './file-system.css'
export function fileSystem(element, data) {
    const control = document.createElement('div')
    control.classList.add('path-control')
    element.appendChild(control)
    const view = document.createElement('div')
    element.appendChild(view)
    const path = [{name:'root',children:data}]
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
                render(path[item].children)
                renderPath()
            })
            control.appendChild(button)
        }
    }
    function render(data)
    {
        const actions = {
            'folder':(item) => {
                render(item.children)       
                path.push(item)
                renderPath()
            },
            'file':(item) => alert(item.name)
        }
        view.innerHTML = ''
        for(const item of data)
        {
            const events = {
                open: (type) => {
                    actions[item.type](item)
                },
                delete: () => {
                    alert('delete')
                },
                rename: () => {
                    alert('rename')
                }
            }
            renderElement(view,item.name, item.type,events)
        
        }
    }
}

