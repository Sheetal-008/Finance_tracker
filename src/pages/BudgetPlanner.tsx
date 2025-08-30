import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Plus, Trash2, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

const BudgetPlanner = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Savings",
    "Other"
  ];

  const addBudgetItem = () => {
    if (!category || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter an amount.",
        variant: "destructive"
      });
      return;
    }

    // Check if category already exists
    const existingItemIndex = budgetItems.findIndex(item => item.category === category);
    
    if (existingItemIndex !== -1) {
      // Update existing category by adding to the amount
      const updatedItems = [...budgetItems];
      updatedItems[existingItemIndex].amount += parseFloat(amount);
      setBudgetItems(updatedItems);
      
      toast({
        title: "Budget Updated",
        description: `₹${amount} added to ${category}. Total: ₹${updatedItems[existingItemIndex].amount}`,
      });
    } else {
      // Create new category
      const newItem: BudgetItem = {
        id: Date.now().toString(),
        category,
        amount: parseFloat(amount)
      };

      setBudgetItems([...budgetItems, newItem]);
      
      toast({
        title: "Budget Added",
        description: `₹${amount} budget set for ${category}`,
      });
    }

    setCategory("");
    setAmount("");
  };

  const removeBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
    toast({
      title: "Budget Removed",
      description: "Budget item has been deleted.",
    });
  };

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            <span>Budget Planning</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Plan Your Monthly Budget</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set spending limits for different categories and track your financial goals effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Add Budget Form */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Budget Category</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
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

              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button 
                onClick={addBudgetItem} 
                className="w-full" 
                variant="hero"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Budget
              </Button>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Budget Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary">₹{totalBudget.toLocaleString()}</div>
                <p className="text-muted-foreground">Total Monthly Budget</p>
              </div>

              {budgetItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No budget items added yet</p>
                  <p className="text-sm">Start by adding your first budget category</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {budgetItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">
                          {((item.amount / totalBudget) * 100).toFixed(1)}% of total budget
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeBudgetItem(item.id)}
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

        {/* Budget Chart Placeholder */}
        {budgetItems.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="shadow-card border-0 gradient-card">
              <CardHeader>
                <CardTitle className="text-center">Budget Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgetItems.map((item, index) => {
                    const percentage = (item.amount / totalBudget) * 100;
                    const colors = [
                      'bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 
                      'bg-warning', 'bg-destructive', 'bg-purple-500', 'bg-pink-500',
                      'bg-indigo-500', 'bg-cyan-500'
                    ];
                    return (
                      <div key={item.id} className="text-center p-4 rounded-lg bg-background/50">
                        <div className={`w-16 h-16 ${colors[index % colors.length]} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
                          {percentage.toFixed(0)}%
                        </div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">₹{item.amount.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanner;