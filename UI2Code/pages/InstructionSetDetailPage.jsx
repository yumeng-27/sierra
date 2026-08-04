import React, { useState } from 'react';

// 只读的「指令集详情」子页面：从指令库列表中点击某个历史指令集卡片后进入
function InstructionSetDetailPage({ instructionSet, onBack }) {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const title = instructionSet?.title || '指令集';

  // 每个指令集的只读指令数据（示例留存数据）
  const commandList = instructionSet?.commands || [
    { id: 1, name: '这是一个测试指令', code: '08042', prompt: '提示词', slot: '无槽位', time: '2026/5/9 14:13:06' },
  ];

  const tabs = [
    { key: 'list', label: '指令列表' },
    { key: 'timer', label: '定时指令' },
    { key: 'batch', label: '批量测试' },
  ];

  return (
    <div
      className="w-full h-full flex flex-col bg-white overflow-y-auto"
      data-page-key="instructionSetDetail"
      data-ai-alt="指令集详情页面容器"
      data-ai-changelog-id="page-level-instructionSetDetail"
      data-ai-changelog-title="指令集详情页(只读)"
      data-ai-changelog-desc="点开历史指令集卡片后进入的只读详情页，展示指令列表且不支持新增编辑"
    >
      {/* 顶部标题栏：面包屑 + 只读标签 + 搜索 + 禁用的新建按钮 */}
      <div className="flex items-center justify-between px-[24px] h-[64px] border-b border-[#f0f0f0] shrink-0">
        <div className="flex items-center">
          <span
            className="text-[16px] text-[#999] cursor-pointer hover:text-[#1473e6]"
            onClick={onBack}
            data-ai-alt="返回指令库"
          >
            指令库
          </span>
          <span className="mx-[8px] text-[#ccc]">/</span>
          <span className="text-[16px] font-medium text-[#333]">{title} 指令集详情</span>
          <span className="ml-[12px] inline-flex items-center px-[8px] py-[3px] bg-[#f5f5f5] text-[#999] text-[12px] rounded-[4px]">
            <i className="fas fa-lock text-[11px] mr-[4px]"></i>旧版·只读
          </span>
        </div>
        <div className="flex items-center gap-[12px]">
          <div className="relative w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索指令控制项、指令编码"
              className="w-full h-[32px] pl-[12px] pr-[32px] border border-[#e5e5e5] rounded-[4px] text-[14px] bg-[#fff] text-[#333] outline-none focus:border-[#1473e6]"
              data-ai-alt="详情页搜索输入框"
            />
            <i className="fas fa-search absolute right-[10px] top-[9px] text-[14px] text-[#999] pointer-events-none"></i>
          </div>
          <button
            className="h-[32px] px-[16px] bg-[#f0f0f0] text-[#bbb] text-[14px] rounded-[4px] cursor-not-allowed"
            disabled
            data-ai-alt="不可用的新建指令按钮"
          >
            新建指令
          </button>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex items-center px-[24px] border-b border-[#f0f0f0] shrink-0">
        {tabs.map(tab => (
          <div
            key={tab.key}
            className={`relative py-[14px] mr-[32px] text-[14px] cursor-pointer ${activeTab === tab.key ? 'text-[#1473e6] font-medium' : 'text-[#666] hover:text-[#1473e6]'}`}
            onClick={() => setActiveTab(tab.key)}
            data-ai-alt={`${tab.label}标签`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-[#1473e6]"></span>
            )}
          </div>
        ))}
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex flex-col px-[24px] py-[20px]">
        {/* 旧版格式警告条 */}
        <div
          className="w-full mb-[20px] px-[16px] py-[12px] bg-[#fffbe6] border border-[#ffe58f] rounded-[4px] flex items-center text-[13px] text-[#8c6d1f]"
          data-ai-alt="旧版格式提示条"
        >
          <i className="fas fa-exclamation-triangle text-[#faad14] text-[14px] mr-[8px]"></i>
          此指令集为旧版格式,不支持新增或编辑指令,但在应用中仍可正常使用。如需修改指令,请新建一个指令集并重新配置。
        </div>

        {activeTab === 'list' && (
          <div className="w-full" data-ai-alt="指令列表区">
            {/* 表头 */}
            <div className="flex items-center px-[16px] py-[14px] bg-[#fafafa] border-b border-[#f0f0f0] text-[13px] font-medium text-[#666]">
              <div className="w-[16%]">指令名称</div>
              <div className="w-[14%]">指令编码</div>
              <div className="flex-1">指令识别提示词</div>
              <div className="w-[12%]">槽值</div>
              <div className="w-[16%]">创建时间</div>
              <div className="w-[10%] text-right">操作</div>
            </div>
            {/* 表体 */}
            {commandList.map(cmd => (
              <div
                key={cmd.id}
                className="flex items-center px-[16px] py-[16px] border-b border-[#f5f5f5] text-[14px] text-[#333] hover:bg-[#fafafa]"
                data-ai-alt="指令行"
              >
                <div className="w-[16%]">{cmd.name}</div>
                <div className="w-[14%]">{cmd.code}</div>
                <div className="flex-1 text-[#666]">{cmd.prompt}</div>
                <div className="w-[12%] text-[#666]">{cmd.slot}</div>
                <div className="w-[16%] text-[#666]">{cmd.time}</div>
                <div className="w-[10%] flex items-center justify-end gap-[12px] text-[13px]">
                  <span className="text-[#ccc] cursor-not-allowed" title="旧版指令集不支持编辑">编辑</span>
                  <span className="text-[#ff7875] cursor-not-allowed opacity-60" title="旧版指令集不支持删除">删除</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timer' && (
          <div className="flex flex-col items-center justify-center py-[80px] text-[#999]" data-ai-alt="定时指令空态">
            <i className="far fa-clock text-[40px] mb-[16px] text-[#e0e0e0]"></i>
            <span className="text-[14px]">暂无定时指令</span>
          </div>
        )}

        {activeTab === 'batch' && (
          <div className="flex flex-col items-center justify-center py-[80px] text-[#999]" data-ai-alt="批量测试空态">
            <i className="fas fa-vials text-[40px] mb-[16px] text-[#e0e0e0]"></i>
            <span className="text-[14px]">旧版指令集不支持批量测试</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructionSetDetailPage;