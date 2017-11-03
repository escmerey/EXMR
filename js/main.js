jQuery(document).ready(function($) {

    var wHeight = $(window).height();
    var wWidth = $(window).width();
    $(window).on('resize', function(event) {
        var wHeight = $(window).height();
        var wWidth = $(window).width();
    });

    $('.toggle_burger').on('click', function(event) {
        $('.toggle_burger').toggleClass('close');
        $('.mobileSide').toggleClass('visible');
        $('.overlay').toggleClass('visible');
    });

    //Табы
    $('.tabs').tabs({
        active: 0,
        hide: {
            effect: "fade",
            duration: 200,
        },
        show: {
            effect: "fade",
            duration: 200,
        }
    });

    //помещаем блоки с заданиями в слайдер
    var tasksSwiper = new Swiper('.tasks__slider', {
        onlyExternal: true,
        autoHeight: true,
        effect: 'fade'
    });

    //создаем слайдер модулей
    var modulesSwiper = new Swiper('.modules__items', {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        onlyExternal: true,
        effect: 'coverflow',
        coverflow: {
            rotate: 0,
            stretch: -300,
            depth: 500,
            modifier: 1,
            slideShadows: false
        },
        onInit: function(thisSwiper) {
            thisSwiper.slideTo($('.plane__item.active').index(), 0);
            tasksSwiper.slideTo($('.plane__item.active').index(), 0);
        },
        breakpoints: {
            1600: {
                coverflow: {
                    rotate: 0,
                    stretch: -300,
                    depth: 400,
                    modifier: 1,
                    slideShadows: false
                },
            },
            998: {
                coverflow: {
                    rotate: 0,
                    stretch: -80,
                    depth: 400,
                    modifier: 1,
                    slideShadows: false
                },
            },
            720: {
                slidesPerView: 1,
                effect: 'slide',
            }
        }
    });

    //клик по иконке модуля (в блоке "план подготовки")
    $('.plane').on('click', '.plane__item', function(event) {
        if (!$(this).hasClass('disable')) {
            $('.plane__item').removeClass('active');
            $(this).addClass('active');
            modulesSwiper.slideTo($(this).index('.plane__item'), 300);
            tasksSwiper.slideTo($(this).index('.plane__item'), 300);
        }
    });

    //клик по иконке модуля
    $('.modules').on('click', '.modules__item', function(event) {
        //если без класса disable и swiper-slide-active
        if (!$(this).hasClass('swiper-slide-active') && !$(this).hasClass('disable')) {
            modulesSwiper.slideTo($(this).index(), 300);
            tasksSwiper.slideTo($(this).index(), 300);
        }
    });

    //кастомный скроллбар
    if (wWidth > 1024) {
        $('.scrollbox').mCustomScrollbar({
            axis: "y",
            theme: 'minimal-dark',
            scrollbarPosition: 'inside',
        });
    }else{
        $('.scrollbox').perfectScrollbar();
    }
    $('.prefscroll').perfectScrollbar();

    //input с авто шириной
    // function autoWidthInput(inputblock) {
    //     inputblock.each(function(index, el) {
    //         buffer = $(el).parent().find('.for_auto_width_input_beside');
    //         buffer.text($(el).val());
    //         $(el).width(buffer.outerWidth() + 80);
    //     });
    // }
    $(window).on('load', function(event) {
        // autoWidthInput($('.edit_input input'));
    });
    $('.edit_input input').on('input', function(event) {
        // autoWidthInput($('.edit_input input'));
    });


    //редактировать input
    $('.edit_input').on('click', '.edit_input__ico', function(event) {
        $(this).parent().find('input').removeAttr('disabled').focus().select();
    });
    $('.edit_input').on('focusout', 'input', function(event) {
        $(this).attr('disabled', 'true');
    });

    //убрать выделение при наведение на уведомление
    $('.notification').on('mouseenter', '.notification__item', function(event) {
        el = $(this);
        setTimeout(function() {
            el.removeClass('unread');
        }, 300)
    });

    //Удалить уведомление
    $('.notification').on('click', '.notification__item__remove', function(event) {
        $(this).parents('.notification__item').remove();
    });

    //Слайдер с вопросами
    var questSwiper = new Swiper('.quest__items', {
        pagination: '.quest__fraction',
        // direction: 'vertical',
        effect: 'fade',
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 30,
        onlyExternal: true,
        paginationType: 'fraction',
        paginationFractionRender: function(swiper, currentClassName, totalClassName) {
            return '<span class="' + currentClassName + '"></span>' +
                ' / ' +
                '<span class="' + totalClassName + '"></span>';
        },
        onInit: function(thisSwiper) {
            thisSwiper.update();
        }
    });

    // //пагинация к слайдеру с вопросами
    var questPageSwiper = new Swiper('.quest__pagination', {
        direction: 'vertical',
        slidesPerView: 'auto',
        centeredSlides: true,
        onlyExternal: true,
        effect: 'coverflow',
        coverflow: {
            rotate: 0,
            stretch: -80,
            depth: 400,
            modifier: 1,
            slideShadows: false
        },
    });

    //Смотреть решение
    $('.quest__answer').on('click', '.quest__answer__link', function(event) {
        $(this).parents('.quest__answer').find('.decision:not(.visible)').addClass('visible');
        questSwiper.onResize();
    });

    //Клки по кнопке далее
    $('.quest__bottom').on('click', '.go', function(event) {
        $('.quest__answer').find('.decision').removeClass('visible');
        questPageSwiper.slideNext();
        questSwiper.slideNext();
        questSwiper.onResize();
    });

    //принудительное изменение состояния radio
    $('.radio').on('click', function(event) {
        $(this).find('input').prop({
            checked: true,
        })
    });

    //принудительное изменение состояния radio
    $('.checkbox').on('click', function(event) {
        if ($(this).find('input').prop('checked')) {
            $(this).find('input').prop({
                checked: false,
            })
        } else {
            $(this).find('input').prop({
                checked: true,
            })
        }
    });

    $('select.nice-select').niceSelect();
    $('div.nice-select .list').perfectScrollbar();

    //изменить цель
    $('.container__title__target').on('click', '.edit_input__ico', function(event) {
        $(this).parent().find('div.nice-select').toggleClass('open');
    });


    // -/+
    window.inputNumber = function(el) {
        var min = el.data('min') || false;
        var max = el.data('max') || false;
        var step = el.data('step') || 1;
        var els = {};
        els.dec = el.prev();
        els.inc = el.next();
        el.each(function() {
            init($(this));
        });


        function init(el) {
            els.dec.on('click', decrement);
            els.inc.on('click', increment);

            function decrement() {
                var value = Number(el.find('span').text());
                value = value - step;
                if (!min || value >= min) {
                    el.find('span').text(value)
                }
            }

            function increment() {
                var value = Number(el.find('span').text());
                value = value + step;
                if (!max || value <= max) {
                    el.find('span').text(value)
                }
            }
        }
    }

    $('.count').find('.count__area').each(function(index, el) {
        inputNumber($(this));
    });

    //Передаем количество предметов в попап
    $(document).on('click', '.callPopup[data-typerate]', function(event) {
        $('.lessons__items').data('count', $(this).data('typerate'));
        $('.lessons input[type="checkbox"]:checked').prop('checked', false);
    });

    //Запрещаем выбор, больше выбранного, количества предметов
    $('.lessons').on('change', 'input[type="checkbox"]', function(event) {
        maxCount = $(this).parents('.lessons__items').data('count');
        if ($('input[type="checkbox"]:checked').length > maxCount) {
            $(this).prop('checked', false);
        };
    });


    $('.calculate').on('click', '.count__btn', function(event) {
        calculateTariff();
    });

    function calculateTariff() {
        defPrice = 11100;
        defExamer = 5990;
    };

    //быстрый поиск темы
    $('.theme__search input').quicksearch('.theme__nav .theme__item');

    if ($('.col_scroll').length && wWidth > 1025) {
        var col_scrollOffset = $('.col_scroll__right').offset().top;
        scrollboxHeight();
        if ($('.col_scroll__left').outerHeight() > $(window).height()) {
            $('body').on('scroll resize', function(event) {
                if ($('body').scrollTop() > col_scrollOffset) {
                    $('.col_scroll__right').addClass('fixed').css({
                        top: $('body').scrollTop() - col_scrollOffset,
                    });
                } else {
                    $('.col_scroll__right').removeClass('fixed').css({
                        top: 0
                    });
                };
                scrollboxHeight();
                end = ($('.col_scroll__right').position().top + $('.col_scroll__right').outerHeight()) > $('.col_scroll__left').outerHeight();
                if (end) {
                    $('.col_scroll__right').addClass('fixed--bottom').css({
                        top: $('.col_scroll__left').outerHeight() - $('.col_scroll__right').outerHeight() - 250,
                    });
                };
            });
        }
    }

    function scrollboxHeight() {
        $('.col_scroll .scrollbox').css({
            height: wHeight - $('.col_scroll .scrollbox').offset().top,
        });
    };

    $('.accordion-content').hide();

    $('.accordion-title').click(function(event) {
        if ($('.accordion-content').hasClass('active')) {
            if ($(this).next().hasClass('active')) {
                $(this).removeClass('active').next().removeClass('active').slideUp(300);
            } else {
                $('.accordion-content').removeClass('active').slideUp(300);
                $('.accordion-title').removeClass('active');
                $(this).addClass('active').next().addClass('active').slideDown(300);
            };
        } else {
            $(this).addClass('active').next().addClass('active').slideDown(300);
        };
    });

    $('body').trigger('resize');
});