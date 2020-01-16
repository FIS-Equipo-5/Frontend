class TeamsApi{
    
    // static API_BASE_URL = "/api/v1";
    static API_BASE_URL = (process.env.NODE_ENV==="production")? "https://fis2019-teams.herokuapp.com/api/v1" : "/api/v1"


    static requestHeader(token){
        
    }

    /* GET */
    static getAllTeams(token){
        const options = {'x-access-token': token };
        const request = new Request(TeamsApi.API_BASE_URL+ "/teams", {
            method: 'GET',
            headers: options
        });
        return fetch(request).then(response => {
            return response.json();
        });
    }

    /* POST */
    static addNewTeam(newTeam, token){
        console.log("Adding new team...");
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify(newTeam)
        };
        const request = new Request(TeamsApi.API_BASE_URL + "/teams", options);

        return fetch(request).then(response => {
            return response
        }).catch(error=>{
            return error;
        });

    }

    /* PUT */
    static updateTeam(updatedTeam,token){
        console.log("Editing the information of the team: " + updatedTeam.name);
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify(updatedTeam)
        };
        const request = new Request(TeamsApi.API_BASE_URL + "/teams/" + updatedTeam.name, options);

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    /* DELETE */
    static deleteTeam(name, token){
        console.log("Removing the team: " + name);
        const options = {
            method: 'DELETE',
            headers: {
                'x-access-token': token,
            }
        }
        const request = new Request(TeamsApi.API_BASE_URL + "/teams/" + name, options);

        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

}

export default TeamsApi;