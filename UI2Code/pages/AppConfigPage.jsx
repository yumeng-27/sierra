import React, { useState } from 'react';
import Layout from '../components/Layout';
import Switch from '../components/Switch';
import IntroStrategyDrawer from '../components/IntroStrategyDrawer';
import PushStrategyDrawer from '../components/PushStrategyDrawer';
import FeedbackStrategyDrawer from '../components/FeedbackStrategyDrawer';
import EmotionStrategyDrawer from '../components/EmotionStrategyDrawer';
import InstructionSetDrawer from '../components/InstructionSetDrawer';
import AppFormDrawerFrame from '../components/AppFormDrawerFrame';
import HotWordModal from '../components/HotWordModal';
import CustomSkillModal from '../components/CustomSkillModal';
import McpServiceModal from '../components/McpServiceModal';
import AgentTabBar from '../components/AgentTabBar';

const ALL_SKILLS = [
  { id: 'news', name: '新闻', liteSupported: true, standardSupported: false },
  { id: 'music', name: '音乐', liteSupported: true, standardSupported: false },
  { id: 'knowledge', name: '知识问答', liteSupported: true, standardSupported: false },
  { id: 'weather', name: '查天气', liteSupported: true, standardSupported: true },
  { id: 'aiot', name: 'AIoT指令控制', liteSupported: false, standardSupported: true },
  { id: 'fangyan', name: '方言', liteSupported: false, standardSupported: true },
  { id: 'time', name: '查时间', liteSupported: false, standardSupported: true },
  { id: 'music_vod', name: '歌曲点播', liteSupported: false, standardSupported: true },
  { id: 'audiobook', name: '有声书点播', liteSupported: false, standardSupported: true },
  { id: 'search', name: '联网搜索', liteSupported: false, standardSupported: true },
  { id: 'qa', name: '知识问答', liteSupported: false, standardSupported: true },
  { id: 'voice', name: '音色切换', liteSupported: false, standardSupported: true },
  { id: 'chat', name: '闲聊', liteSupported: false, standardSupported: true }
];

