import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Feedback submitted. Thank you!");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Contact</p>
        <h1 className="text-3xl font-serif font-bold text-foreground">Share your feedback</h1>
        <p className="text-sm text-muted-foreground mt-2">We'd love to hear about your experience.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Topic" className="rounded-xl" required />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your feedback..." rows={5} className="rounded-xl" required />
          </div>
          <Button type="submit" className="w-full rounded-full">Submit Feedback</Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
