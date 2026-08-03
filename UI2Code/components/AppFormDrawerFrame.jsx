import React from 'react';

function AppFormDrawerFrame({ children, onMaskClick, widthClass = 'w-[600px]' }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/45 transition-opacity"
        onClick={onMaskClick}
        data-ai-alt="抽屉遮罩层"
      ></div>
      <div 
        className={`relative ${widthClass} bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300`}
        data-ai-alt="抽屉内容容器"
      >
        {children}
      </div>
    </div>
  );
}

export default AppFormDrawerFrame;