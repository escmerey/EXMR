$(document).ready(function() {
    $("form.valid_form").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                Имя_пользователя: {
                    required: true,
                },
                Телефон_пользователя: {
                    required: true,
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                var data = new FormData(it[0]);
                $.ajax({
                    type: "POST",
                    url: "../send.php",
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    beforeSend: function (jqXHR, settings) {
                        it.find('*[type="submit"]').find('.loading').addClass('visible');
                    },
                    success: function (response) {
                        it.find('*[type="submit"]').find('.loading').removeClass('visible');
                    }
                });
                return false;
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });
});