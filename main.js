// main.js
// ファームログの管理
const form = document.getElementById("logForm");
console.log("Form element:", form); // フォーム要素をコンソールに出力

// ログリストの要素を取得
const logList = document.querySelector("#logList ul");

// ログを保存する関数
function saveLog(log) {
  const logs = JSON.parse(localStorage.getItem("farmLogs")) || [];
  logs.push(log);
  localStorage.setItem("farmLogs", JSON.stringify(logs));
}

// ログを読み込んで表示する関数
function loadLogs() {
  const logs = JSON.parse(localStorage.getItem("farmLogs")) || [];
  logList.innerHTML = "";
  logs.forEach((log) => {
    const li = document.createElement("li");
    li.textContent = `${log.crop} - ${log.date} - 圃場:${log.field || "未選択"} - ${log.task} - ${log.memo || ""}`;
    logList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {

  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData); // フォームデータをコンソールに出力
  // フォームデータをオブジェクトに変換してログを保存
  const log = Object.fromEntries(formData.entries()); // フォームデータをオブジェクトに変換
  saveLog(log); // ログを保存
  form.reset(); // フォームをリセット

  // ✅ reset() のあとにもう一度今日の日付を入れる
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("workDate").value = today;

  loadLogs();
});

// ページ読み込み時に今日の日付を設定し、ログを読み込む
window.addEventListener("load", () => {
  const today = new Date().toISOString().split("T")[0];

  const dateInput = document.getElementById("workDate");
  dateInput.value = today;
  dateInput.max = today;

  loadLogs();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(() => {
      console.log("Service Worker registered");
    });
  }
});


// 日付入力のフォーカスを促すためのラベルクリックイベント
document.getElementById("dateLabel").addEventListener("click", () => {
  document.getElementById("workDate").focus(); // カレンダーを開くよう促す
});

// 圃場ボタンの選択処理（Tailwindクラスを使用）
document.querySelectorAll(".field-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const field = btn.getAttribute("data-field");
    document.getElementById("fieldInput").value = field;

    document.querySelectorAll(".field-btn").forEach(b => {
      b.classList.remove("bg-green-500", "text-white", "border-green-700");
      b.classList.add("bg-gray-200", "text-black", "border-gray-300");
    });

    btn.classList.remove("bg-gray-200", "text-black", "border-gray-300");
    btn.classList.add("bg-green-500", "text-white", "border-green-700");
  });
});

// 作業内容ボタンの選択処理（Tailwindクラスを使用）
document.querySelectorAll(".task-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const task = btn.getAttribute("data-task");
    document.getElementById("taskInput").value = task;

    document.querySelectorAll(".task-btn").forEach(b => {
      b.classList.remove("bg-green-500", "text-white", "border-green-700");
      b.classList.add("bg-gray-200", "text-black", "border-gray-300");
    });

    btn.classList.remove("bg-gray-200", "text-black", "border-gray-300");
    btn.classList.add("bg-green-500", "text-white", "border-green-700");
  });
});

