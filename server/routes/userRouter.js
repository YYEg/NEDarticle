const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Add appropriate routes with the authMiddleware
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/role', authMiddleware, userController.checkRole)
router.get('/auth', authMiddleware, userController.check)

// Ensure that the authMiddleware is used before the sendName route to populate req.user
router.get('/username', authMiddleware, userController.sendName)

module.exports = router