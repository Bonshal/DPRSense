import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, ArrowRight } from "lucide-react";

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type === "application/pdf") {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for analysis`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please select a PDF file",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      setLocation("/analyzing");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Upload DPR for Analysis
          </h1>
          <p className="text-blue-200">
            Upload a Detailed Project Report to begin AI-powered analysis
          </p>
        </div>

        <Card className="p-8 bg-white/95 backdrop-blur">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-blue-300 bg-blue-50/50"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              
              {selectedFile ? (
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900 font-medium" data-testid="text-filename">
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your PDF file here
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    or click to browse
                  </p>
                </>
              )}

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
                id="file-upload"
                data-testid="input-file"
              />
              <Button
                type="button"
                variant="outline"
                data-testid="button-browse"
                onClick={() => document.getElementById("file-upload")?.click()}
                asChild
              >
                <span>Browse Files</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              data-testid="button-analyze"
              disabled={!selectedFile}
              onClick={handleAnalyze}
              size="lg"
              className="gap-2"
            >
              Analyze Report
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-blue-200">
            Supported formats: PDF • Maximum file size: 50MB
          </p>
        </div>
      </div>
    </div>
  );
}
