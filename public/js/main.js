(function($) {

    var form = $("#signup-form");
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            current: ''
        },
        titleTemplate: '<h3 class="title">#title#</h3>',
        onFinished: function(event, currentIndex) {
            var obj={}
                    var x = $("form").serializeArray();
                    $.each(x, function(i, field) {
                       obj[field.name]=field.value
                    
            });
            window.location.pathname = '/user/'+obj.your_name+'/'+obj.roomId;
        },
    });

    $(".toggle-password").on('click', function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
    });

})(jQuery);