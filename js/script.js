const d = document,
  $input = d.getElementById("create-todo"),
  $checkBoxCreate = d.querySelector(".new-todo  .check-box"),
  $listItems = d.querySelector(".list-items"),
  $itemTemplate = d.getElementById("item-template").content,
  $itemCount = d.querySelector(".items-count");

let html = "";
let numItems = 1;

function addItem(e) {
  if ((e.key === "Enter" && e.target === $input && $input.value.length != 0) || (e.target === $checkBoxCreate && $input.value.length != 0)) {
    //console.log($input.value);
    /* html += `
    <div class="item">
    <div class="check-box "></div>
    <div class="item-text">${$input.value}</div>
    <div class="delate">X</div>
  </div>
  `;
    $listItems.innerHTML = html;
    $input.value = ""; */

    /* $itemTemplate.querySelector(".check-box img").setAttribute("src", "/images/icon-check.svg");
    $itemTemplate.querySelector(".check-box img").setAttribute("alt", "check icon"); */
    $itemTemplate.querySelector(".item").dataset.itemNum = $listItems.children.length;
    $itemTemplate.querySelector(".item-text").textContent = `${$input.value}`;
    $itemTemplate.querySelector(".delate").setAttribute("src", "/images/icon-cross.svg");
    $itemTemplate.querySelector(".delate").setAttribute("data-item-num", `${$listItems.children.length}`);
    let $clone = d.importNode($itemTemplate, true);
    $listItems.appendChild($clone);
    $input.value = "";
    //console.log($listItems.children.length);
    $itemCount.innerHTML = `${$listItems.children.length} items left`;
  }
}

d.addEventListener("keydown", (e) => {
  addItem(e);
});
d.addEventListener("click", (e) => {
  addItem(e);
  checkItem(e);
  delateItem(e);
});

function checkItem(e) {
  let $itemCheckBox = d.querySelectorAll(".item .check-box");
  $itemCheckBox.forEach((el) => {
    if (e.target === el) {
      //console.log(el);
      el.classList.add("item-check");
      el.querySelector("img").setAttribute("src", "/images/icon-check.svg");
      el.querySelector("img").setAttribute("alt", "icon check");
    } else if (e.target === el.querySelector("img")) {
      el.classList.remove("item-check");
      el.querySelector("img").removeAttribute("src");
      el.querySelector("img").removeAttribute("alt");
    }
  });
}

function delateItem(e) {
  let iconDelate = e.target.dataset.itemNum;
  let $delateIcons = d.querySelectorAll(".delate");
  //console.log($delateIcons);
  let itemsChilds = $listItems.children;
  console.log(itemsChilds);
  if (e.target.matches(".delate")) {
    for (let child of itemsChilds) {
      console.log(iconDelate);
      console.log(child.getAttribute("data-item-num"));
      if (iconDelate === child.getAttribute("data-item-num")) {
        child.parentNode.removeChild(child);
      }
    }

    $itemCount.innerHTML = `${$listItems.children.length} items left`;
  }
}
