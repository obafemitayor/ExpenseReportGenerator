import { type, ExpenseReport, category } from './sut';

describe('expense reporter', () => {
  test('expense report should contain report for meal expenses', () => {
    const Expenses = [
      { type: type.BREAKFAST, amount: 15.20 },
      { type: type.LUNCH, amount: 10.20 },
      { type: type.DINNER, amount: 16.00 },
    ]
    const expenseReport = new ExpenseReport()
    const report = expenseReport.report(Expenses)
    expect(report.totalExpenses)
    .toBe(41.4)
    const mealExpenseReport = report.expenseDetails.get(category.MEAL)
    expect(mealExpenseReport.total)
    .toBe(41.4)
    expect(mealExpenseReport.expenses[0].name)
    .toBe('Breakfast');
    expect(mealExpenseReport.expenses[1].name)
    .toBe('Lunch');
    expect(mealExpenseReport.expenses[2].name)
    .toBe('Dinner');
  })

  test('expense report should contain report for meal expenses including meal expenses that exceeded meal expense marker', () => {
    const Expenses = [
      { type: type.BREAKFAST, amount: 15.20 },
      { type: type.BREAKFAST, amount: 28.10 },
      { type: type.LUNCH, amount: 10.20 },
      { type: type.DINNER, amount: 16.00 },
      { type: type.DINNER, amount: 120.20 }
    ]
    const expenseReport = new ExpenseReport()
    const report = expenseReport.report(Expenses)
    expect(report.totalExpenses)
    .toBe(189.7)
    const mealExpenseReport = report.expenseDetails.get(category.MEAL)
    expect(mealExpenseReport.total)
    .toBe(189.7)
    expect(mealExpenseReport.expenses[0].name)
    .toBe('Breakfast');
    expect(mealExpenseReport.expenses[0].isOverMarker)
    .toBe(false);
    expect(mealExpenseReport.expenses[1].name)
    .toBe('Breakfast');
    expect(mealExpenseReport.expenses[1].isOverMarker)
    .toBe(true);
    expect(mealExpenseReport.expenses[2].name)
    .toBe('Lunch');
    expect(mealExpenseReport.expenses[2].isOverMarker)
    .toBe(false);
    expect(mealExpenseReport.expenses[3].name)
    .toBe('Dinner');
    expect(mealExpenseReport.expenses[3].isOverMarker)
    .toBe(false);
    expect(mealExpenseReport.expenses[4].name)
    .toBe('Dinner');
    expect(mealExpenseReport.expenses[4].isOverMarker)
    .toBe(true);
  })

  test('expense report should contain report for entertainment expenses', () => {
    const Expenses = [
      { type: type.MOVIES, amount: 15.20 },
      { type: type.MOVIES, amount: 28.10 },
      { type: type.MOVIES, amount: 10.20 },
      { type: type.MUSIC, amount: 16.00 },
      { type: type.MUSIC, amount: 12.20 }
    ]
    const expenseReport = new ExpenseReport()
    const report = expenseReport.report(Expenses)
    expect(report.totalExpenses)
    .toBe(81.7)
    const entertainmentExpenseReport = report.expenseDetails.get(category.ENTERTAINMENT)
    expect(entertainmentExpenseReport.total)
    .toBe(81.7)
    expect(entertainmentExpenseReport.expenses[0].name)
    .toBe('Movies');
    expect(entertainmentExpenseReport.expenses[1].name)
    .toBe('Movies');
    expect(entertainmentExpenseReport.expenses[2].name)
    .toBe('Movies');
    expect(entertainmentExpenseReport.expenses[3].name)
    .toBe('Music');
    expect(entertainmentExpenseReport.expenses[4].name)
    .toBe('Music');
  })

  test('expense report should contain report for meal expenses and entertainment expenses', () => {
    const Expenses = [
      { type: type.BREAKFAST, amount: 15.20 },
      { type: type.LUNCH, amount: 10.20 },
      { type: type.DINNER, amount: 16.00 },
      { type: type.MOVIES, amount: 15.20 },
      { type: type.MUSIC, amount: 16.00 },
      { type: type.MUSIC, amount: 12.20 }
    ]
    const expenseReport = new ExpenseReport()
    const report = expenseReport.report(Expenses)
    expect(report.totalExpenses)
    .toBe(84.8)
    const mealExpenseReport = report.expenseDetails.get(category.MEAL)
    const entertainmentExpenseReport = report.expenseDetails.get(category.ENTERTAINMENT)
    expect(mealExpenseReport.total)
    .toBe(41.4)
    expect(mealExpenseReport.expenses[0].name)
    .toBe('Breakfast');
    expect(mealExpenseReport.expenses[1].name)
    .toBe('Lunch');
    expect(mealExpenseReport.expenses[2].name)
    .toBe('Dinner');
    expect(entertainmentExpenseReport.total)
    .toBe(43.4)
    expect(entertainmentExpenseReport.expenses[0].name)
    .toBe('Movies');
    expect(entertainmentExpenseReport.expenses[1].name)
    .toBe('Music');
    expect(entertainmentExpenseReport.expenses[2].name)
    .toBe('Music');
  })

})
