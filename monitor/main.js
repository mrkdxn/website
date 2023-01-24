
window.addEventListener('load', function () {
    let hydroMonitor = new Monitor();
    hydroMonitor.init();
});

const Monitor = function () {
};

Monitor.prototype = {

    location : '',
    token : '',
    account : '',
    lieu : '',

    init: function()
    {
        console.log('init............');
        this.getParams();
        this.getHyroAPI();
    },
    getParams: function()
    {
        let params = window.location.search;
        var url = new URL(window.location.href);
        this.location = url.searchParams.get("location");
        this.token = url.searchParams.get("token");
        this.account = url.searchParams.get("account");
       
    },
    sendSMS(message)
    {
        let twilioURL = 'https://api.twilio.com/2010-04-01/Accounts/' + this.account + '/Messages.json';
        let auth = this.account + ':' + this.token;
        fetch(twilioURL, {
        method: 'POST',
        headers: {
        'Authorization': 'Basic ' + btoa(auth)
    },
        body: new URLSearchParams({
            'To': '+15145855822',
            'From': '+13609341552',
            'Body': message
            })
        });
    },

    interpretResponse: function(data)
    {
        let status = data[0].etat;
        console.log(status);    
        this.updateMessage(status);   
    },
    updateMessage: function(status)
    {
        let title = document.getElementById('message');
        

        if (status == 'A')
        {
            elMessage = "UP: All ok";
        }
        else
        {
            elMessage = "DOWN: there is an issue.";
            this.sendSMS(elMessage + ' check online https://infopannes-services.solutions.hydroquebec.com/web/api/v1/lieux-conso/etats/'+ this.location);
        }
        console.log(elMessage);
        title.innerHTML = elMessage;
        
    },

    getHyroAPI: function()
    {
        let hydroURL = 'https://infopannes-services.solutions.hydroquebec.com/web/api/v1/lieux-conso/etats/'+ this.location;
        fetch(hydroURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => this.interpretResponse(response))
    }
}