let testone = document.getElementById("testone");
let testtwo = document.getElementById("testtwo");
let errorpopuptest = document.getElementById("errorpopuptest");

/**
 * hàm công tắc đóng mở popup
 */
function changeStatusOpening() {
  if (errorpopuptest.classList.contains("nbpopup--opening")) {
    errorpopuptest.classList.remove("nbpopup--opening");
  } else {
    errorpopuptest.classList.add("nbpopup--opening");
  }
}
/**
 * hàm đóng popup
 */
function changeStatusOpeningToClose() {
  if (errorpopuptest.classList.contains("nbpopup--opening")) {
    errorpopuptest.classList.remove("nbpopup--opening");
  }
}

// gán sự kiện click
testone.addEventListener("click", () => {
  changeStatusOpening();
});
testtwo.addEventListener("click", () => {
  changeStatusOpeningToClose();
});

// gán sự kiện bấm esc
window.addEventListener("keydown", (e) => {
  if (e && e.key && e.key == "Escape") {
    changeStatusOpeningToClose();
  }
});

// gán sự kiện click ra ngoài
errorpopuptest.addEventListener("click", (e) => {
  // kiểm tra xem e.target có phải phần errorpopuptest gọi từ
  // getElement by id không
  if (e && e.target == errorpopuptest) {
    console.log(e.target);
    changeStatusOpeningToClose();
  }
});
