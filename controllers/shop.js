const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

    Product.fetchAll()
        .then(([products, meta]) => {

            res.render('shop/productList', { 
                products, 
                docTitle: 'All Products', 
                path: '/products'
             });

        })
        .catch(err => { console.log('cannot get fetch all')});

    // File based
    // Product.fetchAll(products => {
    //     res.render('shop/productList', { 
    //         products, 
    //         docTitle: 'All Products', 
    //         path: '/products'
    //      });
    // });
        
}

exports.getProduct = (req, res, next) => {
    
    // id must be identified with router.get('/products/:id')
    const id = req.params.id;

    // 'Product' is defined because we need to find a document out of all documents in a collection.
    
    Product.findProductById(id)
        .then(([product]) => {
            console.log(product, 'products in [product]')
            res.render('shop/productDetail', {
                // 'product' is still an array.
                // We need to extract an element.
                product: product[0],
                docTitle: product.title,
                path: '/products'
             });
        })
        .catch(err => {console.log(err)});
    // Product.findProductById(id, product => {
    //     res.render('shop/productDetail', {
    //         product,
    //         docTitle: product.title,
    //         path: '/products'
    //     });
    // });

}

exports.getIndex = (req, res, next) => {
    // We do not need to use callback
    //  because sql database is using promise.
    // ([products, meta ]): by es6, 
    //      we can define parameters in elements' order of an array
    Product.fetchAll().then(([products, meta ]) => {

        console.log(products)
        res.render('shop/index', { 
            products, 
            docTitle: 'Shop', 
            path: '/'
         });
    }).catch(err => {
        console.log(err);
    });

    // File based
    // Product.fetchAll(products => {
    //     res.render('shop/index', { 
    //         products, 
    //         docTitle: 'Shop', 
    //         path: '/'
    //      });
    // });

 }

exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData) {
                    console.log('cartProductData: ', cartProductData)
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });

    });

}

exports.postCart = (req, res, next) => {

    const id = req.body.id;

    Product.findProductById(id, product =>{
        // console.log('product@findProdut : ', product);
        Cart.addProduct(product.id, product.price);
    });

    // It should be run in Promise
    res.redirect('/cart');

}

exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
        docTitle: 'Your Orders',
        path: '/orders'
    });

}

exports.postCartDeleteItem = ( req, res, next) => {
    const { id }= req.body;

    Product.findProductById(id, product => {
        console.log('deleteCartPRODUCT ITEM: ', product)
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
    });

}

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    });

}