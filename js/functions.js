$(function() {

    if (is_touch_device()) {
      $('body').addClass('td');
    } else {
      $('body').addClass('no-td');
    }

    var $el, leftPos, newWidth;
        $mainNav2 = $("#fancy-nav");

    $mainNav2.append("<li id='magic-line-two'></li>");

    var $magicLineTwo = $("#magic-line-two");

    $magicLineTwo
        .width($(".active").width())
        .height($mainNav2.height())
        .css("left", $(".active a").position().left)
        .data("origLeft", $(".active a").position().left)
        .data("origWidth", $magicLineTwo.width())
        .data("origColor", $(".active a").attr("rel"));

    $("#fancy-nav a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLineTwo.stop().animate({
            left: leftPos,
            width: newWidth,
            backgroundColor: $el.attr("rel")
        }, 400)
    }, function() {
        $magicLineTwo.stop().animate({
            left: $magicLineTwo.data("origLeft"),
            width: $magicLineTwo.data("origWidth")
        });
    });

    $(".active a").mouseenter();

    createNewTopic();

    openNavMobile();

    if ($('select').length) {
      $('select').chosen({
        disable_search_threshold: 5,
      });
    }
});

function openNavMobile() {
  $('.nav-open-link').on('click', function() {
    if (!$('#fancy-nav').hasClass('opened')) {
      $('#fancy-nav').addClass('opened');
    } else {
      $('#fancy-nav').removeClass('opened');
    }

  });
}

function createNewTopic() {
  // kada se klikne na new topic
  $('.crete-new-topic').on('click', function() {
    $('.create-new-topic-form').slideDown('slow');
  })

  // kada se klikne na cancel
  $('.create-new-topic-form-cancel').on('click', function() {
    $('.create-new-topic-form').slideUp('slow');
    $('.categories').val('all categories');
    $('.tags').val('tags');
    $('textarea').val('');
    $('.create-new-topic-form input[type="text"]').val('');
  });
}

function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}
