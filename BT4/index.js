"use strict";
exports.__esModule = true;
var slideIndex = 1;
var btnPrev = document.querySelector('.prev');
var btnNext = document.querySelector('.next');
var dots = document.querySelectorAll('.dot');
// add eventListener dots
dots.forEach(function (item, index) {
    item.addEventListener('click', function () {
        currentSlide(index + 1);
    });
});
btnPrev.addEventListener('click', function () {
    moveSlides(-1);
});
btnNext.addEventListener('click', function () {
    moveSlides(1);
});
showSlides(slideIndex);
function moveSlides(n) {
    showSlides((slideIndex += n));
}
function currentSlide(n) {
    showSlides((slideIndex = n));
}
function showSlides(n) {
    var slides = document.getElementsByClassName('image');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    // hidden slides and remove active slides
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
}
