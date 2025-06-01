import JobTitleAnalyzer from '@/components/JobTitleAnalyzer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Federal Job Title Plain Language Checker
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Enter a federal government job title to check if it follows plain language principles
          </p>
          <JobTitleAnalyzer />
        </div>
      </div>
    </main>
  );
}
