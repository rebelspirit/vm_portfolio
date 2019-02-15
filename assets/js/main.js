(function($){

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    setTimeout(function(){
        document.getElementById("loading").classList.add("none");
    }, 800);

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
                response.fadeIn(500);
                response.html('<i class="fa fa-warning error"></i> <span class="error">Please fix the errors and try again.</span>');
            }

            else {
                console.log(formData);
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

        const arrLang = {
            'en': {
                'Home': "Home",
                'About': "About",
                'Skills': "Skills",
                'Experience': "Experience",
                'Speaking-skills': "Speaking skills",
                'Portfolio': "Portfolio",
                'Contact': "Contact",
                'Hello': `Hello, I'm <span>VITALIY MALINOVSKYI</span>`,
                'Hello-description': `I'm the <span>Kyiv, Ukraine</span> based <span>Front-end Developer</span>, creating awesome and effective web sites for companies and people  around the globe. Let's <a class="page-scroll" href="#about"> start scrolling</a> and learn more <a class="page-scroll" href="#about">about me</a>.`,
                'About-me': 'About Me',
                'About-me-description': `I have been engaged in web-development for more than 5 years. During this time I have created several projects for non-commercial use. In particular: I have built a website for watching movies and TV-shows and a news site on the basis of CMS WordPress.
                    Apart from that, I have developed an online radio station using CMS DataLife Engine, an analytical site dedicated to new projects of the popular MMORPG game Lineage 2 using HTML / CSS / Php, several sites for the servers of the game Lineage 2 using HTML / CSS / Php / MySQL, and the database of the game Lineage 2 using CMS MediaWiki.
                    <br>
                    <br>
                    Moreover, I have worked out my own game project Lineage 2. At the moment I am fond of modern Blockchain technologies, particularly crypto-currencies and crypto-currency "mining".`,
                'Contact-details': "Contact Details",
                'Name': "MALINOVSKYI VITALIY",
                'Location': "Kyiv, Ukraine",
                'Download': `<i class="fa fa-download"></i>Download Resume`,
                'Skills-title': "What skills do I have?",
                'Programing-languages': "Programing Languages",
                'Frameworks': "Frameworks",
                'Building tools': "Building tools & Libraries",
                'Vsc': "Version system control",
                'Other-tools': "Other tools",
                'Database': "Database",
                'Experience-title': "What experience I have?",
                'Sep-2009': "SEP 2009",
                'Aug-2014': "AUG 2014",
                'University': `<h5>Kiev National University of Technology and Design</h5>
                               <p>Faculty of Engineering and Economics</p>
                               <p>Marketing</p>`,
                'Aug-2017': "AUG 2017",
                'Jun-2018': "JUN 2018",
                'Courses': `<h5>IT School “GO IT”</h5>
                            <p>in a direction of Front-end Development</p>`,
                'Freelance': `<h5>Freelance Front-end Developer</h5>
                              <p>Сreating awesome and effective web sites for companies and people  around the globe</p>`,
                'Speaking-skills-title': "What speaking skills I have?",
                'Projects-title': "What is my last projects?",
                'Dekro': "online furniture manufacturing shop",
                'Stylist': "individual stylist landing page",
                'Eth': "smart-contract investment portal based on ethereum blockchain",
                'Movie': "Movie Database portal",
                'Hire-title': "ARE YOU READY TO START?",
                'Hire-description': "I'm available for freelance projects.",
                'Hire-button': `<i class="fa fa-code"></i>Hire me`,
                'Contact-title': "Drop me a line",
                'Contact-description': "Describe in detail your project. Stick a few links, if on the Internet there is something similar.",
                'Feedback-name': `<input type="name" id="c_name" name="name" class="input" placeholder="Name">`,
                'Feedback-message': `<textarea class="textarea" id="c_message" name="c_message" rows="7" placeholder="Message"></textarea>`,
                'Send-message': `<input type="submit" class="form-button" value="Send message">`
            },
            'ru': {
                'Home': "Главная",
                'About': "Обо мне",
                'Skills': "Мои навыки",
                'Experience': "Опыт",
                'Speaking-skills': "Языки",
                'Portfolio': "Портфолио",
                'Contact': "Контакты",
                'Hello': `Привет, я <span>ВИТАЛИЙ МАЛИНОВСКИЙ</span>`,
                'Hello-description': `Я <span>Front-end Developer</span> из <span>Киева, Украина</span>, создаю потрясающие и эффективные веб-сайты для компаний и людей по всему миру. Давайте начнем <a class="page-scroll" href="#about">прокручивать</a> и узнавать больше <a class="page-scroll" href="#about">обо мне</a>.`,
                'About-me': 'Обо мне',
                'About-me-description': `Я занимаюсь веб-разработкой более 5 лет. За это время я создал несколько проектов для некоммерческого использования. В частности: на базе CMS WordPress я создал сайт для просмотра фильмов и сериалов и новостной сайт. Кроме того, я разработал онлайн-радиостанцию с использованием CMS DataLife Engine, аналитический сайт, посвященный новым проектам популярной MMORPG-игры Lineage 2 с использованием HTML / CSS / Php, несколько сайтов для серверов игры Lineage 2 с использованием HTML / CSS / Php / MySQL и база данных игры Lineage 2 с использованием CMS MediaWiki.
                                        <br>
                                        <br>
                                        Более того, я разработал свой собственный игровой проект Lineage 2. В настоящее время я увлекаюсь современными технологиями Blockchain, в частности криптовалютами и криптовалютным майнингом.`,
                'Contact-details': "Контакты",
                'Name': "ВИТАЛИЙ МАЛИНОВСКИЙ",
                'Location': "Киев, Украина",
                'Download': `<i class="fa fa-download"></i>Скачать резюме`,
                'Skills-title': "Какими навыками я обладаю?",
                'Programing-languages': "Языки програмирования",
                'Frameworks': "Фреймворки",
                'Building tools': "Сборщики и библиотеки",
                'Vsc': "Контроль версий",
                'Other-tools': "Другие инструменты",
                'Database': "Базы данных",
                'Experience-title': "Каким опытом я обладаю?",
                'Sep-2009': "СЕН 2009",
                'Aug-2014': "АВГ 2014",
                'University': `<h5>Киевский Национальный Университет Технологий и Дизайна</h5>
                               <p>Инженерно-экономический факультет</p>
                               <p>Маркетинг</p>`,
                'Aug-2017': "АВГ 2017",
                'Jun-2018': "ИЮН 2018",
                'Courses': `<h5>Школа IT “GO IT”</h5>
                            <p>Направление Front-end Development</p>`,
                'Freelance': `<h5>Фриланс Front-end Developer</h5>
                              <p>Создание удивительных и эффективных веб-сайтов для компаний и людей по всему миру</p>`,
                'Speaking-skills-title': "Какими языками я владею?",
                'Projects-title': "Над какими проектами я работал?",
                'Dekro': "Онлайн портал по изготовлению мебели",
                'Stylist': "Сайт индивидуального стилиста",
                'Eth': "Инвистиционный портал на Смарт-контрактах Эфириум Блокчейн",
                'Movie': "База данных фильмов и сериалов",
                'Hire-title': "ВЫ ГОТОВЫ НАЧАТЬ СОТРУДНИЧАТЬ?",
                'Hire-description': "Я доступен для внештатных проектов.",
                'Hire-button': `<i class="fa fa-code"></i>Начать`,
                'Contact-title': "Свяжитесь со мной",
                'Contact-description': "Опишите подробно свой проект. Прикрепите несколько ссылок, если в интернете есть что-то похожее.",
                'Feedback-name': `<input type="name" id="c_name" name="name" class="input" placeholder="Имя">`,
                'Feedback-message': `<textarea class="textarea" id="c_message" name="c_message" rows="7" placeholder="Сообщение"></textarea>`,
                'Send-message': `<input type="submit" class="form-button" value="Отправить">`
            },
            'ua': {
                'Hello': "Привит, я ",
                'name': "ВИТАЛЯ МАЛИНА",
                'about': 'О компании',
                'contact': 'Контакты'
            }
        };
        $(function() {
            $('.translate').click(function() {
                const lang = $(this).attr('id');
                $('.lang').each(function(index, element) {
                    $(this).html(arrLang[lang][$(this).attr('key')]);﻿
                });
            });
        });
    });

})(jQuery);