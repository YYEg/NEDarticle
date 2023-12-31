const Router = require('express')
const router = new Router()
const yearController = require('../controllers/yearController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), yearController.create)
router.get('/', yearController.getAll)
router.delete('/:id', checkRole("ADMIN"), yearController.delete);

module.exports = router