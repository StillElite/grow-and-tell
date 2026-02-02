import { useState } from 'react';
import {
  Sidebar,
  Welcome,
  PlanSection,
  ReflectSection,
} from '../src/components';
import { ViewKey } from '../src/types/types';
import SectionView from '../src/components/Dashboard/SectionView';
import { BreadcrumbItem } from '../src/components/shared/Breadcrumb';
import PageHeader from '../src/components/shared/PageHeader';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewKey>(ViewKey.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState<string | null>(null);

  const breadcrumbItems: BreadcrumbItem[] =
    activeView === 'Dashboard'
      ? [{ label: 'Dashboard' }]
      : [
          {
            label: 'Dashboard',
            onClick: () => setActiveView(ViewKey.Dashboard),
          },
          { label: activeView },
        ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleNavigation = (view: ViewKey) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const sidebarWrapperClasses = `
  fixed md:sticky top-0 left-0 h-screen z-50 transform transition-transform duration-300 ease-in-out 
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
`;

  return (
    <div className='min-h-screen flex bg-[#f3f5f2]'>
      {/* Sidebar wrapper */}
      <div className={sidebarWrapperClasses}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={handleNavigation}
          onDeselectBed={() => setSelectedBedId(null)}
        />
      </div>

      {/* Main Content */}

      <main className='flex-1 p-8 overflow-y-auto'>
        {/* Rest of dashboard content */}
        {activeView === 'Dashboard' ? (
          <>
            <PageHeader
              breadcrumbItems={breadcrumbItems}
              onLogout={handleLogout}
              onOpenMenu={() => setIsSidebarOpen(true)}
            />
            <Welcome />
            <PlanSection onSelect={(section) => setActiveView(section)} />
            <ReflectSection onSelect={(section) => setActiveView(section)} />
          </>
        ) : (
          <SectionView
            activeView={activeView}
            onNavigate={setActiveView}
            selectedBedId={selectedBedId}
            setSelectedBedId={setSelectedBedId}
            onOpenMenu={() => setIsSidebarOpen(true)}
          />
        )}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden pointer-events-none'
          aria-hidden='true'
        />
      )}
    </div>
  );
};

export default Dashboard;
