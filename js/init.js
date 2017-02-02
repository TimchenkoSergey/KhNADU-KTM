//Module init
//Module for components initialization 
(function() {
	"use strict";

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
})();