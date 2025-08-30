import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, PieChart, TrendingUp, Download, Calendar, DollarSign, Calculator } from "lucide-react";
import { apiGet } from "@/lib/api";

const Reports = () => {
  // This would be populated from actual user data
  const hasData = false; // Set to true when user has actual data
  
  const reportData = {
    monthlySpending: [
      { month: "Jan", amount: 0, budget: 0 },
      { month: "Feb", amount: 0, budget: 0 },
      { month: "Mar", amount: 0, budget: 0 },
      { month: "Apr", amount: 0, budget: 0 },
      { month: "May", amount: 0, budget: 0 },
      { month: "Jun", amount: 0, budget: 0 },
    ],
    categoryBreakdown: [],
    savingsProgress: {
      target: 0,
      current: 0,
      monthlyContribution: 0
    }
  };

  const insights = [
    {
      title: "Spending Trend",
      value: "--",
      description: "No data available yet",
      trend: "neutral",
      icon: TrendingUp
    },
    {
      title: "Budget Utilization",
      value: "--",
      description: "Create budgets to track",
      trend: "neutral",
      icon: PieChart
    },
    {
      title: "Savings Rate",
      value: "--",
      description: "Start saving to see rate",
      trend: "neutral",
      icon: DollarSign
    },
    {
      title: "Expenses",
      value: "--",
      description: "Add expenses to analyze",
      trend: "neutral",
      icon: BarChart3
    }
  ];

  const downloadCsv = async () => {
    try {
      const res = await fetch("/api/summary?format=csv", { headers: { ...(localStorage.getItem("finos_token") ? { Authorization: `Bearer ${localStorage.getItem("finos_token")}` } : {}) } });
      if (!res.ok) throw new Error("failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "summary.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            <span>Financial Reports</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Reports & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze your spending patterns, track your progress, and make informed financial decisions.
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const trendColors = {
              up: "text-success",
              down: "text-destructive",
              neutral: "text-muted-foreground"
            };
            
            return (
              <Card key={index} className="shadow-card border-0 gradient-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{insight.value}</div>
                  <div className="font-medium mb-1">{insight.title}</div>
                  <div className={`text-sm ${trendColors[insight.trend as keyof typeof trendColors]}`}>
                    {insight.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* No Data State */}
          {!hasData ? (
            <div className="lg:col-span-2">
              <Card className="shadow-card border-0 gradient-card">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
                  <h3 className="text-2xl font-bold mb-4">No Financial Data Yet</h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Start by creating your budget and adding expenses to see detailed reports and insights about your financial patterns.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/budget">
                      <Button variant="hero" size="lg">
                        Create Your Budget
                      </Button>
                    </Link>
                    <Link to="/expenses">
                      <Button variant="outline" size="lg">
                        Add Expenses
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Monthly Spending Chart - Only show when there's data */}
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Monthly Spending vs Budget</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={downloadCsv}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.monthlySpending.map((data, index) => {
                      if (data.budget === 0) return null;
                      const utilization = (data.amount / data.budget) * 100;
                      const isOverBudget = utilization > 100;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{data.month}</span>
                            <div className="text-right">
                              <div className="font-semibold">₹{data.amount.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">/ ₹{data.budget.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all ${
                                isOverBudget ? 'bg-destructive' : 'bg-primary'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {utilization.toFixed(1)}% of budget used
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown - Only show when there's data */}
              <Card className="shadow-card border-0 gradient-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Spending by Category</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    This Month
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.categoryBreakdown.map((category, index) => {
                      const colors = [
                        'bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 
                        'bg-warning', 'bg-destructive'
                      ];
                      
                      return (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{category.category}</span>
                              <span className="font-semibold">₹{category.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors[index]}`}
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground min-w-[40px]">
                            {category.percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Savings Progress - Only show when there's data */}
        {hasData && reportData.savingsProgress.target > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="shadow-card border-0 gradient-card">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Savings Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-success mb-2">
                    ₹{reportData.savingsProgress.current.toLocaleString()}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    of ₹{reportData.savingsProgress.target.toLocaleString()} goal
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-6 mb-6">
                  <div 
                    className="h-6 bg-gradient-to-r from-success to-primary rounded-full transition-all flex items-center justify-end pr-4"
                    style={{ 
                      width: `${(reportData.savingsProgress.current / reportData.savingsProgress.target) * 100}%` 
                    }}
                  >
                    <span className="text-white text-sm font-medium">
                      {((reportData.savingsProgress.current / reportData.savingsProgress.target) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ₹{reportData.savingsProgress.monthlyContribution.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Contribution</div>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {Math.ceil((reportData.savingsProgress.target - reportData.savingsProgress.current) / reportData.savingsProgress.monthlyContribution)}
                    </div>
                    <div className="text-sm text-muted-foreground">Months to Goal</div>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">
                      ₹{(reportData.savingsProgress.target - reportData.savingsProgress.current).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining to Save</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Getting Started Tips - Show when no data */}
        {!hasData && (
          <div className="mt-12 max-w-6xl mx-auto">
            <Card className="shadow-card border-0 gradient-card">
              <CardHeader>
                <CardTitle className="text-center">Quick Start Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Set Your Budget</h3>
                    <p className="text-sm text-muted-foreground mb-4">Create monthly budgets for different spending categories</p>
                    <Link to="/budget">
                      <Button variant="outline" size="sm">Start Budgeting</Button>
                    </Link>
                  </div>
                  
                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PieChart className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Track Expenses</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add your daily expenses to see spending patterns</p>
                    <Link to="/expenses">
                      <Button variant="outline" size="sm">Add Expenses</Button>
                    </Link>
                  </div>
                  
                  <div className="text-center p-6 bg-background/50 rounded-lg">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">3. View Reports</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get insights and analytics on your financial habits</p>
                    <Button variant="outline" size="sm" disabled>Coming Soon</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;