$('.solutions').click(function () {
  const solutionId = this.id
  $('.solution').hide()
  $(`.${solutionId}`).fadeToggle()
  $('.solutions').css({
    'font-weight': '400'
  })
  $(this).css({
    'font-weight': 'bold'
  })
})

$('.accordion').click(function (e) {
  const image = $(this).find('img')
  if ($(this).next().css('display') === 'block') {
    $('.panel').slideUp()
    image.attr('src', '/img/minus.png')
    $('.accordion').css({
      'font-weight': '400'
    })
  } else {
    $('.panel').slideUp()
    $(this).next().slideDown()
    $('.accordion').css({
      'font-weight': '400'
    })
    $('.accordion').find('img').attr('src', '/img/minus.png')
    image.attr('src', '/img/plus.png')
    $(this).css({
      'font-weight': 'bold'
    })
  }
})

$('.all-tax').click(function () {
  $('.category').removeClass('active')
  $('.all-tax').addClass('active')
  $('.tax').show()
})

$('.blog-category').click(function () {
  const list = $(this).prop('classList')
  let e
  for (const l of list) {
    if (l !== 'list-inline-item' && l !== 'category' && l !== 'active' && l !== 'blog-category') {
      e = l
    }
  }
  $('.category').removeClass('active')
  $('.' + e).addClass('active')
  $('.tax').hide()
  $('.' + e + '-card').closest('.tax').show()
})

$('.icon').click(function () {
  $('.search').toggleClass('active')
});

let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const header = document.getElementsByClassName('header header-absolute')[0];
  const currentScrollPos = window.pageYOffset;
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

window.onload = () => {
  if (window.innerWidth < 768) {
    const backgroundElement = document.getElementById("landing-page-hero")
    backgroundElement.style.backgroundColor = "transparent"
  } else {
    const backgroundElement = document.getElementById("hero-video-container")
    const video = document.createElement("video")
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.id = "video-background";
    const videoSource = document.createElement("source");
    videoSource.src = "./images/Sport Seq_v2_1.mp4"
    videoSource.type = "video/mp4"
    video.appendChild(videoSource)
    backgroundElement.appendChild(video)
  }
}

window.onresize = () => {
  if (window.innerWidth < 768) {
    const videoElement = document.getElementById("video-background");
    if (videoElement) {
      videoElement.parentNode.removeChild(videoElement);
    }
    const backgroundElement = document.getElementById("hero-video-container")
    backgroundElement.style.backgroundColor = "transparent"
  } else if (window.innerWidth > 767.98) {
    const backgroundElement = document.getElementById("hero-video-container")
    backgroundElement.style.backgroundColor = "black"
    const videoElement = document.getElementById("video-background");
    if (videoElement) return;
    const video = document.createElement("video")
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.id = "video-background";
    const videoSource = document.createElement("source");
    videoSource.src = "./images/Sport Seq_v2_1.mp4"
    videoSource.type = "video/mp4"
    video.appendChild(videoSource)
    backgroundElement.appendChild(video)
  }
}


