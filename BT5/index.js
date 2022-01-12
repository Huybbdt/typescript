"use strict";
exports.__esModule = true;
var questions = [
    {
        id: 1,
        question: 'Trả lời câu hỏi sau: 1 + 1 = ?',
        options: ['1', '2', '3', '4'],
        answer: 2
    },
    {
        id: 2,
        question: 'Trả lời câu hỏi sau: 2 * 2 = ?',
        options: ['1', '2', '3', '4'],
        answer: 4
    },
    {
        id: 3,
        question: 'Trả lời câu hỏi sau: 2 ** 2 = ?',
        options: ['1', '2', '3', '4'],
        answer: 4
    },
    {
        id: 4,
        question: 'Trả lời câu hỏi sau: 2 ** 3 = ?',
        options: ['2', '4', '6', '8'],
        answer: 4
    },
    {
        id: 5,
        question: 'Trả lời câu hỏi sau: a = 3, b  = "3"; a == b ?',
        options: ['true', 'false', 'null', 'undefine'],
        answer: 1
    },
    {
        id: 6,
        question: 'Trả lời câu hỏi sau: a = 3, b  = "3"; a === b ?',
        options: ['true', 'false', 'null', 'undefine'],
        answer: 2
    },
    {
        id: 7,
        question: 'Trả lời câu hỏi sau: a = 3; a += a ?',
        options: ['4', '5', '6', '7'],
        answer: 3
    },
    {
        id: 8,
        question: 'Trả lời câu hỏi sau: a = 3; a *= a ?',
        options: ['3', '6', '9', '0'],
        answer: 3
    },
    {
        id: 9,
        question: 'Trong lập trình Js viết tắt của từ nào: ',
        options: ['jav', 'javaS', 'javaScrip', 'javaScript'],
        answer: 4
    },
    {
        id: 10,
        question: 'Chúng ta đặt Js bên trong phần tử HTML trong cặp cặp Element nào < ? > ?',
        options: ['scripting', 'js', 'script', 'javascript'],
        answer: 3
    },
];
var start = 0;
var end = questions.length;
var $ = document.querySelector.bind(document);
var btnNext = $('.btn-next');
var btnPrev = $('.btn-previous');
var contentQuestion = $('.container-question');
var btnSubmitTest = $('.btn-submit-test');
renderPagination();
var paginationItems = document.querySelectorAll('.pagination-item');
addEventListenerItemsPagination();
function addEventListenerItemsPagination() {
    paginationItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            start = index;
            renderQuestions();
            renderAnswer();
            item.classList.add('slacking');
        });
    });
}
function renderPagination() {
    var html = '';
    questions.forEach(function (item) {
        html += "\n    <li class=\"pagination-item\">\n    <a href=\"#\" class=\"btn pagination-link\">".concat(item.id, "</a>\n    </li>");
        return html;
    });
    var paginationList = $('.pagination-list');
    paginationList.innerHTML = html;
}
var answerQuestion = [];
createAnswer();
renderLocal();
function createAnswer() {
    questions.forEach(function (item) {
        var html = { id: item.id, answer: 0 };
        answerQuestion.push(html);
    });
}
function renderQuestions() {
    var html = '';
    questions.forEach(function (item, index) {
        if (index === start) {
            var element_1 = '';
            contentQuestion.innerHTML = '';
            item.options.forEach(function (item, index) {
                element_1 += "<input class=\"input-answer\" type=\"radio\" name=\"answer\" value=\"".concat(index + 1, "\"id=\"cau").concat(index + 1, "\"/>\n        <label class=\"lable-answer\" for=\"cau").concat(index + 1, "\">").concat(item, "</label><br />");
                return element_1;
            });
            html += "<h4>C\u00E2u H\u1ECFi s\u1ED1 ".concat(index + 1, "</h4>\n      <p>").concat(item.question, "</p>\n      <h6>Ch\u1ECDn \u0111\u00E1p \u00E1n \u0111\u00FAng:</h6>\n      ").concat(element_1);
        }
        contentQuestion.innerHTML = html;
    });
}
renderQuestions();
btnNext.addEventListener('click', function () {
    next();
});
btnPrev.addEventListener('click', function () {
    previous();
});
function next() {
    start++;
    addSlacking();
    if (start > end - 1)
        start = end - 1;
    btnPrev.classList.remove('disabled');
    if (start == end - 1) {
        btnNext.classList.add('disabled');
    }
    renderQuestions();
}
function previous() {
    renderQuestions();
    if (start == 0) {
        btnPrev.classList.add('disabled');
    }
    else if (start < 0) {
        return;
    }
    else {
        start--;
        btnNext.classList.remove('disabled');
    }
}
addSlacking();
renderAnswer();
function addSlacking() {
    paginationItems.forEach(function (item, index) {
        if (index == start) {
            item.click();
        }
    });
}
var btnSubmitAnswer = $('.btn-submit-answer');
btnSubmitAnswer.addEventListener('click', submitAnswers);
function submitAnswers() {
    var inputChecked = false;
    var inputElement = document.forms[0];
    var _loop_1 = function (i) {
        if (inputElement[i].checked) {
            answerQuestion.forEach(function (item) {
                if (item.id == start + 1) {
                    item.answer = Number(inputElement[i].value);
                    inputChecked = true;
                }
            });
        }
    };
    for (var i = 0; i < inputElement.length - 1; i++) {
        _loop_1(i);
    }
    if (inputChecked) {
        addSubmitAnswer();
    }
    localStorage.setItem('answerQuestion', JSON.stringify(answerQuestion));
    next();
}
function addSubmitAnswer() {
    paginationItems.forEach(function (item, index) {
        if (index == start) {
            item.classList.add('watched');
        }
    });
}
function answerList() {
    var list = $('.answer-list');
    var html = '';
    questions.forEach(function (item) {
        if (item.answer == 1) {
            html += "<li class=\"answer-item\">A</li>";
        }
        if (item.answer == 2) {
            html += "<li class=\"answer-item\">B</li>";
        }
        if (item.answer == 3) {
            html += "<li class=\"answer-item\">C</li>";
        }
        if (item.answer == 4) {
            html += "<li class=\"answer-item\">D</li>";
        }
    });
    list.innerHTML = html;
}
btnSubmitTest.addEventListener('click', function () {
    if (confirm('Bạn chắc chắn nộp bài') == true) {
        submitTest();
    }
});
function submitTest() {
    var length = questions.length;
    var totalTrue = 0;
    for (var i = 0; i < length; i++) {
        if (questions[i].answer == answerQuestion[i].answer) {
            totalTrue++;
            paginationItems[i].classList.add('correct');
        }
        else {
            paginationItems[i].classList.add('wrong');
        }
    }
    editNote();
    totalScores(totalTrue);
    answerList();
    btnSubmitTest.style.display = 'none';
    btnSubmitAnswer.style.display = 'none';
    var paginationMove = $('.pagination-move');
    paginationMove.style.display = 'none';
    clearInterval(x);
    localStorage.clear();
}
function totalScores(totalTrue) {
    var htmlDiem = $('.title-time');
    var diem = (10 * totalTrue) / questions.length;
    htmlDiem.innerHTML = " <h4 class=\"time col-sm\">\u0110i\u1EC3m: ".concat(diem, "/10 (\u0110\u00FAng ").concat(totalTrue, "/").concat(questions.length, " c\u00E2u)</h4>");
}
function renderAnswer() {
    answerQuestion.forEach(function (item, index) {
        if (item.answer !== 0 && index == start) {
            var inputElement = document.forms[0];
            inputElement[item.answer - 1].checked = true;
        }
    });
}
function editNote() {
    var noteElement = $('.note');
    var html = '';
    html += "<div class=\"note-item col\">\n    <div class=\"note-dot correct\">\n    </div>\n    <p class=\"note-decription\">C\u00E2u tr\u1EA3 l\u1EDDi \u0111\u00FAng</p>\n  </div>\n  <div class=\"note-item col\">\n    <div class=\"note-dot wrong\">\n    </div>\n    <p class=\"note-decription\">c\u00E2u tr\u1EA3 l\u1EDDi sai</p>\n  </div>";
    noteElement.innerHTML = html;
}
var d = new Date();
if (localStorage.getItem('countDown') === null) {
    d.setSeconds(300 + d.getSeconds());
    var countDownDate = d.getTime();
    localStorage.setItem('countDown', countDownDate);
}
var second = localStorage.getItem('countDown');
d.setTime(second);
var countDown = d.getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDown - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 10) {
        $('.time').innerHTML = minutes + ':' + '0' + seconds;
    }
    else {
        $('.time').innerHTML = minutes + ':' + seconds;
    }
    if (distance < 0) {
        alert('Đã Hết giờ làm bài');
        submitTest();
        localStorage.clear();
    }
}, 300);
function renderLocal() {
    if (localStorage.getItem('answerQuestion') === null) {
        localStorage.setItem('answerQuestion', JSON.stringify(answerQuestion));
    }
    answerQuestion = JSON.parse(localStorage.getItem('answerQuestion'));
    renderWatched();
}
function renderWatched() {
    answerQuestion.forEach(function (item, index) {
        if (item.answer !== 0) {
            paginationItems[index].classList.add('watched');
        }
    });
}
