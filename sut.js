'use strict'

// Refactoring Task Description:
//
// - Refactor the code to a more extensible, more maintainable state; preferably in an object-oriented fashion. 
// - If you have time try covering what you deem as the "core domain logic" with some tests. 
// - Take as much time as you need, but stop when you feel like you have demonstrated enough.
// - Please provide a runnable fork on replit.com or other online repls.
//
// If there are ambiguities or unclarities, make the best decision on your own. We'll rely on your decisions on a daily basis!
//
// Happy coding! 🍕

export const type = { BREAKFAST: 1, LUNCH: 2, DINNER: 3, CAR_RENTAL: 4, MOVIES: 4, MUSIC: 5 }
export const category = { MEAL: 1, VEHICLE: 2, ENTERTAINMENT: 3}
const expensesDetails = new Map()
expensesDetails.set(type.BREAKFAST, {name:'Breakfast', category: category.MEAL, markerAmount: 20})
expensesDetails.set(type.LUNCH, {name:'Lunch', category: category.MEAL, markerAmount: 50})
expensesDetails.set(type.DINNER, {name:'Dinner', category: category.MEAL, markerAmount: 100})
expensesDetails.set(type.CAR_RENTAL, {name:'Car Rental', category: category.VEHICLE, markerAmount: 100})
expensesDetails.set(type.MOVIES, {name:'Movies', category: category.ENTERTAINMENT, markerAmount: 100})
expensesDetails.set(type.MUSIC, {name:'Music', category: category.ENTERTAINMENT, markerAmount: 100})


export class ExpenseReport{

  report(expenses) {
    var total = 0
    
    const expenseCategories = new Map()
    expenseCategories.set(category.MEAL, {total:0,expenses: []})
    expenseCategories.set(category.VEHICLE, {total:0,expenses: []})
    expenseCategories.set(category.ENTERTAINMENT, {total:0,expenses: []})
  
    console.info("Today Travel Expenses " + new Date().toISOString().slice(0, 10))
  
    for (const expense of expenses) {
      const expenseDetails = expensesDetails.has(expense.type) ? expensesDetails.get(expense.type) : null
      
      const expenseCategory = expenseCategories.get(expenseDetails.category)
      expenseCategory.total += expense.amount
      let expenseName = expenseDetails ? expenseDetails.name : ""

      const isExpenseOverMarker = expenseDetails && expense.amount > expenseDetails.markerAmount
      const overExpensesMarker = isExpenseOverMarker ? "[over-expense!]" : " ";

      expenseCategory.expenses.push({
        name: expenseName, 
        amount: expense.amount,
        isOverMarker: isExpenseOverMarker
      })

      console.info(expenseName + "\t" + expense.amount + "eur" + "\t" + overExpensesMarker)
      total += expense.amount
    }
    return {totalExpenses: total, expenseDetails: expenseCategories}
  }
}


const Expenses = [
  { type: type.BREAKFAST, amount: 15.20 },
  { type: type.BREAKFAST, amount: 28.10 },
  { type: type.LUNCH, amount: 10.20 },
  { type: type.DINNER, amount: 16.00 },
  { type: type.DINNER, amount: 120.20 }
]

const expenseReport = new ExpenseReport()
  ;; expenseReport.report(Expenses);;