import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, FileCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { DPRAnalysisData } from "@shared/schema";

export default function CompliancePage() {
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

  const { completeness } = analysisData;

  const foundCount = completeness.filter((item) => item.status === "Found").length;
  const totalCount = completeness.length;
  const completenessPercentage = Math.round((foundCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Compliance & Completeness
        </h1>
        <p className="text-muted-foreground">
          Detailed checklist of mandatory DPR sections and requirements
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            Completeness Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div>
              <div className="text-5xl font-bold text-chart-1" data-testid="text-completeness-percentage">
                {completenessPercentage}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Complete</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-chart-2" />
                  <span className="text-sm">
                    <span className="font-semibold" data-testid="text-found-count">{foundCount}</span> Found
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-chart-5" />
                  <span className="text-sm">
                    <span className="font-semibold" data-testid="text-missing-count">{totalCount - foundCount}</span> Missing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Checklist */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Section Checklist</CardTitle>
          <p className="text-sm text-muted-foreground">
            Status of all mandatory sections in the DPR
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {completeness.map((item, index) => (
              <div
                key={index}
                data-testid={`checklist-item-${index}`}
                className="flex items-center justify-between py-3 px-4 rounded-md hover-elevate border border-transparent hover:border-border transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.status === "Found" ? (
                    <CheckCircle2 className="w-5 h-5 text-chart-2 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-chart-5 flex-shrink-0" />
                  )}
                  <span className="text-foreground font-medium">{item.item}</span>
                </div>
                <Badge
                  variant={item.status === "Found" ? "outline" : "destructive"}
                  data-testid={`status-${index}`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missing Items Alert */}
      {totalCount - foundCount > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              {totalCount - foundCount} mandatory section{totalCount - foundCount > 1 ? "s are" : " is"} missing from the DPR.
              Please request clarification or additional documentation from the implementing agency.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
