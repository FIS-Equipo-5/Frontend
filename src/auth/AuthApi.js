


class AuthApi {

    static API_BASE_URL = (process.env.NODE_ENV==="production")? "https://fis-gr5-auth.herokuapp.com/api/v1" : "/api/v1"

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

        return fetch(request).then(response => response.json()).then(data => {
            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('userName', data.data.user.name);
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

    static logout(){
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        window.location.href = "/";

    }

}

export default AuthApi;