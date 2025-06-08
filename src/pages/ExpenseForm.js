import React, { useState } from 'react';
import "../styles/ExpenseForm.css";

function ExpenseForm() {
    const[expenses,setExpenses]=useState([]);
    const[amount,setAmount]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!amount || !description || !category){
            alert("Please fill in all fields");
            return;
        }
         const newExpense = {
      id: Date.now(),
      amount,
      description,
      category,
    };

    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className='expense-container'>
        <h2>Add Daily Expenses</h2>
        <form onSubmit={handleSubmit} className='expense-form'>
            <input type='number' placeholder='Amount Spent' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            <input type='text' placeholder='Expense Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
             <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Travel">Travel</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Add Expense</button>
        </form>
        <div className='expense-list'>
            <h3>Expense List</h3>
            {expenses.length===0 && <p>No expenses added yet.</p>}
            <ul>
                {expenses.map((expense)=>(
                    <li key={expense.id}> ₹{expense.amount} - {expense.description} ({expense.category})</li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default ExpenseForm;