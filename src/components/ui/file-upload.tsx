"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image, FileText, Loader2 } from "lucide-react";

export interface FileUploadFile {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  preview?: string;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: FileUploadFile[]) => void;
  onUpload?: (file: File) => Promise<void>;
  className?: string;
  variant?: "default" | "compact" | "avatar" | "inline";
  showPreview?: boolean;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image className="h-4 w-4" />;
  if (type.includes("pdf")) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function FileUpload({
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024,
  disabled = false,
  onFilesChange,
  onUpload,
  className,
  variant = "default",
  showPreview = true,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileUploadFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const valid = fileArray
      .filter((f) => f.size <= maxSize)
      .slice(0, maxFiles - files.length);

    const newUploadFiles: FileUploadFile[] = valid.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      progress: 0,
      status: "pending" as const,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));

    const updated = [...files, ...newUploadFiles];
    setFiles(updated);
    onFilesChange?.(updated);

    if (onUpload) {
      newUploadFiles.forEach(async (uf) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, status: "uploading" as const } : f
          )
        );
        try {
          await onUpload(uf.file);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id
                ? { ...f, status: "success" as const, progress: 100 }
                : f
            )
          );
        } catch {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uf.id
                ? { ...f, status: "error" as const, error: "Upload failed" }
                : f
            )
          );
        }
      });
    }
  };

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border border-dashed border-input px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((f) => (
              <div key={f.id} className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
                {getFileIcon(f.file.type)}
                <span className="max-w-[120px] truncate">{f.file.name}</span>
                <button type="button" onClick={() => removeFile(f.id)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-sm font-medium">
          Drop files here or click to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {accept ? `Accepted: ${accept}` : "Any file type"} (max {formatSize(maxSize)})
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              {showPreview && f.preview ? (
                <img
                  src={f.preview}
                  alt={f.file.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                  {getFileIcon(f.file.type)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{f.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(f.file.size)}
                  {f.status === "error" && (
                    <span className="ml-2 text-destructive">{f.error}</span>
                  )}
                </p>
                {f.status === "uploading" && (
                  <div className="mt-1 h-1 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {f.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="rounded-sm p-1 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { FileUpload };
