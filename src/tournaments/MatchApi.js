class MatchsApi {

    static API_BASE_URL = "/api/v1"
    

    static requestHeader() {
        return {}
    }

    static getAllMatches(token, currentPage) {
        const request = new Request(MatchsApi.API_BASE_URL + `/matches?page=${currentPage}`, {
            method: 'GET',
            headers: {
                'x-access-token': token,
            },
        });

        return fetch(request).then(response => {
            // console.log('fetch all '+ response.json())

            return response.json();
        });
    }
    

    static getMatchById(token) {
        const request = new Request(MatchsApi.API_BASE_URL + "/matches", {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static putMatchById(updateMatch, token) {
        const request = new Request(MatchsApi.API_BASE_URL + "/match/" + updateMatch._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                // origin_team_id: updateMatch.origin_team_id,
                // destiny_team_id: updateMatch.destiny_team_id,
                // transfer_date: updateMatch.transfer_date,
                // contract_years: updateMatch.contract_years,
                // cost: updateMatch.cost,
                // player_id: updateMatch.player_id,
            })
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static deleteMatch(id, token) {
        const request = new Request(MatchsApi.API_BASE_URL + "/match/" + id, {
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

}

export default MatchsApi;