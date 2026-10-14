
export const projects = [
  
{
  id: 'finance',
  name: 'FinanceApp — Personal Expense Manager',
  descriptionKey: 'project_finance',
  link: 'https://financeapp-rho-nine.vercel.app/login',
  repository: 'https://github.com/FullStackAylen/FinanceApp',
  caseStudy: {
    problem:
      'Gestionar gastos personales, vencimientos, pagos y gastos compartidos desde una aplicación móvil, manteniendo el acceso a los datos incluso sin conexión a internet.',
    role:
      'Mobile Developer. Diseño e implementación de la aplicación con React Native, Expo y TypeScript, incluyendo lógica de negocio, autenticación local, persistencia de datos, componentes de interfaz y pruebas automatizadas.',
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
    decisions:
      'Diseño offline-first con persistencia en el dispositivo y espacios de datos independientes por cuenta. Separación entre dominio, acceso a datos, autenticación, hooks y componentes de interfaz. Los importes monetarios se representan como enteros en centavos para evitar errores de precisión de punto flotante. Las credenciales se validan localmente y las contraseñas se almacenan mediante hashes con salt. La experiencia incorpora temas claro y oscuro, animaciones, sonidos y respuesta háptica.',
    outcome:
      'Aplicación móvil en desarrollo para Android e iOS, con registro e inicio de sesión local, gestión de gastos, estadísticas, configuración, presupuestos y pruebas automatizadas para reglas de negocio y flujos principales. La siguiente etapa planificada es la implementación de notificaciones locales de vencimientos.'
  }
},  
{
  id: 'samaritana',
  name: 'Samaritana — E-commerce',
  descriptionKey: 'project_samaritana',
  link: 'https://frontend-blush-mu-29.vercel.app/tienda',
  repository: '', // URL real del repositorio (pendiente del propietario)
  caseStudy: {
    problem:
      'Desarrollar una tienda online que facilite la consulta y selección de productos de limpieza, con una experiencia de compra clara y una base técnica preparada para evolucionar.',
    role:
      'Full-Stack Developer. Desarrollo del frontend con React y TypeScript, y del backend mediante una API REST con ASP.NET Core. Organización de la solución utilizando Clean Architecture.',
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
    decisions:
      'Separación entre frontend y backend mediante una API REST. Organización del backend con Clean Architecture para delimitar responsabilidades y facilitar el mantenimiento. Uso de TanStack Query para la gestión de consultas, React Hook Form y Zod para formularios y validaciones, y componentes de interfaz reutilizables para mantener una experiencia consistente.',
    outcome:
      'Aplicación full-stack desplegada, con frontend publicado en Vercel y backend desarrollado sobre ASP.NET Core. La implementación y el alcance funcional deben documentarse según las funcionalidades efectivamente terminadas.'
  }
}
];
