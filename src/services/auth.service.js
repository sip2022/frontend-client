import axios from "axios";
// URL a la que pegar para login --> /singup y /singin
// const API_URL = "http://localhost:8080/api/auth/"; 
const API_URL = "https://sip-api-dev.herokuapp.com/"

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "https://sip-api-dev.herokuapp.com/",
    mode: 'no-cors', 
    cache: 'no-cache',
}


class AuthService {

    login(username, password) {
    return axios
        .post(API_URL + "signin", { username, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, dni, email, age, phone, password) {
        //   https://sip-api-dev.herokuapp.com/user
        return axios.post(API_URL + "user", JSON.stringify({
            dni: dni,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            age: age,
            phone: phone
        }), {
            headers: headers
        });
    }

}

export default new AuthService();