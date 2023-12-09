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

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Year.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Year.destroy({where:{id}}).then(() => {
                            return res.json("Year deleted");
                        })
                    } else {
                        return res.json("This Year doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new YearController()