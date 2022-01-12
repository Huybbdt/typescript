export {};
let slideIndex: number = 1;
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
// add eventListener dots
dots.forEach((item: any, index: number) => {
  item.addEventListener('click', () => {
    currentSlide(index + 1);
  });
});
btnPrev.addEventListener('click', () => {
  moveSlides(-1);
});
btnNext.addEventListener('click', () => {
  moveSlides(1);
});
showSlides(slideIndex);
function moveSlides(n: number):void {
  showSlides((slideIndex += n));
}
function currentSlide(n: number):void {
  showSlides((slideIndex = n));
}
function showSlides(n: number):void {
  const slides = document.getElementsByClassName('image') as HTMLCollectionOf<HTMLElement>;
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  // hidden slides and remove active slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
