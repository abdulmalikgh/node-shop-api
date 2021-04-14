const express = require('express')
const multer = require('multer')
const router = express.Router()
const authuser = require('../middleware/auth-user')

const {
    delete_product,
    update_product,
    get_single_product,
    get_products,
 } = require('../controllers/product')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = function(req, file, cb) {
    // rejecting file types
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({storage: storage, limits: {
   fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter})

router.get('/', get_products)

router.post('/',authuser,upload.single('image'),get_single_product)

router.get('/:productID',)

router.patch('/:productID', authuser,upload.single('image'), update_product)

router.delete('/:productID', authuser,delete_product)

module.exports = router