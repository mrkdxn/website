<?php echo $__env->make('inc/header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

	<h1><?php echo e($h1); ?></h1>
	
	
<div class="gallery" id="photos">
	<div id="album_container"></div>
     <?php 
	$photos = $photoset;
	$album= new Flickr($photos);
	?>
</div>

<script>
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>

<?php echo $__env->make('inc/footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>