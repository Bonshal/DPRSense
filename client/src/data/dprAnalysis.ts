import type { DPRAnalysisData } from "@shared/schema";

export const mockDPRAnalysis: DPRAnalysisData = {
  fileName: "Vol-1 Revised DPR Moreh Bypass.pdf",
  dprHealthScore: 88,
  summary: {
    projectTitle: "Consultancy Services for Feasibility Study and Preparation of Detailed Project Report of Moreh Bypass",
    totalCost: "Rs. 250.78 Cr.",
    region: "Manipur",
    category: "Infrastructure Projects - Road Construction",
    duration: "36 months",
    implementingAgency: "National Highways & Infrastructure Development Corporation Limited",
    projectLength: "13.650 km",
    carriageway: "7.0 m",
  },
  completeness: [
    { item: "Project Title", status: "Found" },
    { item: "Financial Summary", status: "Found" },
    { item: "Project Duration", status: "Found" },
    { item: "Technical Specifications", status: "Found" },
    { item: "Compliance Statement", status: "Not Found" },
    { item: "Environmental Impact Assessment", status: "Found" },
    { item: "Risk Management Plan", status: "Found" },
    { item: "Stakeholder Analysis", status: "Not Found" },
  ],
  riskPrediction: {
    costOverrun: { probability: 22, level: "Low" },
    scheduleDelay: { probability: 35, level: "Medium" },
  },
  inconsistencies: [
    {
      check: "Sum of Civil vs. Stated Civil Cost",
      statedValue: "Rs. 180.45 Cr.",
      calculatedValue: "Rs. 180.45 Cr.",
      status: "Match",
    },
    {
      check: "Total Project Cost vs. Sum of Components",
      statedValue: "Rs. 250.78 Cr.",
      calculatedValue: "Rs. 250.78 Cr.",
      status: "Match",
    },
    {
      check: "Contingency Calculation (10% of Civil Cost)",
      statedValue: "Rs. 18.04 Cr.",
      calculatedValue: "Rs. 18.04 Cr.",
      status: "Match",
    },
  ],
  extractedEntities: [
    {
      dataPoint: "Project Title",
      value: "Consultancy Services for Feasibility Study and Preparation of Detailed Project Report of Moreh Bypass including two laning with paved shoulders...",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "50.1%", left: "16.8%", width: "66.3%", height: "14.3%" },
      },
    },
    {
      dataPoint: "Total Project Cost",
      value: "Rs. 250.78 Cr.",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "34.1%", left: "65.5%", width: "11.1%", height: "1.7%" },
      },
    },
    {
      dataPoint: "Project Length",
      value: "13.650 km",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "43.2%", left: "38.5%", width: "11.1%", height: "1.7%" },
      },
    },
    {
      dataPoint: "Carriageway Width",
      value: "7.0 m",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "45.1%", left: "38.5%", width: "11.1%", height: "1.7%" },
      },
    },
    {
      dataPoint: "Implementing Agency",
      value: "National Highways & Infrastructure Development Corporation Limited",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "81.2%", left: "16.8%", width: "66.3%", height: "4.1%" },
      },
    },
    {
      dataPoint: "Civil Construction Cost",
      value: "Rs. 180.45 Cr.",
      source: {
        pageImage: "/placeholder-pdf-page.png",
        highlightBox: { top: "40.5%", left: "65.5%", width: "11.1%", height: "1.7%" },
      },
    },
  ],
  benchmarks: [
    {
      metric: "Project Cost",
      projectValue: 250.78,
      averageValue: 235.50,
      unit: "Crores",
      status: "Above Average",
    },
    {
      metric: "Project Duration",
      projectValue: 36,
      averageValue: 42,
      unit: "Months",
      status: "Below Average",
    },
  ],
  riskFactors: [
    {
      factor: "Project Location",
      description: "Identified as a landslide-prone zone with seasonal accessibility challenges",
      impact: "High",
    },
    {
      factor: "Environmental Clearance",
      description: "DPR text mentions dependency on timely forest clearance approvals",
      impact: "Medium",
    },
    {
      factor: "Timeline Anomaly",
      description: "Project duration is 30% shorter than average for similar projects in the region",
      impact: "Medium",
    },
  ],
  location: {
    lat: 24.3356,
    lng: 94.0287,
    locationName: "Moreh, Manipur",
  },
  auditLog: [
    {
      id: "1",
      timestamp: "2025-01-14T10:30:00Z",
      action: "Analysis Initiated",
      user: "System",
    },
    {
      id: "2",
      timestamp: "2025-01-14T10:35:00Z",
      action: "Analysis Completed",
      user: "System",
      comments: "DPR Health Score: 88/100",
    },
  ],
};
