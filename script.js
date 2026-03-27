import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getFirestore,collection,addDoc,getDocs,updateDoc,doc} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔥 Firebase Config
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

// Navigation
window.go=(id)=>{
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Signup
window.signup=async()=>{
  let name=n.value,email=e.value,pass=p.value;
  if(pass.length<8 || !/\d/.test(pass)){
    joinMsg.innerText="⚠️ Password must be 8+ chars and include a number";
    return;
  }
  await addDoc(collection(db,"users"),{name,email,pass,approved:false,role:"agent",alliances:[],codeVotes:[]});
  joinMsg.innerText="✅ Request sent!";
}

// Login Agent
window.login=async()=>{
  let q=await getDocs(collection(db,"users"));
  let found=false;
  q.forEach(docu=>{
    let d=docu.data();
    if(d.email==le.value && d.pass==lp.value && d.approved){
      currentUser={...d,id:docu.id};
      found=true;
      go("network");
      renderChat();
    }
  });
  if(!found) logMsg.innerText="❌ Not approved or wrong credentials";
}

// Admin login
window.admin=()=>{
  let u=prompt("Username"),p=prompt("Password");
  if(u=="ADMIN" && p=="HFLorg"){
    go("adminPanel");
    loadUsers();
    renderHierarchy();
  }
}

// Load Users for Admin
async function loadUsers(){
  let q=await getDocs(collection(db,"users"));
  let html="";
  q.forEach(d=>{
    let data=d.data();
    html+=`<div class="card">${data.name} - ${data.approved?"✅":"⏳"} <button onclick="approve('${d.id}')">Approve</button></div>`;
  });
  users.innerHTML=html;
}

// Approve User
window.approve=async(id)=>{
  await updateDoc(doc(db,"users",id),{approved:true});
  loadUsers();
}

// Send Chat Message
window.send=()=>{
  if(!m.value) return;
  let div=document.createElement("div");
  div.innerHTML=`<span class="online"></span> ${currentUser.name}: ${m.value}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  m.value="";
}

// Render Chat Online Members
async function renderChat(){
  chat.innerHTML="";
  let q=await getDocs(collection(db,"users"));
  q.forEach(d=>{
    let data=d.data();
    if(data.approved){
      let div=document.createElement("div");
      div.className="userOnline";
      div.innerHTML=`<span class="online"></span> ${data.name}`;
      chat.appendChild(div);
    }
  });
}

// Counter Boost
window.boost=()=>{
  let c=document.getElementById("counter");
  c.innerText=parseInt(c.innerText)+1;
}

// Render Hierarchy (basic)
async function renderHierarchy(){
  let q=await getDocs(collection(db,"users"));
  let html="<h3>Mngr ⚡</h3><div class='card'>ADMIN</div>";
  html+="<h3>Commanders 🛡️</h3>";
  let count=0;
  q.forEach(d=>{
    if(d.data().role=="commander" && count<5){
      html+=`<div class='card'>${d.data().name}</div>`;
      count++;
    }
  });
  html+="<h3>Deputies 🎯</h3>";
  count=0;
  q.forEach(d=>{
    if(d.data().role=="deputy" && count<10){
      html+=`<div class='card'>${d.data().name}</div>`;
      count++;
    }
  });
  html+="<h3>Agents 🚀</h3>";
  q.forEach(d=>{
    if(d.data().role=="agent"){
      html+=`<div class='card'>${d.data().name}</div>`;
    }
  });
  hierarchyPanel.innerHTML=html;
}
