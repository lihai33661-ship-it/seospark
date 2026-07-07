export default function Refund() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 7, 2026</p>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Free Tier</h2>
          <p>
            The free tier includes 3 article generations. No credit card or payment is required.
            There is nothing to refund on the free tier.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Monthly Subscriptions</h2>
          <p>
            You can cancel your Pro plan at any time — there are no contracts and no cancellation fees.
            If you cancel within 7 days of your first payment, we'll issue a full refund.
            After 7 days, refunds are handled on a case-by-case basis. Just email us and we'll make it right.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Lifetime Plan (Founding Member)</h2>
          <p>
            The Founding Member lifetime plan has a 14-day money-back guarantee.
            If you're not satisfied within the first 14 days, you get a full refund — no questions asked.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. How to Request a Refund</h2>
          <p>
            Email{' '}
            <a href="mailto:hello@seospark.net" className="text-blue-600 underline">
              hello@seospark.net
            </a>{' '}
            with the email address you used for payment. We process refunds within 48 hours.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Contact</h2>
          <p>
            Questions? Email us at{' '}
            <a href="mailto:hello@seospark.net" className="text-blue-600 underline">
              hello@seospark.net
            </a>.
          </p>
        </div>
      </section>
    </main>
  );
}
