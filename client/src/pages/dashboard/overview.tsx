import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, DollarSign, Clock, MapPin, Building2, Ruler, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import type { DPRAnalysisData } from "@shared/schema";

// Fix for default marker icon in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function OverviewPage() {
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

  const { dprHealthScore, summary, benchmarks, location } = analysisData;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-chart-5";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Review";
  };

  const benchmarkChartData = benchmarks?.map(b => ({
    name: b.metric,
    project: b.projectValue,
    average: b.averageValue,
    unit: b.unit,
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">AI-powered analysis results and key metrics</p>
      </div>

      {/* DPR Health Score Card */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            DPR Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className={`text-6xl font-bold ${getScoreColor(dprHealthScore)}`} data-testid="text-health-score">
              {dprHealthScore}
            </div>
            <div className="pb-2">
              <Badge variant="outline" className="mb-1">
                {getScoreLabel(dprHealthScore)}
              </Badge>
              <p className="text-sm text-muted-foreground">out of 100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Title</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold text-foreground" data-testid="text-project-title">
              {summary.projectTitle}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground font-mono" data-testid="text-total-cost">
              {summary.totalCost}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground" data-testid="text-duration">
              {summary.duration}
            </p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Current Progress</p>
              <p className="text-sm font-semibold text-foreground mt-1 mb-2">
                Month 8 of 36
              </p>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">40% Complete</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Region</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground" data-testid="text-region">
              {summary.region}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Category</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold text-foreground" data-testid="text-category">
              {summary.category}
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Length</CardTitle>
            <Ruler className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground font-mono" data-testid="text-length">
              {summary.projectLength}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Benchmark Comparison */}
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle>Contextual & Comparative Analytics</CardTitle>
          <p className="text-sm text-muted-foreground">
            Benchmark comparison with similar projects in the region
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  formatter={(value: any, name: string, props: any) => [
                    `${value} ${props.payload.unit}`,
                    name === "project" ? "This Project" : "Regional Average",
                  ]}
                />
                <Bar dataKey="project" name="This Project" radius={[4, 4, 0, 0]}>
                  {benchmarkChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="hsl(var(--chart-1))" />
                  ))}
                </Bar>
                <Bar dataKey="average" name="Average" radius={[4, 4, 0, 0]}>
                  {benchmarkChartData.map((entry, index) => (
                    <Cell key={`cell-avg-${index}`} fill="hsl(var(--muted))" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Geospatial Visualization */}
      {location && (
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle>Project Location</CardTitle>
            <p className="text-sm text-muted-foreground">Geographic context and accessibility</p>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-lg overflow-hidden border border-border">
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                data-testid="map-container"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>
                    <div className="p-2">
                      <p className="font-semibold">{summary.projectTitle}</p>
                      <p className="text-sm text-muted-foreground">{location.locationName}</p>
                      <p className="text-sm font-mono mt-1">{summary.totalCost}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
