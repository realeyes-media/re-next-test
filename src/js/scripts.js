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
    const backgroundElement = document.getElementsByClassName("hero-image hero-image-fullscreen")[0]
    // backgroundElement.style.backgroundImage = `url("https://image.shutterstock.com/z/stock-photo-american-football-player-jumps-and-catches-the-ball-in-flight-in-professional-sport-stadium-1021023313.jpg")`
    backgroundElement.style.backgroundColor = "transparent"
  } else {
    const backgroundElement = document.getElementsByClassName("hero-image hero-image-fullscreen")[0]
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
    const backgroundElement = document.getElementsByClassName("hero-image hero-image-fullscreen")[0]
    // backgroundElement.style.backgroundImage = `url("https://image.shutterstock.com/z/stock-photo-american-football-player-jumps-and-catches-the-ball-in-flight-in-professional-sport-stadium-1021023313.jpg")`
    backgroundElement.style.backgroundColor = "transparent"
  } else if (window.innerWidth >= 768) {
    const backgroundElement = document.getElementsByClassName("hero-image hero-image-fullscreen")[0]
    // if (backgroundElement.style.backgroundImage) {
    //   backgroundElement.removeAttribute("style")
    // }
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


