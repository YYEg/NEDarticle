const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const {User, CartDevice} = require('../models/models')

class DeviceController {

    async addToCart(req, res, next) {
        try {
            const { userId, deviceId } = req.body;

            // Check if the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the device exists
            const device = await Device.findByPk(deviceId);
            if (!device) {
                return res.status(404).json({ message: 'Device not found' });
            }

            // Add device to user's cart
            const cartDevice = await CartDevice.create({ userId, deviceId });

            return res.json(cartDevice);
        } catch (error) {
            next(error);
        }
    }


    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deiceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        let {brandId, typeId, limit, page} =req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const  {id} = req.params
        const device = await  Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module .exports = new DeviceController()