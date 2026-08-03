import React from 'react';

function FeedbackStrategyDrawer({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">事件反馈配置</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
        <div className="bg-[#eef5fd] text-[#1473e6] px-[16px] py-[12px] rounded-[4px] text-[14px] flex items-start mb-[24px]">
          <i className="fas fa-info-circle mt-[2px] mr-[8px]"></i>
          <span>事件反馈指通过变量引用，让 AI 根据不同输入动态生成个性化回复</span>
        </div>
        
        <div>
          <label className="block text-[16px] text-[#333] font-bold mb-[12px]">自定义提示词</label>
          <div className="border border-[#d9d9d9] rounded-[8px] p-[16px] bg-white h-[300px] overflow-y-auto text-[14px] text-[#666] font-mono leading-relaxed" data-ai-alt="自定义提示词内容">
            <p># 智能玩具互动回复示例</p>
            <p className="mt-[16px]">## 场景说明</p>
            <p>本提示词展示如何通过变量引用，让 AI 根据不同输入动态生成个性化回复。</p>
            <p className="my-[16px]">---</p>
            <p>## 提示词模板</p>
            <p>你是一个陪伴儿童的智能玩具"小布"，请根据以下信息生成一句互动回复：</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackStrategyDrawer;