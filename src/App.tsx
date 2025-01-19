import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./components/Dashboard";
import PendingDocuments from "./components/PendingDocuments";
import UploadDocuments from "./components/UploadDocuments";
import UploadDocuments2 from "./components/UploadDocuments2";
import UploadDocuments3 from "./components/UploadDocuments3";
import UploadDocuments4 from "./components/UploadDocuments4";
import { Login } from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex overflow-hidden">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pending-documents" element={<PendingDocuments />} />
            <Route path="/upload" element={<UploadDocuments2 />} />
            <Route path="/upload3" element={<UploadDocuments3 />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
