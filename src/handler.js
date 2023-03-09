/*
    ======= STRUKTUR CONFIGURATION ======
    id: string , title: string, cratedAt: string , updateAt: string , tags: array of string , body: string
*/

// create addNotes handler to inset into notes.js
const { nanoid } = require('nanoid');
const notes = require('./notes');

// ===============================================================   CREATE   ============================================================================
const addNotesHandler = (request, h) => {

    // accept value from notes.js use properti payload / body requset = title tags body
    const { title , tags , body } = request.payload;

    // config id with nanoid and insert value 
    const id = nanoid(16);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        title , tags , body , id , createdAt , updatedAt
    }

    // push array notes with value from newNotes
    notes.push(newNotes);

    // cek apakah newNotes sudah masuk kedalam array
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status: "sucess",
            message: "catatan berhasil diTambahkan",
            data: {
                noteId: id
            }
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: "failed",
        message: "catatan gagal diTambahkan!"
    });
    response.code(500);
    return response;

}

// ===============================================================    READ    ============================================================================
const getAllNotesHandler = () => ({
    status: "Success!",
    data: {
        notes
    }
});

const getAllByIdHandler = (request, h) => {

    const { id } = request.params;

    const note = notes.filter( (note) => note.id === id )[0];

    if( note !== undefined ){
        return {
            status: "Success!",
            data: {
                note
            }
        };
    }

    const response = h.response({
        status: "Failed",
        message: "Catatan tidak diTemukan!"
    });
    response.code(404);
    return response;

}

// ===============================================================   UPDATE   ============================================================================
const editNoteByIdHandler = (request, h) => {

    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex( (index) => index.id === id );

    if( index !== -1 ){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        };
        const response = h.response({
            status: "Success!",
            message: "Catatan berhasil diPerbaharui!"
        });
        response.code(200);
        return response;
    }

    // jika gagal 
    const response = h.response({
        status: "Failed",
        message: "Catatan gagal diPerbaharui id tidak ditemukan"
    });
    response.code(404);
    return response;

}

// ===============================================================   DELETE   ============================================================================
const deleteNoteByIDHandler = (request, h) => {

    // get id
    const { id } = request.params;
    // find id 
    const index = notes.findIndex( (note) => note.id === id );

    // jika berhasil menemukan id dan siap note diHapus
    if( index !== -1 ){
        notes.splice(index, 1);
        const response = h.response({
            status: "Success!",
            message: "Catatan berhasil diHapus!"
        });
        response.code(200);
        return response;
    }

    // jika tidak menemukan id maka gagal dihapus
    const response = h.response({
        status: "Failed",
        message: "Catatan gagal diHapus id tidak ditemukan!"
    });
    response.code(404);
    return response;
}

module.exports = { addNotesHandler , getAllNotesHandler , getAllByIdHandler , editNoteByIdHandler , deleteNoteByIDHandler };



/*
const nanoid = require('nanoid');
const notes = require('./notes')
// create arrow function param = request and h
function addNotesHandler = (request, h) => {

    // accept value from notes.js use properti payload / body requset = title tags body with descructuring object
    const { title, tags, body } = request.payload;
    // config id with nanoid and insert value 
    const id = nanoid(16);
    // config createdAt = new Date.toISOString() and config updatedAt = createdAt
    const createdAt = new Date.toISOString();
    // descructuring array / create array to insert values = title , tags , body , createdAt , updatedAt 
    const newNotes = [ title , tags , body , createdAt , updatedAt ];
    // push array notes value = variable dastructuring array
    notes.push(newNotes);
    // cek apakah data sudah masuk ke array notes (file-notes.js) with filter and condition panjang notes > 0 then input to variabel 
    const isSucces = notes.filter( (note) note.id === id ).length > 0;
    // condition succes ( create variable response = h.response { configuration status , message , and data = noteId: id } )
    if( isSucces ){
        const response = h.response({
            status: "Success!",
            message: "Catatan berhasil diTambahkan!",
            data: {
                noteId: id
            }
        });
        // display response code same with response status code
        response.code(200);
        // return response;
        return response;
    }

    // condition failed ( create variable response = h.response { configuration status , message , } )
    const response = h.response({
        status: "Failed",
        message: "Catatan Gagal diTambahkan"
    });
    // display response code same with response status code
    response.code(500);
    // return response;
    return response;

}
*/