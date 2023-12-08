import {makeAutoObservable} from "mobx";

export default class ArticleStore {
    constructor() {
        this._types = []
        this._years = []
        this._articles = []
        this._selectedType = {}
        this._selectedYear = {}
        this._page = 1
        this._totalCount = 1
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }

    setYears(years){
        this._years = years
    }
    setArticles(articles){
        this._articles = articles
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedYear(year){
        this.setPage(1)
        this._selectedYear = year
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }
    setLimit(limit){
        this._limit = limit
    }

    get types(){
        return this._types
    }
    get years(){
        return this._years
    }
    get articles(){
        return this._articles
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedYear(){
        return this._selectedYear
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}