function AppConfigPage() {
  const currentAppData = window.__currentAppData || {};
  const [appVersion, setAppVersion] = useState(window.__currentAppVersion || currentAppData.productVersion || 'lite');
  const initialSkills = (window.__currentAppVersion || currentAppData.productVersion) === 'lite' ? ['music', 'weather'] : ['music', 'fangyan', 'knowledge'];
  const [selectedSkillIds, setSelectedSkillIds] = useState(initialSkills);
  const [strategies, setStrategies] = useState({
    intro: true,
    push: false,
    feedback: false,
    emotion: false
  });
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [isHotWordModalOpen, setIsHotWordModalOpen] = useState(false);
  const [isCustomSkillModalOpen, setIsCustomSkillModalOpen] = useState(false);
  const [isMcpServiceModalOpen, setIsMcpServiceModalOpen] = useState(false);
  const [customSkills, setCustomSkills] = useState([]);
  const [isProductInfoExpanded, setIsProductInfoExpanded] = useState(true);
  const [saveToast, setSaveToast] = useState('');
  const [mcpServices, setMcpServices] = useState([
    { id: 'mcp-weather', name: '天气服务', desc: 'weather.mcp.jd.com' }
  ]);
  const [aiotCommandEnabled, setAiotCommandEnabled] = useState(false);
  const [promptType, setPromptType] = useState('auto');
  const [instructionSets, setInstructionSets] = useState([
    { id: 'set-1', name: '默认指令集', feedback: 'reply' },
    { id: 'set-2', name: '灯光控制指令集', feedback: 'silent' }
  ]);
  const [activeSetId, setActiveSetId] = useState('set-1');
  const [instructionsBySet, setInstructionsBySet] = useState({
    'set-1': [
      { id: 'ins-1', name: '开灯', code: 'light_on_01', dataType: '-', type: '非控制项指令', actions: ['设置'], silent: false, createdAt: '2026/05/25 11:07:19' },
      { id: 'ins-2', name: '调节亮度', code: 'brightness_set', dataType: '开关', type: '控制项指令', actions: ['设置', '查询'], silent: false, createdAt: '2026/05/20 14:10:50' },
      { id: 'ins-3', name: '切换模式', code: 'mode_switch', dataType: '开关', type: '控制项指令', actions: ['设置', '查询'], silent: false, createdAt: '2026/05/19 22:43:36' }
    ],
    'set-2': [
      { id: 'ins-2-1', name: '打开客厅灯', code: 'living_light_on', dataType: '开关', type: '控制项指令', actions: ['设置'], silent: false, createdAt: '2026/06/12 09:22:41' },
      { id: 'ins-2-2', name: '关闭卧室灯', code: 'bedroom_light_off', dataType: '开关', type: '控制项指令', actions: ['设置'], silent: true, createdAt: '2026/06/10 21:03:17' }
    ]
  });
  const [showCreateSet, setShowCreateSet] = useState(false);
  const [createSetVisible, setCreateSetVisible] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newSetFeedback, setNewSetFeedback] = useState('reply');
  const [instructionSetToast, setInstructionSetToast] = useState('');
  const [pendingDeleteSetId, setPendingDeleteSetId] = useState(null);

  const requestDeleteInstructionSet = (id) => {
    setPendingDeleteSetId(id);
  };

  const cancelDeleteInstructionSet = () => {
    setPendingDeleteSetId(null);
  };

  const confirmDeleteInstructionSet = () => {
    const targetId = pendingDeleteSetId;
    if (!targetId) return;
    const target = instructionSets.find((s) => s.id === targetId);
    const remaining = instructionSets.filter((s) => s.id !== targetId);
    setInstructionSets(remaining);
    if (activeSetId === targetId) {
      const next = remaining[0];
      setActiveSetId(next ? next.id : null);
      if (activeDrawer === 'instructionSet' && !next) {
        setActiveDrawer(null);
      }
    }
    setPendingDeleteSetId(null);
    showInstructionSetToast(`已删除指令集${target ? ` · ${target.name}` : ''}`);
  };

  const showInstructionSetToast = (msg) => {
    setInstructionSetToast(msg);
    window.clearTimeout(window.__instructionSetToastTimer);
    window.__instructionSetToastTimer = window.setTimeout(() => setInstructionSetToast(''), 1800);
  };

  const handleSwitchInstructionSet = (item) => {
    setActiveSetId(item.id);
    setActiveDrawer('instructionSet');
  };

  const openCreateInstructionSet = () => {
    setNewSetName('');
    setNewSetFeedback('reply');
    setShowCreateSet(true);
    setTimeout(() => setCreateSetVisible(true), 20);
  };

  const closeCreateInstructionSet = () => {
    setCreateSetVisible(false);
    setTimeout(() => setShowCreateSet(false), 220);
  };

  const handleConfirmCreateInstructionSet = () => {
    const name = newSetName.trim() || '未命名指令集';
    const newItem = { id: `set-${Date.now()}`, name, feedback: newSetFeedback };
    setInstructionSets((prev) => [...prev, newItem]);
    setInstructionsBySet((prev) => ({ ...prev, [newItem.id]: [] }));
    setActiveSetId(newItem.id);
    closeCreateInstructionSet();
    setActiveDrawer('instructionSet');
    showInstructionSetToast(`已新建指令集 · ${name}`);
  };
  const [isTaskPlannerEnabled, setIsTaskPlannerEnabled] = useState(false);
  const [fillerSentences, setFillerSentences] = useState(['明白。']);
  const [expandedSteps, setExpandedSteps] = useState({ intent: false, planner: false, tool: false });
  const [stepPrompts, setStepPrompts] = useState({
    intent: '',
    planner: '',
    tool: ''
  });
  const [agents, setAgents] = useState([
    { id: 'agent-default', name: '主智能体', isDefault: true },
    { id: 'agent-child', name: '儿童模式', isDefault: false }
  ]);
  const [activeAgentId, setActiveAgentId] = useState('agent-default');
  const [isActiveAgentRenaming, setIsActiveAgentRenaming] = useState(false);
  const [activeAgentRenameValue, setActiveAgentRenameValue] = useState('');
  const [isActiveAgentDeletePending, setIsActiveAgentDeletePending] = useState(false);
  const activeAgent = agents.find(a => a.id === activeAgentId) || agents[0];
  const defaultAgent = agents.find(a => a.isDefault) || agents[0];

  const showSaveFeedback = (message) => {
    setSaveToast(message);
    window.clearTimeout(window.__appConfigToastTimer);
    window.__appConfigToastTimer = window.setTimeout(() => setSaveToast(''), 2400);
  };

  const handleSaveDraft = () => {
    showSaveFeedback(`${activeAgent?.name || '当前智能体'}草稿已保存，发布前不会影响线上配置`);
  };

  const handleCreateAgent = () => {
    if (agents.length >= 10) {
      showSaveFeedback('最多可创建10个智能体，请删除非默认智能体后再新建');
      return;
    }
    const nextIndex = agents.length + 1;
    const newAgent = { id: `agent-${Date.now()}`, name: `智能体${nextIndex}`, isDefault: false };
    setAgents([...agents, newAgent]);
    setActiveAgentId(newAgent.id);
    showSaveFeedback(`已创建并切换到${newAgent.name}`);
  };

  const handleRenameAgent = (id, name) => {
    const oldName = agents.find(a => a.id === id)?.name;
    setAgents(agents.map(a => a.id === id ? { ...a, name } : a));
    if (oldName !== name) showSaveFeedback(`已将${oldName || '智能体'}重命名为${name}`);
  };

  const startActiveAgentRename = () => {
    setIsActiveAgentDeletePending(false);
    setActiveAgentRenameValue(activeAgent?.name || '');
    setIsActiveAgentRenaming(true);
  };

  const commitActiveAgentRename = () => {
    if (activeAgent?.id && activeAgentRenameValue.trim()) {
      handleRenameAgent(activeAgent.id, activeAgentRenameValue.trim());
    }
    setIsActiveAgentRenaming(false);
    setActiveAgentRenameValue('');
  };

  const handleDeleteAgent = (id) => {
    const target = agents.find(a => a.id === id);
    if (!target || target.isDefault || agents.length <= 1) {
      showSaveFeedback(target?.isDefault ? '默认智能体不可删除，请先设置其他智能体为默认' : '至少保留1个智能体');
      return;
    }
    const next = agents.filter(a => a.id !== id);
    setAgents(next);
    showSaveFeedback(`已删除${target.name}`);
    if (activeAgentId === id) {
      const fallback = next.find(a => a.isDefault) || next[0];
      setActiveAgentId(fallback.id);
    }
  };

  const handleSetDefaultAgent = (id) => {
    const target = agents.find(a => a.id === id);
    setAgents(agents.map(a => ({ ...a, isDefault: a.id === id })));
    if (target) showSaveFeedback(`已将${target.name}设为默认智能体`);
  };

  const toggleStepExpand = (key) => {
    setExpandedSteps({ ...expandedSteps, [key]: !expandedSteps[key] });
  };

  const updateStepPrompt = (stepKey, value) => {
    setStepPrompts({ ...stepPrompts, [stepKey]: value });
  };

  const updateFillerSentence = (index, value) => {
    const next = [...fillerSentences];
    next[index] = value;
    setFillerSentences(next);
  };

  const removeFillerSentence = (index) => {
    if (fillerSentences.length <= 1) return;
    setFillerSentences(fillerSentences.filter((_, i) => i !== index));
  };

  const addFillerSentence = () => {
    if (fillerSentences.length >= 5) return;
    setFillerSentences([...fillerSentences, '']);
  };

  const toggleSkill = (skill) => {
    if (appVersion === 'lite' && !skill.liteSupported) return;
    if (selectedSkillIds.includes(skill.id)) {
      setSelectedSkillIds(selectedSkillIds.filter(id => id !== skill.id));
    } else {
      setSelectedSkillIds([...selectedSkillIds, skill.id]);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#f4f5f7]">
        {/* 顶部合并区：面包屑 + 产品核心信息 + 操作按钮 + 详情 + 配置按钮 */}
        <div className="bg-white border-b border-[#e5e5e5] shrink-0 relative z-20 shadow-sm" data-ai-alt="产品配置顶部区域">
          <div className="px-[24px] py-[16px] flex items-center flex-wrap gap-y-[8px]" data-ai-changelog-id="feature-product-info-header" data-ai-changelog-title="产品信息展示" data-ai-changelog-desc="配置页顶部紧凑展示面包屑、产品名、APPID、版本等核心信息，并保留历史记录与发布操作按钮" style={{ height: "60px" }}>
            <span className="text-[14px] text-[#999] cursor-pointer hover:text-[#1473e6] flex items-center" onClick={() => window.__setCurrentPage('index')} data-action="go-index" data-ai-alt="返回产品管理">
              <i className="fas fa-th-large mr-[6px] text-[13px] w-[13px] h-[13px] flex items-center justify-center"></i>产品管理
            </span>
            <span className="mx-[8px] text-[#ccc] text-[14px]">/</span>
            <h1 className="text-[20px] font-bold text-[#333] mr-[12px]">{currentAppData.name || '-'}</h1>
            <span className="text-[14px] text-[#999] mr-[12px]">APPID: {currentAppData.id || '-'}</span>
            <span className="px-[8px] py-[2px] bg-[#eef5fd] text-[#1473e6] border border-[#91d5ff] rounded-[4px] text-[12px] mr-[12px]">{appVersion === 'standard' ? '标准版' : 'lite版'}</span>
            <div className="ml-auto flex items-center gap-[16px]" data-ai-alt="顶部操作">
              <button className="w-[32px] h-[32px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#666] hover:bg-[#f5f5f5]" data-ai-alt="历史记录">
                <i className="far fa-clock text-[14px] w-[14px] h-[14px] flex items-center justify-center"></i>
              </button>
              <button className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb] flex items-center" data-ai-alt="发布按钮">
                <i className="fas fa-plus mr-[4px] w-[14px] h-[14px] flex items-center justify-center"></i>发布
              </button>
            </div>
          </div>

          {isProductInfoExpanded && (
            <div className="px-[24px] pb-[16px]" data-ai-alt="产品详情与配置合并区">
              <div className="pt-[4px] pb-[12px]" data-ai-alt="产品详情展开区">
                {(() => {
                  const standardFields = [
                    { label: '产品描述', value: currentAppData.desc },
                    { label: '产品型号', value: currentAppData.productType },
                    { label: '开发板ID', value: currentAppData.devBoardId },
                    { label: '开发板类型', value: currentAppData.devBoardType },
                    { label: '序列号前缀', value: currentAppData.serialPrefix },
                    { label: '型号描述', value: currentAppData.typeDesc },
                    { label: '产品品类', value: currentAppData.productCategory },
                    { label: '产品部件', value: currentAppData.productPart },
                    { label: 'IoT平台', value: currentAppData.iotPlatform }
                  ];
                  const liteFields = [
                    { label: '产品描述', value: currentAppData.desc },
                    { label: '产品型号', value: currentAppData.productType },
                    { label: '开发板ID', value: currentAppData.devBoardId },
                    { label: '开发板类型', value: currentAppData.devBoardType },
                    { label: '序列号前缀', value: currentAppData.serialPrefix }
                  ];
                  const fields = appVersion === 'standard' ? standardFields : liteFields;
                  return (
                    <div className="flex flex-wrap -mx-[8px]" data-ai-alt="产品字段列表" data-ai-list="true">
                      {fields.map((f, idx) => (
                        <div key={idx} className="w-1/5 px-[8px] mb-[8px] flex items-center">
                          <span className="text-[12px] text-[#999] mr-[6px] shrink-0">{f.label}:</span>
                          <span className="text-[12px] text-[#333] truncate">{f.value || '-'}</span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
              <div className="flex items-center gap-[8px] flex-wrap border-t border-[#f4f4f4] pt-[12px]" data-ai-alt="配置入口行" data-ai-list="true">
                <button onClick={() => setIsHotWordModalOpen(true)} className="h-[28px] px-[12px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[12px] hover:bg-[#eef5fd] transition-colors flex items-center" data-ai-changelog-id="feature-hot-word-config" data-ai-changelog-title="热词配置入口" data-ai-changelog-desc="在产品详情展开区下方以一行按钮形式提供语音热词编辑入口" data-ai-alt="语音热词编辑">
                  语音热词编辑
                </button>
                <button className="h-[28px] px-[12px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[12px] hover:bg-[#eef5fd] transition-colors flex items-center" data-ai-changelog-id="feature-memory-strategy-config" data-ai-changelog-title="记忆策略配置入口" data-ai-changelog-desc="在产品详情展开区下方以一行按钮形式提供记忆策略配置入口" data-ai-alt="记忆策略配置">
                  记忆策略配置
                </button>
                <button className="h-[28px] px-[12px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[12px] hover:bg-[#eef5fd] transition-colors flex items-center" data-ai-changelog-id="feature-voice-print-config" data-ai-changelog-title="声纹配置入口" data-ai-changelog-desc="在产品详情展开区下方以一行按钮形式提供声纹配置入口" data-ai-alt="声纹配置">
                  声纹配置
                </button>
                {appVersion === 'standard' && (
                  <button className="h-[28px] px-[12px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[12px] hover:bg-[#eef5fd] transition-colors flex items-center" data-ai-changelog-id="feature-controlled-product-config" data-ai-changelog-title="可控产品配置入口" data-ai-changelog-desc="在产品详情展开区下方以一行按钮形式提供可控产品配置入口" data-ai-alt="可控产品配置">
                    可控产品配置
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 折叠/展开按钮 */}
          <button
            type="button"
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[64px] h-[20px] bg-white border border-[#e5e5e5] rounded-[10px] flex items-center justify-center cursor-pointer text-[#999] hover:text-[#1473e6] hover:border-[#1473e6] shadow-sm z-30"
            onClick={() => setIsProductInfoExpanded(!isProductInfoExpanded)}
            data-ai-alt={isProductInfoExpanded ? "向上收起" : "向下展开"}
          >
            <i className={`fas ${isProductInfoExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px] mr-[4px]`}></i>
            <span className="text-[10px]">{isProductInfoExpanded ? '收起' : '展开'}</span>
          </button>
        </div>

        {/* 主体内容区 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧配置区 */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 固定的顶栏：多智能体与摘要 */}
            <div className="bg-white border-b border-[#e5e5e5] px-[24px] py-[8px] shrink-0 flex flex-row items-center z-10 shadow-sm h-[60px]" data-ai-alt="固定多智能体栏">
              <div className="flex items-center text-[14px] font-medium text-[#333] shrink-0 mr-[16px]">
                智能体
              </div>
              <div className="flex-1 min-w-0 flex items-center h-full">
                <AgentTabBar
                  agents={agents}
                  activeAgentId={activeAgentId}
                  onSwitch={(id) => { setActiveAgentId(id); const target = agents.find(a => a.id === id); if (target) showSaveFeedback(`正在编辑${target.name}`); }}
                  onCreate={handleCreateAgent}
                  onRename={handleRenameAgent}
                  onDelete={handleDeleteAgent}
                  onSetDefault={handleSetDefaultAgent}
                  maxCount={10}
                />
              </div>
            </div>
            {/* 可滚动区域 */}
            <div className="flex-1 overflow-y-auto p-[24px]">
              {saveToast && (
                <div className="mb-[16px] flex items-center px-[12px] py-[10px] bg-[#f6ffed] border border-[#b7eb8f] rounded-[6px] text-[13px] text-[#389e0d]" role="status" data-ai-alt="操作反馈提示">
                <i className="fas fa-check-circle mr-[8px] text-[14px]"></i>{saveToast}
              </div>
            )}
            <div className="bg-white rounded-[8px] p-[24px] shadow-sm relative">
              {/* 右上角保存草稿按钮 */}
              <div className="absolute top-[24px] right-[24px]">
                <button onClick={handleSaveDraft} className="h-[32px] px-[16px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[14px] hover:bg-[#eef5fd]" data-ai-alt="保存草稿按钮">保存草稿</button>
              </div>

            <div className="mb-[32px]" data-ai-changelog-id="feature-config-persona" data-ai-changelog-title="全局人设配置" data-ai-changelog-desc="展示并支持编辑全局人设和音色信息">
              <div className="flex items-center text-[13px] mb-[12px] pr-[120px]" data-ai-alt="当前编辑行" data-knowledge-citationId="kg://2027723788674772994/2074339768847876098/2074339768919179265/1#1783396114941773_0781377a6ace5867_20260707114838_0">
                <span className="text-[#999] mr-[6px]">当前编辑:</span>
                {isActiveAgentRenaming ? (
                  <input type="text" autoFocus value={activeAgentRenameValue} onChange={(e) => setActiveAgentRenameValue(e.target.value)} onBlur={commitActiveAgentRename} onKeyDown={(e) => { if (e.key === 'Enter') commitActiveAgentRename(); if (e.key === 'Escape') { setIsActiveAgentRenaming(false); setActiveAgentRenameValue(''); } }} className="w-[140px] h-[24px] px-[6px] border border-[#1473e6] rounded-[4px] text-[13px] text-[#333] outline-none" data-ai-alt="名称输入" />
                ) : (
                  <span className="text-[#1473e6] font-medium truncate max-w-[120px]">{activeAgent?.name || '-'}</span>
                )}
                <div className="ml-[12px] flex items-center gap-[8px]" data-ai-alt="智能体操作" data-ai-list="true" data-knowledge-citationId="kg://2027723788674772994/2074339768847876098/2074339768919179265/1#1783396114941773_0781377a6ace5867_20260707114838_0">
                  {isActiveAgentDeletePending ? (
                    <>
                      <button type="button" onClick={() => { handleDeleteAgent(activeAgent?.id); setIsActiveAgentDeletePending(false); }} className="h-[22px] px-[8px] rounded-[4px] text-[12px] text-[#e1251b] hover:bg-[#fff1f0]" data-ai-alt="确认删除" data-knowledge-citationId="kg://2027723788674772994/2074337558785212418/2074337558839738369/1#1783395588018532_e0525210398f922b_20260707113953_0">删除</button>
                      <button type="button" onClick={() => setIsActiveAgentDeletePending(false)} className="h-[22px] px-[8px] rounded-[4px] text-[12px] text-[#999] hover:text-[#1473e6]" data-ai-alt="取消删除">取消</button>
                    </>
                  ) : (
                    <>
                      {activeAgent && !activeAgent.isDefault && (
                        <button type="button" onClick={() => handleSetDefaultAgent(activeAgent.id)} className="h-[22px] px-[8px] rounded-[4px] text-[12px] text-[#999] hover:bg-[#eef5fd] hover:text-[#1473e6] whitespace-nowrap" data-ai-alt="设为默认">设默认</button>
                      )}
                      <button type="button" onClick={startActiveAgentRename} className="w-[22px] h-[22px] flex items-center justify-center text-[#999] hover:text-[#1473e6] hover:bg-[#eef5fd] rounded-[4px]" aria-label="重命名" data-ai-alt="重命名"><i className="fas fa-pen text-[10px] w-[10px] h-[10px] flex items-center justify-center" data-ai-alt="编辑图标"></i></button>
                      {agents.length > 1 && activeAgent && !activeAgent.isDefault && (
                        <button type="button" onClick={() => { setIsActiveAgentRenaming(false); setIsActiveAgentDeletePending(true); }} className="w-[22px] h-[22px] flex items-center justify-center text-[#999] hover:text-[#e1251b] hover:bg-[#fff1f0] rounded-[4px]" aria-label="删除" data-ai-alt="删除"><i className="fas fa-trash-alt text-[10px] w-[10px] h-[10px] flex items-center justify-center" data-ai-alt="删除图标"></i></button>
                      )}
                    </>
                  )}
                </div>
                <span className="text-[#999] ml-[12px] text-[12px]">Agent ID: {activeAgent?.id || '-'}</span>
              </div>
              <div className="flex items-center mb-[16px]">
                <h2 className="text-[16px] font-medium text-[#333] mr-[12px]">全局人设</h2>
                <span className="text-[14px] text-[#666]">音色: <span className="inline-block px-[8px] py-[2px] bg-[#eef5fd] text-[#1473e6] rounded-[4px] text-[12px]">小犀</span></span>
              </div>
              <div className="border border-[#e5e5e5] rounded-[4px] p-[16px] bg-[#fcfcfc] text-[14px] text-[#666] font-mono leading-relaxed">
                <p className="text-[#1473e6] font-medium"># 角色设定</p>
                <p className="text-[#1473e6] mt-[8px]">## 1. 基本信息</p>
                <ul className="list-none pl-[8px]">
                  <li>- 姓名: <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入角色姓名或昵称</span></li>
                  <li>- 背景设定: <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入种族或背景设定</span></li>
                  <li>- 身份: <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入身份设定信息</span></li>
                  <li>- MBTI: <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入MBTI设定信息</span></li>
                </ul>
                <p className="text-[#1473e6] mt-[8px]">## 2. 性格气质</p>
                <ul className="list-none pl-[8px]">
                  <li>- <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入性格设定信息，可换行新增</span></li>
                </ul>
                <p className="text-[#1473e6] mt-[8px]">## 3. 语言表达风格</p>
                <ul className="list-none pl-[8px]">
                  <li>- <span className="bg-[#eef5fd] text-[#999] px-[4px] rounded">输入语言表达风格，可换行新增</span></li>
                </ul>
              </div>
            </div>

            <div className="mb-[32px] pt-[24px] border-t border-[#f0f0f0]" data-ai-changelog-id="feature-config-skills" data-ai-changelog-title="技能配置" data-ai-changelog-desc="管理应用关联的技能列表，通过一个添加入口统一选择系统技能与自定义技能">
              <div className="flex items-center mb-[16px] relative">
                <h2 className="text-[16px] font-medium text-[#333] mr-[16px]">技能</h2>
                <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline mr-[16px]" data-ai-alt="添加技能" onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}>
                  <i className="fas fa-plus mr-[4px] w-[14px] h-[14px] inline-flex items-center justify-center"></i>添加技能
                </span>

                {/* 技能选择下拉菜单 */}
                {isSkillDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSkillDropdownOpen(false)}></div>
                    <div className="absolute top-[28px] left-[52px] w-[240px] bg-white border border-[#e5e5e5] rounded-[8px] shadow-lg z-20 py-[8px] max-h-[400px] overflow-y-auto" data-ai-alt="技能菜单" data-ai-list="true">
                      <div className="px-[16px] py-[8px] flex items-center text-[14px] text-[#333] font-medium" data-ai-alt="系统分组">
                        <i className="fas fa-caret-down w-[16px] h-[16px] flex items-center justify-center mr-[4px] text-[#999]"></i> 系统技能
                      </div>
                      {ALL_SKILLS.filter(skill => appVersion === 'lite' ? skill.liteSupported : skill.standardSupported).map(skill => {
                        const isSelected = selectedSkillIds.includes(skill.id);
                        return (
                          <div
                            key={skill.id}
                            className={`px-[36px] py-[10px] text-[14px] cursor-pointer transition-colors hover:bg-[#f5f5f5] ${isSelected ? 'bg-[#eef5fd] text-[#1473e6]' : 'text-[#333]'}`}
                            onClick={() => toggleSkill(skill)}
                            data-ai-alt="技能选项"
                          >
                            {skill.name}
                          </div>
                        );
                      })}
                      {appVersion === 'standard' && (
                        <div className="mt-[6px] pt-[6px] border-t border-[#f0f0f0]" data-ai-alt="自定义分组" data-ai-changelog-id="feature-custom-skill-modal" data-ai-changelog-title="添加自定义技能弹窗" data-ai-changelog-desc="在合并后的添加技能菜单中点击添加自定义技能后弹出多选弹窗，可选择查天气、讲个笑话、设置闹钟、查询股票等自定义技能">
                          <div className="px-[16px] py-[10px] text-[14px] text-[#1473e6] cursor-pointer transition-colors hover:bg-[#f5f5f5] flex items-center" onClick={() => {
                            setIsSkillDropdownOpen(false);
                            setIsCustomSkillModalOpen(true);
                          }} data-ai-alt="自定义技能">
                            <i className="fas fa-plus mr-[6px] w-[14px] h-[14px] flex items-center justify-center text-[12px]"></i>添加自定义技能
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-[12px]" data-ai-alt="已选技能列表" data-ai-list="true">
                {selectedSkillIds.map(id => {
                  const skill = ALL_SKILLS.find(s => s.id === id);
                  if (!skill) return null;
                  return (
                    <div key={id} className="flex items-center px-[12px] py-[6px] border border-[#e5e5e5] rounded-[4px] bg-white">
                      <span className="text-[14px] text-[#333] mr-[8px]">{skill.name}</span>
                      <span className="bg-[#eef5fd] text-[#1473e6] text-[12px] px-[4px] py-[2px] rounded-[2px] mr-[8px]">官方</span>
                      {(appVersion !== 'lite' || skill.name === '知识问答') && (
                        <i className="fas fa-pen text-[#999] text-[12px] cursor-pointer hover:text-[#1473e6]" data-ai-alt="编辑技能"></i>
                      )}
                    </div>
                  );
                })}
                {customSkills.map(cs => (
                  <div key={cs.id} className="flex items-center px-[12px] py-[6px] border border-[#e5e5e5] rounded-[4px] bg-white">
                    <span className="text-[14px] text-[#333] mr-[8px]">{cs.name}</span>
                    <span className="bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f] text-[12px] px-[4px] py-[2px] rounded-[2px] mr-[8px]">自定义</span>
                    <i className="fas fa-times text-[#999] text-[12px] cursor-pointer hover:text-[#e1251b]" onClick={() => setCustomSkills(customSkills.filter(item => item.id !== cs.id))} data-ai-alt="移除自定义技能"></i>
                  </div>
                ))}
                {selectedSkillIds.length === 0 && customSkills.length === 0 && (
                  <span className="text-[14px] text-[#999] py-[4px]">暂无技能，请添加</span>
                )}
              </div>
              {appVersion === 'lite' && selectedSkillIds.includes('knowledge') && (
                <div className="mt-[16px] p-[16px] bg-[#fafafa] border border-[#e5e5e5] rounded-[6px]" data-ai-alt="知识问答配置区" data-ai-changelog-id="feature-qa-config" data-ai-changelog-title="知识问答配置(lite)" data-ai-changelog-desc="lite 版本选中知识问答技能后，下方展开配置区域，支持多选知识库、设置返回结果数量与匹配阈值；标准版不展示">
                  <div className="flex items-center mb-[12px]">
                    <i className="fas fa-book text-[#1473e6] text-[12px] w-[12px] h-[12px] flex items-center justify-center mr-[6px]"></i>
                    <span className="text-[14px] text-[#333] font-medium">知识问答配置</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-[12px]">
                      <span className="text-[13px] text-[#666] w-[110px] shrink-0">知识库列表</span>
                      <div className="flex-1 relative">
                        <div className="w-full min-h-[32px] px-[10px] py-[4px] border border-[#d9d9d9] rounded-[4px] bg-white flex flex-wrap items-center gap-[6px] cursor-pointer hover:border-[#1473e6]" data-ai-alt="知识库多选下拉">
                          <span className="inline-flex items-center px-[6px] py-[2px] bg-[#eef5fd] text-[#1473e6] text-[12px] rounded-[2px]">
                            JoyInside 知识库
                            <i className="fas fa-times ml-[4px] text-[10px] w-[10px] h-[10px] flex items-center justify-center"></i>
                          </span>
                          <span className="inline-flex items-center px-[6px] py-[2px] bg-[#eef5fd] text-[#1473e6] text-[12px] rounded-[2px]">
                            蒸烤箱知识库
                            <i className="fas fa-times ml-[4px] text-[10px] w-[10px] h-[10px] flex items-center justify-center"></i>
                          </span>
                          <i className="fas fa-chevron-down ml-auto text-[#999] text-[10px] w-[10px] h-[10px] flex items-center justify-center"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-[12px]">
                      <span className="text-[13px] text-[#666] w-[110px] shrink-0">返回结果数量</span>
                      <input type="number" defaultValue={5} min={1} max={20} className="w-[120px] h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] text-[#333] focus:border-[#1473e6] focus:outline-none" data-ai-alt="返回结果数量输入框" />
                      <span className="text-[12px] text-[#999] ml-[8px]">条（1-20）</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[13px] text-[#666] w-[110px] shrink-0">匹配阈值</span>
                      <input type="number" defaultValue={0.75} step={0.01} min={0} max={1} className="w-[120px] h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] text-[#333] focus:border-[#1473e6] focus:outline-none" data-ai-alt="匹配阈值输入框" />
                      <span className="text-[12px] text-[#999] ml-[8px]">相似度 0.00 - 1.00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {appVersion === 'lite' && (
              <div className="mb-[32px] pt-[24px] border-t border-[#f0f0f0]" data-ai-changelog-id="feature-config-mcp" data-ai-changelog-title="MCP服务配置" data-ai-changelog-desc="lite版本在技能与交互策略之间新增MCP服务配置区块，支持添加与管理MCP服务">
                <div className="flex items-center mb-[16px]">
                  <h2 className="text-[16px] font-medium text-[#333] mr-[16px]">MCP服务</h2>
                  <span
                    className="text-[#1473e6] text-[14px] cursor-pointer hover:underline"
                    onClick={() => setIsMcpServiceModalOpen(true)}
                    data-action="open-mcpModal"
                    data-ai-alt="添加MCP服务"
                  >
                    <i className="fas fa-plus mr-[4px]"></i>添加MCP服务
                  </span>
                </div>
                <div className="flex flex-wrap gap-[12px]" data-ai-alt="已配置MCP服务列表" data-ai-list="true">
                  {mcpServices.length === 0 && (
                    <span className="text-[14px] text-[#999] py-[4px]">暂无 MCP 服务，请添加</span>
                  )}
                  {mcpServices.map(svc => (
                    <div key={svc.id} className="flex items-center px-[12px] py-[6px] border border-[#e5e5e5] rounded-[4px] bg-white">
                      <i className="fas fa-plug text-[#1473e6] text-[12px] w-[12px] h-[12px] flex items-center justify-center mr-[8px]"></i>
                      <span className="text-[14px] text-[#333] mr-[8px]">{svc.name}</span>
                      <span className="text-[12px] text-[#999] mr-[8px]">{svc.desc}</span>
                      <i className="fas fa-times text-[#999] text-[12px] cursor-pointer hover:text-[#e1251b]" onClick={() => setMcpServices(mcpServices.filter(item => item.id !== svc.id))} data-ai-alt="移除MCP服务"></i>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {appVersion === 'standard' && (
              <div className="mb-[32px] pt-[24px] border-t border-[#f0f0f0]" data-ai-changelog-id="feature-config-commands" data-ai-changelog-title="指令配置" data-ai-changelog-desc="管理应用关联的指令列表">
                <div className="flex items-center mb-[16px]">
                  <h2 className="text-[16px] font-medium text-[#333] mr-[16px]">指令</h2>
                  <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline" data-ai-alt="添加指令"><i className="fas fa-plus mr-[4px]"></i>添加指令</span>
                </div>
                <div className="flex flex-wrap gap-[12px]">
                  <div className="flex items-center px-[12px] py-[6px] border border-[#e5e5e5] rounded-[4px] bg-white">
                    <span className="text-[14px] text-[#333] mr-[8px]">制氧机-案例</span>
                    <span className="bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f] text-[12px] px-[4px] py-[2px] rounded-[2px]">自定义</span>
                  </div>
                </div>
              </div>
            )}

            {appVersion === 'standard' && (
              <div
                className="mb-[32px] pt-[24px] border-t border-[#f0f0f0]"
                data-ai-changelog-id="feature-config-aiot-command"
                data-ai-changelog-title="AIOT指令控制模块"
                data-ai-changelog-desc="标准版指令模块下方展开AIOT指令控制配置区，包含总开关、提示词单选、指令集标签、编写教程入口以及意图准入判断/任务规划器/工具执行三步流程"
                data-ai-alt="AIOT指令控制配置区"
              >
                {/* 开启AIoT指令 */}
                <div className="flex items-center mb-[20px]" data-ai-alt="开启AIoT指令行">
                  <span className="text-[16px] font-medium text-[#333] mr-[12px]">开启AIoT指令</span>
                  <Switch checked={aiotCommandEnabled} onChange={val => setAiotCommandEnabled(val)} />
                </div>

                {aiotCommandEnabled && (
                <>
                {/* 提示词 */}
                <div className="mb-[20px]" data-ai-alt="提示词配置区">
                  <div className="text-[14px] font-medium text-[#333] mb-[12px]">提示词</div>
                  <div className="flex items-center" data-ai-alt="提示词选项">
                    <label className={`flex items-center mr-[32px] ${activeAgent.isDefault ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`} onClick={() => activeAgent.isDefault && setPromptType('auto')}>
                      <span className={`w-[16px] h-[16px] flex items-center justify-center rounded-full border-[2px] mr-[8px] ${promptType === 'auto' ? 'border-[#1473e6]' : 'border-[#d9d9d9]'}`}>
                        {promptType === 'auto' && <span className="w-[8px] h-[8px] rounded-full bg-[#1473e6]"></span>}
                      </span>
                      <span className={`text-[14px] ${promptType === 'auto' ? 'text-[#333]' : 'text-[#666]'}`} data-path-hash="2cd927">配置指令集实现设备控制</span>
                    </label>
                    <label className={`flex items-center ${activeAgent.isDefault ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`} onClick={() => activeAgent.isDefault && setPromptType('custom')}>
                      <span className={`w-[16px] h-[16px] flex items-center justify-center rounded-full border-[2px] mr-[8px] ${promptType === 'custom' ? 'border-[#1473e6]' : 'border-[#d9d9d9]'}`}>
                        {promptType === 'custom' && <span className="w-[8px] h-[8px] rounded-full bg-[#1473e6]"></span>}
                      </span>
                      <span className={`text-[14px] ${promptType === 'custom' ? 'text-[#333]' : 'text-[#666]'}`} data-path-hash="2dd929">提示词描述实现设备控制</span>
                    </label>
                  </div>
                </div>

                {/* 指令集Tab栏 */}
                {promptType === 'auto' && (
                  <div
                    className="mb-[20px]"
                    data-ai-alt="指令集Tab配置区"
                    data-ai-changelog-id="feature-instruction-set-edit"
                    data-ai-changelog-title="指令集按钮式切换"
                    data-ai-changelog-desc="AIoT指令控制模块将指令集展示为按钮形式，点击任一指令集按钮直接打开右侧3/4编辑抽屉；新建指令集按钮弱化尺寸，点击后弹出1/4窄抽屉填写名称与执行反馈，确认后自动打开编辑抽屉。原独立的编辑入口已移除。"
                  >
                    <div className="flex items-center flex-wrap" data-ai-alt="指令集按钮栏" data-ai-list="true">
                      {instructionSets.map((item) => (
                        <div key={item.id} className="relative group mr-[8px] mb-[4px] inline-flex items-center" data-ai-alt="指令集按钮容器">
                          <button
                            type="button"
                            className={`h-[32px] pl-[14px] pr-[14px] rounded-[6px] text-[13px] flex items-center transition-colors ${activeSetId === item.id ? 'bg-[#165DFF] text-white border border-[#165DFF]' : 'bg-white text-[#333] border border-[#e5e5e5] hover:border-[#165DFF] hover:text-[#165DFF]'}`}
                            onClick={() => activeAgent.isDefault && handleSwitchInstructionSet(item)}
                            data-ai-alt="指令集按钮"
                          >
                            {item.name}
                          </button>
                          {activeAgent.isDefault && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); requestDeleteInstructionSet(item.id); }}
                              className="hidden group-hover:flex absolute -top-[6px] -right-[6px] w-[18px] h-[18px] items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#ff4d4f] shadow-sm hover:bg-[#fff1f0] hover:border-[#ff4d4f]"
                              data-ai-alt="删除指令集按钮"
                            >
                              <i className="fas fa-times text-[10px] w-[10px] h-[10px] flex items-center justify-center"></i>
                            </button>
                          )}
                        </div>
                      ))}
                      {activeAgent.isDefault && (
                        <button
                          type="button"
                          className="h-[24px] px-[8px] mb-[4px] text-[12px] text-[#165DFF] border border-dashed border-[#165DFF] rounded-[4px] hover:bg-[#eef4ff] flex items-center"
                          onClick={openCreateInstructionSet}
                          data-ai-alt="新建指令集按钮"
                        >
                          <i className="fas fa-plus text-[10px] w-[10px] h-[10px] flex items-center justify-center mr-[3px]"></i>
                          新建指令集
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 三步流程 */}
                <div className="relative" data-ai-alt="AIoT指令流程区">
                  <div className="flex items-center justify-between mb-[10px]">
                    <div className="flex items-center text-[14px] text-[#333]">
                      <span className="mr-[8px]">任务规划器</span>
                      <div className={activeAgent.isDefault ? '' : 'opacity-60 pointer-events-none'}>
                        <Switch checked={isTaskPlannerEnabled} onChange={() => activeAgent.isDefault && setIsTaskPlannerEnabled(!isTaskPlannerEnabled)} />
                      </div>
                    </div>
                    <button className="h-[28px] px-[10px] border border-[#e5e5e5] rounded-[6px] bg-white text-[13px] text-[#666] flex items-center hover:border-[#1473e6] hover:text-[#1473e6]" data-ai-alt="编写教程按钮">
                      <i className="fas fa-book mr-[6px] text-[12px] w-[12px] h-[12px] flex items-center justify-center"></i>编写教程
                    </button>
                  </div>
                  <div className="flex flex-col gap-[12px]" data-ai-list="true" data-ai-alt="AIoT指令三步流程列表">
                    {isTaskPlannerEnabled && (
                      <div className="relative px-[16px] py-[14px] rounded-[8px] bg-[#f4f8ff] border border-[#e3ecfb] overflow-hidden" data-ai-alt="垫句配置区" data-ai-changelog-id="feature-filler-sentence" data-ai-changelog-title="垫句配置" data-ai-changelog-desc="任务规划器开启时展示垫句输入列表，默认1条，可添加删除，最多5条">
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1473e6]"></div>
                        <div className="flex items-center justify-between mb-[12px]">
                          <div className="flex items-center">
                            <span className="text-[14px] font-medium text-[#333] mr-[8px]">垫句</span>
                            <span className="text-[12px] text-[#999]" data-path-hash="1f3d54">任务规划器的过渡话术，最多 5 条</span>
                          </div>
                          <span className="text-[12px] text-[#999]">{fillerSentences.length}/5</span>
                        </div>
                        <div className="flex flex-col gap-[8px]" data-ai-list="true" data-ai-alt="垫句列表">
                          {fillerSentences.map((item, index) => (
                            <div key={index} className="flex items-center gap-[10px]" data-ai-alt="垫句项">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => updateFillerSentence(index, e.target.value)}
                                className={`flex-1 h-[36px] px-[12px] border border-[#e5e5e5] rounded-[6px] text-[14px] text-[#333] outline-none focus:border-[#1473e6] ${activeAgent.isDefault ? 'bg-white' : 'bg-[#f5f5f5] cursor-not-allowed text-[#999]'}`}
                                placeholder="请输入垫句"
                                disabled={!activeAgent.isDefault}
                                data-ai-alt="垫句输入框"
                              />
                              {activeAgent.isDefault && (
                                <i
                                  className={`fas fa-trash-alt text-[14px] w-[16px] h-[16px] flex items-center justify-center ${fillerSentences.length <= 1 ? 'text-[#ccc] cursor-not-allowed' : 'text-[#999] cursor-pointer hover:text-[#1473e6]'}`}
                                  onClick={() => removeFillerSentence(index)}
                                  data-ai-alt="删除垫句"
                                ></i>
                              )}
                            </div>
                          ))}
                        </div>
                        {activeAgent.isDefault && fillerSentences.length < 5 && (
                          <button
                            onClick={addFillerSentence}
                            className="mt-[10px] h-[32px] px-[12px] border border-dashed border-[#d9d9d9] rounded-[6px] bg-white text-[13px] text-[#666] flex items-center hover:border-[#1473e6] hover:text-[#1473e6]"
                            data-ai-alt="添加垫句按钮"
                          >
                            <i className="fas fa-plus mr-[6px] text-[12px] w-[12px] h-[12px] flex items-center justify-center"></i>添加
                          </button>
                        )}
                      </div>
                    )}
                    <div className="rounded-[8px] bg-[#f7f8fa] border border-[#eef0f3] overflow-hidden" data-ai-alt="意图准入判断步骤" data-ai-changelog-id="feature-step-prompt-config" data-ai-changelog-title="步骤提示词配置" data-ai-changelog-desc="AIoT三个流程步骤支持展开配置各自的提示词">
                      <div className="flex items-center justify-between px-[16px] py-[14px] cursor-pointer" onClick={() => toggleStepExpand('intent')} data-ai-alt="意图准入判断标题栏">
                        <div className="flex items-center">
                          <span className="w-[22px] h-[22px] flex items-center justify-center rounded-[4px] bg-white text-[13px] text-[#999] mr-[12px]">1</span>
                          <span className="text-[14px] font-medium text-[#333] mr-[12px]">意图准入判断</span>
                          <span className="text-[13px] text-[#999]">判断用户请求是否属于设备控制意图。</span>
                        </div>
                        <i className={`fas ${expandedSteps.intent ? 'fa-chevron-up' : 'fa-chevron-down'} text-[12px] text-[#999] w-[12px] h-[12px] flex items-center justify-center`}></i>
                      </div>
                      {expandedSteps.intent && (
                        <div className="px-[16px] pb-[14px] pt-[4px] border-t border-[#eef0f3] bg-white" data-ai-alt="意图准入判断提示词配置">
                          <div className="flex flex-col gap-[6px] mt-[12px]">
                            
                            <textarea value={stepPrompts.intent} disabled={!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto')} onChange={(e) => updateStepPrompt('intent', e.target.value)} className={`w-full min-h-[120px] px-[12px] py-[8px] border border-[#e5e5e5] rounded-[6px] text-[13px] text-[#333] outline-none focus:border-[#1473e6] resize-y ${!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto') ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : 'bg-white'}`} placeholder={instructionSets.length === 0 && promptType === 'auto' ? '当前模式下提示词由指令集生成，请新建指令集或者选择通过提示词描述实现设备控制。' : '请输入提示词'} data-ai-alt="意图准入提示词输入框"></textarea>
                          </div>
                        </div>
                      )}
                    </div>
                    {isTaskPlannerEnabled && (
                      <div className="rounded-[8px] bg-[#f7f8fa] border border-[#eef0f3] overflow-hidden" data-ai-alt="任务规划器步骤">
                        <div className="flex items-center justify-between px-[16px] py-[14px] cursor-pointer" onClick={() => toggleStepExpand('planner')} data-ai-alt="任务规划器标题栏">
                          <div className="flex items-center">
                            <span className="w-[22px] h-[22px] flex items-center justify-center rounded-[4px] bg-white text-[13px] text-[#999] mr-[12px]">2</span>
                            <span className="text-[14px] font-medium text-[#333] mr-[12px]">任务规划器</span>
                            <span className="text-[13px] text-[#999]">完成设备能力匹配、参数校验、澄清与闲聊分流，并生成任务规划。简单控制（仅单步控制，无需多轮澄清）可关闭任务规划器，可提高响应速度。</span>
                          </div>
                          <i className={`fas ${expandedSteps.planner ? 'fa-chevron-up' : 'fa-chevron-down'} text-[12px] text-[#999] w-[12px] h-[12px] flex items-center justify-center ml-[12px]`}></i>
                        </div>
                        {expandedSteps.planner && (
                          <div className="px-[16px] pb-[14px] pt-[4px] border-t border-[#eef0f3] bg-white" data-ai-alt="任务规划器提示词配置">
                            <div className="flex flex-col gap-[6px] mt-[12px]">
                              
                              <textarea value={stepPrompts.planner} disabled={!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto')} onChange={(e) => updateStepPrompt('planner', e.target.value)} className={`w-full min-h-[120px] px-[12px] py-[8px] border border-[#e5e5e5] rounded-[6px] text-[13px] text-[#333] outline-none focus:border-[#1473e6] resize-y ${!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto') ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : 'bg-white'}`} placeholder={instructionSets.length === 0 && promptType === 'auto' ? '当前模式下提示词由指令集生成，请新建指令集或者选择通过提示词描述实现设备控制。' : '请输入提示词'} data-ai-alt="任务规划器提示词输入框"></textarea>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="rounded-[8px] bg-[#f7f8fa] border border-[#eef0f3] overflow-hidden" data-ai-alt="工具执行步骤">
                      <div className="flex items-center justify-between px-[16px] py-[14px] cursor-pointer" onClick={() => toggleStepExpand('tool')} data-ai-alt="工具执行标题栏">
                        <div className="flex items-center">
                          <span className="w-[22px] h-[22px] flex items-center justify-center rounded-[4px] bg-white text-[13px] text-[#999] mr-[12px]">{isTaskPlannerEnabled ? '3' : '2'}</span>
                          <span className="text-[14px] font-medium text-[#333] mr-[12px]">工具执行</span>
                          <span className="text-[13px] text-[#999]">将任务转换为可执行的标准工具调用。</span>
                        </div>
                        <i className={`fas ${expandedSteps.tool ? 'fa-chevron-up' : 'fa-chevron-down'} text-[12px] text-[#999] w-[12px] h-[12px] flex items-center justify-center ml-[12px]`}></i>
                      </div>
                      {expandedSteps.tool && (
                        <div className="px-[16px] pb-[14px] pt-[4px] border-t border-[#eef0f3] bg-white" data-ai-alt="工具执行提示词配置">
                          <div className="flex flex-col gap-[6px] mt-[12px]">
                            
                            <textarea value={stepPrompts.tool} disabled={!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto')} onChange={(e) => updateStepPrompt('tool', e.target.value)} className={`w-full min-h-[120px] px-[12px] py-[8px] border border-[#e5e5e5] rounded-[6px] text-[13px] text-[#333] outline-none focus:border-[#1473e6] resize-y ${!activeAgent.isDefault || (instructionSets.length === 0 && promptType === 'auto') ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : 'bg-white'}`} placeholder={instructionSets.length === 0 && promptType === 'auto' ? '当前模式下提示词由指令集生成，请新建指令集或者选择通过提示词描述实现设备控制。' : '请输入提示词'} data-ai-alt="工具执行提示词输入框"></textarea>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            )}

            <div className="pt-[24px] border-t border-[#f0f0f0]" data-ai-changelog-id="feature-config-interaction" data-ai-changelog-title="交互策略配置" data-ai-changelog-desc="管理开场白、静默推送、事件反馈及情绪策略等交互策略的详细配置">
              <h2 className="text-[16px] font-medium text-[#333] mb-[8px]">交互策略配置</h2>
              <p className="text-[12px] text-[#999] mb-[24px]">此处可配置详情相关的策略内容。</p>
              <div className="space-y-[24px]">
                {appVersion === 'standard' && (
                  <div className="flex items-center">
                    <span className="text-[14px] text-[#333] font-medium w-[80px]">开场白</span>
                    <Switch checked={strategies.intro} onChange={(val) => { setStrategies({...strategies, intro: val}); if (val) setActiveDrawer('intro'); }} />
                    {strategies.intro && (
                      <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline ml-[16px]" onClick={() => setActiveDrawer('intro')} data-ai-alt="编辑开场白">
                        <i className="fas fa-pen mr-[4px]"></i>编辑
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-[14px] text-[#333] font-medium w-[80px]">静默推送</span>
                  <Switch checked={strategies.push} onChange={(val) => { setStrategies({...strategies, push: val}); if (val) setActiveDrawer('push'); }} />
                  {strategies.push && (
                    <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline ml-[16px]" onClick={() => setActiveDrawer('push')} data-ai-alt="编辑静默推送">
                      <i className="fas fa-pen mr-[4px]"></i>编辑
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] text-[#333] font-medium w-[80px]">事件反馈</span>
                  <Switch checked={strategies.feedback} onChange={(val) => { setStrategies({...strategies, feedback: val}); if (val) setActiveDrawer('feedback'); }} />
                  {strategies.feedback && (
                    <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline ml-[16px]" onClick={() => setActiveDrawer('feedback')} data-ai-alt="编辑事件反馈">
                      <i className="fas fa-pen mr-[4px]"></i>编辑
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] text-[#333] font-medium w-[80px]">情绪策略</span>
                  <Switch checked={strategies.emotion} onChange={(val) => { setStrategies({...strategies, emotion: val}); if (val) setActiveDrawer('emotion'); }} />
                  {strategies.emotion && (
                    <span className="text-[#1473e6] text-[14px] cursor-pointer hover:underline ml-[16px]" onClick={() => setActiveDrawer('emotion')} data-ai-alt="编辑情绪策略">
                      <i className="fas fa-pen mr-[4px]"></i>编辑
                    </span>
                  )}
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>

          {/* 热词弹窗 */}
          {isHotWordModalOpen && <HotWordModal onClose={() => setIsHotWordModalOpen(false)} />}

          {/* 自定义技能弹窗 */}
          {isCustomSkillModalOpen && (
            <CustomSkillModal
              initialSelected={customSkills.map(s => s.id)}
              onClose={() => setIsCustomSkillModalOpen(false)}
              onConfirm={(list) => setCustomSkills(list)}
            />
          )}

          {/* MCP服务弹窗 */}
          {isMcpServiceModalOpen && (
            <McpServiceModal
              initialSelected={mcpServices.map(s => s.id)}
              onClose={() => setIsMcpServiceModalOpen(false)}
              onConfirm={(list) => setMcpServices(list)}
            />
          )}

          {/* 交互配置抽屉 */}
          {activeDrawer && (
            <AppFormDrawerFrame onMaskClick={() => setActiveDrawer(null)} widthClass={activeDrawer === 'instructionSet' ? 'w-3/4' : 'w-[600px]'}>
              {activeDrawer === 'intro' && <IntroStrategyDrawer onClose={() => setActiveDrawer(null)} />}
              {activeDrawer === 'push' && <PushStrategyDrawer onClose={() => setActiveDrawer(null)} />}
              {activeDrawer === 'feedback' && <FeedbackStrategyDrawer onClose={() => setActiveDrawer(null)} />}
              {activeDrawer === 'emotion' && <EmotionStrategyDrawer onClose={() => setActiveDrawer(null)} />}
              {activeDrawer === 'instructionSet' && <InstructionSetDrawer onClose={() => setActiveDrawer(null)} activeSetId={activeSetId} activeSetName={(instructionSets.find(s => s.id === activeSetId) || {}).name || ''} instructions={instructionsBySet[activeSetId] || []} onRenameSet={(newName) => setInstructionSets((prev) => prev.map((s) => s.id === activeSetId ? { ...s, name: newName } : s))} />}
            </AppFormDrawerFrame>
          )}

          {pendingDeleteSetId && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45" data-ai-alt="删除指令集确认弹窗" data-ai-changelog-id="feature-instruction-set-delete" data-ai-changelog-title="指令集删除二次确认" data-ai-changelog-desc="指令集按钮hover时右上角显示删除小按钮，点击后弹出二次确认弹窗，确认后从列表移除该指令集；若删除的是当前选中项则自动切换到剩余第一项">
              <div className="bg-white w-[400px] rounded-[12px] shadow-xl p-[24px]" data-ai-alt="删除弹窗内容">
                <div className="text-[16px] font-medium text-[#333] mb-[12px]">删除指令集</div>
                <div className="text-[14px] text-[#666] mb-[24px]">确定要删除指令集「{(instructionSets.find((s) => s.id === pendingDeleteSetId) || {}).name || ''}」吗？删除后该指令集下的所有配置将无法恢复。</div>
                <div className="flex items-center justify-end" data-ai-alt="删除弹窗操作行">
                  <button type="button" onClick={cancelDeleteInstructionSet} className="h-[32px] px-[18px] mr-[12px] border border-[#d9d9d9] rounded-[20px] text-[14px] text-[#333] hover:bg-[#f5f5f5]" data-ai-alt="取消删除按钮">取消</button>
                  <button type="button" onClick={confirmDeleteInstructionSet} className="h-[32px] px-[18px] bg-[#ff4d4f] text-white rounded-[20px] text-[14px] hover:bg-[#e0393b]" data-ai-alt="确定删除按钮">确定删除</button>
                </div>
              </div>
            </div>
          )}

          {false && (
            <AppFormDrawerFrame onMaskClick={() => {}}>
              <div />
            </AppFormDrawerFrame>
          )}

          {/* 新建指令集抽屉 */}
          {showCreateSet && (
            <div className="fixed inset-0 z-[60]" data-ai-alt="新建指令集抽屉容器">
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-[220ms] ${createSetVisible ? 'opacity-40' : 'opacity-0'}`}
                onClick={closeCreateInstructionSet}
                data-ai-alt="新建指令集遮罩"
              ></div>
              <div
                className={`absolute top-0 right-0 h-full w-[25%] min-w-[320px] bg-white shadow-xl flex flex-col transform transition-transform duration-[220ms] ease-out ${createSetVisible ? 'translate-x-0' : 'translate-x-full'}`}
                data-ai-alt="新建指令集面板"
              >
                <div className="flex items-center justify-between px-[20px] h-[52px] border-b border-[#e5e5e5]" data-ai-alt="新建指令集标题栏">
                  <h3 className="text-[16px] font-medium text-[#333]">新建指令集</h3>
                  <button onClick={closeCreateInstructionSet} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭新建指令集">
                    <i className="fas fa-times text-[18px] w-[18px] h-[18px] flex items-center justify-center"></i>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-[20px] py-[20px]" data-ai-alt="新建指令集表单">
                  <div className="mb-[20px]" data-ai-alt="指令集名称字段">
                    <div className="flex items-center mb-[8px] text-[13px] text-[#333]">
                      <span className="text-[#e34d59] mr-[4px]">*</span>
                      <span>指令集名称</span>
                    </div>
                    <input
                      type="text"
                      value={newSetName}
                      onChange={(e) => setNewSetName(e.target.value)}
                      placeholder="请输入指令集名称"
                      className="w-full h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#165DFF]"
                      data-ai-alt="指令集名称输入框"
                    />
                  </div>
                  <div data-ai-alt="执行反馈字段">
                    <div className="flex items-center mb-[8px] text-[13px] text-[#333]">
                      <span className="text-[#e34d59] mr-[4px]">*</span>
                      <span>是否需要执行反馈</span>
                    </div>
                    <div className="flex items-center" data-ai-alt="执行反馈单选组">
                      <label className="flex items-center mr-[24px] cursor-pointer" onClick={() => setNewSetFeedback('reply')} data-ai-alt="回复默认选项">
                        <span className={`w-[16px] h-[16px] flex items-center justify-center rounded-full border-[2px] mr-[6px] ${newSetFeedback === 'reply' ? 'border-[#165DFF]' : 'border-[#d9d9d9]'}`}>
                          {newSetFeedback === 'reply' && <span className="w-[8px] h-[8px] rounded-full bg-[#165DFF]"></span>}
                        </span>
                        <span className="text-[13px] text-[#333]">回复默认</span>
                      </label>
                      <label className="flex items-center cursor-pointer" onClick={() => setNewSetFeedback('silent')} data-ai-alt="静默执行选项">
                        <span className={`w-[16px] h-[16px] flex items-center justify-center rounded-full border-[2px] mr-[6px] ${newSetFeedback === 'silent' ? 'border-[#165DFF]' : 'border-[#d9d9d9]'}`}>
                          {newSetFeedback === 'silent' && <span className="w-[8px] h-[8px] rounded-full bg-[#165DFF]"></span>}
                        </span>
                        <span className="text-[13px] text-[#333]">静默执行</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end px-[20px] h-[56px] border-t border-[#e5e5e5]" data-ai-alt="新建指令集底部操作">
                  <button onClick={closeCreateInstructionSet} className="h-[32px] px-[16px] mr-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] text-[#666] bg-white hover:border-[#165DFF] hover:text-[#165DFF]" data-ai-alt="取消新建指令集">取消</button>
                  <button onClick={handleConfirmCreateInstructionSet} className="h-[32px] px-[16px] bg-[#165DFF] text-white rounded-[4px] text-[13px] hover:bg-[#0e4dd1]" data-ai-alt="确认新建指令集">确认</button>
                </div>
              </div>
            </div>
          )}

          {/* 指令集提示Toast */}
          {instructionSetToast && (
            <div className="fixed left-1/2 top-[80px] -translate-x-1/2 z-[70] bg-black/75 text-white text-[13px] px-[14px] py-[8px] rounded-[4px]" data-ai-alt="指令集提示">
              {instructionSetToast}
            </div>
          )}

          {/* 右侧预览区 */}
          <div className="w-[360px] bg-white border-l border-[#e5e5e5] flex flex-col">
            <div className="p-[16px] border-b border-[#e5e5e5] flex items-center">
              <span className="text-[16px] font-medium text-[#333]">预览调试</span>
              <i className="fas fa-cog text-[#1473e6] ml-[8px] cursor-pointer" data-ai-alt="预览设置"></i>
            </div>
            <div className="flex-1 bg-[#fafafa] flex flex-col items-center justify-center p-[24px]">
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center shadow-sm mb-[16px] relative">
                <i className="fas fa-robot text-[40px] text-[#1473e6]"></i>
              </div>
              <div className="text-[#666] text-[14px] flex items-center">
                <i className="far fa-comment-dots mr-[8px]"></i> 和我对话试试吧
              </div>
            </div>
            <div className="p-[16px] bg-white border-t border-[#e5e5e5]">
              <button className="w-full h-[40px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" data-ai-alt="开始测试按钮">开始测试</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AppConfigPage;
