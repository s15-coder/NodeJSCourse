const fs = require('fs')
const path = require('path')

const filePath = path.join(path.dirname(require.main.filename),
    'data',
    'products.json'
)

const getProductsFromFile = cb => {
    if (!fs.existsSync(filePath)) {
        return cb([])
    }
    fs.readFile(filePath, (err, fileContent) => {
        cb(JSON.parse(fileContent))
    })
}

module.exports = class Product {

    constructor(title, description, imageUrl, price) {
        this.title = title
        this.description = description
        this.imageUrl = imageUrl
        this.price = price
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(filePath, JSON.stringify(products), err => {
                if (err) {
                    console.log(err);
                }
            });
        })

    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}