const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                questions: "who wrote Harry Potter?",
                answers: ["JK Rowling", "JRR Tolkien"],
                correct: "JK Rowling",
                level: "easy"
            },
            {
                questions: "Who was born on Krypton",
                answers: ["Aquaman", "Superman"],
                correct: "Superman",
                level: "medium"
            },
            {
                questions: "who designed the first car",
                answers: ["Karl Benz", "Henry Ford"],
                correct: "Karl Benz",
                level: "hard"
            },
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                questions: "Where is Buckingham Palace?",
                answers: ["Richmond", "London"],
                correct: "London",
                level: "easy"
            },
            {
                questions: "Where is the Colosseum",
                answers: ["Rome", "Milan"],
                correct: "Rome",
                level: "medium"
            },
            {
                questions: "where is Mount Kilamanjaro",
                answers: ["Zimbabwe", "Tanzania"],
                correct: "Tanzania",
                level: "hard"
            },
        ]
    },
    {
        genre: "When",
        questions: [
            {
                questions: "When is Christmas?",
                answers: ["30th of Dex", "24th/25th Dec"],
                correct: "24th/25th Dec",
                level: "easy"
            },
            {
                questions: "When was JFK Shot?",
                answers: ["1963", "1961"],
                correct: "1963",
                level: "hard"
            },
            {
                questions: "when was WW2?",
                answers: ["1932", "1941"],
                correct: "1941",
                level: "medium"
            },
        ]
    },
    {
        genre: "What",
        questions: [
            {
                questions: "What is the capital of Saudi Arabia?",
                answers: ["Jeddah", "Riyadh"],
                correct: "Jeddah",
                level: "hard"
            },
            {
                questions: "what do koalas eat?",
                answers: ["straw", "Eucalypts"],
                correct: "Eucalypts",
                level: "easy"
            },
            {
                questions: "What is a kg short for?",
                answers: ["kilojoule", "kilogram"],
                correct: "kilogram",
                level: "medium"
            },
        ]
    },
    {
        genre: "How Many",
        questions: [
            {
                questions: "How many Players in a football team?",
                answers: ["15", "11"],
                correct: "11",
                level: "easy"
            },
            {
                questions: "How Many seconds in an hour?",
                answers: ["36000", "3600"],
                correct: "3600",
                level: "medium"
            },
            {
                questions: "How many people in china?",
                answers: ["1.1 bil", "1.4 bil"],
                correct: "1.4 bil",
                level: "hard"
            },
        ]
    }

]

let score = 0

function addCatergory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerText = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level === 'easy') {
            card.innerHTML = 100
        }

        if (question.level === 'medium') {
            card.innerHTML = 200
        }

        if (question.level === 'hard') {
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.questions)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())


        card.addEventListener('click', flipcard)
    })
}

jeopardyCategories.forEach(category => addCatergory(category))

function flipcard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')

    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')

    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipcard)) //stops you from flipping other cards when one is flipped.
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipcard))

    const cardOfButton = this.parentElement //all the info from arrays are stored in parent node

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML= cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipcard)
}












