import { HelpCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Finova and how does it work?",
          answer: "Finova is a comprehensive personal finance management platform that helps you track expenses, create budgets, set savings goals, and get AI-powered financial insights. Simply sign up, connect your accounts, and start managing your money smarter."
        },
        {
          question: "Is Finova free to use?",
          answer: "Finova offers both free and premium plans. The free plan includes basic budgeting and expense tracking. Premium plans unlock advanced features like AI recommendations, detailed analytics, and unlimited goal tracking."
        },
        {
          question: "How secure is my financial data?",
          answer: "Your security is our top priority. We use bank-level encryption, secure cloud storage, and never store your actual bank credentials. All data is encrypted both in transit and at rest."
        }
      ]
    },
    {
      category: "Budgeting",
      questions: [
        {
          question: "How do I create my first budget?",
          answer: "Go to the Budget section, select a category like 'Food & Dining', enter your monthly limit, and click 'Add to Budget'. Repeat for all your spending categories to create a complete budget."
        },
        {
          question: "Can I modify my budget after creating it?",
          answer: "Yes! You can edit, add, or remove budget categories anytime. Your budget should evolve with your financial situation and spending patterns."
        },
        {
          question: "What if I go over my budget?",
          answer: "Finova will notify you when you're approaching or exceeding budget limits. You can then adjust your spending or modify your budget as needed."
        }
      ]
    },
    {
      category: "Goals & Savings",
      questions: [
        {
          question: "How do savings goals work?",
          answer: "Set a target amount and deadline for your goal. Finova will calculate how much you need to save monthly and track your progress. You'll get AI suggestions to optimize your savings strategy."
        },
        {
          question: "Can I have multiple savings goals?",
          answer: "Absolutely! You can create unlimited savings goals for different purposes like emergency fund, vacation, house down payment, etc."
        },
        {
          question: "Do you provide investment advice?",
          answer: "We provide educational content and general suggestions, but not personalized investment advice. Always consult with a financial advisor for investment decisions."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "Which devices can I use Finova on?",
          answer: "Finova works on any device with a web browser - desktop, tablet, or mobile. We're also developing native mobile apps for iOS and Android."
        },
        {
          question: "Can I export my data?",
          answer: "Yes, you can export your financial data in CSV or PDF format anytime from your account settings."
        },
        {
          question: "What if I forget my password?",
          answer: "Use the 'Forgot Password' link on the login page. We'll send you a secure reset link via email."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Got Questions?</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to the most common questions about Finova.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-card border-0 gradient-card">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-primary">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border-border/50"
                    >
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-card border-0 gradient-card">
            <CardContent className="pt-8">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Reach out to our support team.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 support@finova.com</p>
                <p>📞 +91 98765 43210</p>
                <p>💬 Live chat available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;