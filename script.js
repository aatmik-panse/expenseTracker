let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactionsToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateDashboardTotals() {
  let creditAmount = transactions
    .filter((transaction) => transaction.type === "Credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  let debitAmount = transactions
    .filter((transaction) => transaction.type === "Debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  let lendAmount = transactions
    .filter((transaction) => transaction.type === "Lend")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  document.getElementById(
    "creditAmount"
  ).textContent = `Rs.${creditAmount.toFixed(2)}`;
  document.getElementById(
    "debitAmount"
  ).textContent = `Rs.${debitAmount.toFixed(2)}`;
  document.getElementById("lendAmount").textContent = `Rs.${lendAmount.toFixed(
    2
  )}`;

  let totalAmount = creditAmount - debitAmount - lendAmount;
  document.getElementById(
    "totalAmount"
  ).textContent = `Rs.${totalAmount.toFixed(2)}`;

  const tableFooter = document.querySelector("tfoot td");
  tableFooter.textContent = `Total: Rs.${totalAmount.toFixed(2)}`;
}

function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function renderTransactions() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.type}</td>
            <td>Rs.${transaction.amount.toFixed(2)}</td>
            <td>${transaction.date}</td>
            <td><button class="btn--edit" onclick="editTransaction(${
              transaction.id
            })">Delete</button></td>
        `;
    tableBody.appendChild(row);
  });

  updateDashboardTotals();
}

renderTransactions();

function showAddTransactionForm() {
  const formContainer = document.getElementById("addTransactionForm");
  formContainer.style.display = "block";
}

function hideAddTransactionForm() {
  const formContainer = document.getElementById("addTransactionForm");
  formContainer.style.display = "none";
}

function addTransaction() {
  const creditAmount = transactions
    .filter((transaction) => transaction.type === "Credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const debitAmount = transactions
    .filter((transaction) => transaction.type === "Debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const lendAmount = transactions
    .filter((transaction) => transaction.type === "Lend")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalAmount = creditAmount - debitAmount - lendAmount;

  const type = document.getElementById("type").value;
  const amountValue = document.getElementById("amount").value;
  const amount = parseFloat(amountValue);
  const today = getFormattedDate();

  if ((amount > totalAmount && type === "Debit") || type === "Lend") {
    alert("Insufficient Balance");
    return;
  }

  if (!type || isNaN(amount) || amount <= 0) {
    hideAddTransactionForm();
    return;
  }

  const newTransaction = {
    id: transactions.length + 1,
    type,
    amount,
    date: today,
  };

  transactions.push(newTransaction);
  saveTransactionsToLocalStorage();
  renderTransactions();
  hideAddTransactionForm();
}

document
  .getElementById("add")
  .addEventListener("click", showAddTransactionForm);
document.getElementById("submit").addEventListener("click", addTransaction);

function editTransaction(id) {
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index !== -1) {
    const confirmed = confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmed) {
      transactions.splice(index, 1);
      saveTransactionsToLocalStorage();
      renderTransactions();
    }
  }
}

renderTransactions();
