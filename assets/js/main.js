(function($){

    $(document).ready(function() {
        /* ---------------------------------------------- /*
         * Burger hide/show
        /* ---------------------------------------------- */
        $('.burger').click(function(){
            if ($('.burger i').hasClass("fa-bars")) {
                $('.burger i').removeClass('fa-bars');
                $('.burger i').addClass('fa-times');
            } else {
                $('.burger i').removeClass('fa-times');
                $('.burger i').addClass('fa-bars');
            }
            $('.navigation').fadeToggle();
        });
        /* ---------------------------------------------- /*
         * Close nav after click (mobile only)
        /* ---------------------------------------------- */
        $('a.link').click(function(){
            if ($(window).width() < 1025) {
                $('.navigation').fadeToggle();
                $('.burger i').removeClass('fa-times');
                $('.burger i').addClass('fa-bars');
            }
        })
        /* ---------------------------------------------- /*
         * Smooth Scroll
        /* ---------------------------------------------- */
        $('.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 25
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
         * Navbar
        /* ---------------------------------------------- */

        $(document).scroll(function () {
            if ($(window).width() > 1025) {
                var scroll = $(this).scrollTop();
                var topDist = $("#home").position();
                if (scroll > topDist.top) {
                    $('#nav').css({"position":"fixed","top":"0", "background-color": "#000", "z-index": "100", "width": "100%", "animation-name": "fadeInDown"});
                } else {
                    $('#nav').css({"position":"relative","top":"unset", "background-color": "unset", "z-index": "unset", "width": "unset",  "animation-name": "unset"});
                }
            }
        });

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
        /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();


        /* ---------------------------------------------- /*
         * E-mail validation
        /* ---------------------------------------------- */

        function isValidEmailAddress(emailAddress) {
            console.log("email chek")
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        /* ---------------------------------------------- /*
         * Contact form ajax
        /* ---------------------------------------------- */

        $('#contact-form').submit(function(e) {

            e.preventDefault();

            var c_name = $('#c_name').val();
            var c_email = $('#c_email').val();
            var c_message = $('#c_message ').val();
            var response = $('.ajax-response');

            var formData = {
                'name'       : c_name,
                'email'      : c_email,
                'message'    : c_message
            };

            if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
                console.log("false")
                response.fadeIn(500);
                response.html('<i class="fa fa-warning error"></i> <span class="error">Please fix the errors and try again.</span>');
            }

            else {
                console.log("good")
                console.log(formData)
                $.ajax({
                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url         : 'assets/php/contact.php', // the url where we want to POST
                    data        : formData, // our data object
                    dataType    : 'json', // what type of data do we expect back from the server
                    encode      : true,
                    success		: function(res){
                        var ret = $.parseJSON(JSON.stringify(res));
                        response.html(ret.message).fadeIn(500);

                    }
                });
            }
            return false;
        });

    });
    
})(jQuery);