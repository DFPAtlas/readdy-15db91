import { useState, type FormEvent } from 'react';

const DEMO_FORM_URL = 'https://readdy.ai/api/form/da7c0cmij9sffln41rqg';

export default function CtaSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem('website_alt') as HTMLInputElement)?.value?.trim();
    if (honeypot) {
      setStatus('success');
      setErrorMsg('');
      form.reset();
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const fd = new FormData(form);
    const params = new URLSearchParams();
    fd.forEach((value, key) => {
      if (key === 'website_alt') return;
      const str = String(value);
      if (str.trim() !== '') params.append(key, str);
    });

    try {
      const res = await fetch(DEMO_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const responseText = await res.text();
      let parsed: Record<string, unknown> = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        /* ignore parse errors */
      }
      const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;

      if (res.ok && (parsed as { code?: string })?.code === 'OK') {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(typeof serverMsg === 'string' ? serverMsg : 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section id="demo" className="relative py-20 md:py-28 overflow-hidden bg-sidebar">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Minimal%20abstract%20architectural%20render%20of%20a%20modern%20building%20under%20construction%20layered%20geometric%20scaffolding%20forms%20emerald%20teal%20and%20slate%20tones%20soft%20gradient%20lighting%20clean%20premium%20enterprise%20aesthetic%20wide%20panoramic%20composition%20subtle%20grid%20texture&width=1600&height=600&seq=landing-cta-01&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-sidebar/90"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight leading-tight">
            Ready to run your business with clarity?
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-lg">
            See how SterlingLet Contractor can tighten your commercial control, speed up your valuations and keep you
            compliant — in a free 14-day trial with no credit card required.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              '14-day free trial, full feature access',
              'Onboarding with a UK construction specialist',
              'Cancel anytime — keep your data',
            ].map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-white/90">
                <span className="w-5 h-5 rounded-full bg-white/10 text-primary-300 flex items-center justify-center">
                  <i className="ri-check-line text-sm"></i>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-lg font-semibold text-main font-display">Book a personalised demo</h3>
          <p className="mt-1 text-sm text-muted">Tell us a little about your business and we&apos;ll be in touch within one working day.</p>

          <form data-readdy-form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="demo-name" className="block text-xs font-medium text-main mb-1.5">Full name</label>
              <input
                id="demo-name"
                name="name"
                type="text"
                required
                className="w-full h-11 px-3.5 rounded-lg border border-border bg-page text-sm text-main placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-50 outline-none transition-colors"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label htmlFor="demo-email" className="block text-xs font-medium text-main mb-1.5">Work email</label>
              <input
                id="demo-email"
                name="email"
                type="email"
                required
                className="w-full h-11 px-3.5 rounded-lg border border-border bg-page text-sm text-main placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-50 outline-none transition-colors"
                placeholder="jane@yourcompany.co.uk"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-company" className="block text-xs font-medium text-main mb-1.5">Company</label>
                <input
                  id="demo-company"
                  name="company"
                  type="text"
                  className="w-full h-11 px-3.5 rounded-lg border border-border bg-page text-sm text-main placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-50 outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="demo-phone" className="block text-xs font-medium text-main mb-1.5">Phone</label>
                <input
                  id="demo-phone"
                  name="phone"
                  type="tel"
                  className="w-full h-11 px-3.5 rounded-lg border border-border bg-page text-sm text-main placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-50 outline-none transition-colors"
                  placeholder="Optional"
                />
              </div>
            </div>
            <div>
              <label htmlFor="demo-message" className="block text-xs font-medium text-main mb-1.5">
                What would you like to see?
              </label>
              <textarea
                id="demo-message"
                name="message"
                rows={3}
                maxLength={500}
                className="w-full px-3.5 py-3 rounded-lg border border-border bg-page text-sm text-main placeholder:text-muted focus:border-primary-300 focus:ring-2 focus:ring-primary-50 outline-none transition-colors resize-none"
                placeholder="Tell us about your projects and what you'd like to improve."
              ></textarea>
            </div>

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="website_alt"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              readOnly
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full h-11 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {status === 'loading' ? 'Sending…' : 'Request my demo'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-status-green font-medium flex items-center gap-2">
                <i className="ri-checkbox-circle-line"></i> Thanks — we&apos;ll be in touch shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-status-red font-medium flex items-center gap-2">
                <i className="ri-error-warning-line"></i> {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}