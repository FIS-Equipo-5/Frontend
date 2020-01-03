class TransfersApi{
    
    static API_BASE_URL = "/api/v1"

    static requestHeader(){
        return{ }
    }

    static getAllTransfers(token){
        const request = new Request(TransfersApi.API_BASE_URL+ "/transfers", {
            method: 'GET',
            headers: {
                'x-access-token': token,
            }
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    static deleteTransfer(id, token){
        const request = new Request(TransfersApi.API_BASE_URL+ "/transfer/"+id, {
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

export default TransfersApi;