import Tournament from "./Tournament";


class TournamentApi {

    static API_BASE_URL = (process.env.NODE_ENV==="production")? "https://fis-g5-tournaments.herokuapp.com/api/v1" : "/api/v1"
    

    static requestHeader() {
        return {}
    }

    static getAllTournaments(token, currentPage) {
        const request = new Request(TournamentApi.API_BASE_URL + `/tournaments/?page=${currentPage}`, {
            method: 'GET',
            headers: {
                'x-access-token': token,
            },
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
    

    static getTournamentById(token) {
        const request = new Request(TournamentApi.API_BASE_URL + "/matches", {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static putTournamentById(updateMatch, token) {
        const request = new Request(TournamentApi.API_BASE_URL + "/match/" + updateMatch._id, {
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

    static deleteTournament(id, token) {
        const request = new Request(TournamentApi.API_BASE_URL + "/tournament/" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    static postTournament(tournament, token) {
        let obejcttoAdd =JSON.stringify({
            name: tournament.name,
            type: "clasification",
            clasification: [],
            endDate: tournament.endDate,
            startDate: tournament.startDate,
        })

        const request = new Request(TournamentApi.API_BASE_URL + "/tournament/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: obejcttoAdd
        });

       
        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

}

export default TournamentApi;