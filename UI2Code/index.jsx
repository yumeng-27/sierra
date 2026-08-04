import React, { useState, useEffect } from 'react';
import IndexPage from './pages/IndexPage';
import AppFormDrawerPage from './pages/AppFormDrawerPage';
import AppConfigPage from './pages/AppConfigPage';
import DeviceManagePage from './pages/DeviceManagePage';
import McpServicePage from './pages/McpServicePage';
import InstructionLibraryPage from './pages/InstructionLibraryPage';
import ModelLibraryPage from './pages/ModelLibraryPage';

function App() {
  const [currentPage, setCurrentPage] = useState(window.__INITIAL_PAGE_KEY__ || 'index');

  useEffect(() => {
    const handlePageChange = () => {
      const pageKey = document.querySelector('[data-page-key]')?.getAttribute('data-page-key');
      if (pageKey && pageKey !== currentPage) {
        setCurrentPage(pageKey);
      }
    };
    handlePageChange();
  }, []);

  useEffect(() => {
    window.__setCurrentPage = (pageKey) => {
      if (pageKey) setCurrentPage(pageKey);
    };
    return () => { delete window.__setCurrentPage; };
  }, []);

  useEffect(() => {
    const rootEl = document.querySelector('[data-page-key]');
    if (!rootEl) return;
    const observer = new MutationObserver(() => {
      const newKey = rootEl.getAttribute('data-page-key');
      if (newKey) setCurrentPage(newKey);
    });
    observer.observe(rootEl, { attributes: true, attributeFilter: ['data-page-key'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="w-full mx-auto h-screen overflow-hidden bg-[#f4f5f7]"
      data-page-key={currentPage}
      data-ai-alt="应用整体容器"
      data-ai-changelog-id="page-level-index"
      data-ai-changelog-title="主页/应用管理页"
      data-ai-changelog-desc="承载应用管理列表及交互动线"
    >
      {currentPage === 'index' && <IndexPage />}
      {currentPage === 'appFormDrawer' && <AppFormDrawerPage />}
      {currentPage === 'appConfig' && <AppConfigPage />}
      {currentPage === 'deviceManage' && <DeviceManagePage />}
      {currentPage === 'mcpService' && <McpServicePage />}
      {currentPage === 'instructionLibrary' && <InstructionLibraryPage />}
      {currentPage === 'modelLibrary' && <ModelLibraryPage />}
    </div>
  );
}

export default App;
