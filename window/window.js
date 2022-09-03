import './window.css'
import {dragElement} from './drag'
import {resizeElement} from './resize'
export function window(title)
{
    const window = document.createElement('div')
    window.onselectstart = () => false

    window.classList.add('window')
    const header = document.createElement('div')
    header.classList.add('header')
    window.appendChild(header)
    const myTitle = document.createElement('div')
    myTitle.classList.add('title')
    myTitle.innerHTML = title
    header.appendChild(myTitle)
    const closeButton = document.createElement('div')
    closeButton.classList.add('nav-button')
    closeButton.innerHTML = '×'
    closeButton.addEventListener('click', () => {
        window.remove()
    })
    closeButton.addEventListener('mousedown', e => {
        e.stopPropagation()
    })
    header.appendChild(closeButton)
    const element = document.createElement('div')
    window.appendChild(element)
    element.classList.add('content')
    dragElement(window, header);
    resizeElement(window); 
    document.body.appendChild(window)
    return element
}