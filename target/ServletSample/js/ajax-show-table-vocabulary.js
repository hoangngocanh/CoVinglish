// $('.btn').click(function () {
let data;
$.ajax({
    type: "GET",
    url: "LearnWordServlet",
    dataType: "json",
    async: true,
    cache: false,
}).done(function (result) {
    let listSize = Object.keys(result).length;
    if (result.check == "fail") {
        return;
    }

    if (listSize > 0) {
        data = result;
        let nameLesson = document.getElementById("nameLesson");
        nameLesson.innerHTML = result[0].lessonId + " - " + result[0].nameLesson;
        let table = document.getElementById("row");
        for (i = 0; i < listSize; i++) {
            let row = table.insertRow(i);

            let cell = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);

            cell.innerHTML = result[i].id;
            cell1.innerHTML = result[i].category;
            cell2.innerHTML = result[i].english;
            cell3.innerHTML = result[i].pronounce;
            cell4.innerHTML = result[i].vietnamese;
            if (result[i].category.localeCompare("(adj)") == 0) {
                row.className = 'table-danger';
            } else if (result[i].category.localeCompare("(adv)") == 0) {
                row.className = 'table-success';
            } else if (result[i].category.localeCompare("(n)") == 0) {
                row.className = 'table-info';
            } else if (result[i].category.localeCompare("(v)") == 0) {
                row.className = 'table-warning';
            }


        }
    }
});





