



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

import { fileSystem } from './file-system/file-system'
// const app = document.querySelector('#app')
// const window = document.querySelector('#window')
// const header = document.querySelector('#header')
// import './window.css'
// import resizeElement from './window/resize'
// import dragElement from './window/drag'
// const buttons = document.getElementsByClassName('nav-button')
// for(const button of buttons)
// {
//     button.addEventListener('mousedown',e=>{
//         e.stopPropagation()
//     })
// }
// dragElement(window, header);
// resizeElement(window);   
import {window} from './window/window'
fileSystem(window("My Window"), structure)
