
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

import { fileSystem } from './file-system/file-system'
fileSystem(app, structure)