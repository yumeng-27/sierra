import React, { useState } from 'react';
import Layout from '../components/Layout';
import Switch from '../components/Switch';
import ConfirmModal from '../components/ConfirmModal';

const mockMcpList = [
  { id: '1', name: '测试123', desc: '', status: 'offline', isPublic: true, tools: [] },
  { id: '2', name: '优优同学', desc: '', status: 'offline', isPublic: true, tools: [] },
  { id: '3', name: '切换智能体配置', desc: '部署mcp支持用户切换语言、音色、模型...', status: 'offline', isPublic: true, tools: [] },
  { id: '4', name: '10011_deviceControl', desc: '正式设备控制端点', status: 'online', isPublic: false, tools: ['getUserOwnedDeviceInfo', 'batchControlDevice'] },
  { id: '5', name: '10009_deviceControlUat', desc: '测试环境设备控制端点', status: 'online', isPublic: true, tools: ['getUserOwnedDeviceInfo', 'batchControlDevice'] },
  { id: '6', name: '测试MCP', desc: '测试的MCP', status: 'offline', isPublic: true, tools: [] },
];

function McpServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [mcpList, setMcpList] = useState(mockMcpList);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ name: '', protocol: 'sse', url: '', secret: '', desc: '' });

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setMcpList(mcpList.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const openCreate = () => {
    setModalMode('create');
    setFormData({ name: '', protocol: 'sse', url: '', secret: '', desc: '' });
    setIsModalOpen(true);
  };

  const openEdit = (mcp) => {
    setModalMode('edit');
    setFormData({ name: mcp.name, protocol: 'sse', url: 'http://example.com/api', secret: '***', desc: mcp.desc });
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#f4f5f7]">
        <div className="px-[24px] py-[16px] bg-white border-b border-[#e5e5e5] flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-[#333]">MCP服务</h1>
          <button onClick={openCreate} className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb]" data-ai-alt="创建MCP接入">
            创建MCP接入
          </button>
        </div>

        <div className="p-[24px] flex-1 overflow-y-auto">
          <div className="bg-white rounded-[8px] border border-[#e5e5e5] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
                <tr>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">MCP服务</th>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">描述</th>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">状态</th>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">工具</th>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">公开</th>
                  <th className="px-[24px] py-[12px] text-[14px] font-medium text-[#333]">操作</th>
                </tr>
              </thead>
              <tbody>
                {mcpList.map((mcp) => (
                  <tr key={mcp.id} className="border-b border-[#e5e5e5] hover:bg-[#fcfcfc]">
                    <td className="px-[24px] py-[16px] text-[14px] text-[#333]">{mcp.name}</td>
                    <td className="px-[24px] py-[16px] text-[14px] text-[#666] max-w-[200px] truncate">{mcp.desc}</td>
                    <td className="px-[24px] py-[16px] text-[14px]">
                      <div className="flex items-center">
                        <span className={`w-[6px] h-[6px] rounded-full mr-[8px] ${mcp.status === 'online' ? 'bg-[#52c41a]' : 'bg-[#d9d9d9]'}`}></span>
                        <span className={mcp.status === 'online' ? 'text-[#333]' : 'text-[#999]'}>{mcp.status === 'online' ? '在线' : '离线'}</span>
                      </div>
                    </td>
                    <td className="px-[24px] py-[16px] text-[14px]">
                      {mcp.tools.length > 0 && (
                        <div className="flex flex-col space-y-[4px]">
                          {mcp.tools.map((t, i) => (
                            <span key={i} className="inline-block px-[8px] py-[2px] bg-[#f5f5f5] text-[#666] rounded-[4px] border border-[#d9d9d9] text-[12px]">{t}</span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-[24px] py-[16px]">
                      <Switch checked={mcp.isPublic} onChange={() => {}} />
                    </td>
                    <td className="px-[24px] py-[16px] text-[14px]">
                      <span className="text-[#1473e6] cursor-pointer mr-[12px] hover:underline" onClick={() => openEdit(mcp)} data-ai-alt="编辑MCP">编辑</span>
                      <span className="text-[#e1251b] cursor-pointer hover:underline" onClick={() => handleDelete(mcp.id)} data-ai-alt="删除MCP">删除</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 新建/编辑MCP弹窗 */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div className="bg-white w-[480px] rounded-[8px] shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e5e5]">
                <h3 className="text-[16px] font-medium text-[#333]">{modalMode === 'create' ? '创建MCP服务' : '编辑MCP服务'}</h3>
                <i className="fas fa-times text-[#999] cursor-pointer" onClick={() => setIsModalOpen(false)}></i>
              </div>
              <div className="p-[24px] space-y-[16px]">
                <div>
                  <label className="block text-[14px] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>MCP服务名称</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                  />
                </div>
                <div className="flex items-center space-x-[24px]">
                  <label className={`flex items-center text-[14px] ${modalMode === 'edit' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                    <span className={`w-[16px] h-[16px] rounded-full border mr-[8px] flex items-center justify-center ${formData.protocol === 'http' ? 'border-[#1473e6]' : 'border-[#d9d9d9]'}`}>
                      {formData.protocol === 'http' && <span className="w-[8px] h-[8px] bg-[#1473e6] rounded-full"></span>}
                    </span> 
                    Streamable HTTP
                  </label>
                  <label className={`flex items-center text-[14px] ${modalMode === 'edit' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                    <span className={`w-[16px] h-[16px] rounded-full border mr-[8px] flex items-center justify-center ${formData.protocol === 'sse' ? 'border-[#1473e6]' : 'border-[#d9d9d9]'}`}>
                      {formData.protocol === 'sse' && <span className="w-[8px] h-[8px] bg-[#1473e6] rounded-full"></span>}
                    </span> 
                    SSE
                  </label>
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]"><span className="text-[#e1251b] mr-[4px]">*</span>MCP服务地址</label>
                  <input 
                    type="text" 
                    placeholder="例如：http://localhost:3000/sse" 
                    value={formData.url}
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    disabled={modalMode === 'edit'}
                    className={`w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] ${modalMode === 'edit' ? 'bg-[#f5f5f5] cursor-not-allowed text-[#999]' : 'focus:outline-none focus:border-[#1473e6]'}`}
                  />
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]">认证密钥</label>
                  <input 
                    type="text" 
                    placeholder="选填" 
                    value={formData.secret}
                    onChange={e => setFormData({...formData, secret: e.target.value})}
                    className="w-full h-[36px] px-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:outline-none focus:border-[#1473e6]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] mb-[8px]">描述</label>
                  <textarea 
                    value={formData.desc}
                    onChange={e => setFormData({...formData, desc: e.target.value})}
                    className="w-full h-[80px] p-[12px] border border-[#d9d9d9] rounded-[4px] text-[14px] resize-none focus:outline-none focus:border-[#1473e6]" 
                    placeholder=""
                  ></textarea>
                </div>
              </div>
              <div className="px-[24px] py-[16px] border-t border-[#e5e5e5] flex justify-end space-x-[12px]">
                <button onClick={() => setIsModalOpen(false)} className="px-[16px] py-[6px] border border-[#d9d9d9] rounded-[4px] text-[14px]">取消</button>
                <button onClick={() => setIsModalOpen(false)} className="px-[16px] py-[6px] bg-[#1473e6] text-white rounded-[4px] text-[14px]">确定</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {deleteId && (
        <ConfirmModal
          title="deco-sandbox.jd.com 上的嵌入式页面显示"
          content="确定要删除该接入点吗？此操作无法恢复。"
          hint="提示：已被产品使用的MCP服务无法删除。"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </Layout>
  );
}

export default McpServicePage;