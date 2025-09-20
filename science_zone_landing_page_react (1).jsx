import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams } from "react-router-dom";

// Full single-file React app for Science Zone (multi-page, client-side routing)
// Tailwind CSS utility classes assumed to be available in the host project.
// This file is intentionally self-contained for quick prototyping. For production,
// split components into separate files and add API routes for form handling & payments.

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold">SZ</div>
          <div>
            <h1 className="text-lg font-semibold">Science Zone</h1>
            <p className="text-xs text-gray-500">Academic • Admission Coaching</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/" className={({isActive})=> isActive? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}>Home</NavLink>
          <NavLink to="/courses" className={({isActive})=> isActive? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}>Courses</NavLink>
          <NavLink to="/admission" className={({isActive})=> isActive? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}>Admission</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}>Contact</NavLink>
        </nav>

        <div className="hidden md:block">
          <Link to="/enroll" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow">Enroll Now</Link>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 rounded bg-indigo-50">Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-3">
          <Link to="/" className="block py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/courses" className="block py-2" onClick={() => setOpen(false)}>Courses</Link>
          <Link to="/admission" className="block py-2" onClick={() => setOpen(false)}>Admission</Link>
          <Link to="/contact" className="block py-2" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
}

const COURSES = [
  { id: 'hsc-bio', title: 'HSC Biology Full Course', subtitle: 'Theory + MCQ + Practical', duration: '12 weeks', price: '৳2,500', syllabus: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology'] },
  { id: 'med-adm', title: 'Admission Test Coaching (Medical)', subtitle: 'Past papers + Full mocks', duration: '10 weeks', price: '৳3,000', syllabus: ['Biology MCQ', 'Physics basics', 'Chemistry fundamentals'] },
  { id: 'oal-phys', title: 'O/A Level Physics Prep', subtitle: 'Concept-first approach', duration: '8 weeks', price: '৳2,800', syllabus: ['Mechanics', 'Waves', 'Electricity'] },
];

function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Learn Smart, Achieve More
            <span className="text-indigo-600"> — Science Zone</span>
          </h2>
          <p className="mt-4 text-gray-600">Comprehensive HSC & admission coaching with live classes, recorded lectures, weekly mocks and personalised feedback.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/enroll" className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow">Register Now</Link>
            <Link to="#courses" className="border border-gray-300 px-5 py-3 rounded-lg">View Courses</Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="font-semibold">লাইভ ক্লাস</div>
              <div className="text-gray-500 text-xs">সপ্তাহে ২ বার</div>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="font-semibold">মক টেস্ট</div>
              <div className="text-gray-500 text-xs">ফলাফল বিশ্লেষণ সহ</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold">Quick Enroll</h3>
          <p className="text-xs text-gray-500 mt-1">Fill your details — we will contact you within 24 hours.</p>
          <EnrollForm compact />
        </div>
      </section>

      <section id="courses" className="mt-12">
        <h3 className="text-2xl font-bold">Popular Courses</h3>
        <p className="text-gray-600 mt-2">Structured courses with weekly milestones and performance tracking.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {COURSES.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">{c.duration}</div>
              <h4 className="text-lg font-semibold mt-2">{c.title}</h4>
              <p className="text-gray-600 mt-1 text-sm">{c.subtitle}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-bold">{c.price}</div>
                <Link to={`/courses/${c.id}`} className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded">Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg">
        <h3 className="text-2xl font-bold">Admission Test Coaching</h3>
        <p className="mt-2 text-gray-600">Strategy-based coaching: time management, full-length mocks, and past paper analytics.</p>
        <div className="mt-4">
          <Link to="/admission" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg">Apply for Trial</Link>
        </div>
      </section>
    </main>
  );
}

function Courses() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Courses</h2>
      <p className="text-gray-600 mt-2">Explore all available courses and batches.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {COURSES.map(c => (
          <div key={c.id} className="bg-white p-5 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">{c.duration}</div>
            <h4 className="text-lg font-semibold mt-2">{c.title}</h4>
            <p className="text-gray-600 mt-1 text-sm">{c.subtitle}</p>
            <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
              {c.syllabus.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-bold">{c.price}</div>
              <Link to={`/courses/${c.id}`} className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = COURSES.find(c => c.id === id);
  const navigate = useNavigate();
  if (!course) return <main className="max-w-6xl mx-auto px-6 py-12">Course not found</main>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.subtitle}</p>
      <div className="mt-6 bg-white p-5 rounded-lg shadow-sm">
        <h4 className="font-semibold">Course Outline</h4>
        <ul className="list-inside list-decimal mt-3 text-sm text-gray-700">
          {course.syllabus.map((s,i) => <li key={i} className="py-1">{s}</li>)}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-bold">Price: {course.price}</div>
          <button onClick={() => navigate('/enroll', { state: { courseId: course.id } })} className="bg-indigo-600 text-white px-4 py-2 rounded">Enroll</button>
        </div>
      </div>
    </main>
  );
}

function Admission() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Admission Test Coaching</h2>
      <p className="text-gray-600 mt-2">Prepare for medical, engineering and university admission tests with focused strategy and full mocks.</p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold">What we offer</h4>
          <ul className="mt-3 list-disc list-inside text-gray-600 text-sm">
            <li>Past paper analysis</li>
            <li>Full-length weekly mocks</li>
            <li>Answer writing & MCQ techniques</li>
            <li>Performance reports & 1-on-1 feedback</li>
          </ul>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold">Batch options</h4>
          <p className="text-sm text-gray-600 mt-2">Regular batch / Crash course / Weekend batches — limited seats per batch to ensure quality.</p>
          <div className="mt-4">
            <Link to="/enroll" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg">Apply for Trial</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">About Science Zone</h2>
      <p className="text-gray-600 mt-2">Science Zone is an education platform focused on helping students clear exams with conceptual clarity and consistent practice.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="font-semibold">Experienced Tutors</div>
          <div className="text-sm text-gray-500 mt-1">ফ্যাকাল্টি দল স্কুল/কলেজ-স্তরের শিক্ষক এবং ভর্তি কোচিং অভিজ্ঞতা রাখে।</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="font-semibold">Small Batches</div>
          <div className="text-sm text-gray-500 mt-1">ব্যক্তিগত মনোযোগ ও নিয়মিত ফিডব্যাক।</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="font-semibold">Result Focused</div>
          <div className="text-sm text-gray-500 mt-1">মক ও পারফরম্যান্স বিশ্লেষণের মাধ্যমে উন্নতি নিশ্চিত করা হয়।</div>
        </div>
      </div>
    </main>
  );
}

