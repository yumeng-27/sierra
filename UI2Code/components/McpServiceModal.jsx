import React, { useState } from 'react';

const ALL_MCP_SERVICES = [
  { id: 'mcp-1', name: '测试123', desc: 'test123.mcp.jd.com' },
  { id: 'mcp-2', name: '优优同学', desc: 'yoyo.mcp.jd.com' },
  { id: 'mcp-3', name: '切换智能体配置', desc: 'switch-agent.mcp.jd.com' },
  { id: 'mcp-4', name: '10009_deviceControlUat', desc: 'device-control.mcp.jd.com' },
  { id: 'mcp-5', name: '测试MCP', desc: 'test.mcp.jd.com' }
];

function McpServiceModal({ initialSelected = [], onClose, onConfirm }) {
  const [selectedIds, setSelectedIds] = useState(initialSelected);

  const toggleService = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    const selectedList = ALL_MCP_SERVICES.filter(s => selectedIds.includes(s.id));
    onConfirm(selectedList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
      <div className="w-[480px] bg-white rounded-[8px] shadow-lg flex flex-col">
        <div className="px-[24px] py-[16px] border-b border-[#e5e5e5] flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-[#333]">配置MCP服务</h2>
          <i className="fas fa-times text-[#999] cursor-pointer hover:text-[#333]" onClick={onClose} data-ai-alt="关闭弹窗"></i>
        </div>

        <div className="p-[24px] flex-1 overflow-y-auto max-h-[400px]">
          <div className="mb-[16px] text-[14px] text-[#333]">选择MCP接入点</div>
          <div className="border border-[#1473e6] rounded-[4px] p-[8px] min-h-[40px] flex flex-wrap gap-[8px] mb-[4px]">
            {selectedIds.length === 0 && <span className="text-[#ccc] text-[14px] leading-[22px]">请选择MCP接入点</span>}
            {ALL_MCP_SERVICES.filter(s => selectedIds.includes(s.id)).map(svc => (
              <div key={svc.id} className="flex items-center px-[8px] py-[2px] bg-[#f5f5f5] rounded-[2px] text-[12px] text-[#333]">
                {svc.name}
                <i className="fas fa-times ml-[6px] text-[#999] cursor-pointer hover:text-[#e1251b]" onClick={() => toggleService(svc.id)} data-ai-alt="移除所选项"></i>
              </div>
            ))}
          </div>
          <div className="border border-[#e5e5e5] rounded-[4px] bg-white shadow-sm mt-[8px]">
            {ALL_MCP_SERVICES.map(svc => {
              const isSelected = selectedIds.includes(svc.id);
              return (
                <div
                  key={svc.id}
                  className={`flex items-center justify-between px-[16px] py-[10px] cursor-pointer transition-colors ${isSelected ? 'bg-[#eef5fd] text-[#1473e6]' : 'hover:bg-[#f5f5f5] text-[#333]'}`}
                  onClick={() => toggleService(svc.id)}
                  data-ai-alt="选择MCP服务选项"
                >
                  <span className="text-[14px]">{svc.name}</span>
                  {isSelected && <i className="fas fa-check text-[#1473e6]"></i>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-[24px] py-[16px] bg-[#fcfcfc] border-t border-[#e5e5e5] flex justify-end rounded-b-[8px]">
          <button className="px-[16px] py-[6px] border border-[#d9d9d9] bg-white text-[#333] rounded-[4px] text-[14px] hover:bg-[#f5f5f5] mr-[12px]" onClick={onClose} data-ai-alt="取消按钮">取消</button>
          <button className="px-[16px] py-[6px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" onClick={handleConfirm} data-ai-alt="确认按钮">确认</button>
        </div>
      </div>
    </div>
  );
}

export default McpServiceModal;
