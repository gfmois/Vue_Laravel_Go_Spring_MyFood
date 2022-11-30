import Api from '../Api'
import secret from '../../secret'

export default {
    getHolidays() {
        return Api(`${secret.CLIENT_SERVER}`).get()
    }
}