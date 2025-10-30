// --- Example Tutors ---
const tutors = [
  {name:"Sohana Reddy", subject:"English", contact:"sohana@gmail.com"},
  {name:"Madhuri Priya", subject:"Mathematics", contact:"madhuri@gmail.com"},
  {name:"Teju", subject:"Science", contact:"teju@gmail.com"},
  {name:"Rishitha", subject:"Social", contact:"rishitha@gmail.com"},
  {name:"Santhoshi", subject:"FrontEnd", contact:"santhoshi@gmail.com"},
  {name:"Akshaya", subject:"BackEnd", contact:"akshaya@gmail.com"},
];

// --- Registration ---
const registerForm = document.getElementById("registerForm");
if(registerForm){
    registerForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const username = document.getElementById("regusername").value;
        const password = document.getElementById("regpassword").value;
        const role = document.getElementById("regrole").value;
        const registerMsg = document.getElementById("registerMsg");
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(!username || !password || !role){
            registerMsg.textContent = " Please fill all fields";
            registerMsg.style.color = "red";
            return;
        }

        if(users.some(u => u.username === username)){
            registerMsg.textContent = "Username already exists";
            registerMsg.style.color = "red";
            return;
        }

        users.push({username, password, role});
        localStorage.setItem("users", JSON.stringify(users));
        registerMsg.textContent = " Registered successfully!";
        registerMsg.style.color = "green";
        registerForm.reset();
    });
}

// --- Login ---
const authForm = document.getElementById("authform");
if(authForm){
    authForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const username = document.getElementById("loginusername").value;
        const password = document.getElementById("loginpassword").value;
        const role = document.getElementById("role").value;
        const loginMsg = document.getElementById("loginMsg");
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if(!username || !password || !role){
            loginMsg.textContent = "Please fill all fields";
            loginMsg.style.color = "red";
            return;
        }

        const user = users.find(u => u.username === username && u.password === password && u.role === role);

        if(user){
            localStorage.setItem("catalyst_clarity_enduser", JSON.stringify(user));
            if(role === "student"){
                window.location.href = "tutors.html";
            } else {
                window.location.href = "tutordashboard.html";
            }
        } else {
            loginMsg.textContent = "Invalid username or password!";
            loginMsg.style.color = "red";
        }
    });
}

// --- Logout ---
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("catalyst_clarity_enduser");
        window.location.href = "login.html";
    });
}

   //Populate tutors list for student dashboard 
const tutorList = document.getElementById("tutorList");
const tutorSelect = document.getElementById("selectedTutor");

if(tutorList && tutorSelect){
    tutors.forEach((t, index)=>{
        // show in list
        const li = document.createElement("li");
        li.textContent = `${t.name} - ${t.subject} (Contact: ${t.contact})`;
        tutorList.appendChild(li);

        // add to dropdown
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${t.name} - ${t.subject}`;
        tutorSelect.appendChild(option);
    });
}

// Booking 
const bookingForm = document.getElementById("bookingForm");
if(bookingForm){
    bookingForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const studentName = document.getElementById("studentName").value;
        const phoneNumber=document.getElementById("phoneNumber").value;
        const email=document.getElementById("studentemail").value;
        const tutorIndex = document.getElementById("selectedTutor").value;
        if(tutorIndex === ""){
            document.getElementById("bookingMsg").textContent = "Please select a tutor";
            document.getElementById("bookingMsg").style.color = "red";
            return;
        }
        if(studentName===""||phoneNumber===""||email===""){
            document.getElementById("bookingMsg").textContent="Please enter your details";
        }
        const tutor = tutors[tutorIndex];
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push({studentName,phoneNumber,email, tutorName: tutor.name, subject: tutor.subject});
        localStorage.setItem("bookings", JSON.stringify(bookings));

        document.getElementById("bookingMsg").textContent = `Booked ${tutor.name} for ${tutor.subject}`;
        document.getElementById("bookingMsg").style.color = "green";
        bookingForm.reset();
    });
}

//  Tutor Dashboard - Show booked students 
/**const bookingList = document.getElementById("bookingList");
if(bookingList){
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.forEach(b=>{
        const li = document.createElement("li");
        li.textContent = `${b.studentName} with details ${b.email} and ${b.phoneNumber} booked ${b.tutorName} (${b.subject})`;
        bookingList.appendChild(li);
    });
}**/
const bookingList = document.getElementById("bookingList");

if (bookingList) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const currentTutor = JSON.parse(localStorage.getItem("catalyst_clarity_enduser"));

    // Filter bookings for this tutor only
    const myBookings = bookings.filter(b => b.tutorName === currentTutor.username);

    myBookings.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.studentName} with details ${b.email} and ${b.phoneNumber} booked ${b.tutorName} (${b.subject})`;
        bookingList.appendChild(li);
    });

    // Show message if no bookings
    if (myBookings.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No students booked yet.";
        bookingList.appendChild(li);
    }
}