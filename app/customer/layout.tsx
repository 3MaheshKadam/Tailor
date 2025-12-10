import CustomerHeader from '@/components/layout/CustomerHeader';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <CustomerHeader />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}