(function ($) {
"use strict";



// skill
$(".skill-per").each(function() {
  var $this = $(this);
  var id = $this.attr("id");
  $this.css("width", id + "%");
  $({ animatedValue: 0 }).animate(
    { animatedValue: id },
    {
      duration: 1000,
      step: function() {
        $this.attr("id", Math.floor(this.animatedValue) + "%");
      },
      complete: function() {
        $this.attr("id", Math.floor(this.animatedValue) + "%");
      }
    }
  );
});
    
    
// sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 200) {
		$("#header-sticky").removeClass("sticky-menu");
	} else {
		$("#header-sticky").addClass("sticky-menu");
	}
});

// RESPONSIVE MENU
$('.responsive').on('click', function (e) {
	$('#mobile-menu').slideToggle();
});

// meanmenu
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "992"
	});

	$('.info-bar').on('click', function () {
		$('.extra-info').addClass('info-open');
	})

	$('.close-icon').on('click', function () {
		$('.extra-info').removeClass('info-open');
	})

// offcanvas menu
$(".menu-tigger").on("click", function () {
	$(".offcanvas-menu,.offcanvas-overly").addClass("active");
	return false;
});
$(".menu-close,.offcanvas-overly").on("click", function () {
	$(".offcanvas-menu,.offcanvas-overly").removeClass("active");
});
    


// menu toggle
$(".main-menu li a").on('click', function () {
	if ($(window).width() < 700) {
		$("#mobile-menu").slideUp();
	}
});

// smoth scroll
$(function () {
	$('a.smoth-scroll').on('click', function (event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - 100
		}, 1000);
		event.preventDefault();
	});
});

// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: true,
		autoplaySpeed: 10000,
		dots:false ,
		fade: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
		responsive: [
			{ breakpoint: 1200, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();
    
// Magnet Cursor
    function magnetize(el, e) {
        var mX = e.pageX,
            mY = e.pageY;
        const item = $(el);
        const customDist = item.data('dist') * 20 || 80;
        const centerX = item.offset().left + (item.width() / 2);
        const centerY = item.offset().top + (item.height() / 2);
        var deltaX = Math.floor((centerX - mX)) * -0.35;
        var deltaY = Math.floor((centerY - mY)) * -0.35;
        var distance = calculateDistance(item, mX, mY);
        if (distance < customDist) {
            TweenMax.to(item, 0.5, {
                y: deltaY,
                x: deltaX,
                scale: 1
            });
            item.addClass('magnet');
        } else {
            TweenMax.to(item, 0.6, {
                y: 0,
                x: 0,
                scale: 1
            });
            item.removeClass('magnet');
        }
    }
    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
    }
    function lerp(a, b, n) {
        return (1 - n) * a + n * b
    }
    
    // Mouse Cursor
    class Cursor {
        constructor() {
            this.bind()
            //seleziono la classe del cursore
            this.cursor = document.querySelector('.js-cursor')
            this.mouseCurrent = {
                x: 0,
                y: 0
            }
            this.mouseLast = {
                x: this.mouseCurrent.x,
                y: this.mouseCurrent.y
            }
            this.rAF = undefined
        }
        bind() {
      ['getMousePosition', 'run'].forEach((fn) => this[fn] = this[fn].bind(this))
        }
        getMousePosition(e) {
            this.mouseCurrent = {
                x: e.clientX,
                y: e.clientY
            }
        }
        run() {
            this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2)
            this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2)
            this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100
            this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100
            this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`
            this.rAF = requestAnimationFrame(this.run)
        }
        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run)
        }
        addEvents() {
            window.addEventListener('mousemove', this.getMousePosition, false)
        }
        on() {
            this.addEvents()
            this.requestAnimationFrame()
        }
        init() {
            this.on()
        }
    }
    if ($('.js-cursor').length > 0) {
        const cursor = new Cursor()
        cursor.init();
        // Cursor Conditions
        $('.testimonial-active,.slider-active,.brand-active,.home-blog-active,.services-active').hover(function () {
            $('.cursor').toggleClass('drag');
        });
    }
    
// services-active
$('.services-active').slick({
	dots: true,
	infinite: true,
	arrows: false,
	speed: 1000,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
    
    // team-active
$('.team-active').slick({
	dots: false,
	infinite: true,
	arrows: true,
	prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
	speed: 1000,
	slidesToShow:3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
// portfolio-active
$('.class-active').slick({
	dots: false,
	infinite: true,
    arrows: true,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
// portfolio-active
$('.portfolio-active').slick({
	dots: false,
	infinite: true,
    arrows: true,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
	speed: 1000,
	slidesToShow: 5,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

// brand-active
$('.brand-active').slick({
	dots: false,
	infinite: true,
    autoplay:true,
  autoplaySpeed:1500,
	arrows: false,
	speed: 1000,
	slidesToShow:6,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1500,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 3,
				infinite: true,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

// testimonial-active
$('.testimonial-active').slick({
	dots: true,
	infinite: true,
	arrows: false,
	speed: 1000,
	slidesToShow:2,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
    // testimonial-active
$('.testimonial-active2').slick({
	dots: true,
	arrows: false,
     prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});
// testimonial-active2

$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots:false,
  arrows:true,
  centerMode: true,
  focusOnSelect: true, 
  variableWidth:true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
});
// home-blog-active
$('.home-blog-active').slick({
	dots: true,
	infinite: true,
	arrows: false,
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

    // home-blog-active
$('.home-blog-active2').slick({
	dots: false,
	infinite: true,
	arrows: true,
	speed: 1000,
	slidesToShow: 4,
	slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});



    
// blog
$('.blog-active').slick({
	dots: false,
	infinite: true,
	arrows: true,
	speed: 1500,
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true,
	prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
});


    

// counterUp

$('.count').counterUp({
	delay: 100,
	time: 1000
});

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});

// paroller
if ($('.paroller').length) {
	$('.paroller').paroller();
}

//* Parallaxmouse js
function parallaxMouse() {
	if ($('#parallax').length) {
		var scene = document.getElementById('parallax');
		var parallax = new Parallax(scene);
	};
};
parallaxMouse();

// service active
$('.s-single-services').on('mouseenter', function () {
	$(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active');
})

// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp',
	topDistance: '300',
	topSpeed: 300,
	animation: 'fade',
	animationInSpeed: 200,
	animationOutSpeed: 200,
	scrollText: '<i class="fas fa-level-up-alt"></i>',
	activeOverlay: false,
});


// isotop
	$('.grid').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.grid').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
		// use outer width of grid-sizer for columnWidth
		columnWidth: 1
	  }
	});

	// filter items on button click
	$('.button-group').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });		
	});

});
// isotop
$(".element").each(function() {
    var a = $(this);
    a.typed({
        strings: a.attr("data-elements").split(","),
        typeSpeed: 100,
        backDelay: 3e3
    })
}),
//for menu active class
$('.button-group > button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});

// WOW active
new WOW().init();
    
//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

})(jQuery);