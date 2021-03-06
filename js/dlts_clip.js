;(function ($) {
  function attach (context, settings) {
    if (window.flowplayer) {
      flowplayer.conf = {
        //logo: "https://flowplayer.com/media/img/mylogo.png",
        share: false
      }
      flowplayer(function (api, root) {
        var parent = $(root)
        var controls = parent.find('.fp-controls')
        parent.find('.fp-next').clone().appendTo(controls)
        parent.find('.fp-prev').clone().appendTo(controls)
        $('.fp-playlist a').click(function () {
          parent.attr({ 
            'data-start': $(this).attr('data-start'),
            'data-duration': $(this).attr('data-duration')
          })
        })
        api.bind('error', function (event, api, error) {
          console.log(error.message + ': ' + error.video.url)
          console.log(error)
        })
        api.bind('ready', function (elem, api, media) {
          var start = $(elem.currentTarget).attr('data-start')
          if (start) {
            api.seek(start)
          }
        })
      })
    }
  }
  Drupal.behaviors.dlts_clip = { attach: attach }
})(jQuery)
