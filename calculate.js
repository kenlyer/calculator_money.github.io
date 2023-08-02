let namtram = document.getElementById("5tram");
let haitram = document.getElementById("2tram");
let mottram = document.getElementById("1tram");
let namchuc = document.getElementById("5chuc");
let haichuc = document.getElementById("20ngan");
let muoichuc = document.getElementById("10ngan");
let namngan = document.getElementById("5ngan");
let haingan = document.getElementById("2ngan");
let motngan = document.getElementById("1ngan");

let inputs = document.getElementById("calin");
inputs.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});
let total = 0;
console.log(inputs.querySelectorAll("p"))
var formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
function take() {

    total = 0;
    document.getElementById("5tramcal").innerText = (Number((namtram.value) == null ? 0 : (namtram.value)) * 500000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("2tramcal").innerText = (Number((haitram.value) == null ? 0 : (haitram.value)) * 200000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("1tramcal").innerText = (Number((mottram.value) == null ? 0 : (mottram.value)) * 100000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("5chuccal").innerText = (Number((namchuc.value) == null ? 0 : (namchuc.value)) * 50000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("20ngancal").innerText = (Number((haichuc.value) == null ? 0 : (haichuc.value)) * 20000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("10ngancal").innerText = (Number((muoichuc.value) == null ? 0 : (muoichuc.value)) * 10000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("5ngancal").innerText = (Number((namngan.value) == null ? 0 : (namngan.value)) * 5000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("2ngancal").innerText = (Number((haingan.value) == null ? 0 : (haingan.value)) * 2000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("1ngancal").innerText = (Number((motngan.value) == null ? 0 : (motngan.value)) * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    inputs.querySelectorAll("p").forEach((input) => {



        if (input.id != "values") {
            var number = parseFloat(input.textContent.replace(/[^\d-]/g, ""));
            total += number;

        }
        else {

        }

    })

    console.log(total);
    document.getElementById("values").innerText = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

}
let a = document.getElementById("reset_btn");
a.addEventListener("click", hello);



function hello() {
    inputs.querySelectorAll("input").forEach((input) => {
        input.value = 0;
    })
    inputs.querySelectorAll("p").forEach((input) => {
        input.innerText = 0;
    })

}

////////////////////////////////////////////////////////////////////

