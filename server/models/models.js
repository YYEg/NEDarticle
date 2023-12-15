const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Library = sequelize.define('library', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const LibraryArticle = sequelize.define('library_article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false, defaultValue: "не задано"},
})

const Year = sequelize.define('year', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false,   defaultValue: "не задано"},
})

const ArticleInfo = sequelize.define('article_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeYear = sequelize.define('type_year', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Library)
Library.belongsTo(User)

Library.hasMany(LibraryArticle)
LibraryArticle.belongsTo(User)

Type.hasMany(Article)
Article.belongsTo(Type)

Year.hasMany(Article)
Article.belongsTo(Year)

Article.hasMany(LibraryArticle)
LibraryArticle.belongsTo(Article)

Article.hasMany(ArticleInfo, {as: 'info'})
ArticleInfo.belongsTo(Article)

Type.belongsToMany(Year, {through: TypeYear})
Year.belongsToMany(Type, {through: TypeYear})

module.exports = {
    User,
    Library: Library,
    CartDevice: LibraryArticle,
    Article: Article,
    Type,
    Year: Year,
    TypeBrand: TypeYear,
    ArticleInfo: ArticleInfo
}
