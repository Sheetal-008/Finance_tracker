import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Volume2 } from "lucide-react";
import { apiPost } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API for voice input if available
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.lang = "en-US";
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setInput(text);
      };
      recognitionRef.current = rec;
    }
  }, []);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.0;
    synth.cancel();
    synth.speak(utter);
  };

  const sendMessage = async () => {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await apiPost("/ask", { query: q });
      const answer: string = res.answer || "No response";
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: "Error: " + (e?.message || "Request failed") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle>Finos Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[50vh] overflow-y-auto p-4 bg-background/50 rounded-lg">
                {messages.length === 0 && (
                  <div className="text-sm text-muted-foreground">Ask things like: "How much did I spend on food last month?"</div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block px-3 py-2 rounded-lg ${m.role === "user" ? "bg-primary text-white" : "bg-muted"}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => recognitionRef.current?.start?.()}
                  disabled={!recognitionRef.current}
                >
                  <Mic className="w-4 h-4 mr-2" /> Voice
                </Button>
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button type="button" onClick={sendMessage} disabled={loading}>
                  <Send className="w-4 h-4 mr-1" /> Send
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => speak(messages.filter(m => m.role === "assistant").slice(-1)[0]?.content || "")}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assistant;