// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCk3Em0_JBTybLZCRtOg1NX2hj70hu5Fz4",
    authDomain: "arata-b2152.firebaseapp.com",
    projectId: "arata-b2152",
    storageBucket: "arata-b2152.appspot.com",
    messagingSenderId: "963625471598",
    appId: "1:963625471598:web:a30360f5036c288149e07f",
    measurementId: "G-D2V89HSNY8",
    databaseURL: "https://arata-b2152-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
////database
const db = getDatabase();
////tao 1 node de luu du lieu toi database voi name   
//const reference = ref(db,"cost_day/01_23");


////write and update
let datachange = { da: 200, xe: 123123 };
function writedata(userid, datas) {
    const db = getDatabase();//get database 
    const reference = ref(db, "users/" + userid);//link of what node to choose
    set(reference, datas);//create or update the node
}

//writedata("andreaw",datachange);

////read 
// const distanceRef = ref(db,"users/");
// onValue(distanceRef,(snapshot)=>{
//     const data = snapshot.val();

//     Object.values(data).forEach(item=>{
//         console.log(item);
//     });//object
// })
////delete
// var data ;
// onValue(reference,(snapshot)=>{
//     data = snapshot.val();
//     console.log(data)
// })

// if(data == null){
//     remove(reference)
// }
// else{
//     console.log("none");
// }

////test
////test button
// let buttontest = document.getElementById("testbutton");
//     buttontest.addEventListener("click",()=>{
//         var inputvale = "testdemo";
//         writedata("andreaw",datachange);
//         console.clear();
//     })

/////////////////////////////////////take_data///////////////////////////////////////////
function test(){
    alert("helo");
}
let data_month = "";
//funtion take data 
function take_data(data) {
    const reference = ref(db, "cost_day/" + data);
    let push_data = document.getElementById("data-month");
    var data;
    onValue(reference, (snapshot) => {
        data = snapshot.val();
        if (data != null) {
            data = Object.entries(data);//doi ve array
            console.log(data);
            data.forEach(item => {
                if (item != null) {
                    const obj = ((item)[1]);
                    let sum = 0;
                    for (let key in obj) {
                        sum += Number(obj[key]);
                    }
                    push_data.innerHTML += `<div value="${item[0]} : ${sum}">${item[0]} : ${sum}</div>`;
                }
            })
            push_data.querySelectorAll("div").forEach(item=>{
                item.addEventListener("click",()=>{
                    alert(item.innerHTML);
                })
            })
        }
        else {
            alert("xin lỗi không có dữ liệu của tháng này");
        }
    })
}
document.getElementById("set").addEventListener("click", () => {
    document.getElementById("data-month").innerHTML = "";
    let month = document.getElementById("recive-month");
    data_month = month.value;
    if (data_month != "") {
        data_month = data_month.split("-");
        const check = data_month[1] + "_" + data_month[0].slice(2, 4);
        console.log(check)
        take_data(check);
    }
    else {
        alert("xin lỗi vui lòng nhập tháng và năm!!!")
    }
    //console.clear();
})

//////////////////////////////create_month_data//////////////////////////////////////

document.getElementById("create").addEventListener("click", () => {
    document.getElementById("data-month").innerHTML = "";
    let month = document.getElementById("recive-month");
    data_month = month.value;
    if (data_month != "") {
        data_month = data_month.split("-");
        const check = data_month[1] + "_" + data_month[0].slice(2, 4);
        //console.log(check);
        check_month(check)
        .then((result) => { 
            if(result){
                alert("bạn đã tạo rồi tháng này rồi đó");
            }
            else{
                const db = getDatabase();
                const reference = ref(db, "cost_day/" + check);
                set(reference, "");
                alert("bạn tạo database thành công");
            }
        // In ra true hoặc false
        })
        .catch((error) => {
          console.log(error); // In ra lỗi nếu có
        });
    }
    else {
        alert("xin lỗi vui lòng nhập tháng và năm!!!")
    }

})
function check_month(datas) {
    return new Promise((resolve, reject) => {
    const reference = ref(db, "cost_day/");
    onValue(reference, (snapshot) => {
      let data_check;
      let compare = false;
      data_check = snapshot.val();
      data_check = Object.entries(data_check);
      compare = data_check.some(item => {
        return item[0] == datas;
      });
      resolve(compare);
    }, (error) => {
      reject(error);
    });
  });
}





