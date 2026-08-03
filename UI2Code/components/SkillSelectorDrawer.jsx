import React, { useState } from 'react';

function SkillSelectorDrawer({ appVersion, allSkills, initialSelected, onSave, onClose }) {
  const [selectedSkills, setSelectedSkills] = useState(initialSelected || []);

  const toggleSkill = (skill) => {
    if (appVersion === 'lite' && !skill.liteSupported) return;
    if (selectedSkills.includes(skill.id)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill.id]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">添加技能</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-[8px]">
          {allSkills.map(skill => {
            const isDisabled = appVersion === 'lite' && !skill.liteSupported;
            const isSelected = selectedSkills.includes(skill.id);
            return (
              <div 
                key={skill.id}
                className={`flex items-center justify-between px-[24px] py-[12px] text-[14px] cursor-pointer transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f5f5f5]'} ${isSelected && !isDisabled ? 'bg-[#eef5fd] text-[#1473e6]' : 'text-[#333]'}`}
                onClick={() => toggleSkill(skill)}
              >
                <span>{skill.name}</span>
                {isDisabled && (
                  <span className="text-[#999] text-[12px]">当绑定产品版本为lite版时暂不生效</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-[24px] py-[16px] border-t border-[#e5e5e5] flex justify-end">
        <button onClick={onClose} className="px-[16px] py-[6px] border border-[#d9d9d9] rounded-[4px] text-[14px] mr-[12px] hover:bg-[#f5f5f5]" data-ai-alt="取消按钮">取消</button>
        <button onClick={() => onSave(selectedSkills)} className="px-[16px] py-[6px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" data-ai-alt="确定按钮">确定</button>
      </div>
    </div>
  );
}

export default SkillSelectorDrawer;