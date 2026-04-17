"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Network,
  Cloud,
  Phone,
  BadgeCheck,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Building2,
  BarChart3,
  Mail,
  MapPin,
  Briefcase,
} from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
};

function Button({
  asChild = false,
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
  };
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: `${classes} ${((children as React.ReactElement<{ className?: string }>).props.className ?? "")}`.trim(),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border bg-white text-slate-900 ${className}`.trim()}>{children}</div>;
}

function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

const services = [
  {
    icon: Network,
    title: "Managed IT Services",
    text: "Proactive support, monitoring, patching, endpoint management, and day-to-day IT operations that keep your business running smoothly.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Services",
    text: "Layered protection with endpoint security, threat response, policy guidance, and practical security improvements for real-world businesses.",
  },
  {
    icon: Cloud,
    title: "Cloud & Microsoft 365",
    text: "Microsoft 365 administration, identity, collaboration, backups, and cloud modernization designed for secure growth.",
  },
  {
    icon: Phone,
    title: "Voice & Connectivity",
    text: "AT&T Office@Hand support, circuit readiness, deployment coordination, carrier transitions, and communications planning.",
  },
  {
    icon: Headphones,
    title: "Help Desk & User Support",
    text: "Responsive remote support for end users, issue resolution, onboarding, troubleshooting, and ongoing technology assistance.",
  },
  {
    icon: Briefcase,
    title: "IT Consulting & vCIO",
    text: "Strategy, budgeting, standards, lifecycle planning, and leadership guidance that align technology decisions to business outcomes.",
  },
];

const differentiators = [
  "Customer-first service model with practical, business-focused guidance",
  "Deep MSP experience supporting multi-location organizations",
  "Strong Microsoft 365, network, cybersecurity, and endpoint expertise",
  "Hands-on coordination for voice, carrier, and infrastructure projects",
];

const metrics = [
  { label: "Years of Experience", value: "30+" },
  { label: "Business-Focused IT", value: "End-to-End" },
  { label: "Support Model", value: "Proactive" },
  { label: "Partnership Style", value: "Hands-On" },
];

const proofPoints = [
  {
    title: "Multi-Location IT Support",
    text: "Support operations, endpoints, connectivity, and vendor coordination across distributed offices and growing organizations.",
  },
  {
    title: "Voice & Carrier Project Success",
    text: "Bridge the gap between providers and customers with better readiness, smoother cutovers, and stronger communication.",
  },
  {
    title: "Security-Focused Approach",
    text: "Help clients improve resilience with better controls, visibility, user practices, and infrastructure decisions.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

export default function AxiantConsultingWebsite() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitStatus({
        type: "success",
        message: "Thanks — your message has been sent. We’ll be in touch soon.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Axiant Consulting</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Managed IT • Cybersecurity • Consulting</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="transition hover:text-slate-900">Services</a>
            <a href="#about" className="transition hover:text-slate-900">About</a>
            <a href="#results" className="transition hover:text-slate-900">Why Axiant</a>
            <a href="#contact" className="transition hover:text-slate-900">Contact</a>
          </nav>

          <Button asChild className="rounded-2xl px-5"><a href="#contact">Free Consultation</a></Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.08),_transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
                <BadgeCheck className="h-4 w-4" />
                Trusted IT partner for growing businesses
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Technology leadership, support, and security built for the way your business actually works.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Axiant Consulting helps organizations simplify IT, strengthen security, support users, and execute infrastructure and communications projects with confidence.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-2xl px-6 text-base">
                  <a href="#contact">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-2xl px-6 text-base">
                  <a href="#services">Explore Services</a>
                </Button>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                {metrics.map((item) => (
                  <Card key={item.label} className="rounded-2xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                      <p className="text-2xl font-bold tracking-tight text-slate-900">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center"
            >
              <div className="w-full rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Business IT, done right</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">A strategic partner, not just a ticket queue.</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Proactive support and operational stability",
                    "Cybersecurity improvements grounded in real risk",
                    "Microsoft 365, cloud, and endpoint management",
                    "Carrier, voice, and rollout coordination",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" />
                      <p className="text-sm leading-6 text-slate-100">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeader
                eyebrow="About Axiant"
                title="A practical, experienced technology partner for organizations that need IT to perform."
                text="We help businesses improve uptime, user experience, security, and planning with responsive support and hands-on leadership across day-to-day operations and strategic initiatives."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {differentiators.map((item) => (
                <Card key={item} className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <CheckCircle2 className="h-6 w-6 text-sky-700" />
                    <p className="mt-4 text-base leading-7 text-slate-700">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="Solutions tailored to the realities of modern business IT."
            text="From managed support and security to Microsoft 365, infrastructure, and communications, Axiant delivers services designed to reduce friction and improve outcomes."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <Card className="h-full rounded-3xl border-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="results" className="bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionHeader
              eyebrow="Why Axiant"
              title="The kind of IT partner that helps projects move and problems get solved."
              text="We combine technical depth with business communication, vendor coordination, and follow-through—so your team gets momentum instead of more complexity."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {proofPoints.map((item) => (
                <Card key={item.title} className="rounded-3xl border-white/10 bg-white/5 text-white shadow-none">
                  <CardContent className="p-7">
                    <BarChart3 className="h-7 w-7 text-sky-300" />
                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeader
                eyebrow="Client Success"
                title="Built to support growing, multi-location, and service-driven organizations."
                text="Whether the need is better support, stronger security, smoother Microsoft 365 administration, or improved project execution, Axiant is positioned to help teams operate with more clarity and less disruption."
              />
            </div>

            <Card className="rounded-[2rem] border-slate-200 shadow-sm">
              <CardContent className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">Featured Example</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Healthcare and multi-site operational support</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Axiant supports organizations that need reliable help desk coverage, stable infrastructure, Microsoft 365 administration, and coordinated vendor communication across multiple locations.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "Distributed office support",
                    "Endpoint and user management",
                    "Vendor and carrier coordination",
                    "Ongoing planning and operational guidance",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 text-sky-700" />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                eyebrow="Resources"
                title="Insights, updates, and practical guidance."
                text="Use this section for blog posts, security alerts, case studies, Microsoft 365 tips, project spotlights, or telecom deployment updates."
              />
              <Button asChild variant="outline" className="rounded-2xl"><a href="#contact">Ask About Resources</a></Button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                "How to reduce hidden IT costs across multiple locations",
                "What businesses should review before a carrier or voice cutover",
                "Key security improvements SMBs can make this quarter",
              ].map((post, i) => (
                <Card key={post} className="rounded-3xl border-slate-200 shadow-sm">
                  <CardContent className="p-7">
                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-sky-800 p-8" />
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Article 0{i + 1}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{post}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Add a short summary here to highlight expertise, educate prospects, and improve search visibility.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-slate-950 text-white shadow-2xl">
            <CardContent className="grid gap-10 p-10 lg:grid-cols-[1fr_1fr] lg:p-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Contact Us</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight">Your next IT improvement starts with the right conversation.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Whether you need better support, a more secure environment, help planning a rollout, or a stronger long-term technology strategy, Axiant is ready to help.
                </p>

                <div className="mt-8 grid gap-4">
                  {[
                    { icon: Mail, label: "Email", value: "info@axiantcg.net", href: "mailto:info@axiantcg.net" },
                    { icon: Phone, label: "Phone", value: "901-378-5807", href: "tel:+19013785807" },
                    { icon: MapPin, label: "Location", value: "Offices in Tennessee and Florida • Serving clients nationwide" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                            <Icon className="h-5 w-5 text-sky-300" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                            {item.href ? (
                              <a href={item.href} className="mt-2 block text-base text-white hover:text-sky-300">
                                {item.value}
                              </a>
                            ) : (
                              <p className="mt-2 text-base text-white">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Send a Message</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Tell us what you need help with.</h3>
                <form className="mt-6 grid gap-4" onSubmit={handleFormSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={6}
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                    required
                  />
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button type="submit" size="lg" className="rounded-2xl bg-white px-6 text-slate-950 hover:bg-slate-100" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    <p className="text-sm leading-6 text-slate-300">Messages are sent securely to info@axiantcg.net.</p>
                  </div>
                {submitStatus && (
                  <div
                    className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                      submitStatus.type === "success"
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                        : "border-red-400/30 bg-red-400/10 text-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                </form>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-slate-900">Axiant Consulting</p>
            <p className="mt-1">Managed IT, cybersecurity, cloud, and business technology consulting.</p>
            <p className="mt-2 text-xs text-slate-500">© {currentYear} Axiant Consulting. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#results" className="hover:text-slate-900">Why Axiant</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
