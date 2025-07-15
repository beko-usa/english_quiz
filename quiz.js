const quizData = [
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nI ( ) a student.",
        choices: ["am", "is", "are", "be"],
        answer: "am",
        hint: "主語が `I` のときのbe動詞は `am` を使います。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nHe ( ) soccer every day.",
        choices: ["play", "plays", "playing", "is play"],
        answer: "plays",
        hint: "主語が三人称単数（he, she, itなど）で、現在の習慣を表すとき、一般動詞には -s をつけます。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nWe ( ) to the library yesterday.",
        choices: ["go", "goes", "went", "gone"],
        answer: "went",
        hint: "`yesterday`（昨日）とあるので、過去形を使います。`go` の過去形は `went` です。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nShe ( ) speak English very well.",
        choices: ["is", "does", "can", "has"],
        answer: "can",
        hint: "「～することができる」という能力を表す助動詞 `can` を使います。助動詞の後ろの動詞は原形になります。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nWhat are you ( ) now?",
        choices: ["do", "does", "did", "doing"],
        answer: "doing",
        hint: "「今～しているところです」と尋ねる現在進行形の文です。`be動詞 + 動詞の-ing形` の形になります。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nI want ( ) a new comic book.",
        choices: ["read", "to read", "reading", "reads"],
        answer: "to read",
        hint: "`want to ~` で「～したい」という意味になります。これを不定詞の名詞的用法といいます。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nHe enjoys ( ) video games.",
        choices: ["play", "to play", "playing", "plays"],
        answer: "playing",
        hint: "`enjoy` の後には、動詞の-ing形（動名詞）が来ることが多いです。「～することを楽しむ」という意味です。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nThis car is as ( ) as that one.",
        choices: ["new", "newer", "newest", "more new"],
        answer: "new",
        hint: "`as ~ as ...` で「...と同じくらい～だ」という同じ程度の比較を表します。`~` の部分には形容詞・副詞の原級が入ります。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nEnglish is ( ) all over the world.",
        choices: ["speak", "speaking", "spoke", "spoken"],
        answer: "spoken",
        hint: "「英語は話される」という、～されるという意味の文（受動態）です。`be動詞 + 過去分詞` の形になります。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nI have ( ) to America three times.",
        choices: ["be", "go", "been", "went"],
        answer: "been",
        hint: "「～へ行ったことがある」という経験を表す現在完了形の文です。`have been to ~` という形を使います。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nLook at the ( ) cat.",
        choices: ["sleep", "sleeps", "sleeping", "slept"],
        answer: "sleeping",
        hint: "「眠っている」ネコ、というように名詞を修飾するとき、`~ing`形（現在分詞）を使うことがあります。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nI don\'t know ( ).",
        choices: ["what is this", "what this is", "is this what", "this is what"],
        answer: "what this is",
        hint: "`what` などで始まる疑問文が、他の文の一部になるときの語順は `疑問詞 + 主語 + 動詞` になります（間接疑問文）。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nIf I ( ) a bird, I could fly to you.",
        choices: ["am", "is", "was", "were"],
        answer: "were",
        hint: "「もし私が～だったら」という現在の事実とは違う仮定の話（仮定法）では、be動詞は主語に関わらず `were` を使います。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nYou ( ) not run in the classroom.",
        choices: ["are", "do", "must", "can"],
        answer: "must",
        hint: "「～してはいけない」という強い禁止を表すには `must not` を使います。"
    },
    {
        question: "次の文の( )に入る最も適切な語句を選びなさい.\nMy brother is taller ( ) my father.",
        choices: ["as", "to", "than", "of"],
        answer: "than",
        hint: "「～よりも背が高い」という比較の文（比較級）では、形容詞の `-er` 形のあとに `than` を置きます。"
    }
];

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const choicesContainerEl = document.getElementById('choices-container');
const feedbackTextEl = document.getElementById('feedback-text');
const hintTextEl = document.getElementById('hint-text');
const nextButtonEl = document.getElementById('next-button');
const quizAreaEl = document.getElementById('quiz-area');
const resultAreaEl = document.getElementById('result-area');
const scoreTextEl = document.getElementById('score-text');
const retryButtonEl = document.getElementById('retry-button');

let shuffledQuizData, currentQuizIndex, score;

function startQuiz() {
    shuffledQuizData = [...quizData].sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuizIndex = 0;
    score = 0;
    quizAreaEl.style.display = 'block';
    resultAreaEl.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuiz = shuffledQuizData[currentQuizIndex];
    questionNumberEl.textContent = `問題 ${currentQuizIndex + 1}/10`;
    questionTextEl.innerText = currentQuiz.question;

    currentQuiz.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => selectChoice(button, choice, currentQuiz.answer));
        choicesContainerEl.appendChild(button);
    });
}

function resetState() {
    nextButtonEl.style.display = 'none';
    feedbackTextEl.textContent = '';
    feedbackTextEl.className = '';
    hintTextEl.textContent = '';
    while (choicesContainerEl.firstChild) {
        choicesContainerEl.removeChild(choicesContainerEl.firstChild);
    }
}

function selectChoice(button, selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        feedbackTextEl.textContent = '正解！';
        feedbackTextEl.classList.add('correct');
        hintTextEl.textContent = ''; // 正解したらヒントを消す
        score++;

        const allChoiceBtns = document.querySelectorAll('.choice-btn');
        allChoiceBtns.forEach(btn => {
            btn.disabled = true;
        });

        nextButtonEl.style.display = 'block';
    } else {
        feedbackTextEl.textContent = '不正解。もう一度！';
        feedbackTextEl.classList.add('incorrect');
        hintTextEl.textContent = `ヒント: ${shuffledQuizData[currentQuizIndex].hint}`;
        
        button.disabled = true; // 間違えた選択肢だけを無効化
    }
}

function showResult() {
    quizAreaEl.style.display = 'none';
    resultAreaEl.style.display = 'block';
    scoreTextEl.textContent = `10問中 ${score}問 正解しました！`;
}

nextButtonEl.addEventListener('click', () => {
    currentQuizIndex++;
    if (currentQuizIndex < shuffledQuizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

retryButtonEl.addEventListener('click', startQuiz);

// ページの読み込み時にクイズを開始
startQuiz();