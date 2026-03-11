import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  BookOpen,
  Users,
  Lightbulb,
  MessageSquare,
  Heart,
  Layers,
  Monitor,
  Target,
  Gamepad2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold text-primary"
        >
          RS.
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-primary mt-4"
    />
  </div>
);

const SkillCard = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center text-slate-600 text-sm">
          <ChevronRight size={14} className="text-primary mr-2" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const TimelineItem = ({ title, organization, period, description, isLast = false }: { title: string, organization: string, period: string, description?: string, isLast?: boolean }) => (
  <div className="flex gap-6">
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
      {!isLast && <div className="w-0.5 h-full bg-slate-200 my-2" />}
    </div>
    <div className="pb-12">
      <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">{period}</span>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-slate-500 font-medium mb-3">{organization}</p>
      {description && <p className="text-slate-600 text-sm leading-relaxed max-w-xl">{description}</p>}
    </div>
  </div>
);

const CertificationBadge = ({ title, date }: { title: string, date: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
  >
    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4 shrink-0">
      <CheckCircle2 size={20} />
    </div>
    <div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-slate-400">{date}</p>
    </div>
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left" style={{ scaleX }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6"
            >
              Aspiring Educator
            </motion.span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-tight mb-6">
              Rohit <br />
              <span className="text-primary italic">Sharma</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Passionate about nurturing young minds and fostering a love for learning through innovative teaching methodologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all"
              >
                Get in Touch
              </motion.a>
              <motion.a 
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition-all"
              >
                View Experience
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img 
                src="https://picsum.photos/seed/educator/800/800" 
                alt="Rohit Sharma" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-2xl -z-10" 
            />
            <motion.div 
              animate={{ x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 border-4 border-primary/10 rounded-full -z-10" 
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading subtitle="A dedicated professional with a strong foundation in educational theories.">
                About Me
              </SectionHeading>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  As an aspiring educator, I am passionate about nurturing young minds and fostering a love for learning. My D.El.Ed. and B.Ed. background has equipped me with a strong foundation in educational theories, teaching methodologies, and child development.
                </p>
                <p>
                  I believe in creating an inclusive and engaging classroom environment where every student feels valued and motivated to reach their full potential. My goal is to inspire the next generation through creative and effective teaching practices.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Lifelong Learner</h4>
                    <p className="text-xs text-slate-400">Always evolving</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Student Centric</h4>
                    <p className="text-xs text-slate-400">Individual focus</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-serif font-bold mb-8 text-primary">Quick Contact Info</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="font-medium text-lg">+91 8283883813</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="font-medium text-lg">sharmar734@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-medium text-lg">#1401/2, Phase-11, Sector-65, Mohali, Punjab</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="A blend of technical expertise and interpersonal skills to create a holistic learning environment.">
            Core Competencies
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <SkillCard 
              icon={Monitor}
              title="Hard Skills"
              items={[
                "Blended Teaching",
                "LMS Proficiency",
                "Digital Content Creation",
                "Hybrid Teaching",
                "Individualised Instruction",
                "Gamification in Teaching"
              ]}
            />
            <SkillCard 
              icon={Heart}
              title="Soft Skills"
              items={[
                "Effective Communication",
                "Empathy & Patience",
                "Leadership Qualities",
                "Multi-tasking Ability",
                "Conflict Resolution"
              ]}
            />
            <SkillCard 
              icon={Target}
              title="Specializations"
              items={[
                "Primary Education",
                "Graduate Level Teaching",
                "Baseline Assessment",
                "National Achievement Survey",
                "Curriculum Planning"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="My journey through various educational institutions and hands-on teaching roles.">
            Professional Experience
          </SectionHeading>

          <div className="max-w-3xl mx-auto">
            <TimelineItem 
              period="Currently"
              title="Home Tutor"
              organization="Private Practice"
              description="Providing personalized academic support and guidance to students, focusing on individual learning needs and performance improvement."
            />
            <TimelineItem 
              period="Sept 2024 - Nov 2024"
              title="Trained Graduate Teacher (Internship)"
              organization="Government Model High School, Sector-35, CHD"
              description="12 weeks of intensive internship focusing on secondary level education, lesson planning, and classroom management."
            />
            <TimelineItem 
              period="Nov 2022 - May 2023"
              title="Primary Teacher (Internship)"
              organization="Government Model High School, Sector-26 (PL), Chandigarh"
              description="16 weeks of internship as a primary teacher, developing foundational skills in young learners and implementing creative teaching aids."
            />
            <TimelineItem 
              period="Special Projects"
              title="Assessment Specialist"
              organization="Multiple Institutions"
              description="Conducted Baseline Assessment Tests at GMHS Sector-38 and Vivek High School. Participated in National Achievement Survey (NAS) at GMHS Sarangpur and GPS Mauli Complex."
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-padding bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block"
              >
                Academic Journey
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Educational Background</h2>
              <p className="text-slate-400 mb-12">
                My academic path has been focused on building a deep understanding of education and its practical applications in the modern classroom.
              </p>
              
              <div className="space-y-8">
                {[
                  { degree: "B.Ed. (Bachelor of Education)", school: "Panjab University, Chandigarh" },
                  { degree: "D.El.Ed (Diploma in Elementary Education)", school: "SCERT, Sector-32, Chandigarh" },
                  { degree: "B.A (Bachelor of Arts)", school: "GGDSD College, Sector-32, Chandigarh" }
                ].map((edu, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <GraduationCap size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-slate-400">{edu.school}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold mb-1">10+2 (Non Medical)</h5>
                  <p className="text-xs text-slate-400">Sant Isher Singh Public School</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold mb-1">Matriculation</h5>
                  <p className="text-xs text-slate-400">GMSSS, Sector-47 D, Chandigarh</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/20">
                  <Award size={32} className="mb-4" />
                  <h5 className="font-bold text-lg mb-1">Top Performer</h5>
                  <p className="text-xs text-white/70">Consistently achieving academic excellence throughout my career.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading subtitle="National and State level eligibility tests qualified with merit.">
            Teacher Eligibility Tests
          </SectionHeading>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <CertificationBadge title="CTET Paper-1" date="December 2022" />
            <CertificationBadge title="PSTET Paper-1" date="April 2023" />
            <CertificationBadge title="CTET Paper-2" date="December 2024" />
            <CertificationBadge title="PSTET Paper-2" date="December 2024" />
            <CertificationBadge title="AWES (PRT) Paper-1" date="December 2024" />
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                <Award size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm">Professional Teacher</h4>
                <p className="text-xs text-slate-400">Ready for impact</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 lg:p-20 text-white">
              <h2 className="text-4xl font-serif font-bold mb-6">Let's Connect</h2>
              <p className="text-slate-400 mb-12">
                I am currently open to teaching opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Me</p>
                    <p className="text-lg font-medium">sharmar734@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Call Me</p>
                    <p className="text-lg font-medium">+91 8283883813</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-white p-12 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Teaching Opportunity" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea rows={4} placeholder="Your message here..." className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-serif font-bold text-primary">RS.</div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Rohit Sharma. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><MessageSquare size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Users size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Layers size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
