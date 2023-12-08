const Router = require('express')
const router = new Router()
const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')
const yearRouter = require('./YearRouter')
const typeRouter = require('./typeRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/year', yearRouter)
router.use('/article', articleRouter)


module.exports = router