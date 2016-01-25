$(document).on('ready page:load', function () {
  // Highlight active page in top menu
  $('nav a').parents('li,ul').removeClass('active');
  $('nav a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('active');
});
