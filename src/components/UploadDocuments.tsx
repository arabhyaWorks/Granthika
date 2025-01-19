import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Upload, FileText, X, Loader2, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

const UploadDocuments = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Simulate upload progress for each file
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
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Upload Documents</h1>
        </div>
      </div>

      {/* Upload Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
        <div className="space-y-6">
          {/* Drag & Drop Zone */}
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 bg-white shadow-sm",
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
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
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <Upload className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drag & drop your documents here
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Support for PDF, DOCX, and image files
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Browse Files
              </button>
            </div>

            {/* Upload Illustration */}
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
              alt="Upload illustration"
              className="absolute bottom-0 right-0 w-32 h-32 object-cover opacity-10 rounded-br-xl"
            />
          </div>

          {/* Recently Uploaded */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recently Uploaded</h2>
              <button className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-700 flex items-center gap-1 group font-medium">
                View all
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Sanskrit Literature Volume 3.pdf', date: '2 hours ago', size: '4.2 MB' },
                { title: 'Hindi Poetry Collection.docx', date: '5 hours ago', size: '2.8 MB' },
                { title: 'Tamil Classical Texts.pdf', date: 'Yesterday', size: '8.1 MB' },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.title}</p>
                      <p className="text-sm text-gray-500">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button 
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    View
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Progress</h2>
          <div className="space-y-4">
            {files.map(file => (
              <div key={file.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-500" />
                        </div>
                      )}
                      {file.status === 'uploading' && (
                        <div className="absolute -top-1 -right-1">
                          <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
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
                  <button
                    className={cn(
                      "p-1 hover:bg-gray-100 rounded-full",
                      file.status === 'uploading' ? 'hidden' : ''
                    )}
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 transition-all duration-300",
                      file.status === 'completed'
                        ? "bg-green-500"
                        : file.status === 'error'
                        ? "bg-red-500"
                        : "bg-blue-500"
                    )}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            ))}

            {files.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No files uploaded yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;