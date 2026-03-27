import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getFirestore,collection,addDoc,getDocs,updateDoc,doc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔥 Firebase Config - החלף עם שלך!
const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_APIKEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUser=null;

window.go=(id)=>{
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

window.signup=async()=>{
let name=n.value,email=e.value,pass=p.value;
if(pass.length<8 || !/\d/.test(pass)){
joinMsg.innerText="⚠️ Password must be 8+ chars and include a number";
return;
}
await addDoc(collection(db,"users"),{name,email,pass,approved:false,role:"agent"});
joinMsg.innerText="✅ Request sent!";
}

window.login=async()=>{
let q=await getDocs(collection(db,"users"));
let found=false;
q.forEach(docu=>{
let d=docu.data();
if(d.email==le.value && d.pass==lp.value && d.approved){
currentUser=d;
found=true;
go("network");
}
});
if(!found) logMsg.innerText="❌ Not approved or wrong credentials";
}

window.admin=()=>{
let u=prompt("Username"),p=prompt("Password");
if(u=="ADMIN" && p=="HFLorg"){
go("adminPanel");
loadUsers();
}
}

async function loadUsers(){
let q=await getDocs(collection(db,"users"));
let html="";
q.forEach(d=>{
let data=d.data();
html+=`<div class="card">${data.name} - ${data.approved?"✅":"⏳"} <button onclick="approve('${d.id}')">Approve</button></div>`;
});
users.innerHTML=html;
}

window.approve=async(id)=>{
await updateDoc(doc(db,"users",id),{approved:true});
loadUsers();
}

window.send=()=>{
let div=document.createElement("div");
div.innerHTML=`<span class="online"></span> ${m.value}`;
chat.appendChild(div);
}

window.boost=()=>{
let c=document.getElementById("counter");
c.innerText=parseInt(c.innerText)+1;
}
