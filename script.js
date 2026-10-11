let expenseName = document.getElementById ("expenseName");
let expenseAmount = document.getElementById ("expenseAmount");
let expenseCategory = document.getElementById ("expenseCategory");
let expenseDate = document.getElementById("expenseDate");
let addBtn = document.getElementById ("addBtn");
let total = document.getElementById ("total");
let expenseList = document.getElementById ("expenseList");
let clearBtn = document.getElementById ("clearBtn");
let filterCategory = document.getElementById ("filterCategory");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addBtn.addEventListener ("click", function() {
    let name = expenseName.value;
    let amount = Number(expenseAmount.value);
    let category = expenseCategory.value;
    let date = expenseDate.value;

    if (name == "" || amount <= 0) {
        alert("Please enter a valid expense!");
        return;
    }

    console.log(name);
    console.log(amount);
    console.log(category);

    let expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();

    expenseName.value = " ";
    expenseAmount.value = " ";
    expenseDate.value = " ";

});

function showExpenses() {
    expenseList.innerHTML =" ";

    let sum = 0;
    let selectedCategory = filterCategory.value;

    expenses.forEach(function(expense, index) {
        if (selectedCategory == "All" || expense.category == selectedCategory) {
        let item = document.createElement("p")
        item.innerHTML = expense.name + "- Rs." + expense.amount + " - " + expense.category + " - " + expense.date;

        let deleteBtn = document.createElement ("button");
        deleteBtn.innerHTML = "Delete";

        deleteBtn.addEventListener ("click", function() {
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            showExpenses();
        });
        item.appendChild(deleteBtn);
        expenseList.appendChild(item);
        sum+= expense.amount;
     }  
    });

    total.innerHTML = "Total: Rs." + sum;
}

  clearBtn.addEventListener ("click", function() {
        expenses = [];
        localStorage.removeItem("expenses");
        showExpenses();
    });

showExpenses();

filterCategory.addEventListener ("click", function() {
    showExpenses();
})