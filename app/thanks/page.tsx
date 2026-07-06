export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="m9 11 3 3L22 4"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Payment received — thank you!</h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Your SEO Spark subscription is being activated. You&apos;ll receive a confirmation email within 24 hours with instructions to unlock your Pro features.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Questions? Email us at{" "}
          <a href="mailto:hello@seospark.net" className="text-blue-600 underline">
            hello@seospark.net
          </a>
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </main>
  );
}
