import React from 'react';
import AppFormDrawerFrame from '../components/AppFormDrawerFrame';
import AppFormDrawerContent from '../components/AppFormDrawerContent';

function AppFormDrawerPage() {
  return (
    <div className="w-full h-full bg-[#f4f5f7]">
      <AppFormDrawerFrame>
        <AppFormDrawerContent />
      </AppFormDrawerFrame>
    </div>
  );
}

export default AppFormDrawerPage;