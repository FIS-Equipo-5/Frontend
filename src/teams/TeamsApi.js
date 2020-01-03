class TeamsApi{
    
    static API_BASE_URL = "/api/v1"

    static requestHeader(){
        return{ }
    }

    static getAllTeams(token){
        const request = new Request(TeamsApi.API_BASE_URL+ "/teams", {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });
        return fetch(request).then(response => {
            return response.json();
        });
    }
}

export default TeamsApi;