export {};
/** data questions */
type question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
};
const questions: question[] = [
  {
    id: 1,
    question: 'Trả lời câu hỏi sau: 1 + 1 = ?',
    options: ['1', '2', '3', '4'],
    answer: 2,
  },
  {
    id: 2,
    question: 'Trả lời câu hỏi sau: 2 * 2 = ?',
    options: ['1', '2', '3', '4'],
    answer: 4,
  },
  {
    id: 3,
    question: 'Trả lời câu hỏi sau: 2 ** 2 = ?',
    options: ['1', '2', '3', '4'],
    answer: 4,
  },
  {
    id: 4,
    question: 'Trả lời câu hỏi sau: 2 ** 3 = ?',
    options: ['2', '4', '6', '8'],
    answer: 4,
  },
  {
    id: 5,
    question: 'Trả lời câu hỏi sau: a = 3, b  = "3"; a == b ?',
    options: ['true', 'false', 'null', 'undefine'],
    answer: 1,
  },
  {
    id: 6,
    question: 'Trả lời câu hỏi sau: a = 3, b  = "3"; a === b ?',
    options: ['true', 'false', 'null', 'undefine'],
    answer: 2,
  },
  {
    id: 7,
    question: 'Trả lời câu hỏi sau: a = 3; a += a ?',
    options: ['4', '5', '6', '7'],
    answer: 3,
  },
  {
    id: 8,
    question: 'Trả lời câu hỏi sau: a = 3; a *= a ?',
    options: ['3', '6', '9', '0'],
    answer: 3,
  },
  {
    id: 9,
    question: 'Trong lập trình Js viết tắt của từ nào: ',
    options: ['jav', 'javaS', 'javaScrip', 'javaScript'],
    answer: 4,
  },
  {
    id: 10,
    question:
      'Chúng ta đặt Js bên trong phần tử HTML trong cặp cặp Element nào < ? > ?',
    options: ['scripting', 'js', 'script', 'javascript'],
    answer: 3,
  },
];
let start: number = 0;
const end: number = questions.length;
const $ = document.querySelector.bind(document);

const btnNext: HTMLElement = $('.btn-next');
const btnPrev: HTMLElement = $('.btn-previous');
const contentQuestion: HTMLElement = $('.container-question');
const btnSubmitTest: HTMLElement = $('.btn-submit-test');

renderPagination();
const paginationItems =
  document.querySelectorAll<HTMLElement>('.pagination-item');

addEventListenerItemsPagination();
function addEventListenerItemsPagination() {
  paginationItems.forEach((item: any, index: number) => {
    item.addEventListener('click', () => {
      start = index;
      renderQuestions();
      renderAnswer();
      item.classList.add('slacking');
    });
  });
}

function renderPagination(): void {
  let html = '';
  questions.forEach((item: any) => {
    html += `
    <li class="pagination-item">
    <a href="#" class="btn pagination-link">${item.id}</a>
    </li>`;
    return html;
  });
  const paginationList = $('.pagination-list');
  paginationList.innerHTML = html;
}
let answerQuestion: any = [];
createAnswer();
renderLocal();

function createAnswer(): void{
  questions.forEach((item: any) => {
    const html = { id: item.id, answer: 0 };
    answerQuestion.push(html);
  });
}

function renderQuestions(): void {
  let html = '';
  questions.forEach((item: any, index: number) => {
    if (index === start) {
      let element = '';
      contentQuestion.innerHTML = '';
      item.options.forEach((item: any, index: number) => {
        element += `<input class="input-answer" type="radio" name="answer" value="${
          index + 1
        }"id="cau${index + 1}"/>
        <label class="lable-answer" for="cau${
          index + 1
        }">${item}</label><br />`;
        return element;
      });
      html += `<h4>Câu Hỏi số ${index + 1}</h4>
      <p>${item.question}</p>
      <h6>Chọn đáp án đúng:</h6>
      ${element}`;
    }
    contentQuestion.innerHTML = html;
  });
}

renderQuestions();
btnNext.addEventListener('click', () => {
  next();
});
btnPrev.addEventListener('click', () => {
  previous();
});

function next(): void{
  start++;
  addSlacking();
  if (start > end - 1) start = end - 1;
  btnPrev.classList.remove('disabled');
  if (start == end - 1) {
    btnNext.classList.add('disabled');
  }
  renderQuestions();
}

function previous(): void{
  renderQuestions();
  if (start == 0) {
    btnPrev.classList.add('disabled');
  } else if (start < 0) {
    return;
  } else {
    start--;
    btnNext.classList.remove('disabled');
  }
}

addSlacking();
renderAnswer();

