const experiences = [
  {
    company: 'Amazon',
    role: 'Software Engineering Apprentice',
    duration: 'Oct 2021 – Oct 2024',
    location: 'New York, NY',
    accent: 'bg-amber-400',
    bullets: [
      'Built and maintained distributed billing APIs on AWS (ECS, DynamoDB, S3), migrating legacy batch workflows to event-driven microservices with async retry logic and dead-letter queues.',
      'Instrumented structured logging, CloudWatch metrics, and distributed tracing across billing services — reducing incident investigation time by 25% and failed billing attempts by 4%.',
      'Implemented Blue/Green deployment configurations in Amazon CodePipeline for zero-downtime releases; expanded test coverage by 15% through JUnit/Mockito and Pytest suites.',
    ],
  },
  {
    company: 'OuterLabs Studio',
    role: 'Lead Technical Product Manager',
    duration: 'Aug 2023 – Aug 2025',
    location: 'Brooklyn, NY',
    accent: 'bg-violet-400',
    bullets: [
      'Drove end-to-end delivery for 5+ client software projects ($5K–$25K scope), owning requirements, roadmaps, and stakeholder communication from kickoff through launch.',
      'Reduced client rework by 20% by introducing structured user stories, acceptance criteria, and definition-of-done frameworks across engineering and design handoffs.',
      'Managed delivery pipeline in Jira, triaging requests and maintaining prioritized backlogs to improve sprint predictability across active projects.',
    ],
  },
  {
    company: 'Kroll',
    role: 'Software Engineering Intern · Release Engineering',
    duration: 'Jun 2026 – Aug 2026',
    location: 'Remote',
    accent: 'bg-sky-400',
    inProgress: true,
    bullets: [],
  },
  {
    company: 'Saiera',
    role: 'Software Development Intern',
    duration: 'Jun 2025 – Aug 2025',
    location: 'Remote',
    accent: 'bg-emerald-400',
    bullets: [
      'Built a GPT-4o-powered study assistant with RAG-based Q&A and auto-generated quizzes; engineered the document ingestion pipeline (S3, MongoDB, CloudConvert) processing 100+ files/day.',
      'Designed backend pipeline for reliable document retrieval, monitoring throughput and automating error handling to keep processing stable through scale.',
    ],
  },
  {
    company: 'Stony Brook Research Lab',
    role: 'Lead Undergraduate Researcher',
    duration: 'Jan 2025 – May 2025',
    location: 'Stony Brook, NY',
    accent: 'bg-rose-400',
    bullets: [
      'Implemented a real-time human activity recognition pipeline using TensorFlow Lite and OpenCV, optimized for edge deployment on Raspberry Pi 4 (35% latency reduction).',
      'Led a 4-person engineering team with sprint planning in Jira and weekly design reviews to hit delivery milestones.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium mb-3">
          Experience
        </p>
        <h2 className="text-3xl font-bold text-zinc-50 mb-12">
          Where I&apos;ve worked
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800 hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="sm:pl-10 relative">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full ${exp.accent} hidden sm:block ring-4 ring-[#09090b]`}
                />

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors duration-200">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-zinc-50 font-semibold text-base">
                          {exp.company}
                        </h3>
                        {exp.inProgress && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm italic mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-zinc-500 text-xs">{exp.duration}</p>
                      <p className="text-zinc-600 text-xs">{exp.location}</p>
                    </div>
                  </div>

                  {/* Bullets */}
                  {exp.bullets.length > 0 ? (
                    <ul className="space-y-2.5">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                          <span className={`mt-[7px] w-1 h-1 rounded-full ${exp.accent} shrink-0`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-zinc-600 italic">
                      Internship in progress — details coming soon.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
