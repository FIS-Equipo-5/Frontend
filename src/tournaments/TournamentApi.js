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
    

    static getTournamentById(tournamentId,token) {
        const request = new Request(TournamentApi.API_BASE_URL + "/tournament/"+tournamentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static putTournamentById(updateTournament, token) {
        let id =updateTournament._id
        delete updateTournament._id;
        delete updateTournament.__v;
        let bodytosend = JSON.stringify(updateTournament)
        const request = new Request(TournamentApi.API_BASE_URL + "/tournament/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: bodytosend
        });
        return fetch(request).then(response => {

            return response.json();

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

    static async initTournament(id,arraydId,token) {
        console.log(id)
        let obejcttoAdd =JSON.stringify(arraydId)
        const request = await new Request(TournamentApi.API_BASE_URL + "/tournament/initialize/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: obejcttoAdd
        });

        let response = await fetch(request)
        let data = await response.json()
        return data;
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