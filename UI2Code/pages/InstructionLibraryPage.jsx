import React, { useState } from 'react';
import Layout from '../components/Layout';
import InstructionSetDetailPage from './InstructionSetDetailPage';

// 可点击进入详情的系统指令集
const CLICKABLE_SYSTEM_TITLES = ['退出对话', '电量查询', '音量调节'];

function InstructionLibraryPage() {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  // 当前查看的指令集详情；为 null 时展示列表
  const [activeDetail, setActiveDetail] = useState(null);

  // 判断某个指令集卡片是否可点开：带「旧版」标签的，或三个指定系统指令集
  const isClickable = (item) => item.isOld || CLICKABLE_SYSTEM_TITLES.includes(item.title);

  const mockData = [
    { id: 1, title: '指令集2.0', desc: '111', author: 'jd_40d11979fdb53', time: '2026-07-21 13:51', isOld: false },
    { id: 2, title: '灯的指令集', desc: '灯', author: 'jd_40d11979fdb53', time: '2026-06-26 15:53', isOld: false },
    { id: 3, title: '我的测试指令集', desc: '测试指令集', author: 'jd_40d11979fdb53', time: '2026-05-25 16:31', isOld: false },
     { id: 4, title: '自定义指令集2', desc: '我的自定义指令集2', author: 'jd_40d11979fdb53', time: '2026-05-09 13:59', isOld: true, commands: [
      { id: 1, name: '这是一个测试指令', code: '08042', prompt: '提示词', slot: '无槽位', time:'2026/5/9 14:13:06' },
    ] },
    { id: 5, title: '自定义指令集1', desc: '我的自定义指令集', author: 'jd_40d11979fdb53', time: '2026-05-09 13:59', isOld: true, commands: [
      { id: 1, name: '开灯', code: '05091', prompt: '打开灯光', slot: '无槽位', time: '2026/5/9 13:59:20' },
      { id: 2, name: '关灯', code: '05092', prompt: '关闭灯光', slot: '无槽位', time: '2026/5/9 13:59:41' },
    ] },
    { id: 6, title: '测试指令集', desc: '11', author: 'jd_40d11979fdb53', time: '2026-04-14 16:11', isOld: true, commands: [
      { id: 1, name: '测试指令A', code: '04141', prompt: '测试提示词', slot: '无槽位', time: '2026/4/14 16:11:30' },
    ] },
    { id: 7, title: '退出对话', desc: '', author: 'system', time: '2026-04-02 21:21', isOld: false, commands: [
      { id: 1, name: '退出对话', code: 'SYS001', prompt: '退出、结束对话、再见', slot: '无槽位', time: '2026/4/2 21:21:08' },
    ] },
    { id: 8, title: '电量查询', desc: '', author: 'system', time: '2026-03-28 16:31', isOld: false, commands: [
      { id: 1, name: '电量查询', code: 'SYS002', prompt: '还有多少电、电量是多少', slot: '无槽位', time: '2026/3/28 16:31:12' },
    ] },
    { id: 9, title: '音量调节', desc: '', author: 'system', time: '2026-03-28 16:30', isOld: false, commands: [
      { id: 1, name: '调大音量', code: 'SYS003', prompt: '声音大一点、调大音量', slot: 'volume', time: '2026/3/28 16:30:05' },
      { id: 2, name: '调小音量', code: 'SYS004', prompt: '声音小一点、调小音量', slot: 'volume', time: '2026/3/28 16:30:33' },
    ] },
  ];

  // 详情视图
  if (activeDetail) {
    return (
      <Layout>
        <InstructionSetDetailPage
          instructionSet={activeDetail}
          onBack={() => setActiveDetail(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="w-full h-full flex flex-col p-[24px] bg-[#f4f5f7] overflow-y-auto" 
        data-page-key="instructionLibrary"
        data-ai-alt="指令库页面容器"
        data-ai-changelog-id="page-level-instructionLibrary"
        data-ai-changelog-title="指令库页面"
        data-ai-changelog-desc="展示历史指令库留存数据，不支持新增编辑"
      >
        {/* 顶部标题与操作区 */}
        <div className="flex items-start justify-between mb-[20px]" data-ai-alt="页面头部区">
          <div className="flex flex-col">
            <h1 className="text-[20px] font-bold text-[#333] mb-[8px]">指令库</h1>
            <span className="text-[13px] text-[#666]">指令数据已迁移,指令库暂时停用,历史数据仅作留存展示。</span>
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="relative w-[240px]">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索指令集名称"
                className="w-full h-[32px] pl-[12px] pr-[32px] border border-[#e5e5e5] rounded-[4px] text-[14px] bg-[#f5f5f5] text-[#333] outline-none"
                data-ai-alt="搜索输入框"
              />
              <i className="fas fa-search absolute right-[10px] top-[9px] text-[14px] text-[#999] pointer-events-none"></i>
            </div>
            <button className="h-[32px] px-[16px] bg-[#d9d9d9] text-[#fff] text-[14px] rounded-[4px] cursor-not-allowed" disabled data-ai-alt="不可用的新建按钮">
              + 新建指令集
            </button>
          </div>
        </div>

        {/* 警告提示条 */}
        {isAlertVisible && (
          <div 
            className="w-full mb-[20px] p-[16px] bg-[#fff7e6] border border-[#ffd591] rounded-[8px] flex items-start relative"
            data-ai-alt="停用警告提示条"
            data-ai-changelog-id="feature-instruction-library-alert"
            data-ai-changelog-title="停用警告提示"
            data-ai-changelog-desc="告知用户指令库已停用及数据迁移去向"
          >
            <i className="fas fa-bullhorn text-[#faad14] text-[18px] mt-[2px] mr-[12px]"></i>
            <div className="flex flex-col">
                   <span className="text-[14px] font-medium text-[#333] mb-[8px]">指令数据已迁移,指令库暂时停用</span>
              <div className="text-[13px] text-[#666] leading-relaxed">
                指令库不再支持新增指令集与指令,历史数据仅作留存展示,<strong>不再支持编辑。</strong> 原有数据已按类型迁移至以下位置:
                <br/>
                · <strong>AIOT 指令集</strong> 已迁移至 <a href="#" className="text-[#1473e6] hover:underline">产品管理 → 智能体 → AIOT 指令控制 →</a>
                <br/>
                · 旧版自定义指令、系统指令 已迁移至 <a href="#" className="text-[#1473e6] hover:underline">产品管理 → 智能体 → 指令 →</a>
              </div>
            </div>
            <button onClick={() => setIsAlertVisible(false)} className="absolute right-[16px] top-[16px] text-[#999] hover:text-[#333]" data-ai-alt="关闭提示按钮">
              <i className="fas fa-times text-[14px]"></i>
            </button>
          </div>
        )}

        {/* 说明与卡片列表 */}
        <div className="flex flex-col" data-ai-alt="列表展示区">
          <div className="flex items-center text-[12px] text-[#999] mb-[16px]">
            <i className="fas fa-lock mr-[6px]"></i> 以下为历史留存数据，已置灰不可新增、编辑或删除，点开可查看指令详情
          </div>
          
          <div 
            className="flex flex-wrap gap-[16px]" 
            data-ai-list="true"
            data-ai-alt="指令集卡片网格"
            data-ai-changelog-id="feature-instruction-library-list"
            data-ai-changelog-title="历史指令集列表"
            data-ai-changelog-desc="以只读卡片的形式展示历史指令集，包含名称、描述、创建人及时间"
          >
            {mockData.map(item => {
              const clickable = isClickable(item);
              return (
              <div 
                key={item.id} 
                className={`w-[calc(25%-12px)] min-w-[240px] bg-[#fcfcfc] border rounded-[8px] p-[16px] flex flex-col transition-all ${clickable ? 'border-[#e5e5e5] cursor-pointer hover:border-[#1473e6] hover:shadow-md' : 'border-[#e5e5e5] cursor-default'}`}
                onClick={clickable ? () => setActiveDetail(item) : undefined}
                data-ai-alt={clickable ? '可查看的指令集历史卡片' : '指令集历史卡片'}
              >
                <div className="flex items-center mb-[8px]">
                  {item.isOld && (
                    <span className="inline-block px-[4px] py-[2px] bg-[#f0f0f0] text-[#999] text-[12px] rounded-[2px] mr-[8px]">
                      旧版
                    </span>
                  )}
                  <span className={`text-[16px] font-medium truncate ${clickable ? 'text-[#333]' : 'text-[#666]'}`}>{item.title}</span>
                </div>
                <div className="text-[13px] text-[#999] mb-[24px] line-clamp-2 h-[40px]">
                  {item.desc || ' '}
                </div>
                <div className="mt-auto flex flex-col gap-[4px] pt-[12px] border-t border-[#f0f0f0]">
                  <div className="flex items-center justify-between text-[12px] text-[#999]">
                    <div className="flex items-center">
                      <i className="fas fa-user text-[10px] mr-[6px]"></i>
                      <span className="truncate max-w-[100px]">{item.author}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="far fa-clock text-[10px] mr-[6px]"></i>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* 分页器 */}
          <div className="flex items-center justify-end mt-[24px] text-[13px] text-[#666]" data-ai-alt="底部分页器">
            <span>共 11 条</span>
            <span className="mx-[12px]">&lt;</span>
            <span className="w-[28px] h-[28px] flex items-center justify-center border border-[#1473e6] text-[#1473e6] rounded-[4px] bg-white">
              1
            </span>
            <span className="mx-[12px]">&gt;</span>
            <div className="flex items-center cursor-pointer">
              100 条/页 <i className="fas fa-chevron-down text-[10px] ml-[4px]"></i>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default InstructionLibraryPage;
