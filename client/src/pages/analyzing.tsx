import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";

const analysisSteps = [
  { id: 1, label: "Extracting document structure", duration: 1000 },
  { id: 2, label: "Identifying key entities", duration: 1000 },
  { id: 3, label: "Validating financial data", duration: 1000 },
  { id: 4, label: "Assessing completeness", duration: 1000 },
  { id: 5, label: "Calculating risk predictions", duration: 1000 },
];

export default function AnalyzingPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on progress
      let cumulativeDuration = 0;
      for (let i = 0; i < analysisSteps.length; i++) {
        cumulativeDuration += analysisSteps[i].duration;
        if (elapsed < cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setLocation("/dashboard");
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Analyzing DPR
          </h1>
          <p className="text-muted-foreground">
            AI-powered analysis in progress...
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-mono" data-testid="text-progress">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="space-y-4">
              {analysisSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-center gap-3"
                  data-testid={`step-${step.id}`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-chart-2 flex-shrink-0" />
                  ) : index === currentStep ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                  )}
                  <span
                    className={
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
