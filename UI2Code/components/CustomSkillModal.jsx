import React, { useState } from 'react';

const CUSTOM_SKILL_OPTIONS = [
  { id: 'weather', name: '查天气' },
  { id: 'joke', name: '讲个笑话' },
  { id: 'alarm', name: '设置闹钟' },
  { id: 'stock', name: '查询股票' }
];

function CustomSkillModal({ onClose, onConfirm, initialSelected = [] }) {
  const [selected, setSelected] = useState(initialSelected);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleOption = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const removeTag = (e, id) => {
    e.stopPropagation();
    setSelected(selected.filter(item => item !== id));
  };

  const handleConfirm = () => {
    const selectedSkills = CUSTOM_SKILL_OPTIONS.filter(opt => selected.includes(opt.id));
    if (onConfirm) onConfirm(selectedSkills);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" data-ai-alt="自定义技能弹窗">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} data-ai-alt="弹窗遮罩"></div>
      <div className="relative bg-white rounded-[8px] w-[520px] shadow-2xl overflow-hidden" data-ai-alt="弹窗容器">
        <div className="px-[24px] py-[16px] border-b border-[#f0f0f0] flex items-center justify-between" data-ai-alt="弹窗标题栏">
          <span className="text-[16px] font-medium text-[#333]">配置自定义技能</span>
          <i className="fas fa-times text-[#999] cursor-pointer hover:text-[#333] w-[16px] h-[16px] flex items-center justify-center" onClick={onClose} data-ai-alt="关闭弹窗"></i>
        </div>

        <div className="p-[24px]" data-ai-alt="弹窗内容区">
          <div className="text-[14px] text-[#333] mb-[8px]">选择自定义技能</div>

          <div
            className="min-h-[36px] w-full border border-[#1473e6] rounded-[4px] px-[8px] py-[4px] flex flex-wrap gap-[6px] items-center cursor-pointer bg-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            data-ai-alt="技能多选输入框"
          >
            {selected.length === 0 && (
              <span className="text-[14px] text-[#bfbfbf] px-[4px]">请选择自定义技能</span>
            )}
            {selected.map(id => {
              const opt = CUSTOM_SKILL_OPTIONS.find(o => o.id === id);
              if (!opt) return null;
              return (
                <span key={id} className="flex items-center px-[8px] h-[24px] bg-[#f5f5f5] text-[#333] text-[12px] rounded-[2px]">
                  {opt.name}
                  <i className="fas fa-times ml-[6px] text-[#999] text-[10px] w-[10px] h-[10px] flex items-center justify-center hover:text-[#333]" onClick={(e) => removeTag(e, id)} data-ai-alt="移除标签"></i>
                </span>
              );
            })}
          </div>

          {isDropdownOpen && (
            <div className="mt-[8px] border border-[#e5e5e5] rounded-[4px] bg-white shadow-sm max-h-[240px] overflow-y-auto py-[4px]" data-ai-alt="技能候选下拉" data-ai-list="true">
              {CUSTOM_SKILL_OPTIONS.map(opt => {
                const isSelected = selected.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={`flex items-center justify-between px-[16px] h-[36px] text-[14px] cursor-pointer ${isSelected ? 'bg-[#eef5fd] text-[#1473e6]' : 'text-[#333] hover:bg-[#f5f5f5]'}`}
                    onClick={() => toggleOption(opt.id)}
                    data-ai-alt="候选技能项"
                  >
                    <span>{opt.name}</span>
                    {isSelected && <i className="fas fa-check text-[#1473e6] w-[12px] h-[12px] flex items-center justify-center"></i>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-[24px] py-[12px] bg-[#fafafa] border-t border-[#f0f0f0] flex items-center justify-end space-x-[12px]" data-ai-alt="弹窗底部操作栏">
          <button className="h-[32px] px-[16px] bg-white border border-[#d9d9d9] rounded-[4px] text-[14px] text-[#333] hover:bg-[#f5f5f5]" onClick={onClose} data-ai-alt="取消按钮">取消</button>
          <button className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" onClick={handleConfirm} data-ai-alt="确认按钮">确认</button>
        </div>
      </div>
    </div>
  );
}

export default CustomSkillModal;
