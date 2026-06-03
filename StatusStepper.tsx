import { Check, Loader2 } from "lucide-react";

type Step = { label: string; done: boolean; current?: boolean };

export function StatusStepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex w-full items-start gap-2">
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={s.label} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  s.done
                    ? "border-success bg-success text-white"
                    : s.current
                    ? "border-accent bg-accent/20 text-accent-foreground animate-pulse"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {s.done ? <Check className="h-5 w-5" /> : s.current ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="text-sm font-semibold">{i + 1}</span>}
              </div>
              {!isLast && <div className={`h-1 flex-1 ${s.done ? "bg-success" : "bg-border"}`} />}
            </div>
            <p className={`mt-2 text-xs font-medium sm:text-sm ${s.current ? "text-accent-foreground font-bold" : s.done ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
