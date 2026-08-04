import React, { useState, useEffect } from 'react';

function Layout({ children }) {
  const getInitialMenu = () => {
    const pageKey = typeof document !== 'undefined' ? document.querySelector('[data-page-key]')?.getAttribute('data-page-key') || window.__INITIAL_PAGE_KEY__ : null;
    if (pageKey === 'mcpService') return '资源管理-MCP服务';
    if (pageKey === 'instructionLibrary') return '资源管理-指令库';
    if (pageKey === 'modelLibrary') return '资源管理-型号库';
    if (pageKey === 'deviceManage') return '设备管理';
    return '产品管理';
  };

  const [activeMenu, setActiveMenu] = useState(getInitialMenu());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isResourceOpen, setIsResourceOpen] = useState(() => {
    const pageKey = typeof document !== 'undefined' ? document.querySelector('[data-page-key]')?.getAttribute('data-page-key') || window.__INITIAL_PAGE_KEY__ : null;
    return ['mcpService', 'instructionLibrary', 'modelLibrary'].includes(pageKey);
  });

  useEffect(() => {
    const rootEl = document.querySelector('[data-page-key]');
    if (!rootEl) return;
    const observer = new MutationObserver(() => {
      const pageKey = rootEl.getAttribute('data-page-key');
      if (pageKey === 'mcpService') {
        setActiveMenu('资源管理-MCP服务');
        setIsResourceOpen(true);
      } else if (pageKey === 'instructionLibrary') {
        setActiveMenu('资源管理-指令库');
        setIsResourceOpen(true);
      } else if (pageKey === 'modelLibrary') {
        setActiveMenu('资源管理-型号库');
        setIsResourceOpen(true);
      } else if (pageKey === 'deviceManage') {
        setActiveMenu('设备管理');
      } else if (pageKey === 'index') {
        setActiveMenu('产品管理');
      }
    });
    observer.observe(rootEl, { attributes: true, attributeFilter: ['data-page-key'] });
    return () => observer.disconnect();
  }, []);

  const getMenuClass = (menuName) => {
    return `flex items-center px-[12px] py-[10px] text-[14px] cursor-pointer rounded-[4px] ${activeMenu === menuName ? 'text-[#1473e6] bg-[#eef5fd] font-medium' : 'hover:bg-[#f5f5f5]'}`;
  };

  const getResourceMenuClass = () => {
    return `flex items-center justify-between px-[12px] py-[10px] text-[14px] cursor-pointer rounded-[4px] ${activeMenu.startsWith('资源管理') ? 'text-[#1473e6] bg-[#eef5fd] font-medium' : 'hover:bg-[#f5f5f5]'}`;
  };
  return (
    <div className="flex h-screen w-full bg-[#f4f5f7] font-sans text-[#333333]">
      {/* 侧边栏 */}
      <aside className={`${isSidebarCollapsed ? 'w-[64px]' : 'w-[240px]'} bg-white border-r border-[#e5e5e5] flex flex-col shrink-0 relative transition-all duration-200`}>
        <div className={`h-[60px] flex items-center border-b border-[#e5e5e5] ${isSidebarCollapsed ? 'justify-center px-0' : 'px-[24px]'}`}>
          {isSidebarCollapsed ? (
            <span className="text-[18px] font-bold text-[#1473e6]">J</span>
          ) : (
            <>
              <span className="text-[20px] font-bold text-[#1473e6]">JoyInside</span>
              <span className="ml-[8px] bg-[#1473e6] text-white text-[12px] px-[6px] py-[2px] rounded-[4px]">内测版</span>
            </>
          )}
        </div>
        {/* 收起/展开按钮 */}
        <button
          type="button"
          className="absolute top-[74px] -right-[10px] w-[20px] h-[20px] bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center cursor-pointer text-[#999] hover:text-[#1473e6] hover:border-[#1473e6] shadow-sm z-30"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          data-ai-alt={isSidebarCollapsed ? "展开导航" : "收起导航"}
        >
          <i className={`fas ${isSidebarCollapsed ? 'fa-angle-right' : 'fa-angle-left'} text-[12px]`}></i>
        </button>
        <div className={isSidebarCollapsed ? 'p-[8px]' : 'p-[16px]'}>
          {!isSidebarCollapsed && (
            <div className="flex items-center justify-between p-[8px] bg-[#f5f5f5] rounded-[4px] cursor-pointer mb-[16px]">
              <span className="text-[14px]">苏大强</span>
              <i className="fas fa-chevron-down text-[12px] text-[#666]"></i>
            </div>
          )}
          <nav className="space-y-[4px]">
            <div className={getMenuClass('首页')} onClick={() => { setActiveMenu('首页'); window.__setCurrentPage && window.__setCurrentPage('index'); }} title="首页">
              <i className={`fas fa-home w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '首页'}
            </div>
            <div className={getMenuClass('产品管理')} onClick={() => { setActiveMenu('产品管理'); window.__setCurrentPage && window.__setCurrentPage('index'); }} title="产品管理">
              <i className={`fas fa-th-large w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '产品管理'}
            </div>
            <div className={getResourceMenuClass()} onClick={() => { if (isSidebarCollapsed) { setIsSidebarCollapsed(false); setIsResourceOpen(true); } else { setIsResourceOpen(!isResourceOpen); } }} title="资源管理">
              <div className="flex items-center">
                <i className={`fas fa-folder-open w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '资源管理'}
              </div>
              {!isSidebarCollapsed && <i className={`fas fa-chevron-${isResourceOpen ? 'up' : 'down'} text-[12px] text-[#666]`}></i>}
            </div>
            {/* 资源管理子菜单 */}
            {!isSidebarCollapsed && isResourceOpen && (
              <div className="pl-[40px] py-[4px] space-y-[8px]">
                {['知识库', '技能库', 'MCP服务', '指令库', '音色库', '型号库'].map(sub => (
                  <div 
                    key={sub} 
                    className={`text-[14px] cursor-pointer ${activeMenu === `资源管理-${sub}` ? 'text-[#1473e6] font-medium' : 'text-[#666] hover:text-[#1473e6]'}`} 
                    onClick={() => {
                      setActiveMenu(`资源管理-${sub}`);
                      if (sub === 'MCP服务') {
                        window.__setCurrentPage('mcpService');
                      } else if (sub === '指令库') {
                        window.__setCurrentPage('instructionLibrary');
                      } else if (sub === '型号库') {
                        window.__setCurrentPage('modelLibrary');
                      }
                    }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
            <div className={getMenuClass('设备管理')} onClick={() => { setActiveMenu('设备管理'); window.__setCurrentPage('deviceManage'); }} title="设备管理">
              <i className={`fas fa-microchip w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '设备管理'}
            </div>
            <div className={getMenuClass('开发者中心')} onClick={() => setActiveMenu('开发者中心')} title="开发者中心">
              <div className="flex items-center">
                <i className={`fas fa-code w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '开发者中心'}
              </div>
              {!isSidebarCollapsed && <i className="fas fa-chevron-down text-[12px] text-[#666]"></i>}
            </div>
          </nav>
        </div>
        <div className={`mt-auto border-t border-[#e5e5e5] ${isSidebarCollapsed ? 'p-[8px]' : 'p-[16px]'}`}>
          <div className="flex items-center px-[12px] py-[10px] text-[14px] cursor-pointer hover:bg-[#f5f5f5] rounded-[4px]" title="个人信息">
            <i className={`far fa-user w-[20px] text-center ${isSidebarCollapsed ? '' : 'mr-[8px]'}`}></i> {!isSidebarCollapsed && '个人信息'}
          </div>
        </div>
      </aside>
      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default Layout;