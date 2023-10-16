// get data from https://mrkdxn.infinityfreeapp.com/insta.php?p=poisson and console.log it

function getData(url) {
    return fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

getData('https://mrkdxn.infinityfreeapp.com/insta.php?p=poisson');
