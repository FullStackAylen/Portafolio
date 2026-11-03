// Proyectos reales del propietario (AGENTS.md §3). Los textos visibles
// (descripción y case study) viven en src/locales/ vía claves i18n para
// existir en ambos idiomas; acá solo quedan ids, links y stack (nombres
// propios de tecnología, no traducibles).

export const projects = [
  {
    id: 'finance',
    name: 'FinanceApp — Personal Expense Manager',
    descriptionKey: 'project_finance',
    link: 'https://financeapp-rho-nine.vercel.app/login',
    repository: 'https://github.com/FullStackAylen/FinanceApp',
    caseStudy: {
      problemKey: 'case_finance_problem',
      roleKey: 'case_finance_role',
      stack: [
        'React Native',
        'Expo SDK 57',
        'TypeScript',
        'Expo Router',
        'AsyncStorage',
        'SecureStore / Keychain / Keystore',
        'Jest',
        'ESLint',
        'Local-first Architecture'
      ],
      decisionsKey: 'case_finance_decisions',
      outcomeKey: 'case_finance_outcome'
    }
  },
  {
    id: 'samaritana',
    name: 'Samaritana — E-commerce',
    descriptionKey: 'project_samaritana',
    link: 'https://frontend-blush-mu-29.vercel.app/tienda',
    repository: 'https://github.com/FullStackAylen/Samaritana.git', // URL real del repositorio (pendiente del propietario)
    caseStudy: {
      problemKey: 'case_samaritana_problem',
      roleKey: 'case_samaritana_role',
      stack: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'shadcn/ui',
        'TanStack Query',
        'React Hook Form',
        'Zod',
        'React Router',
        'Framer Motion',
        'ASP.NET Core Web API',
        '.NET 9',
        'Entity Framework Core',
        'SQL Server',
        'Clean Architecture'
      ],
      decisionsKey: 'case_samaritana_decisions',
      outcomeKey: 'case_samaritana_outcome'
    }
  },
  {
    id: 'fitnessApp',
    name: 'Kenko fitnessApp — Fitness Tracker',
    descriptionKey: 'project_fitnessApp',
    link: 'https://v0-fitnessapp-fitlife.vercel.app/login',
    repository: 'https://github.com/FullStackAylen/FitnessApp-FitLife.git', // URL real del repositorio (pendiente del propietario)
    caseStudy: {
      problemKey: 'case_fitnessApp_problem',
      roleKey: 'case_fitnessApp_role',
      stack: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Drizzle ORM',
        'Vercel Postgres (Neon)',
        'Auth.js v5',
        'Vitest',
        'Playwright'
      ],
      decisionsKey: 'case_fitnessApp_decisions',
      outcomeKey: 'case_fitnessApp_outcome'
    }
  }
];
