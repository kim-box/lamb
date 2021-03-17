const memoForm = document.querySelector(".memo"),
  memoInput = memoForm.querySelector("input"),
  toDoList = document.querySelector(".memo-list");

const MEMO_LS = "toDos";

let toDos = [];

function deleteMemo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanMemo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanMemo;
  saveMemo();
}

function saveMemo() {
  localStorage.setItem(MEMO_LS, JSON.stringify(toDos));
}

function paintMemo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteMemo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = memoInput.value;
  paintMemo(currentValue);
  memoInput.value = "";
}

function loadMemo() {
  const loadedMemo = localStorage.getItem(MEMO_LS);
  if (loadedMemo !== null) {
    const parsedMemo = JSON.parse(loadedMemo);
    parsedMemo.forEach(function (toDo) {
      paintMemo(toDo.text);
    });
  }
}

function init() {
  loadMemo();
  memoForm.addEventListener("submit", handleSubmit);
}

init();
