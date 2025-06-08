import React, { useEffect, useState } from 'react';
import "../styles/ExpenseForm.css";
import { database } from '../Firebase';
import { ref, push, get, child } from 'firebase/database';

function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "expenses"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const expenseList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(expenseList);
      } else {
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      if (editingId) {
       
        await fetch(
          `https://expense-tracker-8ef98-default-rtdb.firebaseio.com/expenses/${editingId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(newExpense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Expense updated successfully");
        setEditingId(null);
      } else {
      
        const expenseRef = ref(database, 'expenses');
        const res = await push(expenseRef, newExpense);
        if (res.key) {
          console.log("Expense added successfully");
        }
      }

      
      setAmount('');
      setDescription('');
      setCategory('');
      fetchExpenses();

    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://expense-tracker-8ef98-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
      console.log("Expense successfully deleted");
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setEditingId(expense.id);
  };

  return (
    <div className='expense-container'>
      <h2>{editingId ? "Edit Expense" : "Add Daily Expenses"}</h2>
      <form onSubmit={handleSubmit} className='expense-form'>
        <input
          type='number'
          placeholder='Amount Spent'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='text'
          placeholder='Expense Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Travel">Travel</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">{editingId ? "Update Expense" : "Add Expense"}</button>
      </form>

      <div className='expense-list'>
        <h3>Expense List</h3>
        {expenses.length === 0 && <p>No expenses added yet.</p>}
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              ₹{expense.amount} - {expense.description} ({expense.category})
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
              <button onClick={() => handleEdit(expense)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseForm;
