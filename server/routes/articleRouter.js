const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', articleController.create)
router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)
router.delete('/:id', checkRole("ADMIN"), articleController.delete)
router.put('/:id', checkRole("ADMIN"), articleController.update)
router.get('/search', articleController.getSearchAllArticleByName)

module.exports = router