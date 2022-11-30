import Api from '../Api'
import secret from '../../secret'

export default {
    getHolidays(comensales) {
        return Api(`${secret.CLIENT_SERVER}`).get('', {
            params: {
                comensales
            }
        })
    }
}