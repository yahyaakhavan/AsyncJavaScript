const getrowContainer = document.querySelector(".table-row__container");
const getTranbtn = document.querySelector(".gettarns");
const searchTran = document.getElementById("serchtran");
const pricechevron = document.querySelector(".header-chevron_price");
const dateChevron = document.querySelector(".header-chevron_date");
const tableContainer = document.querySelector(".table-container");
const searchField = document.querySelector(".searchfield");
getTranbtn.addEventListener("click", () => {
  tableContainer.classList.toggle("active");
  getTranbtn.classList.toggle("deactive");
  searchField.classList.toggle("active");
  gettrans();
});
searchTran.addEventListener("input", (e) => {
  gettrans(e);
});
pricechevron.addEventListener("click", (e) => {
  gettrans(e);
});
dateChevron.addEventListener("click", (e) => {
  gettrans(e);
});
function gettrans(e) {
  if (e == null) {
    axios.get(`http://localhost:3000/transactions`).then((res) => {
      uploadTrans(res.data, getrowContainer);
    });
  } else if (e.target.classList.contains("chevron_price")) {
    axios.get(`http://localhost:3000/transactions?_sort=price`).then((res) => {
      uploadTrans(res.data, getrowContainer);
    });
  } else if (e.target.classList.contains("chevron_date")) {
    axios.get(`http://localhost:3000/transactions?_sort=date`).then((res) => {
      uploadTrans(res.data, getrowContainer);
    });
  } else
    axios
      .get(`http://localhost:3000/transactions?refId_like=${e.target.value}`)
      .then((res) => {
        uploadTrans(res.data, getrowContainer);
      });
}
function uploadTrans(trans, container) {
  let result = "";
  let counetr = 0;
  trans.forEach((item) => {
    counetr++;
    result += `<div class="table__row">
  <span>${counetr}</span>
  <span style="color: ${item.type == "برداشت از حساب" ? "red" : "green"}" >${
      item.type
    }</span>
  <span>${item.price}</span>
  <span>${item.refId}</span>
  <span>${topersiandatetime(item.date)} </span>
</div>`;
  });
  container.innerHTML = result;
}
// gettrans();
function topersiandatetime(isotime) {
  let result = `${new Date(isotime).toLocaleDateString(
    "fa-IR"
  )} ساعت ${new Date(isotime).toLocaleTimeString("fa-IR", {
    timeStyle: "short",
  })}`;
  return result;
}
