function displayStudents(student) {
    let card = document.createElement("li")
    card.innerHTML = `
    <div class="container">
    <p>studentID: ${student.id}</p>
    <p id="name">studentName: ${student.name}</p>
    <p id="feedback">studentFeedback: ${student.feedback}</p>
    </div>
    <button id="updateBtn">Update Feedback</button>
    <button id="btn">Delete FeedBack</button>
    `
    document.getElementById("container1").appendChild(card)

    const updateButton = card.querySelector("#updateBtn")
    updateButton.addEventListener("click", () => {
        student.feedback = prompt("Enter feedback")
        card.querySelector("#feedback").textContent = student.feedback
        updateData(student)
    })


    const deleteButton = card.querySelector("#btn")
    deleteButton.addEventListener("click", () => {
       card.remove()
        deleteFromDB(student.id)
    })
    
}

//GET request -- reading from DB
function getData() {
    fetch("http://localhost:3000/studentsFeedback")
    .then(res => res.json())
    .then(data => data.forEach(student => displayStudents(student)))
}

getData()

//POST
const form = document.querySelector(".form-feedback")
form.addEventListener("submit", postData)

function postData(e) {
    e.preventDefault()
    let studentObj = {
        id: e.target.idInput.value,
        name: e.target.nameInput.value,
        feedback: e.target.feedbackInput.value
    }
    console.log(studentObj)
    pushToDB(studentObj)
}

function pushToDB(studentObj) {
    fetch("http://localhost:3000/studentsFeedback", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(studentObj)
    })
}

//DELETE Event
function deleteFromDB(id) {
    fetch(`http://localhost:3000/studentsFeedback/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


function updateData(studentObj) {
    fetch(`http://localhost:3000/studentsFeedback/${studentObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(studentObj)
    })
    .then(res => res.json())
    .then(student => console.log(student))
}