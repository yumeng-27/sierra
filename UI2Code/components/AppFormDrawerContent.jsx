import React, { useState, useEffect } from 'react';

function AppFormDrawerContent({ title = "新建产品", initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    productVersion: '',
    productType: '',
    productCategory: '',
    productPart: '',
    iotPlatform: '',
    typeDesc: '',
    devBoardId: '',
    devBoardType: '',
    serialPrefix: '',
    voice: '',
    introEnabled: true,
    pushEnabled: true,
    feedbackEnabled: true,
    desc: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name || '',
        productVersion: initialData.productVersion || '',
        productType: initialData.productType || '',
        productCategory: initialData.productCategory || '',
        productPart: initialData.productPart || '',
        iotPlatform: initialData.iotPlatform || '',
        typeDesc: initialData.typeDesc || '',
        devBoardId: initialData.devBoardId || '',
        devBoardType: initialData.devBoardType || '',
        serialPrefix: initialData.serialPrefix || '',
        voice: initialData.voice || '',
        desc: initialData.desc || ''
      }));
    }
  }, [initialData]);

  const isStandard = formData.productVersion === 'standard';

  const isEditMode = !!initialData;

  const handleSubmit = () => {
    const finalData = { ...formData };
    if (!isEditMode && !finalData.productType) {
      finalData.productType = finalData.name;
    }
    if (onSave) onSave(finalData);
    else if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
        <h2 className="text-[18px] font-medium text-[#333]">{title}</h2>
        <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭抽屉">
          <i className="fas fa-times text-[20px]"></i>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-[24px] py-[20px] space-y-[24px]">
        <div>
          <label className="block text-[14px] text-[#333] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>产品名称</label>
          <input 
            type="text" 
            placeholder="请输入"
            className={`w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none ${isEditMode ? 'bg-[#f5f5f5] text-[#999] cursor-not-allowed' : 'focus:border-[#1473e6] bg-white'}`}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            disabled={isEditMode}
            data-ai-alt="应用名称输入框"
          />
        </div>

        <div 
          data-ai-changelog-id="feature-product-version"
          data-ai-changelog-title="选择产品版本"
          data-ai-changelog-desc="在应用创建/编辑表单中增加产品版本的选择字段，支持选择lite版或标准版"
        >
          <label className="block text-[14px] text-[#333] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>产品版本</label>
          <div className="relative">
            <select 
              className={`w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] appearance-none focus:outline-none ${isEditMode ? 'bg-[#f5f5f5] text-[#999] cursor-not-allowed' : 'bg-white text-[#999] focus:border-[#1473e6]'}`}
              value={formData.productVersion}
              onChange={e => setFormData({...formData, productVersion: e.target.value})}
              disabled={isEditMode}
              data-ai-alt="产品版本选择"
            >
              <option value="">请选择产品版本</option>
              <option value="lite">lite版</option>
              <option value="standard">标准版</option>
            </select>
            <i className="fas fa-chevron-down absolute right-[12px] top-[10px] text-[12px] text-[#ccc] pointer-events-none"></i>
          </div>
        </div>

        <div>
          <label className="block text-[14px] text-[#333] mb-[8px]">
            产品型号
          </label>
          <input 
            type="text" 
            placeholder="如果不填写将默认等于产品名称/产品名称的型号"
            className={`w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none ${isEditMode ? 'bg-[#f5f5f5] text-[#999] cursor-not-allowed' : 'focus:border-[#1473e6] bg-white'}`}
            value={formData.productType}
            onChange={e => setFormData({...formData, productType: e.target.value})}
            disabled={isEditMode}
            data-ai-alt="产品型号输入框"
          />
        </div>

        {isStandard && (
          <div data-ai-changelog-id="feature-standard-extra-fields" data-ai-changelog-title="标准版扩展字段" data-ai-changelog-desc="标准版新增产品品类、产品部件、IoT平台、型号描述字段，品类与型号描述为必填">
            <div className="mb-[24px]">
              <label className="block text-[14px] text-[#333] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>产品品类</label>
              <div className="relative">
                <select 
                  className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] appearance-none focus:border-[#1473e6] focus:outline-none bg-white"
                  value={formData.productCategory}
                  onChange={e => setFormData({...formData, productCategory: e.target.value})}
                  data-ai-alt="产品品类选择"
                >
                  <option value="">请选择产品品类</option>
                  <option value="空气净化器">空气净化器</option>
                  <option value="冰箱">冰箱</option>
                  <option value="洗衣机">洗衣机</option>
                  <option value="空调">空调</option>
                  <option value="扫地机器人">扫地机器人</option>
                </select>
                <i className="fas fa-chevron-down absolute right-[12px] top-[10px] text-[12px] text-[#ccc] pointer-events-none"></i>
              </div>
            </div>

            <div className="mb-[24px]">
              <label className="block text-[14px] text-[#333] mb-[8px]">产品部件</label>
              <input 
                type="text" 
                placeholder="请输入产品部件"
                className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:border-[#1473e6] focus:outline-none"
                value={formData.productPart}
                onChange={e => setFormData({...formData, productPart: e.target.value})}
                data-ai-alt="产品部件输入框"
              />
            </div>

            <div className="mb-[24px]">
              <label className="block text-[14px] text-[#333] mb-[8px]">IoT平台</label>
              <div className="relative">
                <select 
                  className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] appearance-none focus:border-[#1473e6] focus:outline-none bg-white"
                  value={formData.iotPlatform}
                  onChange={e => setFormData({...formData, iotPlatform: e.target.value})}
                  data-ai-alt="IoT平台选择"
                >
                  <option value="">请选择IoT平台</option>
                  <option value="小家">小家</option>
                  <option value="京鱼座">京鱼座</option>
                  <option value="美的美居">美的美居</option>
                </select>
                <i className="fas fa-chevron-down absolute right-[12px] top-[10px] text-[12px] text-[#ccc] pointer-events-none"></i>
              </div>
            </div>

            <div>
              <label className="block text-[14px] text-[#333] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>型号描述</label>
              <textarea 
                className="w-full h-[80px] p-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] resize-none focus:border-[#1473e6] focus:outline-none"
                placeholder="请输入型号描述"
                value={formData.typeDesc}
                onChange={e => setFormData({...formData, typeDesc: e.target.value})}
                data-ai-alt="型号描述输入框"
              ></textarea>
            </div>
          </div>
        )}

        <div data-ai-changelog-id="feature-dev-board-id" data-ai-changelog-title="开发板ID" data-ai-changelog-desc="新建应用表单新增开发板ID字段">
          <label className="block text-[14px] text-[#333] mb-[8px]">
            开发板ID <i className="far fa-question-circle text-[#999] ml-[4px]"></i>
          </label>
          <input 
            type="text" 
            placeholder="输入开发板ID, 例如 kevin-box-2"
            className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:border-[#1473e6] focus:outline-none"
            value={formData.devBoardId}
            onChange={e => setFormData({...formData, devBoardId: e.target.value})}
            data-ai-alt="开发板ID输入框"
          />
        </div>

        <div data-ai-changelog-id="feature-dev-board-type" data-ai-changelog-title="开发板类型" data-ai-changelog-desc="新建应用表单新增开发板类型字段">
          <label className="block text-[14px] text-[#333] mb-[8px]">开发板类型</label>
          <input 
            type="text" 
            placeholder="输入开发板类型"
            className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:border-[#1473e6] focus:outline-none"
            value={formData.devBoardType}
            onChange={e => setFormData({...formData, devBoardType: e.target.value})}
            data-ai-alt="开发板类型输入框"
          />
        </div>

        <div data-ai-changelog-id="feature-serial-prefix" data-ai-changelog-title="序列号前缀" data-ai-changelog-desc="新建应用表单新增序列号前缀字段">
          <label className="block text-[14px] text-[#333] mb-[8px]">
            序列号前缀 <i className="far fa-question-circle text-[#999] ml-[4px]"></i>
          </label>
          <input 
            type="text" 
            placeholder="16个字符，由大写字母、数字、下划线组成，以下划线结尾"
            className="w-full h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:border-[#1473e6] focus:outline-none"
            value={formData.serialPrefix}
            onChange={e => setFormData({...formData, serialPrefix: e.target.value})}
            data-ai-alt="序列号前缀输入框"
          />
        </div>



        <div>
          <label className="block text-[14px] text-[#333] mb-[8px]">产品描述</label>
          <textarea 
            className="w-full h-[100px] p-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] resize-none focus:border-[#1473e6] focus:outline-none"
            placeholder="请输入"
            value={formData.desc}
            onChange={e => setFormData({...formData, desc: e.target.value})}
            data-ai-alt="应用描述输入框"
          ></textarea>
        </div>
      </div>

      <div className="px-[24px] py-[16px] border-t border-[#e5e5e5] flex justify-end bg-white">
        <button onClick={onClose} className="px-[16px] py-[6px] border border-[#d9d9d9] rounded-[4px] text-[14px] mr-[12px] hover:bg-[#f5f5f5]" data-ai-alt="取消按钮">取消</button>
        <button onClick={handleSubmit} className="px-[16px] py-[6px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" data-ai-alt="提交按钮">提交</button>
      </div>
    </div>
  );
}

export default AppFormDrawerContent;