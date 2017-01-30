//Module init
//Module for components initialization 
(function() {
	"use strict";

	//init main slider
	$(function () {
		$('.carousel').carousel({
			interval: 6000,
			pause: null
		});
	});

	//js for mein menu
	$(function () {
		if ($(window).width() > 768) {
			var navigationItems = $(".navigation__item");

			navigationItems.on("mouseenter", function () {
				$($(this).children("ul")).css("display", "block");
			});

			navigationItems.on("mouseleave", function () {
				$($(this).children("ul")).css("display", "none");
			});
		}
		else {
			$(".navigation__hamburger").on("click", function () {
				var navigation = $(".navigation"),
					openClass  = "navigation--open";

				if (navigation.hasClass(openClass)) {
					navigation.removeClass(openClass);
				}
				else {
					navigation.addClass(openClass);
				}
			});
		}
	});

	//init owl carousel for main page block graduates
	$(function () {
		$(".graduates__carousel").owlCarousel({
			items : 1,
			dots  : false,
			nav   : true,
			navText : [
				"<i class='graduates__arrow--prev fa fa-chevron-left'  aria-hidden='true'></i>",
				"<i class='graduates__arrow--next fa fa-chevron-right' aria-hidden='true'></i>"
			]
		});
	});

	$(function(){
        $(".educators__owl-carousel").owlCarousel({
            items: 4,
            loop: true,
            dots: true,
		    responsive: {
		    	0   : { items: 1 },
		        500 : { items: 2 },
		        750 : { items: 3 },
		        1100: { items: 4 }
		    }
        });
    });

	$(function(){
        $(".article-owl-carousel").owlCarousel({
            items: 4,
            loop: true,
            dots: true,
		    responsive: {
		    	0   : { items: 1 },
		        500 : { items: 2 },
		        750 : { items: 3 },
		        1100: { items: 4 }
		    }
        });
    });

    $(function( $ ) {

        $( ".swipebox" ).swipebox();

    });

})();