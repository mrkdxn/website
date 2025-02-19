@include('inc/header')

	
	
<main>
<h2>{{ $h1 }}</h2>
@isset($intro)
    <p>{{ $intro }}</p>
@endisset

<div class="gallery" id="photos">
     <?php 
	$photos = $photoset;
	$album= new Flickr($photos);
	?>
</div>

<script>
	var lightbox = new SimpleLightbox('.photo a', {  });
    //lazyLoadInstance.update();

    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>
</main>

@include('inc/footer')