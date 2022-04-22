import axios from 'axios';
import authHeader from './auth-Header';

const API_URL = 'https://sip-api-dev.herokuapp.com';

class UserService {

    /*
        TODO PONER AQUI TODOS LOS SERVICIOS A PEDIR DEL BACK
    */

    getUserList() {
        return axios.get(API_URL + '/user/all', {headers: authHeader() });
    }

}

export default new UserService();