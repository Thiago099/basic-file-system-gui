
import { renderElement } from './element/element'
const app = document.querySelector('#app')

renderElement(app,'Folder 1', 'folder')
renderElement(app,'Folder 2', 'folder')
renderElement(app,'Long folder name', 'folder')
renderElement(app,'File 1', 'file')