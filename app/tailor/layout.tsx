import TailorSidebar from '@/components/layout/TailorSidebar';
import TailorHeader from '@/components/layout/TailorHeader';

export default function TailorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TailorSidebar />
      <div className="lg:pl-64">
        <TailorHeader />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}