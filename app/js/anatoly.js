/**
 * Created by Anatolych on 15.01.2017.
 */
(function() {
    "use strict";

    $(document).ready(function(){
        const owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            smartSpeed: 1500,
            info: true,
            dots: true,
            dotsSpeed: 500,
        });
    });
})();