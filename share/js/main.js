console.log('test');

let config =
    [
        {
            "title" : "Spring & Summer & Fall 2019",
            "img" : "https://live.staticflickr.com/65535/49051229366_8bff85501e_m.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/0MP7T3"
        },
        {
            "title" : "Forest",
            "img" : "https://live.staticflickr.com/65535/49050711423_330ef2001c_w.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/VR423g"
        },
        {
            "title" : "Landscapes & pretty",
            "img" : "https://live.staticflickr.com/840/43304267092_90202e7b76_m.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/kRx43z"
        },
        {
            "title" : "Amsterdam/Berlin",
            "img" : "https://live.staticflickr.com/1729/42491669021_63bf8bc980_m.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/E68W68"
        }

    ];

let photos = document.getElementById('photos');

for (var key in config) {
    if (config.hasOwnProperty(key)) {
        let addPhoto = '';
        addPhoto += '<a href="' + config[key].link + '">';
        addPhoto += '<div class="photo" style="background: url('+ config[key].img + ')">';
        addPhoto += '<h2>' + config[key].title + '</h2>';
        addPhoto += '</div>';
        addPhoto += '</a>';
        photos.innerHTML += addPhoto;
    }
}


