const {Year} = require('../models/models')
const ApiError = require('../error/ApiError');

class YearController {
    async create(req, res){
        const {name} = req.body
        const year = await Year.create({name})
        return res.json(year)
    }

    async getAll(req, res){
        const years = await Year.findAll()
        return res.json(years)
    }
}

module.exports = new YearController()