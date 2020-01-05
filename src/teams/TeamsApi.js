class TeamsApi{
    
    static API_BASE_URL = "/api/v1"

    static requestHeader(token){
        return{'x-access-token': token }
    }

    static getAllTeams(token){
        const request = new Request(TeamsApi.API_BASE_URL+ "/teams", {
            method: 'GET',
            headers: this.requestHeader(token)
        });
        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default TeamsApi;