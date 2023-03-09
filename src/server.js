/*
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: "localhost"
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

}

init();
*/
// url untuk melihat app deploy ----->  http://notesapp-v1.dicodingacademy.com/notes/new

const Hapi = require('@hapi/hapi');
// import file routes.js
const routes = require('./routes');

const init = async () => {

    // config Hapi ---> config Server
    const server = Hapi.server({
        port: 5000,
        host: "localhost",
        // routes: {
        //     cors: {
        //         origin: ['*'],
        //     },
        // },
    });

    server.route(routes);

    await server.start();
    console.log(`server run on ${server.info.uri}`);
}

init();