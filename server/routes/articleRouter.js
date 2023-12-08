const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), articleController.create)
router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)

module.exports = router