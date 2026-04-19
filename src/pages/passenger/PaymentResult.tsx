import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketService } from "@/services/ticketService";
import { toast } from "sonner";

type Status = "pending" | "paid" | "failed";

const POLL_INTERVAL_MS = 6000;
const MAX_POLLS = 10; // ~1 minute

const PaymentResult = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState<Status>("pending");
  const [attempts, setAttempts] = useState(0);
  const ticketIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fromQuery = params.get("ticket_id") || params.get("tx_ref");
    const fromStorage = sessionStorage.getItem("btts_pending_ticket");
    ticketIdRef.current = fromQuery || fromStorage;

    if (!ticketIdRef.current) {
      toast.error("Missing ticket reference");
      navigate("/my-tickets");
      return;
    }

    let cancelled = false;
    let count = 0;

    const poll = async () => {
      if (cancelled) return;
      count += 1;
      setAttempts(count);
      try {
        const res = await ticketService.verifyPayment(Number(ticketIdRef.current));
        const s = (res.status || "").toUpperCase();
        if (s === "PAID") {
          setStatus("paid");
          sessionStorage.removeItem("btts_pending_ticket");
          return;
        }
        if (s === "FAILED") {
          setStatus("failed");
          sessionStorage.removeItem("btts_pending_ticket");
          return;
        }
      } catch {
        // keep polling
      }
      if (count >= MAX_POLLS) {
        setStatus("failed");
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();
    return () => { cancelled = true; };
  }, [navigate, params]);

  return (
    <div className="max-w-lg mx-auto px-6 py-20 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-20 animate-pulse-soft" />

      <div className="glass-card rounded-3xl p-10 text-center animate-fade-up">
        {status === "pending" && (
          <>
            <Loader2 className="h-14 w-14 text-primary mx-auto mb-5 animate-spin" />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Verifying payment</h1>
            <p className="text-sm text-muted-foreground">
              Please wait while we confirm your transaction with Chapa.
            </p>
            <p className="text-xs text-muted-foreground mt-4">Attempt {attempts} / {MAX_POLLS}</p>
          </>
        )}

        {status === "paid" && (
          <>
            <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-5" />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Payment successful</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Your ticket has been confirmed. Have a great trip!
            </p>
            <Button className="rounded-full px-8 shadow-elevated" onClick={() => navigate("/my-tickets")}>
              View my tickets
            </Button>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="h-14 w-14 text-destructive mx-auto mb-5" />
            <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Payment not confirmed</h1>
            <p className="text-sm text-muted-foreground mb-6">
              We couldn’t verify your payment. If you were charged, it will reflect shortly.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="rounded-full px-6" onClick={() => navigate("/my-tickets")}>
                My tickets
              </Button>
              <Button className="rounded-full px-6" onClick={() => navigate("/trips")}>
                Try again
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
