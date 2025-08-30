import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Target, Plus, Sparkles, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  description: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const categories = [
    "Emergency Fund",
    "Home Purchase",
    "Car Purchase",
    "Vacation",
    "Education",
    "Retirement",
    "Wedding",
    "Business Investment",
    "Debt Payoff",
    "Other"
  ];

  const addGoal = () => {
    if (!title || !targetAmount || !deadline || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
      category,
      description
    };

    setGoals([...goals, newGoal]);
    setTitle("");
    setTargetAmount("");
    setDeadline("");
    setCategory("");
    setDescription("");
    
    toast({
      title: "Goal Created",
      description: `Your ${title} goal has been added successfully!`,
    });
  };

  const aiSuggestions = [
    {
      icon: TrendingUp,
      title: "Investment Strategy",
      description: "Consider investing in SIP mutual funds for long-term goals like retirement and home purchase."
    },
    {
      icon: Calendar,
      title: "Timeline Optimization",
      description: "Your vacation goal timeline looks achievable. Consider increasing monthly savings for faster completion."
    },
    {
      icon: DollarSign,
      title: "Emergency Fund Priority",
      description: "Build your emergency fund to 6 months of expenses before focusing on other goals."
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            <span>Savings Goals</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Achieve Your Financial Dreams</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set clear savings goals and get AI-powered suggestions to reach them faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Add Goal Form */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create New Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Dream Vacation to Europe"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Target Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal category" />
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
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal and why it's important to you..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button 
                onClick={addGoal} 
                className="w-full" 
                variant="hero"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {goals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Create your first goal to get personalized AI suggestions</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <div key={index} className="p-4 bg-background/50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">{suggestion.title}</h4>
                            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-primary">
                      💡 <strong>Pro Tip:</strong> Save automatically by setting up recurring transfers to your goals!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        {goals.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Goals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={goal.id} className="shadow-card border-0 gradient-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{goal.category}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{progress.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Target</p>
                            <p className="font-semibold">₹{goal.targetAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Days Left</p>
                            <p className="font-semibold">{daysLeft > 0 ? daysLeft : 'Overdue'}</p>
                          </div>
                        </div>

                        {goal.description && (
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        )}

                        <Button variant="outline" size="sm" className="w-full">
                          Add Savings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;