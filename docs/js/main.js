


/* NAV */
function openDrawerMenu(){
  var x = document.getElementById("mainNavBar");
  if (x.className === "navBar"){
    x.className += " responsive";
  } else {
    x.className = "navBar";
  }
}

window.addEventListener('load', function () {
    lightbox.on('show.simplelightbox', function () {
      console.log('show.simplelightbox...');
  });
    lightbox.on('change.simplelightbox', function () {
      console.log('change.simplelightbox...');
  });


    
});



