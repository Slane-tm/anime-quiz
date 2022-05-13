const questions = [
	{
		question: "Выбери самое кассовое полнометражное аниме",
		answers: ["Твое имя", "Акира", "Бесконечный поезд", "Мой сосед Тоторо"],
		correct: 3,
	},
	{
		question: "Кто автор манги Наруто",
		answers: [
			"Юи Ишида",
			"Хадзиме Исаяме",
			"Теппей Нацуки",
			"Масаси Кишимото",
		],
		correct: 4,
	},
	{
		question: "Аниме получившее оскар",
		answers: [
			"Унесенные призраками",
			"5 сантиметров в секунду",
			"Форма голоса",
			"Ходячий замок",
		],
		correct: 1,
	},
	{
		question: 'Какое прозвище было у Эрвина Смита, персонажа аниме "Атака Титанов"',
		answers: ["Щекастый", "Бровастый", "Папинкинь сынок", "Дятел"],
		correct: 2,
	},
	{
		question: 'Самое длинное аниме',
		answers: ["Дораймон", "Ван-пис", "Садзаэ-сан"],
		correct: 3,
	},
	{
		question: 'Когда автор Атаки Титанов создавал образ Леви на кого он ориентировался',
		answers: ["Рошах (Хранители)", "Эрик Дрейвен (Ворон)", "Гатс (Берсерк)", "Макс Пейн (Макс Пейн)", "Кирито (САО)", "Сквидвард (Спанч Боб Квадратные штаны)"],
		correct: 1,
	},
	{
		question: 'У какого из этих персонажов типаж "Дандере"',
		answers: ["Микаса Акерман (Атака Титанов)", "02 (Милый во Франксе)", "Аква (Этот прекрасный мир)", "Тоука (Токийский Гуль)", "Хината Хьюга (Наруто)"],
		correct: 5,
	},
	{
		question: 'Какое из этих аниме запрещено во многих странах из-за избытка насилия',
		answers: ["Коллекция Дзюндзи Ито", "Кровь с", "Шоу уродцев гоподина Араси", "Атака титанов", "Токийский Гуль", "Бакуган"],
		correct: 3,
	},

];

let score = 0;
let questionIndex = 0;
let header = document.querySelector('#header');
let listContainer = document.querySelector('#list');
let button = document.querySelector('#submit');

clear();
showQuestions();
button.addEventListener('click', function(e) {
	let checked = document.querySelector('input[type="radio"]:checked');
	if(!checked){
      button.blur();
	  return
	}
     if(checked.value == questions[questionIndex]['correct']){
     	score++
     }
     if(questionIndex != questions.length-1){
     	clear()
     	questionIndex++
     	showQuestions()
     } else {
     	clear();
     	showResult()
     	
     }
});


function clear() {
	header.innerText = ''
	listContainer.innerText = ''
}

function showQuestions(){
	let question = questions[questionIndex]['question'];
	let answers = questions[questionIndex]['answers'];

    let headerTemplate = `<h2 class="title">%title%</h2>`
	let title = headerTemplate.replace('%title%', question);
    header.innerHTML = title

	for([index, answerText] of answers.entries()){
		let questionTemplate = 
		   `<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		let answerHTML = questionTemplate
		.replace('%answer%', answerText)
		.replace('%number%', index+1)
		listContainer.innerHTML += answerHTML
	}
}

function showResult() {
	let resultTempery = `

			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p> 
	`
	let title, message, result
	if(score == questions.length){
		title = "Ответил на все вопросы верно"
		message = "поздровляю ты - анимешник затворник!"

	} else if (score == 0){
         title = 'Ни один не правильный'
        message = 'Позор да и только'
	} else {
        title = 'Не плохо'
        message = 'Средний результат'
	}
	result = `${score} из ${questions.length}`
	let finalResult = resultTempery.replace('%title%', title).replace('%message%', message).replace('%result%', result);
	header.innerHTML = finalResult;
	button.blur()
	button.innerText = 'Начать заново';
	button.onclick = () => history.go();
}

