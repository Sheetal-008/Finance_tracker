import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Calculator, TrendingUp, DollarSign, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyFund = () => {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [result, setResult] = useState<{
    emergencyFund: number;
    timeToReach: number;
    monthlyContribution: number;
  } | null>(null);
  const { toast } = useToast();

  const calculateEmergencyFund = () => {
    if (!monthlyExpense || !monthlySavings) {
      toast({
        title: "Missing Information",
        description: "Please fill in both monthly expense and savings amounts.",
        variant: "destructive"
      });
      return;
    }

    const expense = parseFloat(monthlyExpense);
    const savings = parseFloat(monthlySavings);

    if (expense <= 0 || savings <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive amounts.",
        variant: "destructive"
      });
      return;
    }

    // Recommended emergency fund is 6-12 months of expenses (using 8 months as middle ground)
    const emergencyFund = expense * 8;
    const timeToReach = Math.ceil(emergencyFund / savings);
    const monthlyContribution = emergencyFund / timeToReach;

    setResult({
      emergencyFund,
      timeToReach,
      monthlyContribution
    });

    toast({
      title: "Emergency Fund Calculated",
      description: "Your personalized emergency fund plan is ready!",
    });
  };

  const emergencyTips = [
    {
      title: "Start Small",
      description: "Begin with a goal of ₹1000, then gradually build up to your full emergency fund.",
      icon: TrendingUp
    },
    {
      title: "Separate Account",
      description: "Keep your emergency fund in a separate high-yield savings account.",
      icon: Shield
    },
    {
      title: "Automate Savings",
      description: "Set up automatic transfers to build your emergency fund consistently.",
      icon: DollarSign
    },
    {
      title: "Review Regularly",
      description: "Update your emergency fund target as your expenses change over time.",
      icon: Calculator
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Emergency Fund Planning</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Build Your Emergency Fund</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate how much you need for emergencies and create a plan to reach your goal safely.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Emergency Fund Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthly-expense">Monthly Expenses (₹)</Label>
                <Input
                  id="monthly-expense"
                  type="number"
                  placeholder="e.g., 50000"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Include all essential expenses: rent, food, utilities, insurance, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-savings">Monthly Savings Capacity (₹)</Label>
                <Input
                  id="monthly-savings"
                  type="number"
                  placeholder="e.g., 15000"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Amount you can consistently save each month
                </p>
              </div>

              <Button 
                onClick={calculateEmergencyFund} 
                className="w-full" 
                variant="hero"
                size="lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Emergency Fund
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Your Emergency Fund Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Calculate Your Emergency Fund</p>
                  <p className="text-sm">Enter your monthly expenses and savings to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-3xl font-bold text-success mb-2">
                      ₹{result.emergencyFund.toLocaleString()}
                    </div>
                    <p className="text-success font-medium">Recommended Emergency Fund</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      8 months of essential expenses
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {result.timeToReach}
                      </div>
                      <p className="text-sm text-muted-foreground">Months to reach goal</p>
                    </div>

                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent mb-1">
                        ₹{result.monthlyContribution.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly contribution</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider keeping your emergency fund in a high-yield savings account that offers 
                      easy access but earns better interest than regular savings.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Emergency Fund Tips */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 mr-3 text-accent" />
              Emergency Fund Best Practices
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow these proven strategies to build and maintain your emergency fund effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {emergencyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="shadow-card border-0 gradient-card hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Scenarios */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">When to Use Your Emergency Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-success mb-3">✅ Use Emergency Fund For:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Job loss or income reduction</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Medical emergencies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Major home or car repairs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Family emergencies</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-destructive mb-3">❌ Don't Use For:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span>Vacations or leisure travel</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span>Shopping or luxury purchases</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span>Investment opportunities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span>Regular monthly expenses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFund;