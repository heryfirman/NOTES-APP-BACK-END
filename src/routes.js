/*
const {addNotesHandler} = require('./handler');
const routes = [
    {
        method: "POST",
        path: "/notes",
        handler: addNotesHandler
    }
]

module.exports = routes ;
*/

// import module hanler.js with descructuing object 
const { addNotesHandler , getAllNotesHandler , getAllByIdHandler , editNoteByIdHandler , deleteNoteByIDHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          }, 
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getAllByIdHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
        options: {
            cors: {
              origin: ['*'],
            },
          },
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIDHandler,
        options: {
            cors: {
                origin: ['*'],
            },
        },
    }
]

module.exports = routes;