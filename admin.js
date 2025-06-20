// admin.js

// ========= 圃場の操作 =========
const fieldInput = document.getElementById("newField");      // 新しい圃場名を入力するテキストボックス
const addFieldBtn = document.getElementById("addFieldBtn");  // 「追加」ボタン
const fieldList = document.getElementById("fieldList");      // 圃場一覧の表示エリア（ul）

// ========= 作業内容の操作 =========
const taskInput = document.getElementById("newTask");        // 新しい作業内容を入力するテキストボックス
const addTaskBtn = document.getElementById("addTaskBtn");    // 「追加」ボタン
const taskList = document.getElementById("taskList");        // 作業内容一覧の表示エリア（ul）

/**
 * 保存されたリストを読み込んでul要素に表示する
 * @param {string} key - localStorageキー（例: "fieldOptions"）
 * @param {HTMLElement} targetUl - 表示先のul要素
 */
function loadList(key, targetUl) {
  const items = JSON.parse(localStorage.getItem(key)) || []; // 保存された配列を取得
  targetUl.innerHTML = ""; // リストをクリア

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b py-1";
    li.innerHTML = `
      <span>${item}</span>
      <button class="text-red-500 hover:underline" data-index="${index}" data-type="${key}">削除</button>
    `;
    targetUl.appendChild(li);
  });
}

/**
 * 入力された項目をlocalStorageに追加してリストを再表示する
 * @param {string} key - localStorageキー（例: "fieldOptions"）
 * @param {HTMLInputElement} valueInput - 入力ボックス
 * @param {HTMLElement} listEl - 対応するul要素
 */
function addItem(key, valueInput, listEl) {
  const value = valueInput.value.trim();
  if (!value) return;

  const items = JSON.parse(localStorage.getItem(key)) || [];
  items.push(value); // 新しい値を追加
  localStorage.setItem(key, JSON.stringify(items)); // 保存
  valueInput.value = ""; // 入力欄クリア
  loadList(key, listEl); // 表示更新
}

/**
 * 指定したインデックスの項目をlocalStorageから削除
 * @param {string} key - localStorageキー
 * @param {number} index - 削除するインデックス
 */
function removeItem(key, index) {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  items.splice(index, 1); // 削除
  localStorage.setItem(key, JSON.stringify(items)); // 上書き保存
}

// ========= イベント登録 =========

// 圃場追加ボタン
addFieldBtn.addEventListener("click", () => {
  const name = document.getElementById("newField").value.trim();
  const area = document.getElementById("newFieldArea").value.trim();
  if (!name || !area) return;

  const fields = JSON.parse(localStorage.getItem("fieldOptions")) || [];
  fields.push({ name, area: parseFloat(area) });
  localStorage.setItem("fieldOptions", JSON.stringify(fields));

  // 入力欄をクリア
  document.getElementById("newField").value = "";
  document.getElementById("newFieldArea").value = "";

  loadFieldList();
});
addFieldBtn.addEventListener("click", () => {
  const name = document.getElementById("newField").value.trim();
  const area = document.getElementById("newFieldArea").value.trim();
  if (!name || !area) return;

  const fields = JSON.parse(localStorage.getItem("fieldOptions")) || [];
  fields.push({ name, area: parseFloat(area) });
  localStorage.setItem("fieldOptions", JSON.stringify(fields));

  // 入力欄をクリア
  document.getElementById("newField").value = "";
  document.getElementById("newFieldArea").value = "";

  loadFieldList();
});


// 作業内容追加ボタン
addTaskBtn.addEventListener("click", () => {
  addItem("taskOptions", taskInput, taskList);
});

// 「削除」ボタンが押されたときの処理（イベント委譲）
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.index) {
    const key = e.target.dataset.type;
    const index = parseInt(e.target.dataset.index, 10);
    removeItem(key, index);
    loadList(key, key === "taskOptions" ? taskList : fieldList);
  }
});

// ========= 初期ロード =========
// 起動時に保存済みリストを表示
window.addEventListener("load", () => {
  loadList("taskOptions", taskList);
  loadList("fieldOptions", fieldList);
});
