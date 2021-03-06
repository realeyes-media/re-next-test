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
  showHideNavbarOnScroll()
};

window.onload = () => {
  const homepage = document.getElementById("landing-page-hero")
  if (homepage) {
    addRemoveHeroVideoOnLoad()
    showServicesOnLoad()
    showHideTaglinesOnLoad()
  }
}

window.onresize = () => {
  const homepage = document.getElementById("landing-page-hero")
  if (homepage) {
    addRemoveHeroVideoOnResize()
    showServicesOnResize()
    showHideTaglinesOnResize()
  }
}

$("#myForm").submit(function(e) {
  e.preventDefault();
  var form_data = $(this).serializeArray();
  const jsonData = {};
  form_data.forEach(data => {
   jsonData[data.name] = data.value
});
    $.ajax({
        url: 'https://us-central1-jenkinsauthorization.cloudfunctions.net/send-mail',
        data: JSON.stringify(jsonData),
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
    });
    return false;
  });

  $(".submitButton").click(function() {
    $("#myForm").validate({ errorPlacement: function(error, element) {} });
  });
  

const showHideNavbarOnScroll = () => {
  const header = document.getElementsByClassName('header header-absolute')[0];
  const currentScrollPos = window.pageYOffset;
  if (currentScrollPos <= 0) {
    header.style.background = 'transparent';
  } else if (prevScrollpos > currentScrollPos) {
    header.style.top = '0px';
    header.style.backgroundColor = 'black';
  } else {
    header.style.top = '-60px';
  }
  prevScrollpos = currentScrollPos;
}

const addRemoveHeroVideoOnLoad = () => {
  if (window.innerWidth < 768) {
    const backgroundElement = document.getElementById("hero-video-container")
    backgroundElement.style.backgroundColor = "transparent"
  } else {
    const backgroundElement = document.getElementById("hero-video-container")
    const video = document.createElement("video")
    video.autoplay = true;
    video.loop = false;
    video.muted = true;
    video.id = "video-background";
    if (Modernizr.objectfit) {
      video.className = ".objectFitVideo"
    } else {
      video.className = ".noObjectFitVideo"
    }
    const videoSource = document.createElement("source");
    videoSource.src = "/vid/Hero-v2-3-6mbps.mp4"
    videoSource.type = "video/mp4"
    video.appendChild(videoSource)
    backgroundElement.appendChild(video)
  }
}

const addRemoveHeroVideoOnResize = () => {
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
    video.loop = false;
    video.muted = true;
    video.id = "video-background";
    if (Modernizr.objectfit) {
      video.className = ".objectFitVideo"
    } else {
      video.className = ".noObjectFitVideo"
    }
    const videoSource = document.createElement("source");
    videoSource.src = "/vid/Hero-v2-3-6mbps.mp4"
    videoSource.type = "video/mp4"
    video.appendChild(videoSource)
    backgroundElement.appendChild(video)
  }
}

const showServicesOnLoad = () => {
  if (window.innerWidth > 768) {
    const servicesElems = document.getElementsByClassName("servicesDesktop")
    for (const elem of servicesElems) {
      elem.style.display = "block"
    }
  } else {
    console.log("sanity check")
    const servicesElems = document.getElementsByClassName("servicesMobile")
    for (const elem of servicesElems) {
      elem.style.display = "block"
    }
  }
}

const showServicesOnResize = () => {
  const servicesElemsDesktop = document.getElementsByClassName("servicesDesktop")
  const servicesElemsMobile = document.getElementsByClassName("servicesMobile")

  if (window.innerWidth < 768) {
    for (const elem of servicesElemsDesktop) {
     if (elem.style.display != "none") elem.style.display = "none"
    }
    for (const elem of servicesElemsMobile) {
      if (elem.style.display != "block") elem.style.display = "block"
    }
  } else {
    for (const elem of servicesElemsMobile) {
      if (elem.style.display != "none") elem.style.display = "none"
    }
    for (const elem of servicesElemsDesktop) {
      if (elem.style.display != "block") elem.style.display = "block"
    }
  }
}

const showHideTaglinesOnLoad = () => {
  if (window.innerWidth >= 576) {
    const elem = document.getElementById("section-tags")
    elem.style.display = "flex";
  } else {
    const elem = document.getElementById("section-tags-mobile");
    elem.style.display = "flex"
  }
}

const showHideTaglinesOnResize = () => {
  const elemDesktop = document.getElementById("section-tags");
  const elemMobile = document.getElementById("section-tags-mobile");
  if (window.innerWidth < 576) {
    elemDesktop.style.display = "none";
    elemMobile.style.display = "flex";
  } else {
    elemDesktop.style.display = "flex";
    elemMobile.style.display = "none";
  }
}