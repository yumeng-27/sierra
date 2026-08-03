import React from 'react';

function ConfirmModal({ title, content, hint, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45">
      <div className="bg-white w-[420px] rounded-[12px] shadow-xl p-[24px]">
        <div className="text-[16px] font-medium text-[#333] mb-[12px]">{title}</div>
        <div className="text-[14px] text-[#333] mb-[12px]">{content}</div>
        {hint && <div className="text-[14px] text-[#666] mb-[24px]">{hint}</div>}
        <div className="flex justify-end space-x-[12px]">
          <button 
            onClick={onCancel} 
            className="px-[20px] py-[6px] border border-[#d9d9d9] rounded-[20px] text-[14px] text-[#333] hover:bg-[#f5f5f5]"
            data-ai-alt="取消按钮"
          >
            取消
          </button>
          <button 
            onClick={onConfirm} 
            className="px-[20px] py-[6px] bg-[#1473e6] text-white rounded-[20px] text-[14px] hover:bg-[#115ebb]"
            data-ai-alt="确认按钮"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;