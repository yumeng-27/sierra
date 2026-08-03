import React from 'react';

function PushStrategyDrawer({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">静默推送配置</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
        <div className="bg-[#eef5fd] text-[#1473e6] px-[16px] py-[12px] rounded-[4px] text-[14px] flex items-start mb-[24px]">
          <i className="fas fa-info-circle mt-[2px] mr-[8px]"></i>
          <span>静默推送，修改后会直接作用于线上版本</span>
        </div>
        
        <div className="mb-[24px]">
          <label className="block text-[14px] text-[#333] font-medium mb-[12px]">
            <span className="text-[#e1251b] mr-[4px]">*</span>推送时间段配置
          </label>
          <div className="flex items-center">
            <div className="relative flex-1">
              <input type="text" value="10:00" readOnly className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px]" data-ai-alt="开始时间" />
              <i className="far fa-clock absolute right-[12px] top-[12px] text-[#999]"></i>
            </div>
            <span className="mx-[12px] text-[#999]">-</span>
            <div className="relative flex-1">
              <input type="text" value="15:00" readOnly className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px]" data-ai-alt="结束时间" />
              <i className="far fa-clock absolute right-[12px] top-[12px] text-[#999]"></i>
            </div>
            <button className="ml-[12px] text-[#333] text-[20px]" data-ai-alt="添加时间段">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="mb-[24px]">
          <label className="block text-[14px] text-[#333] font-medium mb-[12px]">
            <span className="text-[#e1251b] mr-[4px]">*</span>静默推送时间阈值（秒）
          </label>
          <div className="space-y-[12px]">
            <div className="flex items-center">
              <div className="w-[80px] h-[40px] border border-[#d9d9d9] bg-[#fafafa] flex items-center justify-center text-[14px] text-[#666] rounded-l-[4px] border-r-0">
                第 1 次推送
              </div>
              <div className="flex-1 relative">
                <input type="number" value="5" readOnly className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-r-[4px] text-[14px]" data-ai-alt="第一次阈值" />
                <div className="absolute right-[2px] top-[2px] bottom-[2px] flex flex-col justify-center px-[8px] bg-white border-l border-[#e5e5e5]">
                  <i className="fas fa-caret-up text-[10px] text-[#999] cursor-pointer"></i>
                  <i className="fas fa-caret-down text-[10px] text-[#999] cursor-pointer"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[80px] h-[40px] border border-[#d9d9d9] bg-[#fafafa] flex items-center justify-center text-[14px] text-[#666] rounded-l-[4px] border-r-0">
                第 2 次推送
              </div>
              <div className="flex-1 relative">
                <input type="number" value="10" readOnly className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-r-[4px] text-[14px]" data-ai-alt="第二次阈值" />
              </div>
              <button className="ml-[12px] text-[#333] text-[20px]" data-ai-alt="删除推送">
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[16px] text-[#333] font-bold mb-[12px]">提示词</label>
          <div className="flex items-center space-x-[24px] mb-[16px]">
            <label className="flex items-center cursor-pointer">
              <span className="w-[16px] h-[16px] rounded-full border-[5px] border-[#1473e6] mr-[8px]"></span>
              <span className="text-[14px] text-[#333]">系统内置，开箱即用</span>
            </label>
            <label className="flex items-center cursor-not-allowed opacity-50">
              <span className="w-[16px] h-[16px] rounded-full border border-[#d9d9d9] mr-[8px]"></span>
              <span className="text-[14px] text-[#999]">自定义提示词</span>
            </label>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="w-[16px] h-[16px] bg-[#1473e6] rounded-[2px] flex items-center justify-center mr-[8px]">
              <i className="fas fa-check text-white text-[10px]"></i>
            </div>
            <span className="text-[14px] text-[#333]">自动拼接全局人设</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PushStrategyDrawer;