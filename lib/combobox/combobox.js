///start region tạo ra combobox
// lấy ra mảng tag name nbcomboboxs trong html
let nbcomboboxs = document.getElementsByTagName("nbcombobox");

// tạo ra vòng lặp thay thế nbcomboboxs bằng các thẻ thông thường
while (nbcomboboxs.length > 0) {
  // gọi ra các attribute ( thuộc tính bên trong thẻ nbcomboboxs)
  //   lấy ra class
  let nbClass = nbcomboboxs[0].getAttribute("nbClass");
  //   lấy ra id
  let nbId = nbcomboboxs[0].getAttribute("nbId");
  //  lấy ra data
  let nbData = nbcomboboxs[0].getAttribute("nbData");
  //   lấy ra label
  let nbLabel = nbcomboboxs[0].getAttribute("nbLabel");
  //   lấy ra important
  let nbImportant = nbcomboboxs[0].getAttribute("nbImportant");
  //   check xem combobox có cần * không
  let replaceNbImportant =
    nbImportant == "true" ? `<div class="nbcombobox__important">*</div>` : "";
  // tạo ra mảng các item
  // tạo ra 1 thẻ div để chứa html
  if (nbData) {
    // lấy ra mảng các tên và giá trị
    let arrayData = nbData.split(";");
    let arrayComboboxItem = [];
    arrayData.forEach((item) => {
      // tạo ra mảng gồm 1 tên và 1 giá trị
      let arrayItem = item.split(":");
      if (arrayItem && arrayItem.length > 1) {
        comboboxItem = `<div class="nbcombobox__item" value='${arrayItem[1]}'>
								${arrayItem[0]}
							</div>`;
        arrayComboboxItem.push(comboboxItem);
      }
    });
    let replaceCombobox = document.createElement("div");
    // thêm class
    replaceCombobox.classList.add(nbClass);
    // thêm id
    replaceCombobox.setAttribute("id", nbId);
    //  tạo ra phần nội dung mong muốn chèn vào trong thẻ div trên
    //   nhớ thêm nháy kép
    replaceCombobox.innerHTML = `
	<div class="nbcombobox__title">
	<div class="nbcombobox__label">${nbLabel}</div> 
	${replaceNbImportant}
	</div>
	<div class="nbcombobox">
		<input class="nbcombobox__typing"/>
		<div class="nbcombobox__dropdown" tabindex="0">
			<div class="nbcombobox__icon">
			</div>
		</div>
		<div class="nbcombobox__menu">
			${arrayComboboxItem.join("")}
		</div>
	</div>
  `;
    //   thay thế thẻ tag name nbcomboboxs bằng thẻ đã generate ở trên
    //   làm cho length của nbcomboboxs giảm đi 1
    nbcomboboxs[0].outerHTML = replaceCombobox.outerHTML;
  }
}

