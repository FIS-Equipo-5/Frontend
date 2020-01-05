


class AuthApi {

    static API_BASE_URL = "/api/v1"

    static requestHeader() {
        return {}
    }

    static authenticate(email, password) {
        const request = new Request(this.API_BASE_URL + "/users/authenticate", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        return fetch(request).then(response => {
            localStorage.setItem('authToken', response.body.token);
            window.location.reload(false);
        }).catch(error => {
            return error;
        });
    }


    static register(name, email, password) {
        const request = new Request(this.API_BASE_URL + "/users/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
            })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

}

export default AuthApi;