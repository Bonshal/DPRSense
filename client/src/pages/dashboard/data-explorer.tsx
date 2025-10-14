import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Eye, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ExtractedEntity, DPRAnalysisData } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export default function DataExplorerPage() {
  const { data: analysisData, isLoading } = useQuery<DPRAnalysisData>({
    queryKey: ["/api/dpr/analysis"],
  });

  const [selectedEntity, setSelectedEntity] = useState<ExtractedEntity | null>(null);

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

  const { extractedEntities } = analysisData;

  const openSourceViewer = (entity: ExtractedEntity) => {
    setSelectedEntity(entity);
  };

  const closeSourceViewer = () => {
    setSelectedEntity(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Data Explorer</h1>
        <p className="text-muted-foreground">
          Comprehensive view of all extracted data points with source verification
        </p>
      </div>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Extracted Entities
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            All key data points extracted from the DPR with source references
          </p>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Data Point</TableHead>
                  <TableHead className="w-[50%]">Extracted Value</TableHead>
                  <TableHead className="w-[20%] text-right">Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extractedEntities.map((entity, index) => (
                  <TableRow key={index} data-testid={`data-row-${index}`}>
                    <TableCell className="font-medium">{entity.dataPoint}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {entity.value}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSourceViewer(entity)}
                        data-testid={`button-view-source-${index}`}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Source
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* PDF Source Viewer Modal */}
      <Dialog open={!!selectedEntity} onOpenChange={closeSourceViewer}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Source Verification</DialogTitle>
          </DialogHeader>
          {selectedEntity && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Data Point</p>
                    <p className="font-medium text-foreground" data-testid="modal-data-point">
                      {selectedEntity.dataPoint}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Extracted Value</p>
                    <p className="font-mono text-sm text-foreground" data-testid="modal-value">
                      {selectedEntity.value}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-muted/10 rounded-lg border border-border overflow-hidden">
                <div className="aspect-[8.5/11] relative">
                  {/* PDF Page Image - Placeholder */}
                  <div className="absolute inset-0 bg-white flex items-center justify-center">
                    <p className="text-muted-foreground">PDF Page Preview</p>
                  </div>

                  {/* Dynamic Highlight Box */}
                  <div
                    className="absolute bg-primary/20 border-2 border-primary"
                    data-testid="highlight-box"
                    style={{
                      top: selectedEntity.source.highlightBox.top,
                      left: selectedEntity.source.highlightBox.left,
                      width: selectedEntity.source.highlightBox.width,
                      height: selectedEntity.source.highlightBox.height,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={closeSourceViewer} data-testid="button-close-modal">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
