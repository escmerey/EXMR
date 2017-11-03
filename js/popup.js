$(function() {

    $('.other_popup').on('click', function(event) {
        $('.popup').removeClass('visible');
    });

    $('.popup__close, .overlay').on('click', function(event) {
        $('.popup, .overlay, .mobileSide').removeClass('visible');
        $('.toggle_burger').removeClass('close');
        $('html,body').removeClass('fix')
    });

    $(".callPopup").on('click', function(event) {
        event.preventDefault();
        var popup = $(this).attr('data-target');
        if ($('.' + popup).hasClass('popup--notfixed')) {
            $('.' + popup).css('top', $(window).scrollTop());
        };
        $('.overlay').addClass('visible');
        $('.' + popup).addClass('visible')
        $('html,body').addClass('fix')
        setTimeout(function() {
            $('.' + popup).find('input').eq(0).focus();
        }, 1000)

        $('.' + popup).find('.scrollbox').mCustomScrollbar("update");
    });

});