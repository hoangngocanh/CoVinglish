// $('.btn').click(function () {
$(function () {
    let data;
    let stringVN;
    let index = 0;
    let listSize;
    let isReview = true;
    let isMultiChoice = false;
    let isLearned = true;
    let btn = document.getElementById("btn-next");
    let english = document.getElementById("english");
    let category = document.getElementById("category");
    let vietnamese = document.getElementById("vietnamese");
    let exEnglish = document.getElementById("ex-english");
    let exVietnamese = document.getElementById("ex-vietnamese");
    let word = document.getElementById("word");
    let note = document.getElementById("note");
    const reWordSet = new Set();
    let radCorrectAnswer;
    let rank = 2;
    let degree = 2;
    let a = document.getElementById("a");
    let b = document.getElementById("b");
    let c = document.getElementById("c");
    let d = document.getElementById("d");
    let input = document.getElementById("input-word");
    let selectAnswer = 0;
    $.ajax({
        type: "GET",
        url: "LearnWordServlet",
        dataType: "json",
        async: true,
        cache: false,
    }).done(function (result) {
        listSize = Object.keys(result).length;
        if (result.check == "fail") {
            return;
        }

        if (listSize > 0) {
            data = result;
            showNextWordReview();
        }
    });

    $('.btn').click(function () {
        checkInput();
    })

    $("#card1").click(function () {
        selectAnswer = 0;
        checkInput();
    })
    $('#card2').click(function () {
        selectAnswer = 1;
        checkInput();
    })
    $('#card3').click(function () {
        selectAnswer = 2;
        checkInput();
    })
    $('#card4').click(function () {
        selectAnswer = 3;
        checkInput();
    })

    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter' ||event.keyCode === 13) {
            event.preventDefault();
            checkInput();
        }
    });



    function checkInput() {
        if (isReview) {
            checkReview();
        } else if (isMultiChoice) {
            checkMultipleChoice();
        } else {
            checkInputAnswer();
        }
        input.value = "";
        input.focus();
    }

    function indexController() {
        if (index > rank) {
            if (isReview) {
                isReview = false;
                isMultiChoice = true;
                index = rank - degree;
            } else if (isMultiChoice) {
                isMultiChoice = false
                isReview = false;
                index = rank - degree
            } else {
                isReview = true;
                isMultiChoice = false;
                if (index > listSize) {
                    rank = 12;
                    index = 0;
                    degree = 12;
                    isMultiChoice = true;
                } else {
                    rank += (degree+1);
                }
            }
        }
    }

    function showController() {
        if (isReview) {
            showNextWordReview();
        } else if (isMultiChoice) {
            showNextMultiChoice();
        } else {
            showNextWordInput();
        }
    }



    function checkMultipleChoice() {
        if (selectAnswer == radCorrectAnswer) {
            index++;
            indexController();
            showController();
        } else {
            note.innerHTML = "not correct";
        }
    }
    function showNextMultiChoice() {
        note.innerHTML = "chose correct answer";
        document.getElementById("input-container").style.display = "none";
        document.getElementById("explain-word").style.display = "none";
        document.getElementById("choice").style.display = "block";
        word.style.display = "block";
        word.innerHTML = data[index].english;
        let rad = Math.floor(Math.random()*6);
        radCorrectAnswer = Math.floor(Math.random() * 4);
        if (radCorrectAnswer == 0) {
            a.innerHTML = data[index].vietnamese;
            b.innerHTML = data[index + 3 + rad].vietnamese;
            c.innerHTML = data[index + 2 + rad].vietnamese;
            d.innerHTML = data[index + 4 + rad].vietnamese;
        } else if (radCorrectAnswer == 1) {
            b.innerHTML = data[index].vietnamese;
            a.innerHTML = data[index + 1 + rad].vietnamese;
            c.innerHTML = data[index + 2 + rad].vietnamese;
            d.innerHTML = data[index + 4+ rad].vietnamese;
        } else if (radCorrectAnswer == 2) {
            c.innerHTML = data[index].vietnamese;
            b.innerHTML = data[index + 3 + rad].vietnamese;
            a.innerHTML = data[index + 1 + rad].vietnamese;
            d.innerHTML = data[index + 2 + rad].vietnamese;
        } else if (radCorrectAnswer == 3) {
            d.innerHTML = data[index].vietnamese;
            b.innerHTML = data[index + 3 + rad].vietnamese;
            c.innerHTML = data[index + 1 + rad].vietnamese;
            a.innerHTML = data[index + 4 + rad].vietnamese;
        }
    }

    function checkInputAnswer() {
        note.innerHTML = "";
        if (data[index].english.localeCompare(input.value) === 0) {
            index++;
            indexController();
            showController();
        } else {
            note.innerHTML = "";
            english.innerHTML = input.value+" is not Correct!";
            input.value = "";
            suggestWord();
        }
    }

    function showNextWordInput() {
        document.getElementById("explain-word").style.display = "none";
        document.getElementById("detail-word").style.display = "none";
        document.getElementById("choice").style.display = "none";
        document.getElementById("input-container").style.display = "block";
        word.innerHTML = data[index].vietnamese;
        note.innerHTML = "typing your answer!";
    }
    function checkReview() {
        if (data[index].english.localeCompare(input.value) === 0) {
            index++;
            indexController();
            showController();
        } else {
            note.innerHTML = "not correct!";
        }
    }

    function showNextWordReview() {
        document.getElementById("choice").style.display = "none";
        word.innerHTML = data[index].vietnamese;
        note.innerHTML = "guess the word ";
        document.getElementById("input-container").style.display = "block";
        btn.innerHTML = "CHECK";
        suggestWord();

    }

    function showNextWord() {
        btn.innerHTML = "CHECK";
        input.value = "";
        input.focus();
        if (isLearned) {
            document.getElementById("vietnamese-word").innerHTML = data[index].english +" " + num + " " + listSize;
            if (num >= listSize) {
                isLearned = false;
            }
        } else {
            document.getElementById("vietnamese-word").innerHTML = data[index].vietnamese;
        }
        document.getElementById("explain-word").style.display = "none";
        document.getElementById("detail-word").style.display = "none";
    }

    function displayExplainWord() {
        btn.innerHTML = "NEXT";
        document.getElementById("explain-word").style.display = "block";
        document.getElementById("detail-word").style.display = "block";
        vietnamese.style.display = "block";
        english.innerHTML = data[index].english + " - " + data[index].pronounce;
        category.innerHTML = data[index].category;
        vietnamese.innerHTML = data[index].vietnamese;
        exEnglish.innerHTML = "EX: " + data[index].exampleEnglish;
        exVietnamese.innerHTML = data[index].exampleVietnamese;
    }

    function suggestWord() {
        reWordSet.add(index);
        english.innerHTML = data[index].pronounce;
        document.getElementById("explain-word").style.display = "block";
        document.getElementById("detail-word").style.display = "block";
        category.innerHTML = data[index].category;
        vietnamese.style.display = "block";
        exEnglish.style.display = "block";
        exEnglish.innerHTML = "Suggestion: " + data[index].exampleEnglish;
        exVietnamese.innerHTML = data[index].exampleVietnamese;
    }


});




