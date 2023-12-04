(function ($) {

      $(document).ready(function() {

        $('iframe').each(function (){

          var iframe = $(this)[0];
          var src = $(this)[0].src;
          var youtube = $(this).parent().hasClass('video-embed-field-provider-youtube')
          var vimeo = $(this).parent().hasClass('*=vimeo')

          if (youtube) {

            $(iframe).attr('src', src.replace('autoplay=0', 'autoplay=1'))
                     .attr('src', function(_, src) {
                       return src + '&mute=1&loop=1';
                     })
                     .removeAttr('controls')

          } else if (vimeo) {

            $(iframe).attr('src', src.replace('autoplay=0', 'autoplay=1'))
                     .attr('src', function(_, src) {
                       return src + '&muted=1&loop=1';
                     })
                     .removeAttr('controls');

          }
        })
      });
})(jQuery);
