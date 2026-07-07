export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 6, 2026</p>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Data We Collect</h2>
          <p>
            We use a cookie to track your free article usage count. No personal data is stored in this cookie.
            We do not require sign-up, email, or payment information to use the free tier.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Content You Generate</h2>
          <p>
            Articles you generate are processed through OpenRouter API. We do not permanently store your
            generated content. Your keywords and outputs are transmitted to our AI provider solely for generation.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Payment Information</h2>
          <p>
            Payments are processed through Paddle. We never see or store your payment details
            (credit card numbers, bank accounts). Paddle handles all payment data securely.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Cookies</h2>
          <p>
            We use one functional cookie (spark_usage) to count your free article usage. This cookie
            contains only a number and expires after one year. We do not use tracking or advertising cookies.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>
          <p>
            We use OpenRouter for AI content generation and PayPal for payment processing.
            Please refer to their respective privacy policies for details on how they handle your data.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Your Rights</h2>
          <p>
            You own all content you generate. You can clear your cookie at any time to reset your usage count.
            Since we don't store personal data, there is no account to delete.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Contact</h2>
          <p>
            Questions? Email us at <a href="mailto:hello@seospark.net" className="text-blue-600 underline">hello@seospark.net</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
