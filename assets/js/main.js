(function($) {
    "use strict";
	jQuery(document).ready(function($) {
		
		let count = 0;
		const totalDuration = 1000; // Total duration for the loader animation in milliseconds
		const stages = [20, 40, 100]; // Progress stages
		const stageDurations = [totalDuration * 0.2, totalDuration * 0.3, totalDuration * 0.5]; // Duration for each stage: 20% in 0.8s, 40% in 1.2s, 100% in 2s
		let currentStage = 0;
		let stageStartTime = Date.now();
		const intervalTime = 10; // Interval time for updating the progress (in milliseconds)
		
		const interval = setInterval(function() {
			const elapsedTime = Date.now() - stageStartTime;
			const currentDuration = stageDurations[currentStage];
			const stageStart = currentStage === 0 ? 0 : stages[currentStage - 1];
			const stageEnd = stages[currentStage];
		
			if (elapsedTime < currentDuration) {
				const progress = stageStart + (stageEnd - stageStart) * (elapsedTime / currentDuration);
				count = Math.round(progress);
			} else {
				count = stageEnd;
				stageStartTime = Date.now();
				currentStage++;
			}
		
			$("#percentage").text(count + '%');
			updateProgressCircle(count);
		
			if (currentStage >= stages.length) {
				clearInterval(interval);
				$("#preloader").fadeOut(500); // Fade out the preloader after completion
			}
		}, intervalTime);
		
		// Ensure the preloader fades out once the page is fully loaded, if not already done
		$(window).on("load", function() {
			if (count < 100) {
				clearInterval(interval);
				$("#percentage").text('100%');
				updateProgressCircle(100);
				$("#preloader").fadeOut(2000); // Fallback fade out in case load event is missed
			}
		});
		
		function updateProgressCircle(percentage) {
			const circle = $('#progress-circle circle').eq(1);
			const radius = circle.attr('r');
			const circumference = 2 * Math.PI * radius;
			const offset = circumference - (percentage / 100 * circumference);
			circle.css('stroke-dashoffset', offset);
		}
		
	
	

        // 02. primary navbar sticky
        var initialScroll = $(window).scrollTop();
        if (initialScroll >= 100) {
            $(".primary-navbar").addClass("navbar-active");
        }

        // 03. progress wrap sticky
        if (initialScroll >= 100) {
            $(".progress-wrap").addClass("active-progress");
        }

        // 04. data background
        $("[data-background]").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });

        let device_width = window.innerWidth;

        // 05. custom cursor
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = !1;
                    (window.onmousemove = function(s) {
                        o ||
                            (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX);
                    }),
                    $("body").on(
                        "mouseenter",
                        "button, a, .cursor-pointer",
                        function() {
                            e.classList.add("cursor-hover"),
                                t.classList.add("cursor-hover");
                        }
                    ),
                    $("body").on(
                        "mouseleave",
                        "button, a, .cursor-pointer",
                        function() {
                            ($(this).is("a", "button") &&
                                $(this).closest(".cursor-pointer").length) ||
                            (e.classList.remove("cursor-hover"),
                                t.classList.remove("cursor-hover"));
                        }
                    ),
                    (e.style.visibility = "visible"),
                    (t.style.visibility = "visible");
                }
            }
        }
        itCursor();

        // 06. mobile menu
        if ($(".mobile-menu").length) {
            var mobileMenuContent = $(".cmn-nav .navbar__menu").html();
            $(".cmn-nav .mobile-menu__list").append(mobileMenuContent);

            var mobileMenuOptions = $(".cmn-nav .navbar__mobile-options").html();
            $(".cmn-nav .mobile-menu__options").append(mobileMenuOptions);

            $(".mobile-menu .navbar__dropdown-label").on("click", function() {
                $(this).parent().siblings().find(".navbar__sub-menu").slideUp(300);
                $(this)
                    .parent()
                    .siblings()
                    .find(".navbar__dropdown-label")
                    .removeClass("navbar__item-active");
                $(this).siblings(".navbar__sub-menu").slideToggle(300);
                $(this).toggleClass("navbar__item-active");
            });
        }

        $(".open-mobile-menu, .open-offcanvas-nav").on("click", function() {
            $(".mobile-menu__backdrop").addClass("mobile-menu__backdrop-active");
            $(".nav-fade").each(function(i) {
                $(this).css("animation-delay", 0.2 * 1 * i + "s");
            });

            $(".mobile-menu").addClass("show-menu");
            $(".mobile-menu__wrapper").removeClass("nav-fade-active");
        });

        $(".close-mobile-menu, .mobile-menu__backdrop").on("click", function() {
            setTimeout(function() {
                $(".mobile-menu").removeClass("show-menu");
            }, 900);
            setTimeout(function() {
                $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
            }, 1100);

            $(".mobile-menu__wrapper").addClass("nav-fade-active");
        });

        // 07. close video popup
        $(".close-v").on("click", function() {
            $(".vid-m").fadeOut(300);
        });

        // 08. on window scroll navbar
        $(window).on("scroll", function() {
            var scroll = $(window).scrollTop();
            if (scroll < 100) {
                $(".primary-navbar").removeClass("navbar-active");
            } else {
                $(".primary-navbar").addClass("navbar-active");
            }
        });

        // 09. on window resize navbar
        $(window).on("resize", function() {
            $("body").removeClass("body-active");
            $(".mobile-menu").removeClass("show-menu");
            $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
            $(".mobile-menu__wrapper").addClass("nav-fade-active");
        });

        // 10. offcanvas navigation
        if ($(".offcanvas-nav").length) {
            $(".offcanvas-menu .navbar__dropdown-label").on("click", function() {
                $(this).parent().siblings().find(".navbar__sub-menu").slideUp(300);
                $(this)
                    .parent()
                    .siblings()
                    .find(".navbar__dropdown-label")
                    .removeClass("navbar__item-active");
                $(this).siblings(".navbar__sub-menu").slideToggle(300);
                $(this).toggleClass("navbar__item-active");
            });
        }

        $(".open-offcanvas-nav").on("click", function() {
            $(".nav-fade").each(function(i) {
                $(this).css("animation-delay", 1 + 0.2 * 1 * i + "s");
            });

            $(".offcanvas-menu").addClass("show-offcanvas-menu");
            $(".offcanvas-menu__wrapper").removeClass("nav-fade-active");
        });

        $(".close-offcanvas-menu, .offcanvas-menu__backdrop").on("click", function() {
            setTimeout(function() {
                $(".offcanvas-menu").removeClass("show-offcanvas-menu");
            }, 900);
            $(".offcanvas-menu__wrapper").addClass("nav-fade-active");
        });

        // 11. toggle class to items
        $(".portfolio__single").on("mouseover", function() {
            $(".portfolio__single").removeClass("portfolio__single-active");
            $(this).addClass("portfolio__single-active");
        });

        $(".work-steps__single").on("mouseover", function() {
            $(".work-steps__single").removeClass("work-steps__single-active");
            $(this).addClass("work-steps__single-active");
        });

        // 12. offer image move with cursor
        if (device_width > 576) {
            const blogImgItem = document.querySelectorAll(".offer__cta-single");

            function followImageCursor(event, blogImgItem) {
                const contentBox = blogImgItem.getBoundingClientRect();
                const dx = event.clientX - contentBox.x;
                const dy = event.clientY - contentBox.y;
                blogImgItem.children[2].style.transform = `translate(${dx}px, ${dy}px) rotate(15deg)`;
            }
            blogImgItem.forEach((item, i) => {
                item.addEventListener("mousemove", (event) => {
                    setInterval(followImageCursor(event, item), 1000);
                });
            });
        }

        // 13. service faq
        $(".service-f-single:first").addClass("service-f-single-active");
        $(".service-f-single:first .p-single").show();
        $(".toggle-service-f").on("click", function() {
            var parent = $(this).parent();
            parent.find(".p-single").slideToggle(600);
            parent.toggleClass("service-f-single-active");
            parent.siblings().removeClass("service-f-single-active");
            parent.siblings().find(".p-single").slideUp(600);
        });

        // 14. work image move with cursor
        if (device_width > 576) {
            const workImgItem = document.querySelectorAll(".work-steps__single");

            function followImageCursor(event, workImgItem) {
                const contentBox = workImgItem.getBoundingClientRect();
                const dx = event.clientX - contentBox.x;
                const dy = event.clientY - contentBox.y;
                workImgItem.children[2].style.transform = `translate(${dx}px)`;
            }
            workImgItem.forEach((item, i) => {
                item.addEventListener("mousemove", (event) => {
                    setInterval(followImageCursor(event, item), 1000);
                });
            });
        }

        // 15. bg cursor
        if ($(".mouse-move-bg").length > 0) {
            const bg = document.querySelector(".mouse-move-bg");
            let width = bg.offsetWidth;
            let height = bg.offsetHeight;
            document.addEventListener("mousemove", (e) => {
                let offsetX = 0.5 - e.pageX / width;
                let offsetY = 0.5 - e.pageY / height;
                bg.style.transform = `translate(${offsetX * 50}px, ${offsetY * 50}px)`;
            });
        }

        // 16. scroll to top
        $(".progress-wrap").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                1500
            );
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $(".progress-wrap").addClass("active-progress");
            } else {
                $(".progress-wrap").removeClass("active-progress");
            }
        });

        // 17. counter up
        $(".counter__single-data").counterUp({
            delay: 10,
            time: 1000,
        });

        // 18. wow js init
        new WOW().init();
    });

    // Additional JavaScript code can be placed here

})(jQuery);
