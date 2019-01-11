const express=require('express');

let server=express();
server.listen(8080);

//----------------------
server.use('/users', require('./routers/users'));

//---------------------
server.use('/article', require('./routers/article'));
