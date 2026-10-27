import { useRef, useState, type FormEvent, type MouseEvent, type RefObject } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Logo } from './Header';
import {
  contactCopy,
  emergencyNotice,
  faqs,
  footerDescription,
  footerDisclaimer,
  footerGroups,
  onePageSummary,
  privacyPrinciples,
  termsPrinciples,
} from '../data/contactContent';

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = { name: '', email: '', message: '' };

export function FAQ() {
  return (
    <section id="faq" className="section bg-white" aria-labelledby="faq-heading">
      <div className="container grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">Questions, answered</p>
          <h2 id="faq-heading" className="section-heading max-w-sm">
            Clarity is part<br />of the product.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-[#52645D]">
            What works today, what comes next, and where professional care remains essential.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#08754D]">
            <ShieldCheck size={18} aria-hidden="true" />
            Early concept. Clear boundaries.
          </p>
        </div>

        <div className="divide-y divide-[#DCE5DB] border-y border-[#DCE5DB]">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group py-3">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-2 text-base font-semibold leading-6 text-[#10251F] [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 text-xs font-medium tabular-nums text-[#52645D]" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className="shrink-0 text-[#08754D] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-3 pl-7 text-base leading-7 text-[#52645D]">{faq.answer}</p>
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

  const resetForm = () => {
    setValues(emptyForm);
    setErrors({});
    setSuccess(false);
    nameRef.current?.focus();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = 'Enter at least two characters. Use a fictional name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email format, such as alex@example.com.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Add at least 10 characters about the type of collaboration.';
    }

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
    const url = URL.createObjectURL(
      new Blob([onePageSummary], { type: 'text/html;charset=utf-8' }),
    );
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
        <div className="overflow-hidden rounded-3xl border border-[#063F32] bg-[#063F32] text-white">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#E8B93F]">
                  The next chapter
                </p>
                <h2 id="contact-heading" className="mt-5 max-w-lg text-[clamp(2rem,3.2vw,3rem)] leading-[1.12] font-medium tracking-[-.04em] text-white">
                  {contactCopy.headline}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#D9E6DD]">
                  {contactCopy.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => nameRef.current?.focus()}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E8B93F] px-5 py-3 text-sm font-semibold text-[#10251F] transition-colors hover:bg-[#F0CA65] active:bg-[#D8A92F]"
                  >
                    Request Product Overview
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>
                  <a
                    href="#journey"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#759C8B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A5644]"
                  >
                    Explore Prototype
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={downloadSummary}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-[#759C8B] underline-offset-4 hover:decoration-white"
                  >
                    <Download size={18} aria-hidden="true" />
                    Download One-Page Summary
                  </button>
                  <p className="mt-1 min-h-12 max-w-sm text-xs leading-5 text-[#D9E6DD]" role="status">
                    {downloaded
                      ? 'Summary downloaded. Open the HTML file to print or save as PDF.'
                      : 'A local HTML document with a Print / Save as PDF option.'}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-[#3E6B5A] pt-6">
                <p className="text-xs font-medium text-[#D9E6DD]">
                  Contact details to verify before submission
                </p>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {contactCopy.placeholders.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-[#D9E6DD]">{label}</dt>
                      <dd className="mt-1 break-words text-sm font-medium text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="m-2 rounded-2xl bg-[#F7F8F2] p-5 text-[#10251F] sm:m-3 sm:p-8 lg:ml-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-[#08754D]">
                <FileText size={17} aria-hidden="true" />
                Contact preview
              </div>
              <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight">
                Try a conversation starter.
              </h3>
              <p id="contact-demo-note" className="mt-3 text-sm leading-6 text-[#52645D]">
                {contactCopy.formNote} Do not include personal health information.
              </p>

              <form
                id="contact-form"
                className="mt-6 space-y-4"
                noValidate
                onSubmit={submit}
                aria-describedby="contact-demo-note"
              >
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
                    Name <span className="font-normal text-[#52645D]">(required)</span>
                  </label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="off"
                    placeholder="Alex Example"
                    value={values.name}
                    onChange={(event) => updateValue('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className="field w-full bg-white text-base"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-sm text-[#973B2E]" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
                    Email <span className="font-normal text-[#52645D]">(required)</span>
                  </label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="off"
                    placeholder="alex@example.com"
                    value={values.email}
                    onChange={(event) => updateValue('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="field w-full bg-white text-base"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-sm text-[#973B2E]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
                    What would you like to explore?{' '}
                    <span className="font-normal text-[#52645D]">(required)</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={3}
                    placeholder="For example: research design or a usability study."
                    value={values.message}
                    onChange={(event) => updateValue('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="field w-full resize-y bg-white text-base"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-2 text-sm text-[#973B2E]" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="button grow">
                    Complete demo form
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE5DB] px-4 text-sm font-semibold text-[#063F32] hover:bg-[#EDF4EC]"
                  >
                    <RotateCcw size={16} aria-hidden="true" />
                    Clear
                  </button>
                </div>

                <div className="min-h-36 sm:min-h-24" aria-live="polite" aria-atomic="true">
                  {success ? (
                    <p className="flex items-start gap-2 rounded-xl border border-[#B5D3BF] bg-[#EDF4EC] p-3 text-sm leading-6 text-[#063F32]">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{contactCopy.success}</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 pt-2 text-xs leading-5 text-[#52645D]">
                      <LockKeyhole size={14} className="shrink-0" aria-hidden="true" />
                      Local validation only. No information is sent or saved.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type LegalDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  id: string;
  title: string;
  introduction: string;
  principles: ReadonlyArray<readonly [string, string]>;
};

function LegalDialog({ dialogRef, id, title, introduction, principles }: LegalDialogProps) {
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < left || event.clientX > right ||
      event.clientY < top || event.clientY > bottom
    ) {
      event.currentTarget.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={`${id}-dialog`}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-intro`}
      onClick={closeOnBackdrop}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[#DCE5DB] bg-[#F7F8F2] p-6 text-[#10251F] shadow-2xl backdrop:bg-[#03251D]/65 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.1em] text-[#08754D]">
            Draft · Not a final legal policy
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#DCE5DB] bg-white text-[#063F32] hover:bg-[#EDF4EC]"
          aria-label={`Close ${title.toLowerCase()}`}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <p id={`${id}-intro`} className="mt-4 text-base leading-7 text-[#52645D]">
        {introduction}
      </p>
      <div className="mt-6 space-y-5">
        {principles.map(([heading, description]) => (
          <section key={heading}>
            <h3 className="text-base font-semibold text-[#063F32]">{heading}</h3>
            <p className="mt-2 text-base leading-7 text-[#52645D]">{description}</p>
          </section>
        ))}
      </div>
      <button type="button" onClick={() => dialogRef.current?.close()} className="button mt-7">
        Done
      </button>
    </dialog>
  );
}

export function Footer({ onPresent, presentationActive = false }: { onPresent?: () => void; presentationActive?: boolean } = {}) {
  const privacyRef = useRef<HTMLDialogElement>(null);
  const termsRef = useRef<HTMLDialogElement>(null);

  return (
    <footer className="border-t border-[#DCE5DB] bg-[#EDF4EC] pt-12 pb-6">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
          <div>
            <a href="#top" className="brand-link min-h-11" aria-label="FearlessU home">
              <Logo />
            </a>
            <p className="mt-4 max-w-sm text-base leading-7 text-[#52645D]">
              {footerDescription}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#BFD2C1] bg-[#F7F8F2] px-3 py-2 text-xs font-medium text-[#063F32]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#08754D]" aria-hidden="true" />
              Early concept / interactive prototype
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 xl:grid-cols-5">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-2 text-sm font-semibold text-[#10251F]">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex min-h-11 items-center py-2 text-sm leading-5 text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {group.title === 'Company' && (
                  <p className="mt-2 text-xs leading-5 text-[#52645D]">
                    LinkedIn<br />
                    <span className="text-[#52645D]">Verified URL to be added</span>
                  </p>
                )}
              </div>
            ))}
            <div id="investors" className="scroll-mt-28">
              <h2 className="mb-2 text-sm font-semibold text-[#10251F]">For investors</h2>
              <ul>
                {onPresent && <li><button id="present-toggle" type="button" aria-pressed={presentationActive}
                  className="inline-flex min-h-11 items-center py-2 text-sm text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4"
                  onClick={() => { if (presentationActive) document.getElementById('presentation-chapter')?.focus(); else onPresent(); }}>Present</button></li>}
                {[
                  ['View demo', '#journey'],
                  ['View accelerator case', '#accelerator'],
                  ['Accelerator application', '#application'],
                  ['Explore the research vision', '#research'],
                ].map(([label, href]) => <li key={href}><a href={href} className="inline-flex min-h-11 items-center py-2 text-sm leading-5 text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4">{label}</a></li>)}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold text-[#10251F]">Safety & legal</h2>
              <ul>
                <li>
                  <a href="#safety" className="inline-flex min-h-11 min-w-11 items-center py-2 text-sm text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4">
                    Safety approach
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    id="privacy-button"
                    onClick={() => privacyRef.current?.showModal()}
                    className="inline-flex min-h-11 min-w-11 items-center py-2 text-sm text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    id="terms-button"
                    onClick={() => termsRef.current?.showModal()}
                    className="inline-flex min-h-11 min-w-11 items-center py-2 text-sm text-[#52645D] hover:text-[#063F32] hover:underline hover:underline-offset-4"
                  >
                    Terms
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-9 border-t border-[#CCDACC] pt-6">
          <div className="flex items-start gap-3 rounded-xl border border-[#CCDACC] bg-[#F7F8F2] p-4">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#08754D]" aria-hidden="true" />
            <div className="text-xs leading-6 text-[#52645D]">
              <p>{footerDisclaimer}</p>
              <p className="mt-1 font-medium text-[#063F32]">{emergencyNotice}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-2 text-xs leading-5 text-[#52645D] sm:flex-row">
            <p>© {new Date().getFullYear()} FearlessU.</p>
            <p>Application preview. No institutional endorsement or acceptance claimed.</p>
          </div>
        </div>
      </div>

      <LegalDialog
        dialogRef={privacyRef}
        id="privacy"
        title="Privacy principles"
        introduction="This prototype is not ready to collect real personal or health information. These principles explain its current boundaries and proposed production requirements."
        principles={privacyPrinciples}
      />
      <LegalDialog
        dialogRef={termsRef}
        id="terms"
        title="Prototype terms"
        introduction="Draft usage principles for an educational demonstration. These are not complete service terms or a final legal policy."
        principles={termsPrinciples}
      />
    </footer>
  );
}
