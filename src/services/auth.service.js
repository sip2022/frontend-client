import axios from "axios";

const API_URL = "https://sip-api-dev.herokuapp.com"

const headers = {
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
}

class AuthService {

    login(username, password) {
        // username contiene el mail --> username = mail
        // return axios
        //     .post(API_URL + "signin", { username, password })
        //     .then((response) => {
        //         if (response.data.accessToken) {
        //             localStorage.setItem("user", JSON.stringify(response.data));
        //         }
        //         return response.data;
        //     });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, dni, email, age, phone, password) {
        //   https://sip-api-dev.herokuapp.com/user
        return axios.post(API_URL + "/register", JSON.stringify({
            dni: dni,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            age: age,
            // phone: JSON.stringify(phone),
            phone: parseInt(phone),
            "rolesNames": ["USER"]
        }), {
            headers: headers
        });
    }

}

export default new AuthService();