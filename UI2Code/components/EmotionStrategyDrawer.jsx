import React from 'react';

function EmotionStrategyDrawer({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">情绪策略配置</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
        <div className="mb-[24px]">
          <label className="block text-[16px] text-[#333] font-bold mb-[12px]">情绪定义</label>
          <div className="flex items-center space-x-[24px]">
            <label className="flex items-center cursor-pointer">
              <span className="w-[16px] h-[16px] rounded-full border-[5px] border-[#1473e6] mr-[8px]"></span>
              <span className="text-[14px] text-[#333]">系统内置，开箱即用</span>
            </label>
            <label className="flex items-center cursor-not-allowed opacity-50">
              <span className="w-[16px] h-[16px] rounded-full border border-[#d9d9d9] mr-[8px]"></span>
              <span className="text-[14px] text-[#999]">自定义情绪标签 <i className="far fa-question-circle"></i></span>
            </label>
          </div>
        </div>

        <div className="mb-[32px]">
          <label className="block text-[16px] text-[#333] font-bold mb-[12px]">已支持情绪</label>
          <div className="flex flex-wrap gap-[12px]">
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f]">平静</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#fffbe6] text-[#faad14] border border-[#ffe58f]">开心</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#f9f0ff] text-[#722ed1] border border-[#d3adf7]">恐惧</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#e6f7ff] text-[#1890ff] border border-[#91d5ff]">悲伤</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#fff1f0] text-[#fa8c16] border border-[#ffd591]">厌恶</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#e6fffb] text-[#13c2c2] border border-[#87e8de]">愤怒</span>
            <span className="px-[12px] py-[4px] rounded-[4px] text-[14px] bg-[#fff0f6] text-[#f5222d] border border-[#ffccc7]">震惊</span>
          </div>
        </div>

        <div>
          <label className="block text-[16px] text-[#333] font-bold mb-[12px]">
            情绪下发 <span className="text-[#e1251b]">*</span>
          </label>
          <div className="space-y-[16px]">
            <div>
              <label className="flex items-center cursor-pointer">
                <div className="w-[16px] h-[16px] border border-[#d9d9d9] rounded-[2px] flex items-center justify-center mr-[8px]"></div>
                <span className="text-[14px] text-[#333] font-medium">表情</span>
              </label>
              <p className="pl-[24px] mt-[4px] text-[12px] text-[#999]">将识别到的情绪下发至设备，驱动设备表情的变化</p>
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <div className="w-[16px] h-[16px] bg-[#1473e6] rounded-[2px] flex items-center justify-center mr-[8px]">
                  <i className="fas fa-check text-white text-[10px]"></i>
                </div>
                <span className="text-[14px] text-[#333] font-medium">语音语调</span>
              </label>
              <p className="pl-[24px] mt-[4px] text-[12px] text-[#999]">将识别到的情绪同步至TTS合成，使语音音调随情绪自然变化</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmotionStrategyDrawer;