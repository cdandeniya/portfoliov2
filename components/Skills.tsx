const skillGroups = [
  {
    label: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL'],
  },
  {
    label: 'Cloud & Infrastructure',
    skills: [
      'AWS (ECS, S3, DynamoDB, SQS, CloudWatch, CodePipeline)',
      'Docker',
      'Kafka',
      'Linux',
    ],
  },
  {
    label: 'Databases & Storage',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'MySQL'],
  },
  {
    label: 'Tools & Practices',
    skills: [
      'Git',
      'Jira',
      'JUnit / Pytest',
      'CI/CD',
      'Microservices',
      'REST APIs',
      'Distributed Systems',
      'Event-Driven Architecture',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium mb-3">
          Skills
        </p>
        <h2 className="text-3xl font-bold text-zinc-50 mb-12">Tech stack</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 font-medium">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
