
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkEX-BCUIfl8CIOXIkjZ_ElYf9ECbrXNs",
  authDomain: "web-comments-8260e.firebaseapp.com",
  databaseURL: "https://web-comments-8260e-default-rtdb.firebaseio.com",
  projectId: "web-comments-8260e",
  storageBucket: "web-comments-8260e.appspot.com",
  messagingSenderId: "462472239176",
  appId: "1:462472239176:web:6cf8bcfb513c25f06da07d",
  measurementId: "G-KBEPE7VQR6"
};







// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var database = firebase.database();

function sendMesssage() {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  dateTime = dateTime.toString();


  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var comment = document.getElementById("message").value;
  console.log(email + name + comment + dateTime)
  var newMessageKey = database.ref().child('comments').push().key;
  database.ref('comments/' + newMessageKey + '/email').set(email);
  database.ref('comments/' + newMessageKey + '/name').set(name);
  database.ref('comments/' + newMessageKey + '/comment').set(comment);
  database.ref('comments/' + newMessageKey + '/date').set(dateTime);
}

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();


  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

}



var leadsRef = database.ref('comments');
leadsRef.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    // console.log(childData.message)

    var name = document.createTextNode(childData.name);
    var email = document.createTextNode(childData.email);
    var comment = document.createTextNode(childData.comment);
    var date = document.createTextNode(childData.date);
    var space = document.createTextNode('    ');


    var ult = document.getElementById("scoreList");
    var lit = document.createElement("li");
    lit.setAttribute('class', 'uls');
    var author = document.createElement("p");
    var mail = document.createElement("p");
    var message = document.createElement("p");
    var stamp = document.createElement("p");


    lit.appendChild(space);
//name
    author.setAttribute('class', 'author');
    lit.appendChild(author);
    author.appendChild(name);
  //email
    mail.setAttribute('class', 'email');
    lit.appendChild(mail);
    mail.appendChild(email);
    
    //comment
    message.setAttribute('class', 'message');
    lit.appendChild(message);
    message.appendChild(comment);
    
    //date
    stamp.setAttribute('class', 'date');
    lit.appendChild(stamp);
    stamp.appendChild(date);
    
    ult.appendChild(lit);




  });
});



const submit = document.getElementById('submitbtn');

submit.addEventListener("click", () => {
  sendMesssage()
  window.location.reload();

});