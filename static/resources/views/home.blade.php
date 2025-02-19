@include('inc/header')
<main>
<h2><img class="instagram-logo" src="img/instagram.png" /> Feed</h2>
<section id="post-list"></section>
<script src="js/insta.js"></script>
<script>
	var lightbox = new SimpleLightbox('.photo a', {  });
    //lazyLoadInstance.update();

	
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>

</main>

@include('inc/footer')