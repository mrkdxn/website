<?php echo $__env->make('inc/header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

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

<?php echo $__env->make('inc/footer', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>