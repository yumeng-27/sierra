import React from 'react';

function HotWordModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45">
      <div 
        className="bg-white w-[800px] rounded-[8px] shadow-xl flex flex-col max-h-[85vh]"
        data-ai-alt="语音热词编辑弹窗"
      >
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
          <h2 className="text-[18px] font-medium text-[#333]">语音热词编辑</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭弹窗">
            <i className="fas fa-times text-[20px]"></i>
          </button>
        </div>
        
        <div className="p-[24px] overflow-y-auto flex-1">
          <div className="mb-[24px]">
            <label className="block text-[16px] font-medium text-[#333] mb-[12px]">音频格式</label>
            <div className="relative">
              <select 
                className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] appearance-none bg-white focus:outline-none focus:border-[#1473e6]"
                data-ai-alt="音频格式选择"
              >
                <option value="pcm">pcm</option>
              </select>
              <i className="fas fa-chevron-down absolute right-[12px] top-[12px] text-[12px] text-[#ccc] pointer-events-none"></i>
            </div>
          </div>

          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex space-x-[12px]">
              <button className="px-[16px] h-[32px] border border-[#d9d9d9] rounded-[4px] text-[14px] text-[#333] hover:bg-[#f5f5f5] flex items-center" data-ai-alt="模板下载">
                <i className="fas fa-download mr-[8px] text-[#666]"></i> 模板下载
              </button>
              <button className="px-[16px] h-[32px] border border-[#d9d9d9] rounded-[4px] text-[14px] text-[#333] hover:bg-[#f5f5f5] flex items-center" data-ai-alt="批量导入">
                <i className="fas fa-sign-in-alt mr-[8px] text-[#666]"></i> 批量导入
              </button>
            </div>
            <div className="flex space-x-[12px]">
              <div className="relative w-[240px]">
                <input 
                  type="text" 
                  placeholder="搜索"
                  className="w-full h-[32px] pl-[32px] pr-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                  data-ai-alt="搜索热词"
                />
                <i className="fas fa-search absolute left-[12px] top-[9px] text-[#999]"></i>
              </div>
              <button className="px-[16px] h-[32px] border border-[#d9d9d9] rounded-[4px] text-[14px] text-[#333] hover:bg-[#f5f5f5] flex items-center" data-ai-alt="文件导出">
                <i className="fas fa-external-link-alt mr-[8px] text-[#666]"></i> 文件导出
              </button>
            </div>
          </div>

          <div className="border border-[#e5e5e5] rounded-[8px] overflow-hidden">
            <div className="flex items-center px-[16px] py-[12px] bg-[#fafafa] border-b border-[#e5e5e5]">
              <div className="flex-1 text-[14px] font-medium text-[#333]">
                热词/目标词 <i className="far fa-question-circle text-[#999] ml-[4px]"></i>
              </div>
              <div className="flex-1 text-[14px] font-medium text-[#333]">
                误识别词 <i className="far fa-question-circle text-[#999] ml-[4px]"></i>
              </div>
              <div className="w-[100px] text-right">
                <button className="text-[#1473e6] text-[14px] hover:underline" data-ai-alt="新增热词">
                  <i className="fas fa-plus mr-[4px]"></i>新增
                </button>
              </div>
            </div>
            
            <div className="p-[16px]">
              <div className="flex items-center space-x-[16px]">
                <div className="flex-1">
                  <input 
                    type="text" 
                    defaultValue="JoyInside"
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                    data-ai-alt="热词输入"
                  />
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="请输入误识别词"
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                    data-ai-alt="误识别词输入"
                  />
                </div>
                <div className="w-[80px] text-right">
                  <button className="text-[#e1251b] text-[14px] hover:underline flex items-center justify-end w-full" data-ai-alt="删除热词">
                    <i className="far fa-trash-alt mr-[4px]"></i>删除
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-[16px] text-[14px] text-[#666]">
            <span className="mr-[16px]">共 1 条</span>
            <div className="flex space-x-[8px]">
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="上一页"><i className="fas fa-chevron-left text-[12px]"></i></button>
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#1473e6] text-[#1473e6] rounded-[4px] bg-white" data-ai-alt="第1页">1</button>
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="下一页"><i className="fas fa-chevron-right text-[12px]"></i></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HotWordModal;
