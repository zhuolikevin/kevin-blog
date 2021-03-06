var isCollapsed = false;
function showCollapseBar() {
  $('.collapse-bar').animate({ right: 0 }, 300);
}
function hideCollapseBar() {
  $('.collapse-bar').animate({ right: -16 }, 300);
};

$('.collapse-bar-front').children('.fa.fa-chevron-left').hide();
$('.layout-left').on('mouseenter', showCollapseBar);
$('.layout-left').on('mouseleave', hideCollapseBar);

$('.collapse-bar-front').click(function() {
  if (isCollapsed) {
    $('.layout-left').animate({ width: 300 }, 300, function() {
      $('.layout-left').css('padding', 30);
      setTimeout(function() {
        $('.sidebar').animate({ opacity: 1 }, 300);
      }, 500);
      $('.collapse-bar-front').children('.fa.fa-chevron-right').hide();
      $('.collapse-bar-front').children('.fa.fa-chevron-left').show();
      $('.layout-left').on('mouseenter', showCollapseBar);
      $('.layout-left').on('mouseleave', hideCollapseBar);
    });
  } else {
    $('.layout-left').css('height', $('.layout-left').height() + 60);
    $('.sidebar').animate({ opacity: 0 }, 300, function() {
      $('.layout-left').animate({ padding: '30px 0' }, 300, function() {
        $('.layout-left').animate({ width: 16 }, 300);
      });
      $('.collapse-bar-front').children('.fa.fa-chevron-left').hide();
      $('.collapse-bar-front').children('.fa.fa-chevron-right').show();
    });
    $('.collapse-bar').animate({ right: 0 }, 300);
    $('.layout-left').off('mouseenter', showCollapseBar);
    $('.layout-left').off('mouseleave', hideCollapseBar);
  }
  isCollapsed = !isCollapsed;
});
