document.querySelector('#q1').addEventListener('submit', answerCheck)

function answerCheck(e) {
    //adding checked checkboxes to array
    e.preventDefault();
    let arr = [];
    let checkBoxes = document.querySelectorAll('.q1cb')
    for (let i in checkBoxes) {
        if (checkBoxes[i].checked) {
            arr.push(checkBoxes[i].value)
        }
    }
    let output = JSON.stringify({ "answer": arr });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/answers', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onload = function () {
        if (this.status == 200) {
            let response = JSON.parse(this.responseText)
            //displaying message and unchecking checkboxes
            if (response.result == 'true') {
               let test = `<span style="color: green">Passed</span>`
               document.querySelector('#q1').innerHTML += test
               document.querySelectorAll('.q1cb').forEach((i) => i.checked = false)
            } else {
               let test = `<span style="color: red">Failed</span>`
               document.querySelector('#q1').innerHTML += test
               document.querySelectorAll('.q1cb').forEach((i) => i.checked = false)
            }
        }
    }
    xhr.send(output)
}