function addSlacking(): void{
  paginationItems.forEach((item: any, index: number) => {
    if (index == start) {
      item.click();
    }
  });
}

const btnSubmitAnswer: HTMLElement = $('.btn-submit-answer');
btnSubmitAnswer.addEventListener('click', submitAnswers);

function submitAnswers():void {
  let inputChecked = false;
  const inputElement = document.forms[0];
  for (let i = 0; i < inputElement.length - 1; i++) {
    if ((inputElement[i] as HTMLInputElement).checked) {
      answerQuestion.forEach((item: any) => {
        if (item.id == start + 1) {
          item.answer = Number((inputElement[i] as HTMLInputElement).value);
          inputChecked = true;
        }
      });
    }
  }
  if (inputChecked) {
    addSubmitAnswer();
  }
  localStorage.setItem('answerQuestion', JSON.stringify(answerQuestion));
  next();
}

function addSubmitAnswer(): void {
  paginationItems.forEach((item: any, index: number) => {
    if (index == start) {
      item.classList.add('watched');
    }
  });
}

function answerList(): void{
  const list = $('.answer-list');
  let html = '';
  questions.forEach((item: any) => {
    if (item.answer == 1) {
      html += `<li class="answer-item">A</li>`;
    }
    if (item.answer == 2) {
      html += `<li class="answer-item">B</li>`;
    }
    if (item.answer == 3) {
      html += `<li class="answer-item">C</li>`;
    }
    if (item.answer == 4) {
      html += `<li class="answer-item">D</li>`;
    }
  });
  list.innerHTML = html;
}

btnSubmitTest.addEventListener('click', () => {
  if (confirm('Bạn chắc chắn nộp bài') == true) {
    submitTest();
  }
});

function submitTest(): void{
  const length: number = questions.length;
  let totalTrue = 0;
  for (let i = 0; i < length; i++) {
    if (questions[i].answer == answerQuestion[i].answer) {
      totalTrue++;
      paginationItems[i].classList.add('correct');
    } else {
      paginationItems[i].classList.add('wrong');
    }
  }
  editNote();
  totalScores(totalTrue);
  answerList();
  btnSubmitTest.style.display = 'none';
  btnSubmitAnswer.style.display = 'none';
  const paginationMove: HTMLElement = $('.pagination-move');
  paginationMove.style.display = 'none';
  clearInterval(x);
  localStorage.clear();
}

function totalScores(totalTrue: number): void {
  const htmlDiem = $('.title-time');
  const diem: number = (10 * totalTrue) / questions.length;
  htmlDiem.innerHTML = ` <h4 class="time col-sm">Điểm: ${diem}/10 (Đúng ${totalTrue}/${questions.length} câu)</h4>`;
}

function renderAnswer(): void {
  answerQuestion.forEach((item: any, index: number) => {
    if (item.answer !== 0 && index == start) {
      const inputElement = document.forms[0];
      (inputElement[item.answer - 1] as HTMLInputElement).checked = true;
    }
  });
}

function editNote():void {
  const noteElement = $('.note');
  let html = '';
  html += `<div class="note-item col">
    <div class="note-dot correct">
    </div>
    <p class="note-decription">Câu trả lời đúng</p>
  </div>
  <div class="note-item col">
    <div class="note-dot wrong">
    </div>
    <p class="note-decription">câu trả lời sai</p>
  </div>`;
  noteElement.innerHTML = html;
}

const d = new Date();
if (localStorage.getItem('countDown') === null) {
  d.setSeconds(300 + d.getSeconds());
  const countDownDate: any = d.getTime();
  localStorage.setItem('countDown', countDownDate);
}
const second: any = localStorage.getItem('countDown');
d.setTime(second);
const countDown = d.getTime();
const x = setInterval(() => {
  const now:number = new Date().getTime();
  const distance: number= countDown - now;
  const minutes: number= Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds:number = Math.floor((distance % (1000 * 60)) / 1000);
  if (seconds < 10) {
    $('.time').innerHTML = minutes + ':' + '0' + seconds;
  } else {
    $('.time').innerHTML = minutes + ':' + seconds;
  }
  if (distance < 0) {
    alert('Đã Hết giờ làm bài');
    submitTest();
    localStorage.clear();
  }
}, 300);

function renderLocal(): void{
  if (localStorage.getItem('answerQuestion') === null) {
    localStorage.setItem('answerQuestion', JSON.stringify(answerQuestion));
  }
  answerQuestion = JSON.parse(localStorage.getItem('answerQuestion'));
  renderWatched();
}

function renderWatched(): void {
  answerQuestion.forEach((item: any, index: number) => {
    if (item.answer !== 0) {
      paginationItems[index].classList.add('watched');
    }
  });
}
