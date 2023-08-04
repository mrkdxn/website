@include('inc/header')

	<h2>{{ $h1 }}</h2>

<div class="blog-archive">
	<p style="margin-bottom: 40px;">This is an a revived version of my old blog dating back several years.<br>I hope to create a more up to date version soon. Sorry for any broken links.</p>
     <?php 
     include 'php/BlogArchive.php';
	$blog= new BlogArchive();
	?>
</div>

<script>

    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
</script>


@include('inc/footer')