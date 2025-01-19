import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, FileText, X, Loader2, CheckCircle, AlertCircle, ChevronRight, Image, File } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

const UploadDocuments2 = () => {
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
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Document Upload Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Upload Area */}
          <div className="col-span-12 lg:col-span-8">
            {/* Upload Zone */}
            <div
              className={cn(
                "bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 relative overflow-hidden",
                isDragging
                  ? "border-2 border-dashed border-blue-500 bg-blue-50"
                  : "border-2 border-dashed border-gray-200 hover:border-blue-500"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
              
              <div className="flex flex-col items-center justify-center text-center relative z-10">
                <div className="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Upload Your Documents
                </h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Drag and drop your files here, or click the button below to browse your files. We support PDF, DOCX, and various image formats.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <File className="w-5 h-5" />
                    Select Files
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Image className="w-5 h-5" />
                    Select Images
                  </button>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
            </div>

            {/* Upload Progress */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Progress</h2>
              <div className="space-y-4">
                {files.map(file => (
                  <div key={file.id} className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-md"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                              <FileText className="w-8 h-8 text-white" />
                            </div>
                          )}
                          {file.status === 'uploading' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
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
                          <p className="font-medium text-gray-900">{file.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.file.size)}
                          </p>
                        </div>
                      </div>
                      {file.status !== 'uploading' && (
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                    <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 transition-all duration-300 rounded-full",
                          file.status === 'completed'
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : file.status === 'error'
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : "bg-gradient-to-r from-blue-400 to-indigo-500"
                        )}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ))}

                {files.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No files uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Uploads */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Recently Uploaded */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Research Paper.pdf', date: '2 hours ago', size: '4.2 MB', type: 'pdf' },
                  { title: 'Meeting Notes.docx', date: '5 hours ago', size: '2.8 MB', type: 'doc' },
                  { title: 'Presentation.pptx', date: 'Yesterday', size: '8.1 MB', type: 'ppt' },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all bg-gradient-to-br from-gray-50 to-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Upload Statistics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Uploads</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storage Used</span>
                  <span className="font-semibold">45.8 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upload Speed</span>
                  <span className="font-semibold">12.5 MB/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments2;