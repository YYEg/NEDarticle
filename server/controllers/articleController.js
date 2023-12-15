const uuid = require('uuid')
const path = require('path')
const {Article, ArticleInfo, Type, Year} = require('../models/models')
const ApiError = require('../error/ApiError')

const {Op} = require("sequelize");

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
        console.log("Функция getAll");
        let { yearId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = (page - 1) * limit;
        let articles;
        if (!yearId && !typeId) {
            articles = await Article.findAndCountAll({ limit, offset });
        }
        if (yearId && !typeId) {
            articles = await Article.findAndCountAll({ where: { yearId }, limit, offset });
        }
        if (!yearId && typeId) {
            articles = await Article.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (yearId && typeId) {
            articles = await Article.findAndCountAll({ where: { typeId, yearId }, limit, offset });
        }
        return res.json(articles);
    }


    async getOne(req, res, next) {
        console.log("Функция getOne");
        const id = parseInt(req.params.id);
        try {
            const article = await Article.findByPk(id, {
                include: [{ model: ArticleInfo, as: 'info' }]
            });
            return res.json(article);
        } catch (e) {
            next(ApiError.badRequest("Article not found"));
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Article.findOne({ where: { id } }).then(async (data) => {
                if (data) {
                    await Article.destroy({ where: { id } }).then(() => {
                        res.json("Article deleted");
                    });
                } else {
                    res.json("This Article doesn't exist in DB");
                }
            });
        } catch (e) {
            res.json(e);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {name, author, info, text, typeId, yearId } = req.body;

            await Article.findOne({ where: { id } }).then(async (data) => {
                if (data) {
                    let newVal = {};
                    yearId ? newVal.yearId = yearId : false;
                    typeId ? newVal.typeId = typeId : false;
                    name ? (newVal.name = name) : false;
                    author ? (newVal.author = author) : false;
                    text ? (newVal.text = text) : false;

                    if (info) {
                        const parseInfo = JSON.parse(info);
                        for (const item of parseInfo) {
                            await ArticleInfo.findOne({ where: { id: item.id } }).then(async (data) => {
                                if (data) {
                                    await ArticleInfo.update(
                                        {
                                            title: item.title,
                                            description: item.description
                                        },
                                        { where: { id: item.id } }
                                    );
                                } else {
                                    await ArticleInfo.create({
                                        title: item.title,
                                        description: item.description,
                                        articleId: id
                                    });
                                }
                            });
                        }
                    }

                    await Article.update(
                        {
                            ...newVal
                        },
                        { where: { id } }
                    ).then(() => {
                        res.json("Article updated");
                    });
                } else {
                    res.json("This Article doesn't exist in DB");
                }
            });
        } catch (e) {
            res.json(e);
        }
    }

    async getSearchAllArticleByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "All") {
                const articles =  await Article.findAndCountAll({
                    attributes: ["name", "author", "img", "id"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Year
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                return res.json(articles);
            } else {
                const article =  await Article.findAndCountAll({
                    attributes: ["name", "author", "img", "id", "yearId", "typeId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    yearId: null,
                                },
                                {
                                    typeId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Year
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })


                return res.json(article);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module .exports = new ArticleController()