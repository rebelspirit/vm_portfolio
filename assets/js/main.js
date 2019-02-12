(function($){

    $(document).ready(function() {
        //Burger menu
        $('.burger').click(function(){
            if ($('.burger i').hasClass("fa-bars")) {
                $('.burger i').removeClass('fa-bars');
                $('.burger i').addClass('fa-times');
            } else {
                $('.burger i').removeClass('fa-times');
                $('.burger i').addClass('fa-bars');
            }
            // $('.burger i').toggle("fa-times")
            $('.navigation').fadeToggle();
        });

        // Testimonial slider
        $('.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
        /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();

    });

})(jQuery);