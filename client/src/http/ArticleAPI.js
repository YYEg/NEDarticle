import {$authHost, $host} from "./index";

export  const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export  const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export  const createYear = async (year) => {
    const {data} = await $authHost.post('api/year', year)
    return data
}

export  const fetchYear = async () => {
    const {data} = await $host.get('api/year')
    return data
}

export  const createArticle = async (article) => {
    const {data} = await $authHost.post('api/article', article)
    return data
}

export  const fetchArticle = async (typeId, yearId, page, limit = 4) => {
    const {data} = await $host.get('api/article', {params: {
            typeId, yearId, page, limit
        }})
    return data
}

export  const fetchOneArticle = async (id) => {
    const {data} = await $host.get('api/article/' + id)
    return data
}