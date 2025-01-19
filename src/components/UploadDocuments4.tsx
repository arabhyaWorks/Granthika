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

const UploadDocuments4 = () => {
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
    <div className="flex-1 min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-emerald-600" />
              </Link>
              <h1 className="text-2xl font-bold text-emerald-900">File Upload Studio</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                Help
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Zone */}
            <div
              className={cn(
                "relative rounded-2xl transition-all duration-300 bg-white shadow-xl overflow-hidden",
                isDragging
                  ? "ring-2 ring-emerald-400 bg-emerald-50"
                  : "hover:ring-2 hover:ring-emerald-300"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
              
              <div className="relative p-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  multiple
                />
                
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center transform hover:rotate-6 transition-transform duration-300">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Drop files to upload
                  </h3>
                  <p className="text-gray-500 mb-6">
                    or select files from your computer
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 flex items-center gap-2"
                    >
                      <File className="w-5 h-5" />
                      Choose Files
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-white text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-600/5 hover:shadow-emerald-600/10 flex items-center gap-2"
                    >
                      <ImageIcon className="w-5 h-5" />
                      Browse Images
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/10 to-teal-500/10 rounded-tr-[100px]" />
            </div>

            {/* Upload Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
              
              <div className="relative">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Progress</h2>
                <div className="space-y-4">
                  {files.map(file => (
                    <div key={file.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100/80 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {file.preview ? (
                              <img
                                src={file.preview}
                                alt={file.file.name}
                                className="w-14 h-14 rounded-lg object-cover ring-2 ring-emerald-100"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                <FileText className="w-7 h-7 text-white" />
                              </div>
                            )}
                            {file.status === 'uploading' && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <Loader2 className="w-3 h-3 text-emerald-500 animate-spin" />
                              </div>
                            )}
                            {file.status === 'completed' && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                            {file.status === 'error' && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full shadow-lg flex items-center justify-center">
                                <AlertCircle className="w-3 h-3 text-white" />
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
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </div>
                      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 transition-all duration-300 rounded-full",
                            file.status === 'completed'
                              ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                              : file.status === 'error'
                              ? "bg-gradient-to-r from-red-400 to-red-500"
                              : "bg-gradient-to-r from-emerald-400 to-teal-500"
                          )}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {files.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your upload queue is empty</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upload Stats */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Storage Overview</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-emerald-100">Storage Used</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-emerald-400/30 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-white rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-emerald-100 text-sm">Files</p>
                    <p className="text-2xl font-bold mt-1">2,451</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-emerald-100 text-sm">Space</p>
                    <p className="text-2xl font-bold mt-1">64.2 GB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Uploaded */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Files</h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group font-medium">
                  View all
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Annual Report.pdf', date: '2 hours ago', size: '4.2 MB' },
                  { title: 'Product Photos.zip', date: '5 hours ago', size: '2.8 MB' },
                  { title: 'Client Proposal.docx', date: 'Yesterday', size: '8.1 MB' },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl hover:bg-emerald-50 transition-all border border-emerald-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                          <FileText className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-emerald-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-emerald-50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-emerald-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-left group">
                  <File className="w-6 h-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-gray-900">New Folder</p>
                </button>
                <button className="p-4 bg-white rounded-xl hover:shadow-md transition-all text-left group">
                  <Upload className="w-6 h-6 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-gray-900">Bulk Upload</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments4;