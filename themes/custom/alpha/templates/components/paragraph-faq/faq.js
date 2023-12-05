(function ($) {

      $(document).ready(function() {
        $('.paragraph--type--question .field--name-field-q-question').on('click', function (e) {
          $(e.target).parents('.paragraph--type--question').toggleClass('open');
        })
      });
})(jQuery);
