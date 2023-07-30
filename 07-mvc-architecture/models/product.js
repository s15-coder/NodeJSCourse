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
    constructor(t) {
        this.title = t
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            });
        })

    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}