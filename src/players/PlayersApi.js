class PlayersApi{
    
    static API_BASE_URL = "/api/v1"

    static requestHeader(){
        return{ }
    }

    static getAllPlayers(token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/players", {
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

export default PlayersApi;