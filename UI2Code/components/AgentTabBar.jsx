import React from 'react';

function AgentTabBar({ agents, activeAgentId, onSwitch, onCreate, maxCount = 10 }) {
  const reachedLimit = agents.length >= maxCount;

  const sortedAgents = [...agents].sort((a, b) => {
    if (a.id === activeAgentId) return -1;
    if (b.id === activeAgentId) return 1;
    return 0;
  });

  return (
    <div className="flex items-center gap-[8px] overflow-x-auto min-h-[36px]" data-ai-alt="多智能体管理栏" data-ai-changelog-id="feature-multi-agent-bar" data-ai-changelog-title="多智能体管理" data-ai-changelog-desc="以横向紧凑Tab形式展示当前应用下的智能体，支持切换、创建、重命名、设为默认与删除">
      {sortedAgents.map((agent) => {
        const isActive = agent.id === activeAgentId;
        return (
          <div
            key={agent.id}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            onClick={() => onSwitch(agent.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSwitch(agent.id); } }}
            className={`group relative shrink-0 h-[32px] rounded-[16px] border cursor-pointer transition-all px-[12px] flex items-center outline-none focus:ring-2 focus:ring-[#91caff] ${isActive ? 'border-[#1473e6] bg-[#eef5fd] text-[#1473e6]' : 'border-[#e5e5e5] bg-white text-[#333] hover:border-[#1473e6]'}`}
            data-ai-alt="智能体卡片"
          >
            <i className={`fas fa-robot text-[12px] mr-[6px] ${isActive ? 'text-[#1473e6]' : 'text-[#999]'}`}></i>
            <div className="flex-1 min-w-0 max-w-[100px]">
              <div className="text-[13px] font-medium truncate">{agent.name}</div>
            </div>
            {agent.isDefault && (
              <span className="text-[10px] ml-[6px] px-[4px] py-[0px] rounded-[10px] bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f] shrink-0" data-ai-alt="默认标识">默认</span>
            )}
          </div>
        );
      })}
      
      <div
        role="button"
        tabIndex={reachedLimit ? -1 : 0}
        aria-disabled={reachedLimit}
        onClick={() => !reachedLimit && onCreate()}
        onKeyDown={(e) => { if (!reachedLimit && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onCreate(); } }}
        className={`shrink-0 h-[32px] px-[12px] rounded-[16px] border border-dashed flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-[#91caff] ${reachedLimit ? 'border-[#e5e5e5] text-[#ccc] cursor-not-allowed bg-[#fafafa]' : 'border-[#1473e6] text-[#1473e6] cursor-pointer hover:bg-[#eef5fd]'}`}
        data-ai-alt="新建智能体卡片"
      >
        <i className="fas fa-plus text-[12px] mr-[4px]"></i>
        <span className="text-[13px]">{reachedLimit ? '已达上限' : '新建'}</span>
      </div>
    </div>
  );
}

export default AgentTabBar;
