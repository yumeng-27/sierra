import React from 'react';

function Switch({ checked, onChange }) {
  return (
    <div 
      className={`w-[44px] h-[24px] rounded-full flex items-center p-[2px] cursor-pointer transition-colors ${checked ? 'bg-[#1473e6]' : 'bg-[#d9d9d9]'}`}
      onClick={() => onChange(!checked)}
      data-ai-alt="开关"
    >
      <div className={`w-[20px] h-[20px] bg-white rounded-full shadow-sm transform transition-transform ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
    </div>
  );
}

export default Switch;