import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import type { DPRAnalysisData } from "@shared/schema";

export default function FinancialPage() {
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

  const { inconsistencies, summary } = analysisData;

  const matchCount = inconsistencies.filter((item) => item.status === "Match").length;
  const mismatchCount = inconsistencies.length - matchCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Financial Analysis
        </h1>
        <p className="text-muted-foreground">
          Cross-validation of financial data and consistency checks
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Financial Validation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div>
              <div className="text-4xl font-bold text-foreground font-mono">
                {summary.totalCost}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Total Project Cost</p>
            </div>
            <div className="flex-1 flex gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-chart-2" />
                <div>
                  <div className="text-2xl font-bold text-chart-2" data-testid="text-match-count">
                    {matchCount}
                  </div>
                  <p className="text-xs text-muted-foreground">Matches</p>
                </div>
              </div>
              {mismatchCount > 0 && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-chart-5" />
                  <div>
                    <div className="text-2xl font-bold text-chart-5" data-testid="text-mismatch-count">
                      {mismatchCount}
                    </div>
                    <p className="text-xs text-muted-foreground">Mismatches</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inconsistency Report Table */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Inconsistency Report</CardTitle>
          <p className="text-sm text-muted-foreground">
            Logical cross-checks and validation results
          </p>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Validation Check</TableHead>
                  <TableHead className="w-[20%]">Stated Value</TableHead>
                  <TableHead className="w-[20%]">Calculated Value</TableHead>
                  <TableHead className="w-[20%] text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inconsistencies.map((item, index) => (
                  <TableRow key={index} data-testid={`financial-row-${index}`}>
                    <TableCell className="font-medium">{item.check}</TableCell>
                    <TableCell className="font-mono text-sm">{item.statedValue}</TableCell>
                    <TableCell className="font-mono text-sm">{item.calculatedValue}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={item.status === "Match" ? "outline" : "destructive"}
                        className={item.status === "Match" ? "bg-chart-2/10 text-chart-2 border-chart-2/30" : ""}
                        data-testid={`status-${index}`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Financial Health Alert */}
      {mismatchCount === 0 ? (
        <Card className="border-chart-2/50 bg-chart-2/5">
          <CardHeader>
            <CardTitle className="text-chart-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Financial Data Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              All financial cross-checks have passed successfully. The stated costs are consistent
              with the calculated totals and component breakdowns.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Financial Discrepancies Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              {mismatchCount} financial discrepanc{mismatchCount > 1 ? "ies have" : "y has"} been identified.
              Please flag this report for clarification and request corrected documentation.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
