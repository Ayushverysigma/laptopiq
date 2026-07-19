export default function StaticPage({ pageType }) {
  const content = {
    guide: {
      title: "Buying Guide",
      body: (
        <div className="space-y-6">
          <p>
            Buying a laptop for college can be overwhelming. At LaptopIQ, we
            break it down into a few simple metrics:
          </p>
          <h3 className="text-xl font-bold mt-4">1. Identify Your Use Case</h3>
          <p>
            Are you an engineering student running heavy CAD software, or an
            arts student needing color accuracy? Your major determines your
            needs.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Engineering/Architecture:</strong> Prioritize a dedicated
              GPU (like RTX 3050+) and 16GB+ RAM.
            </li>
            <li>
              <strong>Arts/Design:</strong> Focus on screen quality (OLED or
              100% sRGB) and a capable processor.
            </li>
            <li>
              <strong>Business/Humanities:</strong> Battery life and portability
              are your best friends.
            </li>
          </ul>
          <h3 className="text-xl font-bold mt-4">2. Set a Realistic Budget</h3>
          <p>
            Don't overspend if you don't need to. A ₹40,000 laptop is perfect
            for writing essays and web browsing, but you'll need ₹70,000+ for
            serious video editing or gaming.
          </p>
          <h3 className="text-xl font-bold mt-4">3. Check the Weight</h3>
          <p>
            You'll be carrying this around campus all day. Try to stay under
            1.8kg if you walk a lot.
          </p>
        </div>
      ),
    },
    faqs: {
      title: "Frequently Asked Questions",
      body: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold">
              How does the scoring system work?
            </h3>
            <p className="mt-1">
              We run your quiz answers against our database of laptops, scoring
              them out of 100 based on how well they match your budget, major,
              and preferences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Are the prices accurate?</h3>
            <p className="mt-1">
              Yes, but prices fluctuate. Our data is periodically synced with
              major retailers, but always click through to check the final
              price.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">
              Why did you recommend a laptop slightly over my budget?
            </h3>
            <p className="mt-1">
              Sometimes spending an extra ₹2,000 gets you a vastly superior
              machine. We show you these options but clearly mark them as "Over
              budget" so you can make an informed choice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Mac or Windows?</h3>
            <p className="mt-1">
              It depends on your major! Some engineering software only runs on
              Windows, while creatives often prefer macOS. We ask about this in
              the quiz.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-6">
          <p>
            Your privacy is important to us. This is a demo project, but here is
            how we would handle data:
          </p>
          <h3 className="text-xl font-bold mt-4">Data Collection</h3>
          <p>
            We do not collect personally identifiable information. The answers
            you provide in the quiz are stored locally in your browser to
            improve your experience and generate recommendations.
          </p>
          <h3 className="text-xl font-bold mt-4">Cookies</h3>
          <p>
            We use local storage to save your wishlist and recent quiz results
            so you don't lose them when you refresh the page.
          </p>
          <h3 className="text-xl font-bold mt-4">Affiliate Links</h3>
          <p>
            Clicking on retailer links (like Amazon or Flipkart) may contain
            affiliate tracking codes, which help support the site at no extra
            cost to you.
          </p>
        </div>
      ),
    },
  };

  const { title, body } = content[pageType] || content.guide;

  return (
    <main className="max-w-4xl mx-auto px-5 py-20 relative z-10 min-h-[70vh]">
      <div className="mb-12">
        <h1 className="display text-5xl sm:text-7xl text-[var(--ink)] uppercase t3d-ink mb-6">
          {title}
        </h1>
        <div className="w-24 h-2 bg-[var(--red)]"></div>
      </div>
      <div className="text-lg text-[var(--ink)] mono leading-relaxed border-[3px] border-[var(--ink)] bg-white p-8 sm:p-12 shadow-[8px_8px_0_var(--ink)]">
        {body}
      </div>
    </main>
  );
}
