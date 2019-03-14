
$('.solutions').click(function () {
  const solutionId = this.id
  $('.solution').hide()
  $(`.${solutionId}`).fadeToggle()
  $('.solutions').css({ 'font-weight': '400' })
  $(this).css({ 'font-weight': 'bold' })
})

$('.accordion').click(function (e) {
  const image = $(this).find('img')
  if ($(this).next().css('display') === 'block') {
    $('.panel').slideUp()
    image.attr('src', '/img/minus.png')
    $('.accordion').css({ 'font-weight': '400' })
  } else {
    $('.panel').slideUp()
    $(this).next().slideDown()
    $('.accordion').css({ 'font-weight': '400' })
    $('.accordion').find('img').attr('src', '/img/minus.png')
    image.attr('src', '/img/plus.png')
    $(this).css({ 'font-weight': 'bold' })
  }
})

// Hide/Show NavBar
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  let header = document.getElementsByClassName('header header-absolute')[0];
  let currentScrollPos = window.pageYOffset;
  if (currentScrollPos === 0) {
    header.style.background = 'transparent';
  } else if (prevScrollpos > currentScrollPos) {
    header.style.top = '0px';
    header.style.backgroundColor = 'black';
  } else {
    header.style.top = '-60px';
  }
  prevScrollpos = currentScrollPos;
};
