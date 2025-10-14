import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Clock, Info, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { DPRAnalysisData } from "@shared/schema";

export default function RiskPage() {
  const { data: analysisData, isLoading } = useQuery<DPRAnalysisData>({
    queryKey: ["/api/dpr/analysis"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No analysis data available</p>
      </div>
    );
  }

  const { riskPrediction, riskFactors } = analysisData;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-chart-2";
      case "Medium":
        return "text-chart-3";
      case "High":
        return "text-chart-5";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "Low":
        return "outline";
      case "Medium":
        return "secondary";
      case "High":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-chart-5";
      case "Medium":
        return "text-chart-3";
      case "Low":
        return "text-chart-4";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Risk Assessment</h1>
        <p className="text-muted-foreground">
          AI-predicted risks and contributing factors analysis
        </p>
      </div>

      {/* Risk Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Overrun Risk */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-1" />
              Cost Overrun Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className={`text-5xl font-bold ${getRiskColor(riskPrediction.costOverrun.level)}`} data-testid="text-cost-risk">
                  {riskPrediction.costOverrun.probability}%
                </div>
                <div className="pb-2">
                  <Badge variant={getRiskBadgeVariant(riskPrediction.costOverrun.level)}>
                    {riskPrediction.costOverrun.level} Risk
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Progress
                  value={riskPrediction.costOverrun.probability}
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Probability of cost exceeding the stated budget
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Delay Risk */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-chart-1" />
              Schedule Delay Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className={`text-5xl font-bold ${getRiskColor(riskPrediction.scheduleDelay.level)}`} data-testid="text-schedule-risk">
                  {riskPrediction.scheduleDelay.probability}%
                </div>
                <div className="pb-2">
                  <Badge variant={getRiskBadgeVariant(riskPrediction.scheduleDelay.level)}>
                    {riskPrediction.scheduleDelay.level} Risk
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Progress
                  value={riskPrediction.scheduleDelay.probability}
                  className="h-3"
                />
                <p className="text-sm text-muted-foreground">
                  Probability of project timeline extension
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Explainability - Risk Factor Breakdown */}
      {riskFactors && riskFactors.length > 0 && (
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              AI Risk Factor Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Key contributing factors to the identified risk levels
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-chart-3" />
                  Schedule Delay Risk Attributed To:
                </h4>
                <div className="space-y-3">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="flex gap-3" data-testid={`risk-factor-${index}`}>
                      <div className={`font-semibold ${getImpactColor(factor.impact)} min-w-[2rem]`}>
                        {index + 1}.
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{factor.factor}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getImpactColor(factor.impact)}`}
                          >
                            {factor.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Summary Alert */}
      <Card className={`border-${getRiskColor(riskPrediction.scheduleDelay.level).replace("text-", "")}/50 bg-${getRiskColor(riskPrediction.scheduleDelay.level).replace("text-", "")}/5`}>
        <CardHeader>
          <CardTitle className={`${getRiskColor(riskPrediction.scheduleDelay.level)} flex items-center gap-2`}>
            <AlertTriangle className="w-5 h-5" />
            Risk Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            The project shows <span className="font-semibold">{riskPrediction.costOverrun.level.toLowerCase()} cost overrun risk</span> and{" "}
            <span className="font-semibold">{riskPrediction.scheduleDelay.level.toLowerCase()} schedule delay risk</span>.
            {riskPrediction.scheduleDelay.level !== "Low" &&
              " Consider requesting mitigation strategies and contingency planning from the implementing agency."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
