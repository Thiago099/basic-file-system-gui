
import { renderElement } from './element/element'
const app = document.querySelector('#app')

const events = {
    open: () => {
        alert('open')
    },
    delete: () => {
        alert('delete')
    },
    rename: () => {
        alert('rename')
    }
}


renderElement(app,'Folder 1', 'folder',events)
renderElement(app,'Folder 2', 'folder',events)
renderElement(app,'Long folder name', 'folder',events)
renderElement(app,'File 1', 'file',events)
