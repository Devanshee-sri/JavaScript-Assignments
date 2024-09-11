
const recordContainer = document.querySelector(".recordContainer");

// Function to add a local storage
function addStudent(name, id, email, phone, idDate = Date.now()) {
  const student = {
    idDate: idDate,
    name: name,
    id: id,
    email: email,
    contact: phone 
  };

  let studentData = localStorage.getItem("studentData");
  if (studentData) {
    studentData = JSON.parse(studentData);

    // Check if the student id exists already.
    const existingStudent = studentData.find(s => s.id === id && s.idDate !== idDate);
    if (existingStudent) {
      alert("Student already exists!");
      return;
    }
  } else {
    studentData = [];
  }

  studentData = studentData.filter(s => s.idDate !== idDate);

  studentData.push(student);
  localStorage.setItem("studentData", JSON.stringify(studentData));

  Student();
}

function Student() {
  const studentData = JSON.parse(localStorage.getItem("studentData")) || [];

  recordContainer.innerHTML = '';

  for (let i = 0; i < studentData.length; i++) {
  
    let tableContent = document.createElement("div");
    let name = document.createElement("div");
    let id = document.createElement("div");
    let email = document.createElement("div");
    let contact = document.createElement("div");
    let btn = document.createElement("div");
  
    
    let buttonEdit = document.createElement("button");
    let buttonRemove = document.createElement("button");

    let nameH4 = document.createElement("h4");
    let idH4 = document.createElement("h4");
    let emailH4 = document.createElement("h4");
    let contactH4 = document.createElement("h4");

   
    let imgEdit = document.createElement("img");
    let imgRemove = document.createElement("img");

    imgEdit.src = "./Media/edit.svg";
    imgRemove.src = "./Media/delete.svg";

    tableContent.classList.add(studentData[i].id, studentData[i].idDate, "tableContent");

    nameH4.textContent = studentData[i].name;
    idH4.textContent = studentData[i].id;
    emailH4.textContent = studentData[i].email;
    contactH4.textContent = studentData[i].contact; 

    buttonEdit.id = "buttonEdit";
    buttonEdit.classList.add(studentData[i].id, studentData[i].idDate);
    buttonRemove.id = "buttonRemove";
    buttonRemove.classList.add(studentData[i].id, studentData[i].idDate);
    btn.id = "controlButtons";
  
    imgEdit.id = "edit";
    imgRemove.id = "remove";

    name.appendChild(nameH4);
    id.appendChild(idH4);
    email.appendChild(emailH4);
    contact.appendChild(contactH4);
    buttonEdit.appendChild(imgEdit);
    buttonRemove.appendChild(imgRemove);
    btn.appendChild(buttonEdit);
    btn.appendChild(buttonRemove);

    tableContent.appendChild(name);
    tableContent.appendChild(id);
    tableContent.appendChild(email);
    tableContent.appendChild(contact);
    tableContent.appendChild(btn);

    recordContainer.appendChild(tableContent);
  }
}

//form submission:-
document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const UpperName = name.charAt(0).toUpperCase() + name.slice(1);
  const id = document.getElementById("ID").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("tel").value;

  const submitButton = document.getElementById("submit");
  const idDate = submitButton.dataset.editing ? parseInt(submitButton.dataset.editing) : Date.now();

  addStudent(UpperName, id, email, phone, idDate);

  document.getElementById("studentForm").reset();
  submitButton.textContent = "Register";
  delete submitButton.dataset.editing;
});

Student();

recordContainer.addEventListener("click", function(event) {

  // Remove button clicked
  if (event.target && event.target.id === "remove") {
    if (confirm("Do you want to remove?")) {
      const buttonRemove = event.target.closest("button");
      const classList = buttonRemove.classList;

      // Retrieve data using localStorage
      let studentData = JSON.parse(localStorage.getItem("studentData")) || [];

      studentData = studentData.filter(student => student.id !== classList[0] && student.idDate !== parseInt(classList[1]));

      // Update localStorage
      localStorage.setItem("studentData", JSON.stringify(studentData));

      Student();
    }
  }

  if (event.target && event.target.id === "edit") {
    const buttonEdit = event.target.closest("button");
    const classList = buttonEdit.classList;

    // Retrieve studentData
    let studentData = JSON.parse(localStorage.getItem("studentData")) || [];

    const studentToEdit = studentData.find(student =>
      student.id === classList[0] && student.idDate === parseInt(classList[1])
    );

    if (studentToEdit) {
      document.getElementById("name").value = studentToEdit.name;
      document.getElementById("ID").value = studentToEdit.id;
      document.getElementById("email").value = studentToEdit.email;
      document.getElementById("tel").value = studentToEdit.contact;

      const submitButton = document.getElementById("submit");
      submitButton.textContent = "Update Student";
      submitButton.dataset.editing = studentToEdit.idDate; 
    }
  }
});
