"use client"

import type React from "react"

import { useState, useCallback } from "react"
import {
  SpaceCard,
  SpaceCardContent,
  SpaceCardDescription,
  SpaceCardHeader,
  SpaceCardTitle,
} from "@/components/ui/space-card"
import { SpaceButton } from "@/components/ui/space-button"
import { Upload, FileText, CheckCircle, AlertCircle, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface CSVData {
  headers: string[]
  rows: string[][]
  fileName: string
  fileSize: number
  rowCount: number
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [csvData, setCsvData] = useState<CSVData | null>(null)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.trim())
      const rows = lines.slice(1, 6).map((line) => line.split(",").map((cell) => cell.trim()))

      const data: CSVData = {
        headers,
        rows,
        fileName: file.name,
        fileSize: file.size,
        rowCount: lines.length - 1,
      }

      setCsvData(data)
      validateData(data)
    }
    reader.readAsText(file)
  }

  const validateData = (data: CSVData) => {
    const errors: string[] = []
    const warnings: string[] = []

    // Required columns validation
    const requiredColumns = ["latitude", "longitude", "date", "landcover_type"]
    const missingColumns = requiredColumns.filter(
      (col) => !data.headers.some((header) => header.toLowerCase().includes(col.toLowerCase())),
    )

    if (missingColumns.length > 0) {
      errors.push(`Missing required columns: ${missingColumns.join(", ")}`)
    }

    // Data format validation
    data.rows.forEach((row, index) => {
      if (row.length !== data.headers.length) {
        errors.push(`Row ${index + 2}: Column count mismatch`)
      }
    })

    // Warnings for data quality
    if (data.rowCount < 10) {
      warnings.push("Dataset contains fewer than 10 rows - consider adding more data points")
    }

    if (data.headers.length < 4) {
      warnings.push("Dataset has fewer than 4 columns - ensure all required fields are included")
    }

    setValidation({
      isValid: errors.length === 0,
      errors,
      warnings,
    })
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setUploadComplete(true)
    }, 3000)
  }

  const resetUpload = () => {
    setCsvData(null)
    setValidation(null)
    setUploadComplete(false)
    setIsProcessing(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading">Upload Ground Truth Data</h1>
        <p className="text-muted-foreground">Import CSV files containing ground truth validation data</p>
      </div>

      {!csvData && !uploadComplete && (
        /* Upload Zone */
        <SpaceCard>
          <SpaceCardContent className="p-8">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200",
                dragActive
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border hover:border-primary/50 hover:bg-muted/20",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse and select a file from your computer</p>
                  <SpaceButton onClick={() => document.getElementById("file-input")?.click()}>
                    <FileText className="w-4 h-4" />
                    Browse Files
                  </SpaceButton>
                  <input id="file-input" type="file" accept=".csv" onChange={handleFileInput} className="hidden" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Supported format: CSV files up to 10MB</p>
                  <p>Required columns: latitude, longitude, date, landcover_type</p>
                </div>
              </div>
            </div>
          </SpaceCardContent>
        </SpaceCard>
      )}

      {csvData && !uploadComplete && (
        <div className="space-y-6">
          {/* File Info */}
          <SpaceCard>
            <SpaceCardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <SpaceCardTitle>File Information</SpaceCardTitle>
                </div>
                <SpaceButton variant="ghost" size="sm" onClick={resetUpload}>
                  <X className="w-4 h-4" />
                  Remove
                </SpaceButton>
              </div>
            </SpaceCardHeader>
            <SpaceCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">File Name</p>
                  <p className="font-medium font-mono">{csvData.fileName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium font-mono">{(csvData.fileSize / 1024).toFixed(1)} KB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rows</p>
                  <p className="font-medium font-mono">{csvData.rowCount.toLocaleString()}</p>
                </div>
              </div>
            </SpaceCardContent>
          </SpaceCard>

          {/* Validation Results */}
          {validation && (
            <SpaceCard>
              <SpaceCardHeader>
                <div className="flex items-center gap-2">
                  {validation.isValid ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <SpaceCardTitle>Validation Results</SpaceCardTitle>
                </div>
              </SpaceCardHeader>
              <SpaceCardContent>
                <div className="space-y-4">
                  {validation.errors.length > 0 && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <h4 className="font-medium text-destructive mb-2">Errors Found</h4>
                      <ul className="space-y-1">
                        {validation.errors.map((error, index) => (
                          <li key={index} className="text-sm text-destructive flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validation.warnings.length > 0 && (
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                      <h4 className="font-medium text-warning mb-2">Warnings</h4>
                      <ul className="space-y-1">
                        {validation.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-warning flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validation.isValid && validation.warnings.length === 0 && (
                    <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Validation Passed</span>
                      </div>
                      <p className="text-sm text-success mt-1">Your data is ready for processing</p>
                    </div>
                  )}
                </div>
              </SpaceCardContent>
            </SpaceCard>
          )}

          {/* Data Preview */}
          <SpaceCard>
            <SpaceCardHeader>
              <SpaceCardTitle>Data Preview</SpaceCardTitle>
              <SpaceCardDescription>First 5 rows of your uploaded data</SpaceCardDescription>
            </SpaceCardHeader>
            <SpaceCardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {csvData.headers.map((header, index) => (
                        <th key={index} className="text-left p-2 font-medium text-muted-foreground">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-border/50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="p-2 font-mono text-sm">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SpaceCardContent>
          </SpaceCard>

          {/* Process Button */}
          <div className="flex gap-4">
            <SpaceButton
              onClick={handleProcess}
              disabled={!validation?.isValid || isProcessing}
              className="flex-1 md:flex-none"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Processing Data...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Process Data
                </>
              )}
            </SpaceButton>
            <SpaceButton variant="outline" onClick={resetUpload}>
              Cancel
            </SpaceButton>
          </div>
        </div>
      )}

      {uploadComplete && (
        /* Success State */
        <SpaceCard>
          <SpaceCardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Complete!</h3>
            <p className="text-muted-foreground mb-6">
              Your ground truth data has been successfully processed and is ready for validation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SpaceButton onClick={() => (window.location.href = "/dashboard/compare")}>View Results</SpaceButton>
              <SpaceButton variant="outline" onClick={resetUpload}>
                <Upload className="w-4 h-4" />
                Upload Another File
              </SpaceButton>
              <SpaceButton variant="ghost">
                <Download className="w-4 h-4" />
                Download Report
              </SpaceButton>
            </div>
          </SpaceCardContent>
        </SpaceCard>
      )}
    </div>
  )
}
