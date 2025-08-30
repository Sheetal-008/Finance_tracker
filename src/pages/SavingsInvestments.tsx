import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, TrendingUp, DollarSign, Sparkles, ArrowRight } from "lucide-react";

const SavingsInvestments = () => {
  const savingsTips = [
    {
      title: "50/30/20 Rule",
      description: "Allocate 50% for needs, 30% for wants, and 20% for savings and investments.",
      icon: Target,
      priority: "High"
    },
    {
      title: "Emergency Fund First",
      description: "Build an emergency fund covering 6-12 months of expenses before investing.",
      icon: Target,
      priority: "Critical"
    },
    {
      title: "SIP Investments",
      description: "Start systematic investment plans in mutual funds for long-term wealth creation.",
      icon: TrendingUp,
      priority: "Medium"
    },
    {
      title: "Tax Saving Options",
      description: "Utilize ELSS, PPF, and 80C investments for tax benefits and returns.",
      icon: DollarSign,
      priority: "High"
    }
  ];

  const investmentOptions = [
    {
      name: "Mutual Funds",
      risk: "Medium",
      returns: "12-15%",
      description: "Diversified portfolio managed by professionals",
      recommended: true
    },
    {
      name: "Fixed Deposits",
      risk: "Low",
      returns: "6-8%",
      description: "Safe investment with guaranteed returns",
      recommended: false
    },
    {
      name: "Equity Stocks",
      risk: "High",
      returns: "15-20%",
      description: "Direct stock investments for experienced investors",
      recommended: false
    },
    {
      name: "PPF",
      risk: "Low",
      returns: "8-9%",
      description: "Long-term tax-saving investment option",
      recommended: true
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            <span>Savings & Investments</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Grow Your Wealth</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered suggestions to help you save smarter and invest wisely for your financial future.
          </p>
        </div>

        {/* AI Suggestions Coming Soon */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-card border-0 gradient-card text-center">
            <CardContent className="py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI-Powered Investment Advisor</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our advanced AI will analyze your financial profile, risk tolerance, and goals to provide 
                personalized investment recommendations and portfolio optimization strategies.
              </p>
              <div className="bg-primary/10 text-primary px-6 py-3 rounded-lg inline-block font-semibold">
                🚀 Coming Soon - Advanced AI Insights
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Smart Savings Tips */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-accent" />
              Smart Savings Tips
            </h2>
            <div className="space-y-4">
              {savingsTips.map((tip, index) => {
                const Icon = tip.icon;
                const priorityColors = {
                  Critical: "bg-destructive/10 text-destructive border-destructive/20",
                  High: "bg-warning/10 text-warning border-warning/20",
                  Medium: "bg-primary/10 text-primary border-primary/20"
                };
                
                return (
                  <Card key={index} className="shadow-card border-0 gradient-card hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{tip.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[tip.priority as keyof typeof priorityColors]}`}>
                              {tip.priority}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Investment Options */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-success" />
              Investment Options
            </h2>
            <div className="space-y-4">
              {investmentOptions.map((option, index) => {
                const riskColors = {
                  Low: "bg-success/10 text-success",
                  Medium: "bg-warning/10 text-warning",
                  High: "bg-destructive/10 text-destructive"
                };
                
                return (
                  <Card key={index} className={`shadow-card border-0 gradient-card hover-lift ${option.recommended ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{option.name}</h3>
                        {option.recommended && (
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Risk:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${riskColors[option.risk as keyof typeof riskColors]}`}>
                            {option.risk}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Returns:</span>
                          <span className="font-semibold text-success">{option.returns}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                      
                      <Button variant={option.recommended ? "hero" : "outline"} size="sm" className="w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Future Features Preview */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What's Coming Next</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background/50 rounded-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Portfolio Analysis</h3>
                  <p className="text-sm text-muted-foreground">Get personalized portfolio recommendations based on your risk profile</p>
                </div>
                
                <div className="text-center p-6 bg-background/50 rounded-lg">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">Real-time Market Data</h3>
                  <p className="text-sm text-muted-foreground">Track market trends and investment performance in real-time</p>
                </div>
                
                <div className="text-center p-6 bg-background/50 rounded-lg">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Goal-based Investing</h3>
                  <p className="text-sm text-muted-foreground">Set financial goals and get automated investment strategies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavingsInvestments;