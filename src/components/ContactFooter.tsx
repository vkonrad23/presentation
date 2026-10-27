import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Download, FileText, Leaf, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { contactCopy, emergencyNotice, faqs, footerDisclaimer, onePageSummary, privacyPrinciples } from '../data/contactContent';

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
const emptyForm: FormValues = { name: '', email: '', message: '' };

export function FAQ() {
  return (
    <section className="section bg-white" id="faq" aria-labelledby="faq-heading">
      <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow">A little more clarity</p>
          <h2 id="faq-heading" className="section-heading">Good questions.<br />Honest answers.</h2>
          <p className="muted mt-5 max-w-sm">The distinction between a promising idea and a proven product matters. Here is where FearlessU stands today.</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFF4C7] px-4 py-2 text-xs font-semibold text-[#0B3D2E]">
            <ShieldCheck size={15} aria-hidden="true" /> Early concept. Transparent by design.
          </div>
        </div>
        <div className="divide-y divide-[#DDE9E1] border-y border-[#DDE9E1]">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-[#14241D] [&::-webkit-details-marker]:hidden">
                <span className="flex gap-4"><span className="mt-0.5 text-xs font-medium text-[#607067]">{String(index + 1).padStart(2, '0')}</span>{faq.question}</span>
                <ChevronDown className="mt-0.5 shrink-0 text-[#13A36D] transition-transform group-open:rotate-180" size={19} aria-hidden="true" />
              </summary>
              <p className="mt-4 pl-8 text-sm leading-7 text-[#607067]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSuccess(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = 'Enter a name with at least two characters. Use a fictional example.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = 'Enter a valid email format, such as alex@example.com.';
    if (values.message.trim().length < 10) nextErrors.message = 'Add at least 10 characters about the type of collaboration.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSuccess(false);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }
    setValues(emptyForm);
    setSuccess(true);
  };

  const downloadSummary = () => {
    const url = URL.createObjectURL(new Blob([onePageSummary], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fearlessu-one-page-summary.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0B3D2E] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#F7C948]">Let’s build responsibly</p>
              <h2 id="contact-heading" className="mt-5 max-w-xl text-3xl leading-[1.15] font-medium tracking-[-.04em] sm:text-[2.75rem]">{contactCopy.headline}</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/75">{contactCopy.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => nameRef.current?.focus()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F7C948] px-5 py-3 text-xs font-semibold text-[#14241D] transition hover:bg-[#FFF4C7]">Request Product Overview <ArrowUpRight size={15} aria-hidden="true" /></button>
                <a href="#journey" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10">Explore Prototype <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
              <button type="button" onClick={downloadSummary} className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"><Download size={16} aria-hidden="true" />Download One-Page Summary</button>
              <p className="mt-1 min-h-5 text-xs text-white/70" role="status">{downloaded ? 'Summary downloaded. Open the HTML file to print or save as PDF.' : 'A local, print-friendly HTML file. No information is collected.'}</p>
              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#F7C948]">Contact placeholders · Replace before submission</p>
                <dl className="mt-4 grid gap-x-5 gap-y-3 text-xs sm:grid-cols-2">
                  {contactCopy.placeholders.map(([label, value]) => <div key={label}><dt className="text-white/55">{label}</dt><dd className="mt-1 break-words text-white/85">{value}</dd></div>)}
                </dl>
              </div>
            </div>
            <div className="rounded-3xl bg-[#F8FBF7] p-5 text-[#14241D] sm:p-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B3D2E]"><FileText size={16} aria-hidden="true" /> A conversation starts here</div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">Try the contact form</h3>
              <p id="contact-demo-note" className="mt-2 text-xs leading-5 text-[#607067]">Demo only. Use fictional details. Do not enter personal health information. Nothing is sent or stored.</p>
              <form id="contact-form" className="mt-5 space-y-4" noValidate onSubmit={submit} aria-describedby="contact-demo-note">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold">Name <span className="font-normal text-[#607067]">(required)</span></label>
                  <input ref={nameRef} id="contact-name" name="name" type="text" required minLength={2} maxLength={80} autoComplete="off" placeholder="Alex Example" value={values.name} onChange={(event) => updateValue('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} className="field w-full rounded-xl border border-[#DDE9E1] bg-white px-4 py-3 text-sm outline-none focus:border-[#13A36D] focus:ring-2 focus:ring-[#13A36D]/20" />
                  {errors.name && <p id="contact-name-error" className="mt-2 text-xs text-[#9B352B]" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-semibold">Email <span className="font-normal text-[#607067]">(required)</span></label>
                  <input ref={emailRef} id="contact-email" name="email" type="email" required maxLength={254} autoComplete="off" placeholder="alex@example.com" value={values.email} onChange={(event) => updateValue('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className="field w-full rounded-xl border border-[#DDE9E1] bg-white px-4 py-3 text-sm outline-none focus:border-[#13A36D] focus:ring-2 focus:ring-[#13A36D]/20" />
                  {errors.email && <p id="contact-email-error" className="mt-2 text-xs text-[#9B352B]" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold">What would you like to explore? <span className="font-normal text-[#607067]">(required)</span></label>
                  <textarea ref={messageRef} id="contact-message" name="message" required minLength={10} maxLength={2000} rows={3} placeholder="For example: research design or a usability study." value={values.message} onChange={(event) => updateValue('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className="field w-full resize-y rounded-xl border border-[#DDE9E1] bg-white px-4 py-3 text-sm outline-none focus:border-[#13A36D] focus:ring-2 focus:ring-[#13A36D]/20" />
                  {errors.message && <p id="contact-message-error" className="mt-2 text-xs text-[#9B352B]" role="alert">{errors.message}</p>}
                </div>
                <button type="submit" className="button flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0B3D2E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#13563F]">Complete demo form <ArrowUpRight size={16} aria-hidden="true" /></button>
                {success && <div role="status" className="flex items-start gap-2 rounded-xl border border-[#13A36D]/25 bg-[#13A36D]/10 p-3 text-xs leading-5 text-[#0B3D2E]"><CheckCircle2 className="mt-0.5 shrink-0" size={16} aria-hidden="true" /><span>{contactCopy.success}</span></div>}
                <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#607067]"><LockKeyhole size={11} aria-hidden="true" />Local validation only · No backend connected</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const privacyRef = useRef<HTMLDialogElement>(null);
  return (
    <footer className="border-t border-[#DDE9E1] bg-white py-10">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-.04em] text-[#0B3D2E]" aria-label="FearlessU home"><span className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-[#0B3D2E] text-white"><Leaf size={20} aria-hidden="true" /><span className="absolute top-1.5 right-1 h-1.5 w-1.5 rounded-full bg-[#F7C948]" /></span>Fearless<span className="-ml-2 text-[#13A36D]">U</span></a>
            <p className="mt-3 text-xs text-[#607067]">A little less avoidance. A little more possibility.</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#DDE9E1] px-3 py-1 text-[10px] font-medium text-[#607067]"><span className="h-1.5 w-1.5 rounded-full bg-[#13A36D]" />Early concept / interactive prototype</span>
          </div>
          <nav aria-label="Footer navigation" className="flex max-w-md flex-wrap gap-x-6 gap-y-4 text-xs font-medium text-[#0B3D2E]">
            <a href="#product" className="hover:underline">Product</a><a href="#safety" className="hover:underline">Safety</a><a href="#evidence" className="hover:underline">Evidence roadmap</a><button type="button" className="cursor-pointer hover:underline" onClick={() => privacyRef.current?.showModal()}>Privacy</button><a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
        <div className="mt-8 border-t border-[#DDE9E1] pt-6 text-[11px] leading-5 text-[#607067]">
          <p>{footerDisclaimer}</p>
          <p className="mt-1">{emergencyNotice}</p>
          <div className="mt-5 flex flex-col justify-between gap-2 sm:flex-row"><span>© {new Date().getFullYear()} FearlessU. All rights reserved.</span><span>Application preview · No program endorsement or acceptance claimed.</span></div>
        </div>
      </div>
      <dialog ref={privacyRef} aria-labelledby="privacy-title" aria-describedby="privacy-intro" onClick={(event) => { if (event.target === event.currentTarget) privacyRef.current?.close(); }} className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-3xl border border-[#DDE9E1] bg-[#F8FBF7] p-6 text-[#14241D] shadow-2xl backdrop:bg-[#03180f]/60 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div><span className="badge inline-block rounded-full bg-[#FFF4C7] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0B3D2E]">Draft · Not a final legal policy</span><h2 id="privacy-title" className="mt-4 text-2xl font-semibold tracking-tight">Privacy principles</h2></div>
          <button type="button" onClick={() => privacyRef.current?.close()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#DDE9E1] bg-white hover:bg-[#FFF4C7]" aria-label="Close privacy principles"><X size={18} aria-hidden="true" /></button>
        </div>
        <p id="privacy-intro" className="mt-4 text-sm leading-6 text-[#607067]">This prototype demonstrates a product idea. It is not ready to collect real personal or health information.</p>
        <div className="mt-6 space-y-5">{privacyPrinciples.map(([title, description]) => <section key={title}><h3 className="text-sm font-semibold text-[#0B3D2E]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#607067]">{description}</p></section>)}</div>
        <button type="button" onClick={() => privacyRef.current?.close()} className="button mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0B3D2E] px-6 py-3 text-sm font-semibold text-white">Close privacy principles</button>
      </dialog>
    </footer>
  );
}
