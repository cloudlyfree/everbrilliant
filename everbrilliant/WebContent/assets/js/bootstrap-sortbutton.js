!function ($) {

  "use strict"; // jshint ;_;

  var Sortbutton = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.sortbutton.defaults, options)
  }

  Sortbutton.prototype.toggle = function (options) {
    var $this =  this.$element;
     $this
      .find('b')
      .toggleClass('icon-sortbutton-arrow-down'); 
  }

  $.fn.sortbutton = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = new Sortbutton(this, options)
        , options = typeof option == 'object' && option
      if (!data) $this.data('sortbutton', (data = new Sortbutton(this, options)))
      data.toggle(options)
    });
  }
  $.fn.button.defaults = {
    icon_arrow: 'up'
  }

  $.fn.sortbutton.Constructor = Sortbutton

  $(document).on('click', 'a[bootstrap-sortbutton]', function (e) {
    var $btn = $(e.target)
    if (!$btn.is('a')) $btn = $btn.closest('a')
    $btn.sortbutton()
  })

}(window.jQuery);