import React, { useState } from 'react';

function AppCard({ data, onEdit, onConfig, onDeviceManage, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div 
      className="bg-white rounded-[8px] p-[20px] shadow-sm border border-[#e5e5e5] relative hover:shadow-md transition-shadow cursor-pointer"
      data-module="appCard" 
      onClick={() => onConfig(data)}
      data-action="go-appConfig"
      data-ai-alt="应用卡片"
    >
      <div className="flex justify-between items-start mb-[40px]">
        <div className="flex items-center">
          <h3 className="text-[16px] font-medium text-[#333]">{data.name}</h3>
          {data.productVersion && (
            <span className={`ml-[8px] text-[12px] px-[6px] py-[2px] rounded-[4px] ${data.productVersion === 'lite' ? 'bg-[#e6f7ff] text-[#1890ff] border border-[#91d5ff]' : 'bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f]'}`}>
              {data.productVersion === 'lite' ? 'Lite版' : '标准版'}
            </span>
          )}
        </div>
        <button 
          className="text-[#999] hover:text-[#333] px-[4px]" 
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          data-ai-alt="卡片操作菜单"
        >
          <i className="fas fa-ellipsis-h"></i>
        </button>
        {showMenu && (
          <div className="absolute right-[20px] top-[40px] bg-white border border-[#e5e5e5] rounded-[4px] shadow-lg w-[120px] py-[8px] z-10">
            <div 
              className="px-[16px] py-[8px] text-[14px] hover:bg-[#f5f5f5] cursor-pointer" 
              onClick={(e) => { e.stopPropagation(); setShowMenu(false); onEdit(data); }}
            >
              编辑产品
            </div>
            <div 
              className="px-[16px] py-[8px] text-[14px] hover:bg-[#f5f5f5] cursor-pointer" 
              onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDeviceManage && onDeviceManage(data); }}
            >
              设备管理
            </div>
            <div 
              className="px-[16px] py-[8px] text-[14px] text-[#e1251b] hover:bg-[#f5f5f5] cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete && onDelete(data); }}
            >
              删除产品
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-[12px] text-[#666] mb-[12px]" data-ai-alt="APPID与平台信息">
        <span>APPID {data.id}</span>
        {data.productVersion === 'standard' && (
          <span data-ai-alt="IoT平台名称">IoT平台：{data.iotPlatform || '小家'}</span>
        )}
      </div>
      <div className="flex justify-between items-center text-[12px] text-[#999]">
        <span>{data.date}</span>
        <span className="flex items-center">
          <i className="far fa-user mr-[4px]"></i> {data.author}
        </span>
      </div>
    </div>
  );
}

export default AppCard;