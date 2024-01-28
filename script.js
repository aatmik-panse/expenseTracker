let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//Save transactions to local storage
function saveTransactionsToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Update dashboard totals
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

  document.getElementById("lendAmount").textContent = `Rs.${lendAmount.toFixed(
    2
  )}`;

  // Update the credit, debit, and total balance on the dashboard
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

  // Update total in the table footer
  const tableFooter = document.querySelector("tfoot td");
  tableFooter.textContent = `Total: Rs.${totalAmount.toFixed(2)}`;
}

// Get today's date in the format: DD/MM/YYYY
function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Render transaction table
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
      })">Edit</button></td>
    `;
    tableBody.appendChild(row);
  });
  // Update the totals whenever transactions are rendered
  updateDashboardTotals();
}
// Initial call to render transactions
renderTransactions();

// Function to show the add transaction form
function showAddTransactionForm() {
  const formContainer = document.getElementById("addTransactionForm"); // Corrected method
  formContainer.style.display = "block";
}

// Function to hide the add transaction form
function hideAddTransactionForm() {
  const formContainer = document.getElementById("addTransactionForm"); // Corrected method
  formContainer.style.display = "none";
}

// Function to add a new transaction
function addTransaction() {
  const type = document.getElementById("type").value;
  const amountValue = document.getElementById("amount").value;
  const amount = parseFloat(amountValue);
  const today = getFormattedDate();

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
  saveTransactionsToLocalStorage(); // Save to local storage
  renderTransactions(); // This will also update the dashboard totals

  // Hide the form after submitting
  hideAddTransactionForm();
}

// Add event listeners
document
  .getElementById("add")
  .addEventListener("click", showAddTransactionForm);
document.getElementById("submit").addEventListener("click", addTransaction);
// Placeholder for edit transaction functionality
function editTransaction(id) {
  console.log(`Edit transaction with id ${id} is not implemented yet.`);
}
renderTransactions();
