import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Plus, Trash2, Receipt, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiDelete, apiGet, apiPost } from "@/lib/api";

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/transactions");
        setExpenses(
          data.items.map((t: any) => ({
            id: t._id,
            name: t.name,
            amount: t.amount,
            category: t.category,
            date: new Date(t.date).toLocaleDateString(),
          }))
        );
      } catch (e: any) {
        // ignore if not logged in yet
      }
    })();
  }, []);

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other"
  ];

  const addExpense = async () => {
    if (!name || !amount || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([newExpense, ...expenses]);
    setName("");
    setAmount("");
    setCategory("");

    try {
      const res = await apiPost("/transactions", {
        name: newExpense.name,
        amount: newExpense.amount,
        category: newExpense.category,
        date: new Date().toISOString(),
      });
      // Replace temp id with real id
      setExpenses((prev) => prev.map((e) => (e.id === newExpense.id ? { ...e, id: res.item._id } : e)));
    } catch (e: any) {
      toast({ title: "Failed to save", description: "Please sign in and try again.", variant: "destructive" });
    }
    
    toast({
      title: "Expense Added",
      description: `₹${amount} expense for ${name} has been recorded.`,
    });
  };

  const removeExpense = async (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    try {
      await apiDelete(`/transactions/${id}`);
    } catch (e: any) {
      // ignore
    }
    toast({
      title: "Expense Removed",
      description: "Expense has been deleted.",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Receipt className="w-4 h-4" />
            <span>Expense Tracking</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Track Your Expenses</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Record and monitor your daily expenses to understand your spending patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Add Expense Form */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Expense</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  placeholder="e.g., Lunch at restaurant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount (₹)</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={addExpense} 
                className="w-full" 
                variant="hero"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </CardContent>
          </Card>

          {/* Expense Summary */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Expense Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary">₹{totalExpenses.toLocaleString()}</div>
                <p className="text-muted-foreground">Total Expenses</p>
              </div>

              {Object.keys(categoryTotals).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No expenses recorded yet</p>
                  <p className="text-sm">Start tracking your expenses</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(categoryTotals).map(([category, total]) => {
                    const percentage = (total / totalExpenses) * 100;
                    return (
                      <div key={category} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div>
                          <div className="font-medium">{category}</div>
                          <div className="text-sm text-muted-foreground">
                            {percentage.toFixed(1)}% of total
                          </div>
                        </div>
                        <span className="font-semibold">₹{total.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Recent Expenses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent expenses</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {expenses.slice(0, 10).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{expense.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {expense.category} • {expense.date}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">₹{expense.amount}</span>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeExpense(expense.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Expenses Table */}
        {expenses.length > 0 && (
          <div className="mt-12 max-w-7xl mx-auto">
            <Card className="shadow-card border-0 gradient-card">
              <CardHeader>
                <CardTitle>All Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.name}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeExpense(expense.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;