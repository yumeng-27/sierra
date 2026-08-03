import React from 'react';
import Layout from '../components/Layout';

function ModelLibraryPage() {
  const models = [
    { id: 1, name: '0724-joyinside-1-Model', category: '通用', part: ['测试'], platform: '小家' },
    { id: 2, name: '产品4-DRAFT的型号', category: '-', part: ['-'], platform: '-' },
    { id: 3, name: '产品4的型号', category: '-', part: ['-'], platform: '-' },
    { id: 4, name: '66666', category: '-', part: ['-'], platform: '-' },
    { id: 5, name: '333', category: '烟灶', part: ['1'], platform: '-' },
    { id: 6, name: '333', category: '浴室柜', part: ['1', '2'], platform: '-' },
    { id: 7, name: '2222', category: '-', part: ['-'], platform: '-' },
    { id: 8, name: '1111', category: '-', part: ['-'], platform: '-' },
  ];

  return (
    <Layout>
      <div 
        className="flex-1 flex flex-col p-[24px] overflow-y-auto bg-[#f4f5f7]"
        data-page-key="modelLibrary"
        data-ai-alt="型号库页面"
      >
        {/* 顶部标题栏 */}
        <div className="flex justify-between items-start mb-[24px]" data-ai-alt="顶部标题栏">
          <div>
            <h1 className="text-[24px] font-bold text-[#333] mb-[8px]">型号库</h1>
            <p className="text-[14px] text-[#666]">型号库管理，管理所有产品型号。</p>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="relative w-[280px]" data-ai-alt="搜索框">
              <input 
                type="text"
                placeholder="搜索型号"
                className="w-full h-[36px] pl-[12px] pr-[36px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                data-ai-alt="搜索输入框"
              />
              <button className="absolute right-[12px] top-[10px] text-[#999] hover:text-[#1473e6]" data-ai-alt="搜索按钮">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <button 
              className="h-[36px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] flex items-center justify-center opacity-50 cursor-not-allowed"
              title="当前产品型号在产品创建时同步创建"
              data-ai-changelog-id="feature-model-library-create-disabled"
              data-ai-changelog-title="新建型号按钮置灰"
              data-ai-changelog-desc="型号由产品创建时同步创建，故此处新建按钮置灰不可点"
              data-ai-alt="新建型号按钮"
            >
              <i className="fas fa-plus mr-[6px] text-[12px]"></i>
              新建型号
            </button>
          </div>
        </div>

        {/* 列表区 */}
        <div className="bg-white rounded-[8px] p-[24px] shadow-sm flex-1 flex flex-col" data-ai-alt="列表区">
          <table className="w-full text-left border-collapse" data-ai-alt="型号列表">
            <thead>
              <tr className="border-b border-[#f0f0f0] bg-[#f9fafb]">
                <th className="py-[16px] px-[16px] font-medium text-[#333] text-[14px] w-[35%]">产品型号</th>
                <th className="py-[16px] px-[16px] font-medium text-[#333] text-[14px] w-[20%]">产品品类</th>
                <th className="py-[16px] px-[16px] font-medium text-[#333] text-[14px] w-[25%]">产品部件</th>
                <th className="py-[16px] px-[16px] font-medium text-[#333] text-[14px] w-[20%]">IOT平台</th>
              </tr>
            </thead>
            <tbody data-ai-list="true" className="flex-col">
              {models.map(item => (
                <tr key={item.id} className="border-b border-[#f0f0f0] hover:bg-[#fcfcfc] transition-colors">
                  <td className="py-[16px] px-[16px] text-[#333] text-[14px]">{item.name}</td>
                  <td className="py-[16px] px-[16px] text-[#333] text-[14px]">{item.category}</td>
                  <td className="py-[16px] px-[16px] text-[#333] text-[14px]">
                    <div className="flex items-center gap-[4px]" data-ai-list="true" data-ai-alt="部件标签">
                      {item.part.map((p, idx) => (
                        p !== '-' ? (
                          <span key={idx} className="px-[6px] py-[2px] bg-[#f5f5f5] text-[#666] text-[12px] border border-[#e5e5e5] rounded-[4px]">
                            {p}
                          </span>
                        ) : <span key={idx}>-</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-[16px] px-[16px] text-[#333] text-[14px]">{item.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* 分页区 */}
          <div className="mt-auto pt-[24px] flex items-center justify-end text-[13px] text-[#666]" data-ai-alt="分页区">
            <span className="mr-[16px]">共 8 条</span>
            <div className="flex items-center gap-[8px]">
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="上一页">
                <i className="fas fa-chevron-left text-[12px]"></i>
              </button>
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#1473e6] rounded-[4px] text-[#1473e6] font-medium bg-[#eef5fd]" data-ai-alt="当前页">
                1
              </button>
              <button className="w-[28px] h-[28px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="下一页">
                <i className="fas fa-chevron-right text-[12px]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ModelLibraryPage;
