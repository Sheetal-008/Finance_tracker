import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Calculator, 
  PieChart, 
  Target, 
  Shield, 
  BarChart3,
  ArrowRight,
  DollarSign,
  Wallet,
  CreditCard
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Budget Planner",
      description: "Set and track your monthly budgets with smart category management",
      path: "/budget",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: PieChart,
      title: "Expense Tracker",
      description: "Monitor your spending patterns with detailed analytics",
      path: "/expenses",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Savings Goals",
      description: "AI-powered suggestions for saving and investing wisely",
      path: "/savings",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Emergency Fund",
      description: "Calculate and build your emergency fund strategically",
      path: "/emergency",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: TrendingUp },
    { label: "Money Saved", value: "$2.5M", icon: DollarSign },
    { label: "Budgets Created", value: "125K", icon: Wallet },
    { label: "Expenses Tracked", value: "1M+", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 hover-lift">
              <TrendingUp className="w-4 h-4" />
              <span>Smart Financial Management</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
              Take Control of Your
              <span className="block gradient-hero bg-clip-text text-transparent">Financial Future</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Finova helps you budget smarter, track expenses effortlessly, and achieve your financial goals with AI-powered insights and beautiful analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/budget">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center hover-lift">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Manage Your Money
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools designed to make financial management simple, smart, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.path}>
                  <Card className="h-full hover-lift hover:shadow-card border-0 shadow-card gradient-card">
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 mx-auto shadow-glow`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Summary Section - Only show when user has data */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Your Financial Overview</h2>
            <p className="text-xl text-muted-foreground">Start tracking your finances to see your personalized dashboard</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover-lift shadow-card border-0 gradient-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground">Budget Status</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold mb-2 text-muted-foreground">--</div>
                <p className="text-muted-foreground">Set up your budget to track progress</p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-card border-0 gradient-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground">Monthly Spending</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold mb-2 text-muted-foreground">₹0</div>
                <p className="text-muted-foreground">Start adding expenses to see your spending</p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-card border-0 gradient-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-muted-foreground">Savings Goal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold mb-2 text-muted-foreground">₹0</div>
                <p className="text-muted-foreground">Plan your emergency fund to see progress</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/budget">
              <Button variant="premium" size="lg">
                Start Your Financial Journey
                <BarChart3 className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;