class TransfersApi{
    
    static API_BASE_URL = "/api/v1"

    static requestHeader(){
        return{
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGU4NWUyMWRmMjM4MDAxMDk2YWJiMCIsImlhdCI6MTU3ODAxMDA4NiwiZXhwIjoxNTc4MDEzNjg2fQ.JQv39wLc5YXuIv_I2IhfdXMc9gHYDIKOC8GfHuVracQ',
        }
    }

    static getAllTransfers(){
        const headers = this.requestHeader();
        const request = new Request(TransfersApi.API_BASE_URL+ "/transfers", {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }

    
}

export default TransfersApi;