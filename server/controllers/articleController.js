const uuid = require('uuid')
const path = require('path')
const {Article, ArticleInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class ArticleController {

    async create(req, res, next){
        try{
            let {name, author, text, yearId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const article = await Article.create({name, author, text, yearId, typeId, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    ArticleInfo.create({
                        title: i.title,
                        description: i.description,
                        articleId: article.id
                    })
                )
            }

            return res.json(article)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        let {yearId, typeId, limit, page} =req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!yearId && !typeId){
            devices = await Article.findAndCountAll({limit, offset})
        }
        if(yearId && !typeId){
            devices = await Article.findAndCountAll({where: {yearId}, limit, offset})
        }
        if(!yearId && typeId){
            devices = await Article.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(yearId && typeId){
            devices = await Article.findAndCountAll({where: {typeId, yearId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const  {id} = req.params
        const article = await  Article.findOne(
            {
                where: {id},
                include: [{model: ArticleInfo, as: 'info'}]
            },
        )
        return res.json(article)
    }
}

module .exports = new ArticleController()