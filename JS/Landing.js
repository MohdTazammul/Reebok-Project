    /**
     * Carousel
     */
    var slides = document.querySelectorAll('.carousel-item');
    var bullets = document.querySelectorAll('.carousel-bullet');
    var slidePos = 0;
    var interval = 2000

    function setSlideActive(i) {
        // infinite loop
        i > 3 ? (slidePos = 0) : (i < 0 ? (slidePos = 3) : slidePos = i)
        var c = 0
        while (c < slides.length) {
            slides[c++].style.left = "-" + slidePos + "00%"
        }
        var e = 0
        while (e < bullets.length) {
            bullets[e++].classList.remove("active")
        }
        bullets[slidePos].classList.add("active")
    }


    // Timer
    var myTimer
    window.onload = function() {
        myTimer = setInterval(function() {
            setSlideActive(++slidePos)
        }, interval)
    }
    // Reset
    function reset() {
        clearInterval(myTimer);
        myTimer = setInterval(function() {
            setSlideActive(++slidePos)
        }, interval)
    }
    
  