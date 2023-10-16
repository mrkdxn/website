// get data from https://mrkdxn.infinityfreeapp.com/insta.php?p=poisson and console.log it
// create a function to get the data from the url

function getData(url) {
    return fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

getData('https://mrkdxn.infinityfreeapp.com/insta.php?p=poisson');
