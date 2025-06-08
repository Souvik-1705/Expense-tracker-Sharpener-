import React, { useEffect, useState } from 'react';
import "../styles/ExpenseForm.css";
import { database } from '../Firebase';
import { ref, push, get, child } from 'firebase/database';

function ExpenseForm() {
    const[expenses,setExpenses]=useState([]);
    const[amount,setAmount]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");

    useEffect(()=>{
        const fetchExpenses= async()=>{
            try {
                const dbRef=ref(database);
                const snapshot=await get(child(dbRef,"expenses"));
                if (snapshot.exists()) {
          const data = snapshot.val();
          const expenseList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(expenseList);
        }
            } catch (error) {
                console.error('Error fetching expenses:', err);
            }
        }
        fetchExpenses();
    },[])

    const handleSubmit=async(e)=>{
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

    try {
        const expenseRef = ref(database, 'expenses');
        const res = await push(expenseRef, newExpense);
         if (res.key) {
        setExpenses([...expenses, { id: res.key, ...newExpense }]);
        setAmount('');
        setDescription('');
        setCategory('');
      }

    } catch (err) {
        console.error('Error adding expense:', err);
    }
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