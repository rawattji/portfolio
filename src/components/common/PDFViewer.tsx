'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, ExternalLink, AlertCircle, RotateCw } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [renderingPage, setRenderingPage] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Check if PDF.js is available
        if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
          const pdfjsLib = (window as any).pdfjsLib;
          const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
          
          if (mounted) {
            setPdfDocument(pdf);
            setTotalPages(pdf.numPages);
            setIsLoading(false);
          }
        } else {
          // PDF.js not available, fallback to iframe/object
          if (mounted) {
            setHasError(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Set timeout for loading
    timeoutId = setTimeout(() => {
      if (mounted && isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 8000);

    loadPdf();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfDocument && !renderingPage) {
      renderPage(currentPage);
    }
  }, [pdfDocument, currentPage, scale]);

  const renderPage = async (pageNumber: number) => {
    if (!pdfDocument || !canvasRef.current || renderingPage) return;

    setRenderingPage(true);
    
    try {
      const page = await pdfDocument.getPage(pageNumber);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        setRenderingPage(false);
        return;
      }

      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      setRenderingPage(false);
    } catch (error) {
      console.error('Error rendering page:', error);
      setRenderingPage(false);
      setHasError(true);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-500 mb-4 mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Loading Resume...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we load your PDF</p>
        </div>
      </div>
    );
  }

  if (hasError || !pdfDocument) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="w-24 h-24 text-red-500/60 mb-6 mx-auto" />
          <p className="text-xl font-medium text-gray-700 mb-4">PDF Viewer Not Available</p>
          <p className="text-gray-500 mb-6">Your browser doesn't support our PDF viewer. Please use the options below:</p>
          
          <div className="space-y-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-full justify-center"
            >
              <ExternalLink className="w-5 h-5" />
              Open in New Tab
            </a>
            
            <a
              href={pdfUrl}
              download="Aman_Singh_Rawat_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors w-full justify-center"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>

            {/* Simple iframe fallback */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                Try Simple Viewer
              </summary>
              <div className="mt-4 h-96 border rounded-lg overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="Resume PDF Fallback"
                  sandbox="allow-same-origin"
                />
              </div>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col bg-gray-100`}>
      {/* PDF Viewer Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded hover:bg-gray-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="text-sm px-2">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-2 rounded hover:bg-gray-700"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-600 mx-2" />
          
          <a
            href={pdfUrl}
            download="Aman_Singh_Rawat_Resume.pdf"
            className="p-2 rounded hover:bg-gray-700"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 shadow-lg bg-white"
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
          />
          
          {renderingPage && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
