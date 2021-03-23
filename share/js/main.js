console.log('test');

let config =
    [
        {
            "title" : "Spring 2021",
            "img" : "https:////live.staticflickr.com/65535/51060919222_3183dabb97_n.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/8u5trR"
        },
        {
            "title" : "Winter 2021",
            "img" : "https://live.staticflickr.com/65535/51033879281_02e7eae455_n.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/FyR119"
        },
        {
            "title" : "Winter 2020",
            "img" : "https://live.staticflickr.com/65535/49336778773_ea618b9ae2_h.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/0MP7T3"
        },
        {
            "title" : "Fall 2020",
            "img" : "https://live.staticflickr.com/65535/50538152618_d75e15dd53_n.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/LZ898u"
        },
        {
            "title" : "Spring/Summer 2020",
            "img" : "https://live.staticflickr.com/65535/50230972657_56e0062ae3_n.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/B7953r"
        },
        {
            "title" : "Spring to Fall 2019",
            "img" : "https://live.staticflickr.com/65535/49051229366_8bff85501e.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/0MP7T3"
        },
        {
            "title" : "Forest",
            "img" : "https://live.staticflickr.com/65535/49050711423_330ef2001c.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/VR423g"
        },
        {
            "title" : "Landscapes & pretty",
            "img" : "https://live.staticflickr.com/840/43304267092_90202e7b76.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/kRx43z"
        },
        {
            "title" : "Amsterdam/Berlin",
            "img" : "https://live.staticflickr.com/1729/42491669021_63bf8bc980.jpg",
            "link" : "https://www.flickr.com/gp/80995589@N00/E68W68"
        }

    ];

let photos = document.getElementById('photos');

for (var key in config) {
    let photoClass = '';
    if (config.hasOwnProperty(key)) {
        console.log(key);
        if (key == 0)
        {
            console.log('feat!');
            photoClass = ' featured';
        }
        let addPhoto = '';

        addPhoto += '<div class="photo ' + photoClass + '">';
        addPhoto += '<a href="' + config[key].link + '">';
        addPhoto += '<img src="' + config[key].img + '"/>';
        addPhoto += '<h2>' + config[key].title + '</h2>';
        addPhoto += '</a>';
        addPhoto += '</div>';

        photos.innerHTML += addPhoto;
    }
}


