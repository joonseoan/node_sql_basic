const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
// app.set('views', 'views');

// setup mysql connection
// const db_mysql = require('./utils/database');

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop'); 
const { pageNotFound } = require('./controllers/pageNotFound');

// Then, execute the query / command
// *******8 The table name must be lowercase here.

// ----------------------- Practice --------------------------------
// 'then' is because db_mysql is using promise().
// Please find pool.promise() in /utils/database.js
// db_mysql.execute('SELECT * FROM products')
//     .then(result => {

//         /* 
//             [ BinaryRow {
//             id: 1,
//             title: 'Shameless',
//             price: 8.99,
//             description: 'A dummy book',
//             imageURL:
//             'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Red_Queen_book_cover.jpg/220px-Red_Queen_book_cover.jpg' } ],
                
//         */
//         console.log('SQL fetching result: ', result);
//         console.log('Separate Result: ', ' Result1 : ', result[0], ' Result2: ', result[1]);
//     })
//     .catch(err => {
//         console.log('Error at SQL fetching a data: ', err);
//     });

    // -----------------------------------------------------------------------------

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouters);
app.use(shopRouters);

app.use(pageNotFound);

app.listen(3000, () => {

    console.log('Port: 3000')

});