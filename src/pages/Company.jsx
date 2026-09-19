import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { Breadcrumb, ButtonLink, Eyebrow, useShop } from '../App';
import { products } from '../data';
import { BrandStrip, ContactBanner } from './Home';

export function About() {
  return (
    <>
      <div className="about-hero">
        <div className="page-shell">
          <Breadcrumb items={[{ label: 'About Us' }]} />
          <Eyebrow>THE PEOPLE BEHIND THE PARTS</Eyebrow>
          <h1>
            WE’RE HERE
            <br />
            FOR <em>YOUR RIDE.</em>
          </h1>
          <div className="about-hero-bottom">
            <p>
              Because a bike is never just a bike.
              <br />
              It’s how your day gets going.
            </p>
            <span>
              ROADEEZ®
              <br />
              IT’S TIME TO GLIDE.
            </span>
          </div>
        </div>
      </div>
      <div className="about-image">
        <img
          src="/images/hero-motorcycle.jpg"
          alt="A motorcycle rider taking the open road at sunset"
        />
        <span>THE ROAD AHEAD IS YOURS.</span>
      </div>
      <section className="section page-shell about-story">
        <div>
          <Eyebrow>OUR STORY</Eyebrow>
          <h2>
            Small parts.
            <br />A bigger purpose.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            Every day, millions of riders turn a key and get on with life. We believe the parts they
            rely on should be just as dependable.
          </p>
          <p>
            ROADEEZ was imagined around a simple idea: finding the right part for your two-wheeler
            should feel easy. From the headlight that lights your way home to the panels that make
            your bike feel like yours, we pay attention to the details.
          </p>
          <p>
            Our purpose is to make everyday riding better through accessible parts, thoughtful fit,
            and people who understand what your bike means to you.
          </p>
          <span className="signature">Keep moving. Keep gliding.</span>
        </div>
      </section>
      <section className="about-values">
        <div className="page-shell section">
          <Eyebrow>WHAT DRIVES US</Eyebrow>
          <h2>Good things, built in.</h2>
          <div className="values-grid">
            {[
              {
                icon: ShieldCheck,
                title: 'Dependability, every day.',
                text: 'From busy streets to the long way home, we focus on parts that belong in your everyday.',
                number: '01',
              },
              {
                icon: Target,
                title: 'The details matter.',
                text: 'The right shape. The right mounting points. A fit that makes your bike feel like itself.',
                number: '02',
              },
              {
                icon: HeartHandshake,
                title: 'Riders come first.',
                text: 'Clear information, sensible choices, and help finding your way. That’s how we keep you moving.',
                number: '03',
              },
            ].map(({ icon: Icon, title, text, number }) => (
              <article key={number}>
                <div>
                  <Icon size={32} strokeWidth={1.5} />
                  <span>{number} /</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BrandStrip />
      <ContactBanner />
    </>
  );
}

const emptyForm = { name: '', email: '', phone: '', message: '' };
export function Contact() {
  const [params] = useSearchParams();
  const selectedProduct = products.find((p) => p.id === params.get('product'));
  const [form, setForm] = useState({
    ...emptyForm,
    message: selectedProduct
      ? `I’d like to check compatibility for the ${selectedProduct.name}. My bike model and year are: `
      : '',
  });
  const [subject, setSubject] = useState(params.get('subject') || 'General enquiry');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const { items, setBagOpen } = useShop();
  const updateField = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (
      form.phone &&
      (!/^\+?[\d\s()-]+$/.test(form.phone.trim()) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15)
    )
      next.phone = 'Please enter a valid phone number.';
    if (form.message.trim().length < 10)
      next.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    try {
      localStorage.setItem(
        'roadeez-last-enquiry',
        JSON.stringify({ ...form, subject, items, createdAt: new Date().toISOString() }),
      );
      setSavedLocally(true);
    } catch {
      setSavedLocally(false);
    }
    setSubmitted(true);
    requestAnimationFrame(() => document.getElementById('enquiry-confirmation')?.focus());
  };
  return (
    <>
      <div className="contact-page page-shell">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />
        <div className="contact-title">
          <Eyebrow>A GOOD RIDE STARTS WITH A CONVERSATION</Eyebrow>
          <h1>
            Let’s keep you <em>moving.</em>
          </h1>
          <p>A part, a question, or just a hello. We’re here to help.</p>
        </div>
        <div className="contact-layout">
          <aside className="contact-info">
            <h2>
              Real people.
              <br />
              Ready to help.
            </h2>
            <p>Tell us what you ride and what you need. We’ll help you take the next step.</p>
            <div className="contact-detail">
              <Mail size={22} />
              <div>
                <h3>Drop us a line</h3>
                <span>hello@roadeez.example</span>
                <small>Illustrative contact address</small>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 size={22} />
              <div>
                <h3>Here for your everyday</h3>
                <span>Monday – Saturday</span>
                <span>10:00 AM – 6:00 PM IST</span>
              </div>
            </div>
            <div className="contact-detail">
              <MapPin size={22} />
              <div>
                <h3>Made for Indian roads</h3>
                <span>New Delhi, India</span>
                <small>Demo location · visits by appointment</small>
              </div>
            </div>
            <div className="location-card">
              <div className="map-grid" />
              <span className="map-road road-one" />
              <span className="map-road road-two" />
              <span className="map-river" />
              <div className="map-marker">
                <MapPin size={22} fill="currentColor" />
                <span>
                  ROADEEZ
                  <br />
                  <small>NEW DELHI</small>
                </span>
              </div>
              <span className="map-caption">ILLUSTRATIVE LOCATION</span>
            </div>
          </aside>
          <div className="contact-form-panel">
            {submitted ? (
              <div className="form-success" id="enquiry-confirmation" tabIndex={-1}>
                <CheckCircle2 size={54} />
                <Eyebrow>YOU’RE ALL SET</Eyebrow>
                <h2>{savedLocally ? 'Your enquiry is saved.' : 'Your enquiry is ready.'}</h2>
                <p>
                  Thanks, {form.name.trim().split(' ')[0]}.{' '}
                  {savedLocally
                    ? 'Your details have been saved on this device.'
                    : 'Your details were validated, but this browser could not save them.'}{' '}
                  This is a demo, so no message has been sent.
                </p>
                <div>
                  <span>Enquiry topic</span>
                  <strong>{subject}</strong>
                  <span>Your email</span>
                  <strong>{form.email}</strong>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(emptyForm);
                    setSubject('General enquiry');
                  }}
                >
                  Start another enquiry <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit}>
                <h2>What can we help you with?</h2>
                <p className="form-intro">A few details and you’re on your way.</p>
                <div className="form-row">
                  <FormField
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    error={errors.name}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                  <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    error={errors.email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-row">
                  <FormField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    error={errors.phone}
                    placeholder="+91"
                    autoComplete="tel"
                  />
                  <label className="form-field">
                    <span>What’s it about?</span>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                      {[
                        'General enquiry',
                        'Product enquiry',
                        'Compatibility check',
                        'Partnership enquiry',
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="form-field">
                  <span>
                    Your message <b>*</b>
                  </span>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder="Tell us about your bike, the part you need, or how we can help…"
                    rows={5}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                  />
                  {errors.message && (
                    <small className="field-error" id="error-message">
                      {errors.message}
                    </small>
                  )}
                </label>
                {items.length > 0 && (
                  <div className="enquiry-attachment">
                    <div>
                      <Check size={17} />
                      <strong>
                        {items.length} {items.length === 1 ? 'part' : 'parts'} included in your
                        enquiry
                      </strong>
                      <button type="button" onClick={() => setBagOpen(true)}>
                        Edit list
                      </button>
                    </div>
                    {items.map((item) => (
                      <p key={item.id}>
                        {products.find((p) => p.id === item.id).name}
                        <span>× {item.quantity}</span>
                      </p>
                    ))}
                  </div>
                )}
                <button className="button submit-button" type="submit">
                  Save enquiry <ArrowUpRight size={19} />
                </button>
                <p className="form-demo-note">
                  Demo form: your enquiry is saved on this device. No message is sent. Required
                  fields are marked *.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <section className="contact-bottom">
        <div className="page-shell">
          <span>WHILE YOU’RE HERE</span>
          <h2>Your next upgrade is waiting.</h2>
          <ButtonLink to="/products" secondary>
            Explore our products
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function FormField({ label, name, error, required, ...props }) {
  return (
    <label className="form-field">
      <span>
        {label} {required && <b>*</b>}
      </span>
      <input
        id={`contact-${name}`}
        name={name}
        {...props}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
      />
      {error && (
        <small className="field-error" id={`error-${name}`}>
          {error}
        </small>
      )}
    </label>
  );
}
export function NotFound() {
  return (
    <section className="page-shell not-found">
      <Eyebrow>A LITTLE OFF THE BEATEN PATH</Eyebrow>
      <span>404</span>
      <h1>Let’s get you back on the road.</h1>
      <p>The page or part you’re looking for isn’t here.</p>
      <ButtonLink to="/products">Explore products</ButtonLink>
      <Link className="text-link" to="/">
        Back to home <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
