/**
 * Created by Anatolych on 15.01.2017.
 */
(function() {
    "use strict";

    $(document).ready(function(){
        $('.educators-carousel').owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplaySpeed: 2000,
            smartSpeed: 2000,
            dots: true,
            dotsSpeed: 1000,
        });
    });
})();