const input = document.querySelector("form input");
const img = document.querySelector("form img");
const form = document.querySelector("form");
const infotext = document.querySelector(".contant span");
const textarea = document.querySelector("textarea");
const con = document.querySelector(".container");
const copy = document.querySelector(".copy");
const close = document.querySelector(".close");

function fetchRequest(formdata, file) {
  infotext.innerText = "Scanning QR Code...";
  fetch(`http://api.qrserver.com/v1/read-qr-code/`, {
    method: "post",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      data = data[0].symbol[0].data;
      console.log(data);
      infotext.innerText = data
        ? "Upload QR Code To Scan"
        : "Couldn't Scan QR Code";

      if (!data) return;
      textarea.innerText = data;

      img.src = URL.createObjectURL(file);

      con.classList.add("active");
    });
}
form.addEventListener("click", () => {
  input.click();
});

form.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  // console.log(file);
  const formdata = new FormData();
  formdata.append("file", file);
  fetchRequest(formdata, file);
});

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(textarea.textContent);
});

close.addEventListener("click", () => {
  con.classList.remove("active");
});