function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Contact</h2>
      <p className="text-gray-600 mt-2">যে কোনো প্রশ্ন থাকলে নিচে মেসেজ করুন — আমরা ২৪ ঘণ্টার মধ্যে রেসপন্ড করবো।</p>
      <div className="mt-6 bg-white p-5 rounded-lg shadow-sm">
        <EnrollForm />
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold">Office</h4>
          <p className="text-sm text-gray-600 mt-1">Dhaka, Bangladesh • Monday-Saturday 10:00–19:00</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold">Follow</h4>
          <div className="mt-2 flex gap-3 text-sm text-indigo-600">
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </main>
  );
}

function EnrollForm({ compact=false }) {
  const navigate = useNavigate?.();
  const [form, setForm] = useState({ name: '', contact: '', course: '', message: '' });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e?.preventDefault?.();
    setStatus('sending');
    try {
      // In production, replace the fetch URL with your backend API endpoint
      await fakeApiEnroll({ ...form });
      setStatus('ok');
      setForm({ name: '', contact: '', course: '', message: '' });
      // optionally navigate to thank you page
      // navigate('/thank-you');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className={compact ? 'mt-4 space-y-3' : 'space-y-3'}>
      <input className="w-full border rounded px-3 py-2" placeholder="নাম" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
      <input className="w-full border rounded px-3 py-2" placeholder="মোবাইল/ইমেইল" value={form.contact} onChange={e=>setForm({...form, contact: e.target.value})} required />
      {!compact && (
        <select className="w-full border rounded px-3 py-2" value={form.course} onChange={e=>setForm({...form, course: e.target.value})}>
          <option value="">কোন কোর্সে আগ্রহী?</option>
          {COURSES.map(c=> <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      )}
      <textarea className="w-full border rounded px-3 py-2" rows={compact?2:4} placeholder="মেসেজ (ঐচ্ছিক)" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
      <div className="flex gap-2">
        <button className="flex-1 bg-indigo-600 text-white py-2 rounded" type="submit">{status==='sending' ? 'Sending...' : 'Send'}</button>
        {!compact && <a className="flex-1 border py-2 rounded text-center" href="tel:+8801XXXXXXXXX">Call: +8801XXXXXXXXX</a>}
      </div>
      {status==='ok' && <div className="text-sm text-green-600 mt-2">Thanks! We will contact you soon.</div>}
      {status==='error' && <div className="text-sm text-red-600 mt-2">Something went wrong. Try again.</div>}
    </form>
  );
}

// Fake API - replace with real backend integration.
function fakeApiEnroll(data){
  return new Promise((res, rej) => {
    console.log('Enroll payload ->', data);
    setTimeout(()=> res({ ok: true }), 900);
  });
}

function Footer(){
  return (
    <footer className="bg-white border-t py-6">
      <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Science Zone — Academic & Admission Coaching</div>
        <div>Designed with ❤️</div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<div className="max-w-3xl mx-auto px-6 py-12"><h2 className="text-2xl font-bold mb-4">Enroll</h2><div className="bg-white p-6 rounded shadow"><EnrollForm /></div></div>} />
          <Route path="*" element={<main className="max-w-6xl mx-auto px-6 py-12">Page not found</main>} />
        </Routes>
        <div className="mt-auto"><Footer /></div>
      </div>
    </BrowserRouter>
  );
}

/*
  Next steps (suggested):
  1) Split components into separate files and add ESLint/Prettier.
  2) Add Tailwind config and import the generated CSS.
  3) Implement backend endpoints for enrollments, payment (Bkash/Nagad/Stripe), and admin dashboard.
  4) Add authentication if you want student dashboard and progress tracking.
  5) Deploy to Vercel/Netlify and point a custom domain.
*/
