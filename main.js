import './style.css'

import '@fortawesome/fontawesome-free/css/all.css'


const types = {
  'folder': ['fa-solid','fa-folder','folder-icon','icon'],
  'file': ['fa-solid','fa-file','file-icon','icon'],
}
function renderElement(parent,name,type)
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
  return element
}
import {areaSelectionTool} from './area-selection.js'


const app = document.querySelector('#app')
const elements = []
elements.push(renderElement(app,'Folder 1', 'folder'))
elements.push(renderElement(app,'Folder 2', 'folder'))
elements.push(renderElement(app,'Long folder name', 'folder'))
elements.push(renderElement(app,'File 3', 'file'))

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
// for(const element of elements)
// {
//   element.addEventListener('dragstart',(ev)=>{
//     ev.dataTransfer.setData('text/plain',ev.target.innerText)
//   })
// }