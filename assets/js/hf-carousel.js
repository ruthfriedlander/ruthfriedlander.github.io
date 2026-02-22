/* HF Project Carousel */
(function() {
  var idx = 0, total = 3;
  var track = document.getElementById('hfTrack');
  var dotsC = document.getElementById('hfDots');
  if (!track || !dotsC) return;
  var i, d;
  for (i = 0; i < total; i++) {
    d = document.createElement('button');
    d.className = 'hf-carousel__dot' + (i === 0 ? ' hf-carousel__dot--active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.onclick = (function(n) { return function() { hfGo(n); }; })(i);
    dotsC.appendChild(d);
  }
  function hfGo(n) {
    idx = (n % total + total) % total;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    var dots = dotsC.children;
    for (var j = 0; j < dots.length; j++) {
      dots[j].className = 'hf-carousel__dot' + (j === idx ? ' hf-carousel__dot--active' : '');
    }
  }
  window.hfSlide = function(dir) { hfGo(idx + dir); };
  window.hfGo = hfGo;
  /* Click image to open lightbox */
  var slides = track.querySelectorAll('img');
  for (i = 0; i < slides.length; i++) {
    slides[i].onclick = function() {
      document.getElementById('hfLightboxImg').src = this.src;
      document.getElementById('hfLightbox').classList.add('active');
    };
  }
  window.hfCloseLightbox = function() {
    document.getElementById('hfLightbox').classList.remove('active');
  };
  /* Close lightbox on Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { window.hfCloseLightbox(); }
  });
})();
