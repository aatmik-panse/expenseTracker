let creditAmount = 0.0;
let totalAmount = 0.0;
let debitAmount = 0.0;
let lendAmount = 0.0;

// Update credit card data
document.getElementById(
  "creditAmount"
).textContent = `Rs.${creditAmount.toFixed(2)}`;

// Update total balance card data
document.getElementById("totalAmount").textContent = `Rs.${totalAmount.toFixed(
  2
)}`;

// Update debit card data
document.getElementById("debitAmount").textContent = `Rs.${debitAmount.toFixed(
  2
)}`;

// Update lend card data
document.getElementById("lendAmount").textContent = `Rs.${lendAmount.toFixed(
  2
)}`;

// Function to get today's date in the format: DD/MM/YYYY
function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

let transactions = [
  { id: 1, type: "Credit", amount: 1000.0, date: getFormattedDate() },
  { id: 2, type: "Debit", amount: 100.0, date: getFormattedDate() },
  //   { id: 3, type: "Credit", amount: 1000.0, date: getFormattedDate() },
];

// Function to render transaction table
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
      <td><a href="#" class="btn--edit" onclick="editTransaction(${
        transaction.id
      })">Edit</a></td>
    `;

    tableBody.appendChild(row);
  });

  // Update total in the footer
  const tableFooter = document.querySelector("tfoot td");
  const totalAmount = transactions.reduce(
    (total, transaction) =>
      transaction.type === "Credit"
        ? total + transaction.amount
        : total - transaction.amount,
    0
  );
  tableFooter.textContent = `Total: Rs. ${totalAmount.toFixed(2)}`;
}

// Function to handle editing transactions
function editTransaction(transactionId) {
  console.log(`Editing transaction with ID: ${transactionId}`);
}

// Call the renderTransactions function to initialize the table
renderTransactions();
