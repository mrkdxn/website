
window.addEventListener('load', function () {
    let fotos = new Photos();
    fotos.getInsta();
    console.log(document.getElementById('post-list'));
});

const Photos = function () {
};

Photos.prototype = {
  
    getInsta: function()
    {
        let url = '/insta.php';
        return fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
           // console.log(data);
           // write code so that I can access the function parseData()

            let fotos = new Photos();
            fotos.parseData(data);
        }).then(function() {
            // lazy load images
            var lazyLoadInstance = new LazyLoad({
                // Your custom settings go here
            });
        })
        .catch(function(error) {
            console.log(error);
            // call the redirectToPaintings function
            let fotos = new Photos();
            fotos.redirectToPaintings();
        });
    },
    redirectToPaintings: function()
    {
        window.location.href = '/paintings/';
    },
    parseData: function(data)
    {
        let images = data.data;
        console.log(images);
        // check if images is undefined
        if (images == undefined) {
            
            console.log('No images found');
            // redirect to /paintings/ url
            this.redirectToPaintings();
        }
       

        for (var key in images) {
            if (images.hasOwnProperty(key)) {
                if (images[key].media_type != 'VIDEO')
                {
                // create a link element
                let link = document.createElement('a');
                link.setAttribute('href', images[key].permalink);
                link.setAttribute('class', 'post');
                link.setAttribute('target', '_blank');

                // add a figure element to the link with the class name "post-image"
                let figure = document.createElement('figure');
                figure.setAttribute('class', 'post-image');
                link.appendChild(figure);

                // add an image element to the figure with the class name "lazy" and data-src set to "images[key].media_url"
                let image = document.createElement('img');
                image.setAttribute('class', 'lazy');
                
                image.setAttribute('data-src', images[key].media_url);
                
                figure.appendChild(image);
                

                // add link to the class "post-list"
                document.getElementById('post-list').appendChild(link);
                
                }
            }
        }

        
    }

   
}