/// end region tạo combobox
document.addEventListener("DOMContentLoaded", () => {
  // thêm sự kiện ấn vào dropdown thì quay ngược mũi tên lên
  // đồng thời sổ menu và ngược lại

  function toggleComboboxContent(e) {
    // thực hiện đóng mở
    let parent = e.target.parentElement.parentElement;
    let menu = parent.getElementsByClassName("nbcombobox__menu");
    for (let i = 0; i < menu.length; i++) {
      //   check xem có combobox nào đang mở không, nếu mở thì đóng đi
      let allcombobox = document.getElementsByClassName("nbcombobox__menu");
      for (let i = 0; i < allcombobox.length; i++) {
        // check cả điều kiện khác với combobox đang dùng
        if (
          allcombobox[i] &&
          allcombobox[i].classList &&
          allcombobox[i].classList.contains("nbcombobox__menu--show") &&
          allcombobox[i] != menu[i]
        ) {
          allcombobox[i].classList.remove("nbcombobox__menu--show");
        }
      }
      if (
        menu[i] &&
        menu[i].classList &&
        menu[i].classList.contains("nbcombobox__menu--show")
      ) {
        menu[i].classList.remove("nbcombobox__menu--show");
        e.stopImmediatePropagation();
      } else {
        menu[i].classList.add("nbcombobox__menu--show");
        e.stopImmediatePropagation();
      }
    }
  }

  let comboboxDropdown = document.getElementsByClassName(
    "nbcombobox__dropdown"
  );
  for (let i = 0; i < comboboxDropdown.length; i++) {
    comboboxDropdown[i].addEventListener("click", (e) => {
      toggleComboboxContent(e);
    });
  }

  // mở input và gõ thì mở menu
  function showMenuComboboxWhenInput(e) {
    // thực hiện đóng mở
    let parent = e.target.parentElement.parentElement;
    let menu = parent.getElementsByClassName("nbcombobox__menu");
    for (let i = 0; i < menu.length; i++) {
      //   check xem có combobox nào đang mở không, nếu mở thì đóng đi
      let allcombobox = document.getElementsByClassName("nbcombobox__menu");
      for (let i = 0; i < allcombobox.length; i++) {
        // check cả điều kiện khác với combobox đang dùng
        if (
          allcombobox[i] &&
          allcombobox[i].classList &&
          allcombobox[i].classList.contains("nbcombobox__menu--show") &&
          allcombobox[i] != menu[i]
        ) {
          allcombobox[i].classList.remove("nbcombobox__menu--show");
        }
      }
      if (
        menu[i] &&
        menu[i].classList &&
        !menu[i].classList.contains("nbcombobox__menu--show")
      ) {
        menu[i].classList.add("nbcombobox__menu--show");
      }
    }
  }
  //   function filterComboboxItems(e) {
  //     if (e && e.target && e.target.value) {
  //       let parent = e.target.parentElement;
  //       let allComboboxItems = parent.getElementsByClassName("nbcombobox__item");
  //       for (let i = 0; i < allComboboxItems.length; i++) {
  //         if (
  //           allComboboxItems[i] &&
  //           allComboboxItems[i].innerText
  //             .toLowerCase()
  //             .includes(e.target.value.toLowerCase()) &&
  //           allComboboxItems[i].classList.contains("nbcombobox__item--hidden")
  //         ) {
  //           allComboboxItems[i].classList.remove("nbcombobox__item--hidden");
  //         } else {
  //           allComboboxItems[i].classList.add("nbcombobox__item--hidden");
  //         }
  //       }
  //     }
  //     console.log(e.target.value);
  //   }
  let comboboxInput = document.getElementsByClassName("nbcombobox__typing");
  // gán sự kiện đang nhập
  for (let i = 0; i < comboboxInput.length; i++) {
    comboboxInput[i].addEventListener("input", (e) => {
      // hiển thị combomenu nếu chưa hiển thị
      showMenuComboboxWhenInput(e);
      //   lọc giá trị mỗi lần nhập
      //   filterComboboxItems(e);
    });
  }

  function checkIfClickOutside(e) {
    let menu = document.getElementsByClassName("nbcombobox__menu");
    if (e && e.target) {
      for (let i = 0; i < menu.length; i++) {
        let currentMenu = menu[i];
        if (
          e.target != currentMenu &&
          currentMenu.classList.contains("nbcombobox__menu--show")
        ) {
          currentMenu.classList.remove("nbcombobox__menu--show");
        }
      }
    }
  }

  // click ra ngoài menu combobox thì đóng menu đi
  document.addEventListener("click", (e) => {
    checkIfClickOutside(e);
  });

  // gán sự kiện bấm esc
  window.addEventListener("keydown", (e) => {
    if (e && e.key && e.key == "Escape") {
      checkIfClickOutside(e);
    }
  });

  // gán giá trị từ item lên trên input
  function bindingComboboxItemToInput(e) {
    if (e && e.target) {
      let parent = e.target.parentElement.parentElement;
      let input = parent.getElementsByClassName("nbcombobox__typing");
      for (let i = 0; i < input.length; i++) {
        if (e.target && e.target.innerText && e.target.getAttribute("value")) {
          // gán giá trị item vào input và gán giá trị unique value vào combobox
          input[i].value = e.target.innerText;
          parent.setAttribute("comboboxValue", e.target.getAttribute("value"));
          //   xóa css ở toàn bộ đi
          let allItem =
            e.target.parentElement.getElementsByClassName("nbcombobox__item");
          for (let i = 0; i < allItem.length; i++) {
            if (
              allItem[i] &&
              allItem[i].classList &&
              allItem[i].classList.contains("nbcombobox__item--selected")
            ) {
              allItem[i].classList.remove("nbcombobox__item--selected");
            }
          }
          //   gán css đã chọn vào item đã chọn
          e.target.classList.add("nbcombobox__item--selected");
        }
      }
    }
  }

  let comboboxItem = document.getElementsByClassName("nbcombobox__item");

  for (let i = 0; i < comboboxItem.length; i++) {
    comboboxItem[i].addEventListener("click", (e) => {
      bindingComboboxItemToInput(e);
    });
  }
});
