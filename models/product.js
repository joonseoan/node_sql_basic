const db = require('../utils/database');

// import cart model to delete
const Cart = require('./cart');

module.exports = class Product {
    
    constructor(id, title, imageUrl, description, price) {

        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // Insert
    save() {

        return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', 
        [this.title, this.price, this.description, this.imageUrl]
        );

    }

    static fetchAll() {

        // return is required to get async of promise
        return db.execute('SELECT * FROM products');
        

    }

    static deleteById(id) {

    }

    static findProductById(id){

        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
       
    }

}