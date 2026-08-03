import React, { useState } from 'react';
import CreateInstructionDrawer from './CreateInstructionDrawer';

function InstructionSetDrawer({ onClose, activeSetName, onRenameSet, instructions = [] }) {
  const [showCreateInstruction, setShowCreateInstruction] = useState(false);
  const [silentMap, setSilentMap] = useState(() => {
    const map = {};
    instructions.forEach((item) => { map[item.id] = !!item.silent; });
    return map;
  });
  const [activeSubTab, setActiveSubTab] = useState('list');
  const [globalFeedback, setGlobalFeedback] = useState('reply');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState(activeSetName || '');

  React.useEffect(() => {
    setEditingName(activeSetName || '');
  }, [activeSetName]);

  const commitRename = () => {
    const finalName = (editingName || '').trim() || activeSetName || '未命名指令集';
    if (finalName !== activeSetName && typeof onRenameSet === 'function') {
      onRenameSet(finalName);
    }
    setEditingName(finalName);
    setIsEditingName(false);
  };

  React.useEffect(() => {
    const map = {};
    instructions.forEach((item) => { map[item.id] = !!item.silent; });
    setSilentMap(map);
  }, [instructions]);

  const toggleSilent = (id) => {
    setSilentMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const SilentSwitch = ({ checked, onChange }) => (
    <div
      className={`w-[32px] h-[18px] rounded-full flex items-center p-[2px] cursor-pointer transition-colors ${checked ? 'bg-[#165DFF]' : 'bg-[#d9d9d9]'}`}
      onClick={onChange}
      data-ai-alt="静默执行开关"
    >
      <div className={`w-[14px] h-[14px] bg-white rounded-full shadow-sm transform transition-transform ${checked ? 'translate-x-[14px]' : 'translate-x-0'}`}></div>
    </div>
  );

  const FeedbackToggle = ({ value, onChange }) => (
    <div className="flex items-center h-[28px] border border-[#d9d9d9] rounded-[4px] overflow-hidden" data-ai-alt="执行反馈开关">
      <div
        className={`h-full px-[12px] flex items-center text-[12px] cursor-pointer ${value === 'reply' ? 'bg-[#165DFF] text-white' : 'bg-white text-[#666]'}`}
        onClick={() => onChange('reply')}
        data-ai-alt="回复默认"
      >回复默认</div>
      <div
        className={`h-full px-[12px] flex items-center text-[12px] cursor-pointer ${value === 'silent' ? 'bg-[#165DFF] text-white' : 'bg-white text-[#666]'}`}
        onClick={() => onChange('silent')}
        data-ai-alt="静默执行"
      >静默执行</div>
    </div>
  );

  return (
    <div className="relative flex flex-col h-full bg-white" data-ai-alt="指令集编辑抽屉">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]" data-ai-alt="抽屉标题栏" data-ai-changelog-id="feature-instruction-set-title-editable" data-ai-changelog-title="指令集名称可编辑标题" data-ai-changelog-desc="指令集编辑抽屉左上角标题展示当前选中的指令集名称，点击可直接编辑，回车或失焦保存，同步更新外部指令集Tab栏">
        <div className="flex items-center" data-ai-alt="抽屉标题内容">
          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => { if (e.key === 'Enter') { commitRename(); } }}
              className="text-[18px] font-medium text-[#333] px-[8px] h-[32px] border border-[#165DFF] rounded-[4px] focus:outline-none min-w-[180px]"
              data-ai-alt="指令集名称输入框"
            />
          ) : (
            <h2
              className="text-[18px] font-medium text-[#333] flex items-center cursor-pointer hover:text-[#165DFF] group"
              onClick={() => setIsEditingName(true)}
              data-ai-alt="当前指令集名称"
            >
              {activeSetName || '指令集管理'}
              <i className="fas fa-pen ml-[8px] text-[12px] w-[12px] h-[12px] flex items-center justify-center text-[#999] group-hover:text-[#165DFF]"></i>
            </h2>
          )}
        </div>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px] w-[20px] h-[20px] flex items-center justify-center"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px]" data-ai-alt="抽屉内容区">
        <div className="flex items-center justify-between mb-[12px]" data-ai-alt="反馈与操作栏">
          <div className="flex items-center" data-ai-alt="执行反馈区">
            <span className="text-[13px] text-[#333] mr-[8px]">是否需要执行反馈</span>
            <FeedbackToggle value={globalFeedback} onChange={setGlobalFeedback} />
          </div>
          <div className="flex items-center" data-ai-alt="搜索与新建指令区">
            <div className="relative mr-[12px]">
              <input
                type="text"
                placeholder="搜索指令控制项、指令编码"
                className="w-[240px] h-[32px] pl-[12px] pr-[32px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#165DFF]"
                data-ai-alt="搜索指令输入框"
              />
              <i className="fas fa-search absolute right-[10px] top-[50%] -translate-y-[50%] text-[#999] text-[13px] w-[13px] h-[13px] flex items-center justify-center"></i>
            </div>
            <button onClick={() => setShowCreateInstruction(true)} className="h-[32px] px-[14px] bg-[#165DFF] text-white text-[13px] rounded-[4px] hover:bg-[#0e4dd1] flex items-center" data-ai-alt="新建指令按钮">
              <i className="fas fa-plus text-[12px] w-[12px] h-[12px] flex items-center justify-center mr-[4px]"></i>
              新建指令
            </button>
          </div>
        </div>
        <div className="flex items-center border-b border-[#e5e5e5] mb-[16px]" data-ai-alt="指令集Sub标签栏" data-ai-list="true">
          {[{ key: 'list', label: '指令列表' }, { key: 'timing', label: '定时指令' }, { key: 'batch', label: '批量测试' }].map((tab) => (
            <div
              key={tab.key}
              className={`h-[36px] px-[14px] mr-[4px] flex items-center text-[13px] cursor-pointer border-b-[2px] transition-colors ${activeSubTab === tab.key ? 'text-[#165DFF] font-medium border-[#165DFF]' : 'text-[#666] border-transparent hover:text-[#165DFF]'}`}
              onClick={() => setActiveSubTab(tab.key)}
              data-ai-alt="指令集Sub标签"
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="w-full" data-ai-alt="指令表格" data-ai-changelog-id="feature-instruction-set-empty" data-ai-changelog-title="新建指令集空指令列表" data-ai-changelog-desc="新建指令集确认后进入的指令集其指令列表为空，展示空态占位；指令列表数据按当前指令集独立渲染">
          <div className="flex items-center h-[48px] bg-[#fafafa] text-[13px] text-[#666] font-medium" data-ai-alt="表头">
            <div className="flex-1 px-[16px]">指令名称</div>
            <div className="flex-1 px-[16px]">指令编码</div>
            <div className="flex-1 px-[16px]">数据类型</div>
            <div className="flex-1 px-[16px]">指令类型</div>
            <div className="flex-1 px-[16px]">操作行为</div>
            <div className="w-[110px] px-[16px]">静默执行</div>
            <div className="flex-1 px-[16px]">创建时间</div>
            <div className="w-[120px] px-[16px]">操作</div>
          </div>
          {instructions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-[60px] text-[#999]" data-ai-alt="指令列表空态">
              <i className="fas fa-inbox text-[36px] w-[36px] h-[36px] flex items-center justify-center mb-[12px] text-[#d9d9d9]"></i>
              <div className="text-[13px] mb-[4px]">暂无指令</div>
              <div className="text-[12px] text-[#bbb]">点击右上角「新建指令」添加第一条指令</div>
            </div>
          ) : (
            <div className="flex flex-col" data-ai-alt="指令数据行列表" data-ai-list="true">
              {instructions.map((row) => (
                <div key={row.id} className="flex items-center h-[56px] border-b border-[#f0f0f0] text-[13px] text-[#333]" data-ai-alt="指令数据行">
                  <div className="flex-1 px-[16px]">{row.name}</div>
                  <div className="flex-1 px-[16px]">{row.code}</div>
                  <div className="flex-1 px-[16px]">{row.dataType}</div>
                  <div className="flex-1 px-[16px]">{row.type}</div>
                  <div className="flex-1 px-[16px]">
                    <div className="flex items-center" data-ai-alt="操作行为标签组">
                      {(row.actions || []).map((act, idx) => (
                        <span key={idx} className={`inline-flex items-center h-[24px] px-[10px] border border-[#a8d0f5] text-[#165DFF] text-[12px] rounded-[3px] bg-[#eef5fd] ${idx < (row.actions.length - 1) ? 'mr-[6px]' : ''}`}>{act}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-[110px] px-[16px]">
                    <SilentSwitch checked={!!silentMap[row.id]} onChange={() => toggleSilent(row.id)} />
                  </div>
                  <div className="flex-1 px-[16px] text-[#666]">{row.createdAt}</div>
                  <div className="w-[120px] px-[16px] flex items-center">
                    <span className="text-[#165DFF] text-[13px] mr-[16px] cursor-pointer" data-ai-alt="编辑指令">编辑</span>
                    <span className="text-[#e34d59] text-[13px] cursor-pointer" data-ai-alt="删除指令">删除</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showCreateInstruction && <CreateInstructionDrawer onClose={() => setShowCreateInstruction(false)} />}
    </div>
  );
}

export default InstructionSetDrawer;
