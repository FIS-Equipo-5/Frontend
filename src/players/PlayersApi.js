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

    static getPlayer(idPlayer, token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/player/" + idPlayer, {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });
        return fetch(request).then(response => {
            return response.json();
        });
    }

    static postPlayer(newPlayer, token){
        console.log("post player", newPlayer)
        const request = new Request(PlayersApi.API_BASE_URL+ "/players", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                player_name: newPlayer.player_name,
                firstname: newPlayer.firstname,
                lastname: newPlayer.lastname,
                position: newPlayer.position,
                nationality: newPlayer.nationality,
                value: newPlayer.value,
                team_id: newPlayer.team_id,
                goals: {
                    total: newPlayer.goals.total,
                    assists: newPlayer.goals.assists
                }, 
                cards: {
                    yellow: newPlayer.cards.yellow,
                    red: newPlayer.cards.red
                }
              })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static putPlayer(updatePlayer, token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/player", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                _id: updatePlayer._id,
                player_name: updatePlayer.player_name,
                firstname: updatePlayer.firstname,
                lastname: updatePlayer.lastname,
                position: updatePlayer.position,
                nationality: updatePlayer.nationality,
                value: updatePlayer.value,
                team_id: updatePlayer.team_id,
                goals: {
                    total: updatePlayer.goals.total,
                    assists: updatePlayer.goals.assists
                }, 
                cards: {
                    yellow: updatePlayer.cards.yellow,
                    red: updatePlayer.cards.red
                }
              })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static deletePlayer(idPlayer, token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/player/" + idPlayer, {
            method: 'DELETE',
            headers: {
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static getPlayerAndTeam(idPlayer, token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/player/team/" + idPlayer, {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });
        return fetch(request).then(response => {
            return response.json();
        });
    }

    static getPlayerAllData(idPlayer, token){
        const request = new Request(PlayersApi.API_BASE_URL+ "/player/all/" + idPlayer, {
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