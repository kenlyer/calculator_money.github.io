// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, remove, off } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
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
let data_month = "";
document.getElementById("recive-month").addEventListener("change", () => {
    document.getElementById("data-month").innerHTML = "";
    document.getElementById("data-out").innerHTML = "";
    document.getElementById("day_").innerText = "value";
    document.getElementById("month_").innerText = "value";
    document.getElementById("add-setting").innerHTML = "";
    document.getElementById("select-day").innerHTML = "";
    document.getElementById("create-day").removeEventListener("click", create_day);

})
setInterval(()=>{
    console.clear()
},1000);
//funtion take data 
function take_data(data) {
    const reference = ref(db, "cost_day/" + data);
    let push_data = document.getElementById("data-month");
    var data;
    onValue(reference, (snapshot) => {
        document.getElementById("data-month").innerHTML = "";
        data = snapshot.val();
        if (data != null) {
            data = Object.entries(data);//doi ve array

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
            push_data.querySelectorAll("div").forEach(item => {
                item.addEventListener("click", () => {
                    take_out(item.innerHTML.split(":")[0].split("-")[0], item.innerHTML.split(":")[0].split("-")[1]);
                    print_data(item.innerHTML.split(":")[0].split("-")[0], item.innerHTML.split(":")[0].split("-")[1]);
                    document.getElementById("add-setting").innerHTML = `<input type="text" maxlength="text" id="key">
                <input type="text" maxlength="number" id="valueOfKey">
                <button id="change-item">CHANGE & ADD</button>`;
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
        const max_day = new Date(data_month[0], data_month[1], 0).getDate();
        let create_option = document.getElementById("select-day");
        for (let i = 1; i <= max_day; i++) {
            create_option.innerHTML += `<option value="${i}">${i}</option>`;
        }
        let create_dayNote = document.getElementById("create-day");
        create_dayNote.addEventListener("click", create_day)
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
                if (result) {
                    alert("bạn đã tạo tháng này rồi đó");
                    take_data(check);
                }
                else {
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
///////////////////////////////out-put///////////////////////////
function take_out(day, month) {
    document.getElementById("day_").innerText = day;
    document.getElementById("month_").innerText = month;
    document.getElementById("data-out").innerText = "";
}
function print_data(day, month) {

    let day_month = String(day + "-" + month);
    let address = document.getElementById("recive-month").value;
    address = address.split("-");
    address = String(address[1] + "_" + address[0].slice(2, 4));
    address = ("cost_day/" + address + "/" + day_month).trim();
    const db = getDatabase();
    const reference = ref(db, address.trim());
    onValue(reference, (snapshot) => {
        let out_data = document.getElementById("data-out");
        out_data.innerText = "";
        let data_ = snapshot.val();
        data_ = Object.entries(data_);
        data_.forEach(item => {
            out_data.innerHTML += `<div title="${item[0]}">${item[0]} : ${item[1]}<button style="float:right;">X</button></div>`;
        })
        delete_data(address, day, month);
        get_data_change(address);

    })
}
function delete_data(address, day, month) {
    let dataOut = document.getElementById("data-out");
    dataOut.querySelectorAll("div").forEach(item => {
        item.querySelector("button").addEventListener("click", () => {
            if (confirm("bạn có chắc muốn xóa")) {
                console.log((address + "/" + item.innerText.split(":")[0]).trim());
                const db = getDatabase();
                const reference = ref(db, (address + "/" + item.innerText.split(":")[0]).trim());
                console.log(address);
                const check_reference = ref(db, address.trim() + "/");
                onValue(check_reference, (snapshot) => {
                    let data = snapshot.val();
                    data = Object.entries(data);
                    if (data.length == 1) {

                    }
                    else {
                        remove(reference);
                    }
                })
                // console.log(data);
                print_data(day, month);
            }
            else {

            }
        })
    })
}
function get_data_change(address) {
    let dataOut = document.getElementById("data-out");
    dataOut.querySelectorAll("div").forEach(item => {
        item.addEventListener("click", () => {
            document.getElementById("key").value = item.innerText.split(":")[0].trim();
            document.getElementById("valueOfKey").value = item.innerText.split(":")[1].split("X")[0].trim();
            change_data_change(address);
        })
    })
}
function change_data_change(address) {
    let change_button = document.getElementById("change-item");
    change_button.addEventListener("click", () => {
        const key = document.getElementById("key").value.trim();
        const valueOfKey = document.getElementById("valueOfKey").value.trim();
        if (key != "" && valueOfKey != "" && address != null) {
            const db = getDatabase();
            const reference = ref(db, (address + "/" + key).trim());
            let check = new Promise((resolve, reject) => {
                onValue(reference, (snapshot) => {
                    resolve(snapshot.val());
                }, (error) => {
                    reject(error);
                });
                
            });
            check.then(item => {
                if (item != null) {
                    console.log(address.split("/")[2].split("-"));
                    set(reference, valueOfKey);
                    print_data(address.split("/")[2].split("-")[0],address.split("/")[2].split("-")[1]);
                    off(reference)
                }
                else {
                    set(reference, valueOfKey);
                    off(reference)
                }
            });
        }
        else {
            alert("không có dữ liệu");
        }
    })
    
}
////////////////////////////////////create_day///////////////////////////////////
function create_day() {
    let select_data = document.getElementById("select-day").value;
    let month = document.getElementById("recive-month");
    let data_month = month.value;
    data_month = data_month.split("-");
    const check = data_month[1] + "_" + data_month[0].slice(2, 4);
    const db = getDatabase();
    // const reference = ref(db, "cost_day/" + check.trim());
    check_month(check)
        .then((result) => {
            if (result) {
                if (select_data == "") {
                    alert("bạn chưa chọn giá trị ngày");
                }
                else {
                    create_days(check, select_data)
                }
            }
            else {
                alert("bạn chưa tạo database cho tháng này");
            }
            // In ra true hoặc false
        })
        .catch((error) => {
            console.log(error); // In ra lỗi nếu có
        });
    console.log(select_data + " " + check);
}
function create_days(month, day) {
    if (day < 10) {
        day = "0" + String(day);
    }
    day = day + "-" + month.split("_")[0];
    console.log(day + "" + month);
    check_day(month, day).then(result => {
        if (result != null) {
            alert("bạn đã tạo dữ liệu cho ngày này rồi");
        }
        else {
            const reference = ref(db, "cost_day/" + month.trim() + "/" + day.trim());
            var demo = {none:"0"}
            set(reference,demo);
            off(reference);
        }
    }).catch((error) => {
        console.log(error); // In ra lỗi nếu có
    });
}
function check_day(month, day) {
    return new Promise((resolve, reject) => {
        const reference = ref(db, "cost_day/" + month.trim() + "/" + day.trim());
        onValue(reference, (snapshot) => {
            let data_check;
            let compare = false;
            data_check = snapshot.val();
            // data_check = Object.entries(data_check);
            // compare = data_check.some(item => {
            //     return item[0] == datas;
            // });
            resolve(data_check);
        }, (error) => {
            reject(error);
        });
        off(reference);
    });
}
