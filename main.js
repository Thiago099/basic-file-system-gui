
import { renderElement } from './element/element'
const app = document.querySelector('#app')



const structure = [
    {
        name: 'folder1',
        type: 'folder',
        children: [
            {
                name: 'folder2',
                type: 'folder',
                children: [
                    {
                        name: 'my file',
                        type: 'file',
                    }
                ]

            },
            {
                name: 'file1',
                type: 'file',
            },
            {
                name: 'file2',
                type: 'file',
            }
        ]
    },
    {
        name: 'folder2',
        type: 'folder',
        children: [
            {
                name: 'file3',
                type: 'file',
            },
            {
                name: 'file4',
                type: 'file',
            }
        ]
    },
    {
        name: 'file5',
        type: 'file',
    }
]

import './style.css'
const path = []
fileSystem(app, structure)
function fileSystem(element, data) {
    const control = document.createElement('div')
    control.classList.add('path-control')
    element.appendChild(control)
    const view = document.createElement('div')
    view.classList.add('view')
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
    function navigate(item)
    {
        render(item.children)       
        path.push(item)
        renderPath()
    }

    function render(data)
    {
        const actions = {
            'folder':(item) => {
                navigate(item)
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
// renderElement(app,'Folder 2', 'folder',events)
// renderElement(app,'Long folder name', 'folder',events)
// renderElement(app,'File 1', 'file',events)

