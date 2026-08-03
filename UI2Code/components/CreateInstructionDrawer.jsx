import React, { useState } from 'react';

function CreateInstructionDrawer({ onClose }) {
  const [instructionType, setInstructionType] = useState('control');
  const [dispatchType, setDispatchType] = useState('device');
  const [dataType, setDataType] = useState('switch');

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" data-ai-alt="新建指令抽屉层">
      <div
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
        data-ai-alt="新建指令遮罩层"
      ></div>
      <div className="relative w-[62.5%] bg-white h-full shadow-2xl flex flex-col" data-ai-alt="新建指令抽屉容器">
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]" data-ai-alt="新建指令标题栏">
          <h2 className="text-[18px] font-medium text-[#333]">新建指令</h2>
          <button onClick={onClose} className="text-[#999] hover:text-[#333]" data-ai-alt="关闭新建指令抽屉">
            <i className="fas fa-times text-[20px] w-[20px] h-[20px] flex items-center justify-center"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]" data-ai-alt="新建指令表单区">
          <div className="mb-[20px]" data-ai-alt="指令类型表单项">
            <label className="block text-[14px] text-[#333] font-medium mb-[8px]"><span className="text-[#e34d59] mr-[4px]">*</span>指令类型</label>
            <div className="flex items-center" data-ai-alt="指令类型选项" data-ai-list="true">
              <label className="flex items-center mr-[24px] cursor-pointer" data-ai-alt="控制项指令选项">
                <input type="radio" name="instructionType" checked={instructionType === 'control'} onChange={() => setInstructionType('control')} className="mr-[6px] accent-[#1473e6]" />
                <span className="text-[14px] text-[#333]">控制项指令</span>
              </label>
              <label className="flex items-center cursor-pointer" data-ai-alt="非控制项指令选项">
                <input type="radio" name="instructionType" checked={instructionType === 'nonControl'} onChange={() => setInstructionType('nonControl')} className="mr-[6px] accent-[#1473e6]" />
                <span className="text-[14px] text-[#333]">非控制项指令</span>
              </label>
            </div>
          </div>

          {instructionType === 'control' && (
            <div data-ai-alt="控制项指令表单" data-ai-changelog-id="control-instruction-form" data-ai-changelog-title="控制项指令表单" data-ai-changelog-desc="选择控制项指令时展示指令控制项、别名、编码、下发方式、作用部件、数据类型、操作行为与参数配置字段">
              <div className="mb-[20px]" data-ai-alt="指令控制项表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>指令控制项
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <input type="text" placeholder="请输入" className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="指令控制项输入框" />
              </div>

              <div className="mb-[20px]" data-ai-alt="控制项别名表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  控制项别名
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <input type="text" placeholder="请输入，多个别名用逗号隔开" className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="控制项别名输入框" />
              </div>

              <div className="mb-[20px]" data-ai-alt="控制项编码表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>控制项编码
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <input type="text" placeholder="请输入指令编码，只能包含英文字母、数字、下划线和连字符" className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="控制项编码输入框" />
              </div>

              <div className="mb-[20px]" data-ai-alt="指令下发方式表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>指令下发方式
                </label>
                <div className="flex items-center" data-ai-alt="指令下发方式选项" data-ai-list="true">
                  <label className="flex items-center mr-[32px] cursor-pointer" data-ai-alt="端侧下发选项">
                    <input type="radio" name="dispatchType" checked={dispatchType === 'device'} onChange={() => setDispatchType('device')} className="mr-[6px] accent-[#1473e6]" />
                    <span className="text-[14px] text-[#333] flex items-center">端侧<i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i></span>
                  </label>
                  <label className="flex items-center cursor-pointer" data-ai-alt="IOT平台下发选项">
                    <input type="radio" name="dispatchType" checked={dispatchType === 'iot'} onChange={() => setDispatchType('iot')} className="mr-[6px] accent-[#1473e6]" />
                    <span className="text-[14px] text-[#333] flex items-center">IOT平台<i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i></span>
                  </label>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="作用部件表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  作用部件
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <div className="relative" data-ai-alt="作用部件下拉容器">
                  <select className="w-full h-[40px] px-[12px] pr-[36px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6] bg-white appearance-none text-[#999]" data-ai-alt="作用部件选择" defaultValue="">
                    <option value="" disabled>请选择作用部件，默认该指令作用于所有部件</option>
                    <option value="all">所有部件</option>
                    <option value="main">主控部件</option>
                    <option value="aux">副控部件</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-[12px] top-1/2 -translate-y-1/2 text-[#999] text-[12px] w-[12px] h-[12px] flex items-center justify-center pointer-events-none"></i>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="数据类型表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>数据类型
                </label>
                <div className="flex items-center" data-ai-alt="数据类型选项" data-ai-list="true">
                  <label className="flex items-center mr-[32px] cursor-pointer" data-ai-alt="开关数据类型">
                    <input type="radio" name="dataType" checked={dataType === 'switch'} onChange={() => setDataType('switch')} className="mr-[6px] accent-[#1473e6]" />
                    <span className="text-[14px] text-[#333]">开关</span>
                  </label>
                  <label className="flex items-center mr-[32px] cursor-pointer" data-ai-alt="枚举数据类型">
                    <input type="radio" name="dataType" checked={dataType === 'enum'} onChange={() => setDataType('enum')} className="mr-[6px] accent-[#1473e6]" />
                    <span className="text-[14px] text-[#333]">枚举</span>
                  </label>
                  <label className="flex items-center cursor-pointer" data-ai-alt="数值数据类型">
                    <input type="radio" name="dataType" checked={dataType === 'number'} onChange={() => setDataType('number')} className="mr-[6px] accent-[#1473e6]" />
                    <span className="text-[14px] text-[#333]">数值</span>
                  </label>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="控制项操作行为表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>操作行为
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <div className="border border-[#e5e5e5] rounded-[4px] px-[16px] py-[12px]" data-ai-alt="操作行为配置区">
                  <div className="flex items-center mb-[12px]" data-ai-alt="设置行为行">
                    <label className="flex items-center cursor-pointer w-[100px]" data-ai-alt="设置操作勾选">
                      <input type="checkbox" defaultChecked className="mr-[8px] accent-[#1473e6]" />
                      <span className="text-[14px] text-[#333]">设置</span>
                    </label>
                    <button className="text-[14px] text-[#1473e6] mr-[16px]" data-ai-alt="设置添加例句按钮">添加例句</button>
                    <span className="text-[13px] text-[#e34d59]">必填，请至少添加1条例句</span>
                  </div>
                  <div className="flex items-center mb-[12px]" data-ai-alt="查询行为行">
                    <label className="flex items-center cursor-pointer w-[100px]" data-ai-alt="查询操作勾选">
                      <input type="checkbox" defaultChecked className="mr-[8px] accent-[#1473e6]" />
                      <span className="text-[14px] text-[#333]">查询</span>
                    </label>
                    <button className="text-[14px] text-[#1473e6] mr-[16px]" data-ai-alt="查询添加例句按钮">添加例句</button>
                    <span className="text-[13px] text-[#e34d59]">必填，请至少添加1条例句</span>
                  </div>
                  <button className="flex items-center text-[14px] text-[#1473e6]" data-ai-alt="添加自定义操作行为按钮">
                    <i className="fas fa-plus mr-[6px] w-[12px] h-[12px] flex items-center justify-center"></i>
                    添加自定义操作行为
                  </button>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="参数配置表单项">
                <label className="block text-[14px] text-[#333] font-medium mb-[8px]">参数配置</label>
                <div className="border border-[#e5e5e5] rounded-[4px] px-[16px] py-[16px]" data-ai-alt="参数配置区">
                  <div className="flex items-center text-[14px] text-[#333] mb-[12px]" data-ai-alt="开关状态映射标题">
                    开关状态映射
                    <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                  </div>
                  <div className="flex items-center mb-[10px]" data-ai-alt="开状态映射行">
                    <span className="text-[14px] text-[#333] w-[90px]">状态：开 --&gt;</span>
                    <input type="text" placeholder="例如：1, on, true" className="flex-1 h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="开状态映射输入" />
                  </div>
                  <div className="flex items-center" data-ai-alt="关状态映射行">
                    <span className="text-[14px] text-[#333] w-[90px]">状态：关 --&gt;</span>
                    <input type="text" placeholder="例如：0, off, false" className="flex-1 h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="关状态映射输入" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {instructionType === 'nonControl' && (
            <div data-ai-alt="非控制项指令表单" data-ai-changelog-id="non-control-instruction-form" data-ai-changelog-title="非控制项指令表单" data-ai-changelog-desc="选择非控制项指令时展示指令名称、编码、识别提示词、操作行为与槽位填槽表格">
              <div className="mb-[20px]" data-ai-alt="指令名称表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>指令名称
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <input type="text" placeholder="请输入" className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="指令名称输入框" />
              </div>

              <div className="mb-[20px]" data-ai-alt="指令编码表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>指令编码
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <input type="text" placeholder="请输入指令编码，只能包含英文字母、数字、下划线和连字符" className="w-full h-[40px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="指令编码输入框" />
              </div>

              <div className="mb-[20px]" data-ai-alt="识别提示词表单项">
                <label className="block text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>识别提示词
                </label>
                <div className="relative" data-ai-alt="识别提示词输入容器">
                  <textarea rows="4" placeholder="请输入识别提示词，用于指令意图识别" className="w-full px-[12px] py-[10px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6] resize-none" data-ai-alt="识别提示词输入框"></textarea>
                  <span className="absolute right-[12px] bottom-[10px] text-[12px] text-[#999]">0 / 500</span>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="非控制项操作行为表单项">
                <label className="flex items-center text-[14px] text-[#333] font-medium mb-[8px]">
                  <span className="text-[#e34d59] mr-[4px]">*</span>操作行为
                  <i className="far fa-question-circle text-[#bbb] ml-[6px] w-[14px] h-[14px] flex items-center justify-center"></i>
                </label>
                <div className="border border-[#e5e5e5] rounded-[4px] px-[16px] py-[12px]" data-ai-alt="非控制项操作行为配置区">
                  <div className="flex items-center" data-ai-alt="设置行为行">
                    <label className="flex items-center cursor-not-allowed w-[100px]" data-ai-alt="设置操作勾选">
                      <input type="checkbox" defaultChecked disabled className="mr-[8px] accent-[#1473e6]" />
                      <span className="text-[14px] text-[#999]">设置</span>
                    </label>
                    <button className="text-[14px] text-[#1473e6] mr-[16px]" data-ai-alt="设置添加例句按钮">添加例句</button>
                    <span className="text-[13px] text-[#e34d59]">必填，请至少添加1条例句</span>
                  </div>
                </div>
              </div>

              <div className="mb-[20px]" data-ai-alt="槽位与填槽表单项">
                <div className="border border-[#e5e5e5] rounded-[4px]" data-ai-alt="槽位与填槽区">
                  <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#e5e5e5]" data-ai-alt="槽位与填槽标题栏">
                    <span className="text-[14px] text-[#333] font-medium">槽位与填槽</span>
                    <button className="flex items-center text-[14px] text-[#1473e6]" data-ai-alt="添加槽位按钮">
                      <i className="fas fa-plus mr-[6px] w-[12px] h-[12px] flex items-center justify-center"></i>
                      添加槽位
                    </button>
                  </div>
                  <div className="px-[16px] py-[12px] text-[13px] text-[#666]" data-ai-alt="槽位说明">
                    该意图下需要维护槽位的，可在此添加，非必填项。若为空，则表明不需要识别槽位。
                  </div>
                  <div className="px-[16px] pb-[16px]" data-ai-alt="槽位表格容器">
                    <div className="flex items-center px-[12px] py-[10px] bg-[#fafafa] text-[13px] text-[#666] border border-[#e5e5e5] rounded-t-[4px]" data-ai-alt="槽位表头" data-ai-list="true">
                      <div className="flex-1">槽位名称</div>
                      <div className="flex-1">字段名</div>
                      <div className="w-[120px]">槽值类型</div>
                      <div className="flex-1">槽值提取说明</div>
                      <div className="w-[70px] text-right">操作</div>
                    </div>
                    <div className="flex items-center px-[12px] py-[10px] border-x border-b border-[#e5e5e5] rounded-b-[4px]" data-ai-alt="槽位表格行" data-ai-list="true">
                      <div className="flex-1 pr-[8px]">
                        <input type="text" placeholder="请输入槽位名称" className="w-full h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="槽位名称输入" />
                      </div>
                      <div className="flex-1 pr-[8px]">
                        <input type="text" placeholder="请输入字段名" className="w-full h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="字段名输入" />
                      </div>
                      <div className="w-[120px] pr-[8px]">
                        <div className="relative" data-ai-alt="槽值类型下拉容器">
                          <select className="w-full h-[32px] px-[10px] pr-[24px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#1473e6] bg-white appearance-none" data-ai-alt="槽值类型选择" defaultValue="text">
                            <option value="text">文本</option>
                            <option value="number">数值</option>
                            <option value="enum">枚举</option>
                          </select>
                          <i className="fas fa-chevron-down absolute right-[8px] top-1/2 -translate-y-1/2 text-[#999] text-[10px] w-[10px] h-[10px] flex items-center justify-center pointer-events-none"></i>
                        </div>
                      </div>
                      <div className="flex-1 pr-[8px]">
                        <input type="text" placeholder="请输入槽值提取说明" className="w-full h-[32px] px-[10px] border border-[#d9d9d9] rounded-[4px] text-[13px] focus:outline-none focus:border-[#1473e6]" data-ai-alt="槽值提取说明输入" />
                      </div>
                      <div className="w-[70px] text-right">
                        <button className="text-[13px] text-[#e34d59]" data-ai-alt="删除槽位按钮">删除</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end px-[24px] py-[16px] border-t border-[#e5e5e5] bg-white" data-ai-alt="新建指令底部操作栏">
          <button
            onClick={onClose}
            className="h-[36px] px-[20px] border border-[#d9d9d9] text-[#333] text-[14px] rounded-[4px] mr-[12px] hover:bg-[#f5f5f5]"
            data-ai-alt="取消新建指令"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="h-[36px] px-[20px] bg-[#1473e6] text-white text-[14px] rounded-[4px] hover:bg-[#1266d1]"
            data-ai-alt="确认新建指令"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateInstructionDrawer;
