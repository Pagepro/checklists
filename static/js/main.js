(function ($, window, document) {
    "use strict";
    window.PAGEPRO_CHECKLIST = window.PAGEPRO_CHECKLIST || {
        $body: null,
        init: function () {
            this.$body = $('body');
            this.iCheck();
            this.rewindPage();
        },
        breakpoint: function () {
            return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        },
        iCheck: function () {
            $('input[type="checkbox"]').iCheck();
        },
        rewindPageRWDConditions: function () {
            var $window = $(window),
                $secondSlide = $('.sec--main'),
                rewindPoint;

            $window.on('resize', function () {
                rewindPoint = $secondSlide.offset().top;
            }).trigger('resize');

            $('html, body').animate({scrollTop: rewindPoint}, 500);

        },
        rewindPage: function () {
            var $firstSlide = $('.sec--head'),
                $trigger = $('.js-trigger-page-down'),
                that = this;

            $trigger.on('click', function () {
                that.rewindPageRWDConditions($firstSlide);
            });
        }
    };
    $(document).on('ready', function () {
        window.PAGEPRO_CHECKLIST.init();
    });
}(jQuery, window, document));
