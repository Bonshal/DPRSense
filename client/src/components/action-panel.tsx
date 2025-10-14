import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Flag, XCircle, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { DPRAnalysisData } from "@shared/schema";

export function ActionPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [comments, setComments] = useState("");

  const { data: analysisData } = useQuery<DPRAnalysisData>({
    queryKey: ["/api/dpr/analysis"],
  });

  const actionMutation = useMutation({
    mutationFn: async (action: "approve" | "flag" | "reject") => {
      return await apiRequest("POST", "/api/dpr/action", {
        action,
        comments: comments || undefined,
      });
    },
    onSuccess: (data, action) => {
      const actionLabels = {
        approve: "Approved for Committee Review",
        flag: "Flagged for Clarification",
        reject: "Rejected",
      };

      toast({
        title: "Action Recorded",
        description: `DPR has been ${actionLabels[action].toLowerCase()}`,
      });
      setComments("");
      
      // Invalidate the analysis query to refresh audit log
      queryClient.invalidateQueries({ queryKey: ["/api/dpr/analysis"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Failed to record action. Please try again.",
      });
    },
  });

  const handleAction = (action: "approve" | "flag" | "reject") => {
    actionMutation.mutate(action);
  };

  const { auditLog } = analysisData || {};

  return (
    <Card className="border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Action & Collaboration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Take action on this DPR analysis and add comments
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleAction("approve")}
            disabled={actionMutation.isPending}
            data-testid="button-approve"
            variant="default"
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve for Committee Review
          </Button>
          <Button
            onClick={() => handleAction("flag")}
            disabled={actionMutation.isPending}
            data-testid="button-flag"
            variant="secondary"
            className="gap-2"
          >
            <Flag className="w-4 h-4" />
            Flag for Clarification
          </Button>
          <Button
            onClick={() => handleAction("reject")}
            disabled={actionMutation.isPending}
            data-testid="button-reject"
            variant="destructive"
            className="gap-2"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </Button>
        </div>

        {/* Comment Box */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Comments (Optional)
          </label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add notes or reasons for your decision..."
            className="min-h-[100px]"
            data-testid="textarea-comments"
          />
        </div>

        {/* Audit Trail */}
        {auditLog && auditLog.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between" data-testid="button-audit-trail">
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Audit Trail
                </span>
                <Badge variant="outline">{auditLog.length}</Badge>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-3 border border-border rounded-lg p-4">
                {auditLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col gap-1 pb-3 border-b border-border last:border-0 last:pb-0"
                    data-testid={`audit-entry-${entry.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-foreground">
                        {entry.action}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By: {entry.user}
                    </p>
                    {entry.comments && (
                      <p className="text-sm text-foreground mt-1">{entry.comments}</p>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
