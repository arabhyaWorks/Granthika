import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, FileText, X, Loader2, CheckCircle, AlertCircle, ChevronRight, Image as ImageIcon, File } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

const UploadDocuments3 = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reuse the same handlers from UploadDocuments
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      progress: 0,
      status: 'uploading' as const,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(fileObj => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
        } else {
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, progress }
                : f
            )
          );
        }
      }, 500);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex-1 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Document Upload Hub
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Upload Zone */}
            <div
              className={cn(
                "rounded-3xl transition-all duration-300 relative overflow-hidden",
                isDragging
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-dashed border-blue-400"
                  : "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-dashed border-gray-700 hover:border-blue-400"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
              
              <div className="relative p-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  multiple
                />
                
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Upload Your Files
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Drag and drop your documents here, or use the buttons below to select files manually
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
                    >
                      <File className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Select Documents
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 flex items-center gap-2 group"
                    >
                      <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Select Images
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Upload Progress
              </h2>
              <div className="space-y-4">
                {files.map(file => (
                  <div key={file.id} className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-16 h-16 rounded-lg object-cover ring-2 ring-gray-700"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <FileText className="w-8 h-8 text-white" />
                            </div>
                          )}
                          {file.status === 'uploading' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            </div>
                          )}
                          {file.status === 'completed' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full shadow-lg flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {file.status === 'error' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full shadow-lg flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-200">{file.file.name}</p>
                          <p className="text-sm text-gray-400">
                            {formatFileSize(file.file.size)}
                          </p>
                        </div>
                      </div>
                      {file.status !== 'uploading' && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500 hover:text-gray-300" />
                        </button>
                      )}
                    </div>
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 transition-all duration-300",
                          file.status === 'completed'
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : file.status === 'error'
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : "bg-gradient-to-r from-blue-400 to-purple-500"
                        )}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ))}

                {files.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No files in queue</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 space-y-8">
            {/* Recently Uploaded */}
            <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Recent Files
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">
                  View all
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Project Report.pdf', date: '2 hours ago', size: '4.2 MB' },
                  { title: 'Design Assets.zip', date: '5 hours ago', size: '2.8 MB' },
                  { title: 'Meeting Notes.docx', date: 'Yesterday', size: '8.1 MB' },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6">Upload Statistics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-blue-100">Storage Used</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-blue-400/30 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-blue-100 text-sm">Total Files</p>
                    <p className="text-2xl font-bold mt-1">1,234</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-blue-100 text-sm">Used Space</p>
                    <p className="text-2xl font-bold mt-1">45.8 GB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments3;