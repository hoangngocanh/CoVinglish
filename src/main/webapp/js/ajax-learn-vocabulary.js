// $('.btn').click(function () {
$(function () {
    let data;
    let stringVN;
    let index = 0;
    let num = 0;
    let listSize;
    let isNext = false;
    let isLearned = true;
    let btn = document.getElementById("btn-next");
    let english = document.getElementById("english");
    let category = document.getElementById("category");
    let vietnamese = document.getElementById("vietnamese");
    let exEnglish = document.getElementById("ex-english");
    let exVietnamese = document.getElementById("ex-vietnamese");
    const reWordSet = new Set();
    let reWordArray = [];
    let reIndex = 0;
    let sizeReWordArray;
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
            showNextWord();
        }
    });

    $('.btn').click(function () {
        checkInput();
    })


    let input = document.getElementById("input-word");
    input.addEventListener("keyup", function(event) {
        if (event.key === 'Enter' ||event.keyCode === 13) {
            event.preventDefault();
            checkInput();
        }
    });

    function checkInput() {

        if (isNext) {
            showNextWord();
            isNext = false;
        }else if (data[index].english.localeCompare(document.getElementById("input-word").value) === 0) {
            displayExplainWord();
            num++;
            if (num < 2*listSize) {
                index = num % listSize;
            } else if ( num == 2*listSize) {
                reWordArray = Array.from(reWordSet);
                sizeReWordArray = reWordArray.length;
            }
            else {
                index = reWordArray[reIndex % sizeReWordArray];
                reIndex++;
            }

            isNext = true;
        } else {
            english.innerHTML = document.getElementById("input-word").value+" is not Correct!";
            document.getElementById("input-word").value = "";
             suggestWord();
        }
    }

    function showNextWord() {
        btn.innerHTML = "CHECK";
        let input = document.getElementById("input-word");
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
        document.getElementById("explain-word").style.display = "block";
        document.getElementById("detail-word").style.display = "block";
        vietnamese.style.display = "none";
        exEnglish.style.display = "block";
        exEnglish.innerHTML = "Suggestion: " + data[index].exampleEnglish;
        exVietnamese.innerHTML = data[index].exampleVietnamese;
    }


});




