import React, { useState } from 'react';
import Layout from '../components/Layout';
import AppCard from '../components/AppCard';
import AppFormDrawerFrame from '../components/AppFormDrawerFrame';
import AppFormDrawerContent from '../components/AppFormDrawerContent';
import ConfirmModal from '../components/ConfirmModal';

const initialDataList = [
  { 
    id: '11664', name: '测试1', voice: '美声-男声', date: '2026-06-24 14:48', author: 'jd_cVqWlSefhCQV', productVersion: 'standard',
    productType: 'KJ-350', productCategory: '空气净化器', productPart: '后背', iotPlatform: '小家', typeDesc: '标准型空气净化设备',
    devBoardId: '-', devBoardType: '-', serialPrefix: 'TCLS_KEVINBOX2__', desc: '12345'
  },
  { 
    id: '11566', name: '609平台学习', voice: '秦彻 (测试)', date: '2026-06-09 14:56', author: 'jd_cVqWlSefhCQV', productVersion: 'lite',
    productType: '609-Lite', productCategory: '', productPart: '', iotPlatform: '', typeDesc: '',
    devBoardId: 'kevin-box-lite', devBoardType: '-', serialPrefix: 'TCLS_609LITE___', desc: '609平台学习设备'
  }
];

function IndexPage() {
  const [dataList, setDataList] = useState(initialDataList);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('create'); // create | edit
  const [editData, setEditData] = useState(null);

  const handleCreate = () => {
    setDrawerMode('create');
    setEditData(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (data) => {
    setDrawerMode('edit');
    setEditData(data);
    setIsDrawerOpen(true);
  };

  const handleConfig = (data) => {
    window.__currentAppVersion = data?.productVersion || 'lite';
    window.__currentAppData = data;
    window.__setCurrentPage('appConfig');
  };

  const handleSaveForm = (formData) => {
    if (drawerMode === 'edit' && editData) {
      setDataList(dataList.map(item => item.id === editData.id ? { ...item, ...formData } : item));
    } else {
      const newId = String(Date.now()).slice(-5);
      setDataList([...dataList, { 
        ...formData, 
        id: newId, 
        date: '2026-07-23 10:00', 
        author: 'jd_cVqWlSefhCQV' 
      }]);
    }
    setIsDrawerOpen(false);
  };

  const handleDeviceManage = (data) => {
    window.__setCurrentPage('deviceManage');
  };

  const [deleteData, setDeleteData] = useState(null);

  const handleDelete = (data) => {
    setDeleteData(data);
  };

  const confirmDelete = () => {
    setDeleteData(null);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#f4f5f7]">
        <div className="px-[24px] py-[16px] bg-white border-b border-[#e5e5e5] flex items-center justify-between" style={{ height: "60px" }}>
          <div>
            <h1 className="text-[20px] font-bold text-[#333] mb-[4px]" data-path-hash="ad6701">产品管理</h1>
            <p className="text-[14px] text-[#999]" data-path-hash="3afd26">产品能够决定设备拥有什么样的能力，一个产品可以绑定多个设备。</p>
          </div>
          <div className="flex items-center space-x-[16px]">
            <div className="relative w-[280px]">
              <input 
                type="text" 
                placeholder="输入产品名称" 
                className="w-full h-[32px] pl-[12px] pr-[32px] border border-[#d9d9d9] rounded-[4px] text-[14px] focus:border-[#1473e6] focus:outline-none"
                data-ai-alt="搜索产品输入框"
              />
              <i className="fas fa-search absolute right-[10px] top-[9px] text-[#999] cursor-pointer"></i>
            </div>
            <button 
              onClick={handleCreate}
              data-action="go-appFormDrawer"
              className="h-[32px] px-[16px] bg-[#1473e6] text-white rounded-[4px] text-[14px] hover:bg-[#115ebb] flex items-center"
              data-ai-alt="新建应用按钮"
            >
              <i className="fas fa-plus mr-[4px]"></i> 新建
            </button>
          </div>
        </div>

        <div className="p-[24px] flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] mb-[24px]" data-ai-list="true">
            {dataList.map((item, index) => (
              <AppCard key={index} data={item} onEdit={() => handleEdit(item)} onConfig={handleConfig} onDeviceManage={() => handleDeviceManage(item)} onDelete={() => handleDelete(item)} />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#666]">共{dataList.length}条数据</span>
            <div className="flex space-x-[8px]">
              <button className="w-[32px] h-[32px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="上一页"><i className="fas fa-chevron-left text-[12px]"></i></button>
              <button className="w-[32px] h-[32px] flex items-center justify-center border border-[#1473e6] text-[#1473e6] rounded-[4px] bg-white" data-ai-alt="第1页">1</button>
              <button className="w-[32px] h-[32px] flex items-center justify-center border border-[#d9d9d9] rounded-[4px] text-[#ccc] cursor-not-allowed bg-white" data-ai-alt="下一页"><i className="fas fa-chevron-right text-[12px]"></i></button>
            </div>
          </div>
        </div>

        {/* 交互层抽屉 */}
        {isDrawerOpen && (
          <AppFormDrawerFrame onMaskClick={() => setIsDrawerOpen(false)}>
            <AppFormDrawerContent 
              title={drawerMode === 'create' ? '新建产品' : '编辑产品'} 
              initialData={editData}
              onClose={() => setIsDrawerOpen(false)} 
              onSave={handleSaveForm}
            />
          </AppFormDrawerFrame>
        )}
      </div>

      {deleteData && (
        <ConfirmModal
          title="deco-sandbox.jd.com 上的嵌入式页面显示"
          content="确定要删除该产品吗？此操作无法恢复。"
          hint="提示：存在正在使用的设备时无法删除。"
          onCancel={() => setDeleteData(null)}
          onConfirm={confirmDelete}
        />
      )}
    </Layout>
  );
}

export default IndexPage;