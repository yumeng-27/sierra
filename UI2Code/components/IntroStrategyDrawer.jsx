import React from 'react';

function IntroStrategyDrawer({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">开场白配置</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
        <div className="bg-[#eef5fd] text-[#1473e6] px-[16px] py-[12px] rounded-[4px] text-[14px] flex items-start mb-[24px]">
          <i className="fas fa-info-circle mt-[2px] mr-[8px]"></i>
          <span>开场白主要用户首次建立连接时，主动下发的问候语，修改后会直接作用于线上版本</span>
        </div>
        <div>
          <label className="block text-[14px] text-[#333] font-medium mb-[16px]">内容：</label>
          <div className="flex items-center mb-[8px]">
            <input type="text" placeholder="请输入第 1 条开场白内容" className="flex-1 h-[40px] px-[12px] border border-[#d9d9d9] rounded-l-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="开场白内容输入" />
            <div className="h-[40px] px-[12px] border-y border-r border-[#d9d9d9] rounded-r-[4px] flex items-center text-[14px] text-[#999] bg-[#f5f5f5]">
              0 / 40
            </div>
            <button className="ml-[12px] text-[#1473e6] text-[20px]" data-ai-alt="添加开场白">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <p className="text-[12px] text-[#999]">最多可添加5条欢迎语轮播</p>
        </div>
      </div>
    </div>
  );
}

export default IntroStrategyDrawer;