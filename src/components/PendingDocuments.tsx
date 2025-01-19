import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText, Calendar, X, CheckCircle, Clock, Award, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentJourney {
  stage: 'upload' | 'contribution' | 'validation' | 'expert' | 'golden';
  date?: string;
  by?: string;
  status: 'completed' | 'pending' | 'not-started' | 'to-be-assigned';
}

interface Document {
  id: number;
  title: string;
  language: string;
  uploadDate: string;
  status: string;
  pages: number;
  contributors: string[];
  mainDocument?: string;
  journey: DocumentJourney[];
}

// Mock data for pending documents
const pendingDocuments: Document[] = [
  {
    id: 1,
    title: 'Sanskrit Grammar Volume 1',
    language: 'Sanskrit',
    uploadDate: '2024-03-15',
    status: 'Validation Pending',
    pages: 245,
    contributors: ['John Doe', 'Jane Smith'],
    mainDocument: 'Sanskrit Grammar Complete Collection',
    journey: [
      { stage: 'upload', date: '2024-03-15', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-18', by: 'John Doe', status: 'completed' },
      { stage: 'validation', status: 'to-be-assigned' },
      { stage: 'expert', status: 'not-started' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 3,
    title: 'Hindi Poetry Collection',
    language: 'Hindi',
    uploadDate: '2024-03-13',
    status: 'Expert Review Pending',
    pages: 156,
    contributors: ['Bob Wilson', 'Carol Brown'],
    mainDocument: 'Classical Hindi Literature Series',
    journey: [
      { stage: 'upload', date: '2024-03-13', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-16', by: 'Bob Wilson', status: 'completed' },
      { stage: 'validation', date: '2024-03-19', by: 'Carol Brown', status: 'completed' },
      { stage: 'expert', status: 'to-be-assigned' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 4,
    title: 'Classical Tamil Literature',
    language: 'Tamil',
    uploadDate: '2024-03-12',
    status: 'Contribution Pending',
    pages: 312,
    contributors: ['David Clark'],
    journey: [
      { stage: 'upload', date: '2024-03-12', by: 'Admin', status: 'completed' },
      { stage: 'contribution', status: 'to-be-assigned' },
      { stage: 'validation', status: 'not-started' },
      { stage: 'expert', status: 'not-started' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 5,
    title: 'Bengali Poetry Anthology',
    language: 'Bengali',
    uploadDate: '2024-03-11',
    status: 'Golden Document Pending',
    pages: 278,
    contributors: ['Eva Martinez', 'Frank White'],
    journey: [
      { stage: 'upload', date: '2024-03-11', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-14', by: 'Eva Martinez', status: 'completed' },
      { stage: 'validation', date: '2024-03-17', by: 'Frank White', status: 'completed' },
      { stage: 'expert', date: '2024-03-20', by: 'Dr. Smith', status: 'completed' },
      { stage: 'golden', status: 'to-be-assigned' }
    ]
  },
  {
    id: 6,
    title: 'Marathi Historical Texts',
    language: 'Marathi',
    uploadDate: '2024-03-10',
    status: 'Validation Pending',
    pages: 423,
    contributors: ['George Brown', 'Helen White'],
    journey: [
      { stage: 'upload', date: '2024-03-10', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-13', by: 'George Brown', status: 'completed' },
      { stage: 'validation', status: 'to-be-assigned' },
      { stage: 'expert', status: 'not-started' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 7,
    title: 'Gujarati Folk Tales',
    language: 'Gujarati',
    uploadDate: '2024-03-09',
    status: 'Expert Review Pending',
    pages: 167,
    contributors: ['Ian Clark', 'Julia Davis'],
    journey: [
      { stage: 'upload', date: '2024-03-09', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-12', by: 'Ian Clark', status: 'completed' },
      { stage: 'validation', date: '2024-03-15', by: 'Julia Davis', status: 'completed' },
      { stage: 'expert', status: 'to-be-assigned' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 8,
    title: 'Kannada Epic Poetry',
    language: 'Kannada',
    uploadDate: '2024-03-08',
    status: 'Contribution Pending',
    pages: 289,
    contributors: ['Kevin Lee'],
    journey: [
      { stage: 'upload', date: '2024-03-08', by: 'Admin', status: 'completed' },
      { stage: 'contribution', status: 'to-be-assigned' },
      { stage: 'validation', status: 'not-started' },
      { stage: 'expert', status: 'not-started' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 9,
    title: 'Malayalam Literature Compilation',
    language: 'Malayalam',
    uploadDate: '2024-03-07',
    status: 'Validation Pending',
    pages: 345,
    contributors: ['Laura Wilson', 'Mark Thompson'],
    journey: [
      { stage: 'upload', date: '2024-03-07', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-10', by: 'Laura Wilson', status: 'completed' },
      { stage: 'validation', status: 'to-be-assigned' },
      { stage: 'expert', status: 'not-started' },
      { stage: 'golden', status: 'not-started' }
    ]
  },
  {
    id: 10,
    title: 'Odia Classical Texts',
    language: 'Odia',
    uploadDate: '2024-03-06',
    status: 'Expert Review Pending',
    pages: 198,
    contributors: ['Nina Patel', 'Oscar Garcia'],
    journey: [
      { stage: 'upload', date: '2024-03-06', by: 'Admin', status: 'completed' },
      { stage: 'contribution', date: '2024-03-09', by: 'Nina Patel', status: 'completed' },
      { stage: 'validation', date: '2024-03-12', by: 'Oscar Garcia', status: 'completed' },
      { stage: 'expert', status: 'to-be-assigned' },
      { stage: 'golden', status: 'not-started' }
    ]
  }
,
  // ... other documents with similar journey data
];

const PendingDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDocuments = pendingDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);

  const toggleDocumentSelection = (id: number) => {
    setSelectedDocuments(prev =>
      prev.includes(id)
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  const isAllSelected = selectedDocuments.length === filteredDocuments.length;

  const toggleAllDocuments = () => {
    if (isAllSelected) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  const DocumentJourneyDrawer = ({ document, onClose }: { document: Document; onClose: () => void }) => {
    const getStageIcon = (stage: DocumentJourney['stage']) => {
      switch (stage) {
        case 'upload': return FileText;
        case 'contribution': return Clock;
        case 'validation': return CheckCircle;
        case 'expert': return Award;
        case 'golden': return Award;
      }
    };

    const getStageStatus = (status: DocumentJourney['status']) => {
      switch (status) {
        case 'completed': return 'bg-green-500';
        case 'pending': return 'bg-yellow-500';
        case 'to-be-assigned': return 'bg-blue-500 animate-pulse';
        case 'not-started': return 'bg-gray-300';
      }
    };

    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Document Journey</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900">{document.title}</h3>
            <p className="text-sm text-gray-500">ID: {document.id}</p>
            {document.mainDocument && (
              <p className="text-sm text-gray-500 mt-1">Part of: {document.mainDocument}</p>
            )}
          </div>

          <div className="space-y-6">
            {document.journey.map((stage, index) => {
              const Icon = getStageIcon(stage.stage);
              const statusColor = getStageStatus(stage.status);
              
              return (
                <div key={stage.stage} className="relative">
                  {index !== document.journey.length - 1 && (
                    <div className={`absolute left-6 top-10 w-0.5 h-20 ${
                      stage.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`relative w-12 h-12 rounded-full ${statusColor} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                      {stage.status === 'to-be-assigned' && (
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {stage.stage === 'expert' ? 'Subject Matter Expert Review' : stage.stage}
                      </h4>
                      {stage.date && stage.by && (
                        <p className="text-sm text-gray-500">
                          {stage.date} by {stage.by}
                        </p>
                      )}
                      {stage.status === 'to-be-assigned' && (
                        <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md">
                          Assign Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Documents Pending for Assignment</h1>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md">
          Assign Selected
        </button>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents by title or language..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Documents table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleAllDocuments}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Document</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Language</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Upload Date</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Pages</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Contributors</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleDocumentSelection(doc.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.title}</p>
                        <p className="text-sm text-gray-500">ID: {doc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {doc.language}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{doc.uploadDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{doc.pages}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {doc.contributors.map((contributor, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm border-2 border-white"
                          >
                            {contributor.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {doc.contributors.length} contributor{doc.contributors.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      doc.status.includes('Pending') ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => setSelectedDocument(doc)}
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Journey
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} documents
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Overlay and Drawer */}
      {selectedDocument && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSelectedDocument(null)}
          />
          <DocumentJourneyDrawer
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        </>
      )}
    </div>
  );
};

export default PendingDocuments;