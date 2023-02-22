<?php echo $__env->make('inc/header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

	<h2><?php echo e($h1); ?></h2>
	
	
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

<?php echo $__env->make('inc/footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>