const axios = require('axios')
const faker = require('faker')
const moment = require('moment')
const qs = require('qs')

class Mcdo {
    constructor({
        clientId,
        clientSecret
    }) {
        this.request = axios.create({
            baseURL: 'https://ws.mcdonalds.fr',
            headers: {
                'User-Agent': 'Mcdonalds/5.4.9'
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, {
                    arrayFormat: 'repeat'
                })
            }
        })
        this.clientId = clientId,
            this.clientSecret = clientSecret
    }

    setAccessToken(accessToken) {
        this.request.defaults.headers.common['Authorization'] = ''
        delete this.request.defaults.headers.common['Authorization']

        this.request.defaults.headers.common[
            'Authorization'
        ] = `bearer ${accessToken}`
    }

    async getAccessToken() {
        try {
            let auth = await this.request({
                method: 'POST',
                url: '/oauth/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'client_credentials'
                },
                responseType: 'json'
            })
            this.setAccessToken(auth.data.access_token)
            return auth.data
        } catch (err) {
            console.log('error with getAccessToken', err)
            return err
        }
    }

    async getRestaurantDetails(restaurantId) {
        try {
            let restaurant = await this.request({
                method: 'GET',
                url: `/api/restaurant/${restaurantId}`,
                params: {
                    responseGroups: 'RG.CUSTOMER.ADDRESS'
                },
                responseType: 'json'
            })
            return restaurant.data
        } catch (err) {
            console.log('error with getRestaurantDetails', err)
            return err
        }
    }

    async getProducts() {
        try {
            let products = await this.request({
                method: 'GET',
                url: `/api/catalog/gomcdo`,
                params: {
                    eatType: 'TAKE_OUT',
                    responseGroups: ['RG.CATEGORY.PICTURES', 'RG.CATEGORY.POPINS', 'RG.PRODUCT.PICTURES', 'RG.PRODUCT.CHOICE_FINISHED_DETAILS', 'RG.PRODUCT.RESTAURANT_STATUS', 'RG.PRODUCT.INGREDIENTS', 'RG.PRODUCT.POPINS', 'RG.PRODUCT.CAPPING']
                },
                responseType: 'json'
            })
            return products.data
        } catch (err) {
            console.log('error with getProducts', err)
            return err
        }
    }

    async getProductDetails(productId) {
        try {
            let product = await this.request({
                method: 'GET',
                url: `/api/product/${productId}`,
                params: {
                    'responseGroups': ['RG.PRODUCT.DEFAULT', 'RG.PRODUCT.PICTURES', 'RG.PRODUCT.ALLERGENS', 'RG.PRODUCT.RESTAURANT_STATUS', 'RG.PRODUCT.INGREDIENTS', 'RG.PRODUCT.NUTRITIONAL_VALUES']
                },
                responseType: 'json'
            })
            return product.data
        } catch (err) {
            console.log('error with getProductDetails', err)
            return err
        }
    }

}

module.exports = Mcdo