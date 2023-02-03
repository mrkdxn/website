


window.addEventListener('load', function () {
    let hydroMonitor = new Monitor();
    hydroMonitor.init();
    gtag('event', 'Page Loaded', {
  'event_category': 'Hydro Monitor',
  'event_label': 'Step 1',
  'value': ''
});

});

const Monitor = function () {
};

Monitor.prototype = {

    location : '',
    token : '',
    account : '',
    phone : '',

    init: function()
    {
       this
        this.getParams();
    
        if(this.validateDigits(this.location, 10) != false)
        {
            this.statusMessage("Connecting to API...", "green");
            this.getHyroAPI();
        }
        else
        {
            this.statusMessage('Error: No Location found in URL. Unable to check address.', 'red');
        }
        
    },
    getParams: function()
    {
        let params = window.location.search;
        var url = new URL(window.location.href);
        this.location = url.searchParams.get("location");
        this.token = url.searchParams.get("token");
        this.account = url.searchParams.get("account");
        this.phone = url.searchParams.get("phone");
       
    },
    validateDigits: function(data, num)
    {
        var results = /^\d+$/.test(data);
        if (results == false || data.length != num)
        {
            console.log("not valid!");
            return false;
        }
        return true;
        
    },

    statusMessage: function(message, colour)
    {
      
            const node = document.createElement("li");
            node.style.color = colour;
            const textnode = document.createTextNode(message);
            node.appendChild(textnode);
            document.getElementById("messaging").appendChild(node);

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
            'To': this.phone,
            'From': '+13609341552',
            'Body': message
            })
        });
    },

   
    updateMessage: function(status, colour)
    {
        this.statusMessage("Checking location " +this.location+"...", "green");
        if (status == 'A')
        {
            this.statusMessage("UP: All ok.", "green");
        }
        else
        {
            this.statusMessage("DOWN: There is a power outage.", "red");
            this.prepSMS();
        }

    },
    statusMessage: function (message, colour) {
        const node = document.createElement("li");
        node.style.color = colour;
        const textnode = document.createTextNode(message);
        node.appendChild(textnode);
        document.getElementById("messaging").appendChild(node);
    },

    prepSMS: function()
    {
        if (this.validateDigits(this.phone, 11) && this.account.length >= 34 && this.token.length >= 32)
        {
           this.statusMessage("Sending a SMS to:"+this.phone, "red");
           this.sendSMS("There seems to be a power outage at the following address. Check online https://infopannes-services.solutions.hydroquebec.com/web/api/v1/lieux-conso/etats/"+ this.location);
        }
        else
        {
            this.statusMessage("Unable to send SMS to: "+this.phone+" - missing data from URL.", "red");
        }
        
    },
    interpretResponse: function(data)
    {
        this.statusMessage("Success...", "green");
        let status = data[0].etat;
        console.log(status);    
        this.updateMessage(status);   
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