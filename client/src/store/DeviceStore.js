import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Смартфоны'},
            {id: 4, name: 'Пылесосы'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Lenovo'},
            {id: 4, name: 'Xiaomi'},
        ]
        this._devices = [
            {
                "id": 1,
                "name": "15 pro",
                "price": 155990,
                "rating": 5,
                "img": "3af45bc9-4ad4-4161-a456-b7dd20204afd.jpg"
            },
            {
                "id": 2,
                "name": "14 mini",
                "price": 89990,
                "rating": 5,
                "img": "15ec7e67-8c9a-4ce2-8d27-d09cc1989a4d.jpg"
            },
            {
                "id": 3,
                "name": "s23ultra",
                "price": 111990,
                "rating": 5,
                "img": "88212c58-a769-4bbd-a078-f9a4d67a02f5.jpg"
            },
            {
                "id": 4,
                "name": "rs20",
                "price": 29990,
                "rating": 5,
                "img": "23d2bc93-c48a-406a-8d54-fbb8c4848b23.jpg"
            },
            {
                "id": 5,
                "name": "rs20",
                "price": 29990,
                "rating": 5,
                "img": "23d2bc93-c48a-406a-8d54-fbb8c4848b23.jpg"
            },
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }

    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    setSelectedType(type){
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }

    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}