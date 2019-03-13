
$(".solutions").click(function () {
    const solutionId = this.id
    $('.solution').hide()
    $(`.${solutionId}`).fadeToggle()
    $('.solutions').css({ 'font-weight': '400' })
    $(this).css({ 'font-weight': 'bold' })
})