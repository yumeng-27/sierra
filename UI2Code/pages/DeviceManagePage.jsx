import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConfirmModal from '../components/ConfirmModal';

const mockDevices = [
  { id: '1', name: '京东京造 AI陪伴毛绒玩偶-智星狗', product: '听写', appId: '10904', dialogId: '89dc32dbdc0f43a8b2552eda...', sn: 'Forcebot_SN_c939df7b-0232-41...', type: '实体设备', voice: '小犀', auth: '-' },
  { id: '2', name: '京东京造 AI陪伴毛绒玩偶-智星狗', product: '听写', appId: '10904', dialogId: 'b3dabf8ffcf04408b0d423dd6...', sn: 'Forcebot_SN_b55158ce-d973-41...', type: '实体设备', voice: '小犀', auth: '-' },
  { id: '3', name: '京东京造 AI陪伴毛绒玩偶-智星狗', product: '听写', appId: '10904', dialogId: '84a55e6030dd43f2a3c53963...', sn: 'Forcebot_SN_a74748b2-a46d-43...', type: '实体设备', voice: '小犀', auth: '-' },
];

function DeviceManagePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBatchAuthModalOpen, setIsBatchAuthModalOpen] = useState(false);
  const [isShortCodeModalOpen, setIsShortCodeModalOpen] = useState(false);
  const [shortCodeQuery, setShortCodeQuery] = useState('');
  const [shortCodeResult, setShortCodeResult] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deviceModalMode, setDeviceModalMode] = useState('create');
  const [currentDevice, setCurrentDevice] = useState(null);

  const handleShortCodeSearch = () => {
    if (shortCodeQuery === '1234567') {
      setShortCodeResult({
        name: '京东京造 AI陪伴毛绒玩偶',
        product: '听写',
        deviceId: 'mock_dialog_id_12345',
        sn: 'Forcebot_SN_mock_67890'
      });
    } else {
      setShortCodeResult(null);
      alert('未查询到相关设备');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#f4f5f7]">
        <div className="px-[24px] py-[16px] bg-white border-b border-[#e5e5e5] flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#333] mb-[4px]">设备管理</h1>
            <p className="text-[14px] text-[#999]">手动只允许创建虚拟设备，正式设备需要通过接口自动创建</p>
          </div>
          <div className="flex items-center space-x-[12px]">
            <select 
              className="h-[32px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] bg-white w-[140px]" 
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              data-ai-alt="选择产品"
            >
              <option value="">选择产品</option>
              <option value="听写">听写</option>
            </select>
            <div className="relative w-[220px]">
              <input type="text" placeholder="输入设备名称/SN编码" className="w-full h-[32px] pl-[12px] pr-[32px] border border-[#d9d9d9] rounded-[4px] text-[14px]" data-ai-alt="搜索设备" />
              <i className="fas fa-search absolute right-[10px] top-[9px] text-[#999]"></i>
            </div>
            <button 
              onClick={() => { 
                setDeviceModalMode('create'); 
                setCurrentDevice(null); 
                setIsCreateModalOpen(true); 
              }} 
              className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" 
              data-ai-alt="新建设备"
            >
              <i className="fas fa-plus mr-[4px]"></i> 新建
            </button>
            <button onClick={() => setIsBatchAuthModalOpen(true)} className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" data-ai-alt="批量开通音乐资源">
              <i className="fas fa-bars mr-[4px]"></i> 批量开通音乐资源
            </button>
            <button onClick={() => setIsShortCodeModalOpen(true)} className="h-[32px] px-[16px] bg-white border border-[#1473e6] text-[#1473e6] rounded-[4px] text-[14px] hover:bg-[#eef5fd]" data-ai-alt="短码查询">
              <i className="fas fa-exchange-alt mr-[4px]"></i> 短码查询
            </button>
          </div>
        </div>

        <div className="p-[24px] flex-1 overflow-y-auto">
          <div className="bg-white rounded-[8px] border border-[#e5e5e5] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
                <tr>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">名称</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">产品名</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">APPID</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">ID (用于对话使用)</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">SN编码</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">类型</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">音色</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">资源授权</th>
                  <th className="px-[16px] py-[12px] text-[14px] font-medium text-[#333]">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockDevices.filter(d => selectedProduct ? d.product === selectedProduct : true).map((dev, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5] hover:bg-[#fcfcfc]">
                    <td className="px-[16px] py-[16px] text-[14px] text-[#333] w-[180px]">{dev.name}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#333]">{dev.product}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#333]">{dev.appId}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#666]">{dev.dialogId} <i className="far fa-copy text-[#1473e6] cursor-pointer ml-[4px]"></i></td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#666]">{dev.sn} <i className="far fa-copy text-[#1473e6] cursor-pointer ml-[4px]"></i></td>
                    <td className="px-[16px] py-[16px]">
                      <span className="inline-block px-[6px] py-[12px] bg-[#e6f7ff] text-[#1473e6] text-[12px] rounded-[4px] border border-[#91d5ff] whitespace-pre-wrap leading-tight text-center" style={{writingMode: 'vertical-rl'}}>
                        {dev.type}
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#333]">{dev.voice}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#333]">{dev.auth}</td>
                    <td className="px-[16px] py-[16px] text-[14px]">
                      <i 
                        className="fas fa-pen text-[#666] cursor-pointer hover:text-[#1473e6] mr-[16px]" 
                        onClick={() => { setDeviceModalMode('edit'); setCurrentDevice(dev); setIsCreateModalOpen(true); }} 
                        data-ai-alt="编辑设备"
                      ></i>
                      <i className="far fa-trash-alt text-[#e1251b] cursor-pointer hover:opacity-80" onClick={() => setDeleteId(dev.id)} data-ai-alt="删除设备"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 新建/编辑设备弹窗 */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div className="bg-white w-[520px] rounded-[8px] shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
                <h3 className="text-[16px] font-medium text-[#333]">新建/编辑设备</h3>
                <i className="fas fa-times text-[#999] cursor-pointer" onClick={() => setIsCreateModalOpen(false)}></i>
              </div>
              <div className="p-[24px] space-y-[16px]">
                <div>
                  <label className="block text-[14px] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>类型</label>
                  <select 
                    className={`w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] bg-white ${deviceModalMode === 'edit' ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : ''}`}
                    disabled={deviceModalMode === 'edit'}
                    defaultValue={deviceModalMode === 'edit' && currentDevice ? currentDevice.type : '虚拟设备'}
                  >
                    {deviceModalMode === 'create' ? <option value="虚拟设备">虚拟设备</option> : <option value={currentDevice?.type}>{currentDevice?.type}</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>名称</label>
                  <input 
                    type="text" 
                    placeholder="请输入名称" 
                    defaultValue={deviceModalMode === 'edit' && currentDevice ? currentDevice.name : ''}
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>SN编码 <i className="far fa-question-circle text-[#999]"></i></label>
                  <input 
                    type="text" 
                    placeholder="请输入SN编码" 
                    disabled={deviceModalMode === 'edit'}
                    defaultValue={deviceModalMode === 'edit' && currentDevice ? currentDevice.sn : ''}
                    className={`w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] ${deviceModalMode === 'edit' ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : 'focus:outline-none focus:border-[#1473e6]'}`}
                  />
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]">音色</label>
                  <select 
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] bg-white focus:outline-none focus:border-[#1473e6]"
                    defaultValue={deviceModalMode === 'edit' && currentDevice ? currentDevice.voice : ''}
                  >
                    <option value="">请选择音色</option>
                    <option value="小犀">小犀</option>
                  </select>
                </div>
                {deviceModalMode === 'edit' && (
                  <>
                    <div>
                      <label className="block text-[14px] font-medium text-[#333] mb-[12px]">音乐资源</label>
                      <div className="bg-[#f9f9f9] rounded-[8px] p-[16px] mb-[12px]">
                        <div className="text-[14px] font-medium text-[#333] mb-[12px]">音乐资源授权状态</div>
                        <div className="flex items-center text-[14px] mb-[12px]">
                          <span className="text-[#333] mr-[16px]">网易云音乐</span>
                          <span className="text-[#666] mr-[8px]">企业授权</span>
                          <span className="bg-[#fff1f0] text-[#f5222d] px-[6px] py-[2px] rounded-[2px] text-[12px] mr-[16px]">未授权</span>
                          <span className="text-[#666] mr-[8px]">应用授权</span>
                          <span className="bg-[#fff1f0] text-[#f5222d] px-[6px] py-[2px] rounded-[2px] text-[12px]">未授权</span>
                        </div>
                        <div className="text-[13px] text-[#666]">如需开启音乐资源授权请联系 JoyInside 产品运营</div>
                      </div>
                      <label className="flex items-center text-[14px] cursor-not-allowed opacity-50">
                        <span className="w-[16px] h-[16px] rounded-[2px] border border-[#d9d9d9] mr-[8px]"></span>
                        网易云音乐
                      </label>
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#333] mb-[8px]">描述</label>
                      <textarea 
                        className="w-full h-[80px] p-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] resize-none focus:outline-none focus:border-[#1473e6]"
                        placeholder="请输入描述"
                      ></textarea>
                    </div>
                  </>
                )}
              </div>
              <div className="px-[24px] py-[16px] border-t border-[#e5e5e5] flex justify-end space-x-[12px]">
                <button onClick={() => setIsCreateModalOpen(false)} className="px-[16px] py-[6px] border border-[#d9d9d9] rounded-[4px] text-[14px]">取消</button>
                <button onClick={() => setIsCreateModalOpen(false)} className="px-[16px] py-[6px] bg-[#1473e6] text-white rounded-[4px] text-[14px]">确定</button>
              </div>
            </div>
          </div>
        )}

        {/* 短码查询弹窗 */}
        {isShortCodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div className="bg-white w-[500px] rounded-[8px] shadow-xl flex flex-col p-[24px]">
              <div className="flex justify-between items-center mb-[20px]">
                <h3 className="text-[16px] font-medium text-[#333]">短码查询</h3>
                <i className="fas fa-times text-[#999] cursor-pointer" onClick={() => setIsShortCodeModalOpen(false)}></i>
              </div>
              <div className="flex space-x-[12px] mb-[20px]">
                <input 
                  type="text" 
                  value={shortCodeQuery} 
                  onChange={e => setShortCodeQuery(e.target.value)} 
                  placeholder="请输入7位短码"
                  className="flex-1 h-[40px] px-[12px] border border-[#1473e6] rounded-[4px] text-[14px] outline-none"
                />
                <button onClick={handleShortCodeSearch} className="px-[24px] h-[40px] bg-[#1473e6] text-white rounded-[4px] text-[14px]">查询</button>
              </div>
              {shortCodeResult && (
                <div className="bg-[#fafafa] p-[16px] rounded-[4px] space-y-[12px] text-[14px]">
                  <div className="flex"><span className="w-[80px] text-[#666]">设备名称：</span><span className="text-[#333]">{shortCodeResult.name}</span></div>
                  <div className="flex"><span className="w-[80px] text-[#666]">所属产品：</span><span className="text-[#333]">{shortCodeResult.product}</span></div>
                  <div className="flex"><span className="w-[80px] text-[#666]">设备ID：</span><span className="text-[#333]">{shortCodeResult.deviceId}</span></div>
                  <div className="flex"><span className="w-[80px] text-[#666]">SN编码：</span><span className="text-[#333]">{shortCodeResult.sn}</span></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 批量开通音乐资源弹窗 */}
        {isBatchAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div className="bg-white w-[640px] rounded-[12px] shadow-xl flex flex-col">
              <div className="flex justify-between items-center px-[24px] py-[16px] border-b border-[#e5e5e5]">
                <h3 className="text-[16px] font-medium text-[#333]">批量开通音乐资源</h3>
                <i className="fas fa-times text-[#999] cursor-pointer hover:text-[#333]" onClick={() => setIsBatchAuthModalOpen(false)}></i>
              </div>
              <div className="p-[24px] overflow-y-auto max-h-[60vh]">
                <div className="bg-[#eef5fd] text-[#1473e6] px-[16px] py-[12px] rounded-[4px] text-[14px] mb-[24px]">
                  选择设备范围并开通指定音乐资源。
                </div>
                
                <div className="mb-[32px]">
                  <div className="flex items-center text-[15px] font-medium text-[#333] mb-[16px]">
                    <span className="w-[20px] h-[20px] rounded-full border border-[#d9d9d9] flex items-center justify-center text-[12px] mr-[8px]">1</span>
                    选择设备范围
                  </div>
                  <div className="pl-[28px] space-y-[16px]">
                    <div>
                      <label className="block text-[14px] text-[#666] mb-[8px]">设备类型</label>
                      <select className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] bg-white outline-none">
                        <option>全部</option>
                        <option>虚拟设备</option>
                        <option>实体设备</option>
                    </select>
                    </div>
                    <div className="flex space-x-[16px]">
                      <div className="flex-1">
                        <label className="block text-[14px] text-[#666] mb-[8px]">创建时间（起）</label>
                        <input type="text" placeholder="年 / 月 / 日" className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] outline-none" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[14px] text-[#666] mb-[8px]">创建时间（止）</label>
                        <input type="text" placeholder="年 / 月 / 日" className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] outline-none" />
                      </div>
                    </div>
                    <div className="text-[13px] text-[#999]">请选择完整的设备范围</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-[15px] font-medium text-[#333] mb-[16px]">
                    <span className="w-[20px] h-[20px] rounded-full border border-[#d9d9d9] flex items-center justify-center text-[12px] mr-[8px]">2</span>
                    选择要开通的音乐资源
                  </div>
                  <div className="pl-[28px]">
                    <div className="flex items-center px-[16px] py-[12px] border border-[#d9d9d9] rounded-[4px] w-fit mb-[24px]">
                      <span className="w-[16px] h-[16px] rounded-full border-[5px] border-[#1473e6] mr-[12px]"></span>
                      <span className="bg-[#fff1f0] text-[#f5222d] border border-[#ffa39e] px-[6px] py-[2px] rounded-[2px] text-[12px] mr-[8px]">网易云</span>
                      <span className="text-[14px] text-[#333]">网易云音乐</span>
                    </div>
                    <div className="bg-[#fffbe6] px-[20px] py-[16px] rounded-[8px]">
                      <div className="text-[14px] text-[#333] mb-[8px]">开通规则：</div>
                      <div className="text-[13px] text-[#666] leading-relaxed">
                        · 资源需满足企业已授权 + 应用已开启权限，否则无法开通；请联系工作人员确认授权状态<br/>
                        · 已经开通的设备不会受影响，本操作作为增量增加
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-[24px] py-[16px] border-t border-[#e5e5e5] flex justify-end space-x-[12px] bg-white rounded-b-[12px]">
                <button onClick={() => setIsBatchAuthModalOpen(false)} className="px-[20px] py-[6px] border border-[#d9d9d9] rounded-[20px] text-[14px] text-[#333]">取消</button>
                <button onClick={() => setIsBatchAuthModalOpen(false)} className="px-[20px] py-[6px] bg-[#1473e6] text-white rounded-[20px] text-[14px]">确认开通</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {deleteId && (
        <ConfirmModal
          title="deco-sandbox.jd.com 上的嵌入式页面显示"
          content="确定要删除该设备吗？此操作无法恢复。"
          hint=""
          onCancel={() => setDeleteId(null)}
          onConfirm={() => setDeleteId(null)}
        />
      )}
    </Layout>
  );
}

export default DeviceManagePage;