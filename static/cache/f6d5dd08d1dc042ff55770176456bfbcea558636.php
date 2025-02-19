<?php echo $__env->make('inc/header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

	
	
<main>
<h2><?php echo e($h1); ?></h2>
<?php if(isset($intro)): ?>
    <p><?php echo e($intro); ?></p>
<?php endif; ?>

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

<?php echo $__env->make('inc/footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>