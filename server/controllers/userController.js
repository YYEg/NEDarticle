const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Library} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const cart = await Library.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async checkRole(req, res, next){
        const user = req.user; // Assuming req.user contains the user details
        if(user.role === 'ADMIN'){
            console.log(user.role)
            res.json({isAdmin: true}); // Return true if the user is an admin
        } else {
            res.json({isAdmin: false}); // Return false if the user is not an admin
        }
    }

    async sendName(req, res, next){
        // Debugging: Log req.user to inspect if user details are available

        if(req.user) {
            console.log(req.user);
            const username = req.user.email;
            console.log(username)
            return res.json(req.user.email);
        } else {
            return next(ApiError.badRequest('User details not found'));
        }
    }
}

module.exports = new UserController()