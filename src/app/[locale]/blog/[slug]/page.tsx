import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BreadcrumbStructuredData from "@/components/seo/BreadcrumbStructuredData";

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  tags: string[];
  author: string;
  authorImage: string;
  tableOfContents: { id: string; title: string; level: number }[];
}

// In production, this would come from a CMS or database
const getBlogPost = async (
  slug: string,
  locale: string
): Promise<BlogPost | null> => {
  const posts: Record<string, BlogPost> = {
    "future-of-ai-software-development": {
      slug: "future-of-ai-software-development",
      title:
        locale === "en"
          ? "The Future of AI in Software Development: Trends for 2025"
          : "El Futuro de la IA en el Desarrollo de Software: Tendencias para 2025",
      excerpt:
        locale === "en"
          ? "Explore how artificial intelligence is revolutionizing software development, from automated code generation to intelligent testing and deployment."
          : "Explora cómo la inteligencia artificial está revolucionando el desarrollo de software, desde la generación automática de código hasta las pruebas inteligentes.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
      imageAlt:
        locale === "en"
          ? "AI and machine learning code on computer screen"
          : "Código de IA y machine learning en pantalla de computadora",
      imageCredit: "Photo by Markus Spiske on Unsplash",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
      tableOfContents: [
        {
          id: "key-trends",
          title:
            locale === "en"
              ? "Key Trends Shaping the Future"
              : "Tendencias Clave",
          level: 2,
        },
        {
          id: "automated-code",
          title:
            locale === "en"
              ? "Automated Code Generation"
              : "Generación Automática de Código",
          level: 3,
        },
        {
          id: "intelligent-testing",
          title:
            locale === "en" ? "Intelligent Testing" : "Pruebas Inteligentes",
          level: 3,
        },
        {
          id: "impact-teams",
          title:
            locale === "en"
              ? "Impact on Development Teams"
              : "Impacto en Equipos",
          level: 2,
        },
        {
          id: "challenges",
          title:
            locale === "en"
              ? "Challenges and Considerations"
              : "Desafíos y Consideraciones",
          level: 2,
        },
        {
          id: "future-outlook",
          title:
            locale === "en"
              ? "Looking Ahead: 2025 and Beyond"
              : "Mirando al Futuro: 2025 y Más Allá",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">

<p class="text-xl text-gray-300 leading-relaxed mb-8">Artificial Intelligence is no longer a futuristic concept—it's actively transforming how we build, test, and deploy software. As we move into 2025, the integration of AI in software development is becoming more sophisticated and accessible than ever before.</p>

<h2 id="key-trends" class="text-2xl font-bold text-white mt-12 mb-6">Key Trends Shaping the Future</h2>

<h3 id="automated-code" class="text-xl font-bold text-white mt-8 mb-4">1. Automated Code Generation</h3>
<p class="text-gray-300 leading-relaxed mb-4">AI-powered tools like GitHub Copilot and Amazon CodeWhisperer are revolutionizing how developers write code. These tools can:</p>
<ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
  <li>Generate entire functions from natural language descriptions</li>
  <li>Suggest optimizations for existing code</li>
  <li>Automatically create unit tests</li>
  <li>Translate code between programming languages</li>
</ul>

<div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 my-8">
  <h4 class="text-lg font-semibold text-primary-blue mb-3">💡 Real-World Impact</h4>
  <p class="text-gray-300">Developers using AI code generation tools report <strong class="text-white">30-50% faster development cycles</strong>, allowing teams to focus on creative problem-solving and architecture design.</p>
</div>

<h3 id="intelligent-testing" class="text-xl font-bold text-white mt-8 mb-4">2. Intelligent Testing and Quality Assurance</h3>
<p class="text-gray-300 leading-relaxed mb-4">AI is making testing more efficient and comprehensive:</p>
<ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
  <li><strong class="text-white">Automated Test Generation:</strong> AI can analyze code and automatically generate comprehensive test suites</li>
  <li><strong class="text-white">Bug Prediction:</strong> Machine learning models can predict where bugs are most likely to occur</li>
  <li><strong class="text-white">Performance Optimization:</strong> AI tools can identify performance bottlenecks before they impact users</li>
</ul>

<h3 class="text-xl font-bold text-white mt-8 mb-4">3. Enhanced Code Review and Security</h3>
<p class="text-gray-300 leading-relaxed mb-4">Modern AI systems are becoming expert code reviewers:</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-primary-blue/10 border border-primary-blue/30 rounded-lg p-4">
    <h5 class="font-semibold text-primary-blue mb-2">Security Benefits</h5>
    <ul class="text-sm text-gray-300 space-y-1">
      <li>• Vulnerability detection</li>
      <li>• Compliance checking</li>
      <li>• Best practice enforcement</li>
    </ul>
  </div>
  <div class="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-4">
    <h5 class="font-semibold text-accent-purple mb-2">Quality Improvements</h5>
    <ul class="text-sm text-gray-300 space-y-1">
      <li>• Code quality analysis</li>
      <li>• Style consistency</li>
      <li>• Documentation generation</li>
    </ul>
  </div>
</div>

<h2 id="impact-teams" class="text-2xl font-bold text-white mt-12 mb-6">The Impact on Development Teams</h2>

<h3 class="text-xl font-bold text-white mt-8 mb-4">Increased Productivity</h3>
<p class="text-gray-300 leading-relaxed mb-4">By automating routine tasks, teams can focus on:</p>
<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-gray-700 rounded-lg p-6 my-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h5 class="font-semibold text-white mb-3">Creative Work</h5>
      <ul class="text-gray-300 space-y-1 text-sm">
        <li>• Problem-solving</li>
        <li>• Architecture design</li>
        <li>• User experience optimization</li>
      </ul>
    </div>
    <div>
      <h5 class="font-semibold text-white mb-3">Strategic Focus</h5>
      <ul class="text-gray-300 space-y-1 text-sm">
        <li>• Innovation and experimentation</li>
        <li>• System optimization</li>
        <li>• Cross-team collaboration</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-xl font-bold text-white mt-8 mb-4">Democratization of Software Development</h3>
<p class="text-gray-300 leading-relaxed mb-4">AI is making software development more accessible through:</p>
<ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
  <li>Low-code/no-code platforms powered by AI</li>
  <li>Natural language programming interfaces</li>
  <li>Automated deployment and scaling</li>
  <li>Intelligent documentation generation</li>
</ul>

<h2 id="challenges" class="text-2xl font-bold text-white mt-12 mb-6">Challenges and Considerations</h2>

<div class="bg-red-900/20 border border-red-500/30 rounded-lg p-6 my-8">
  <h4 class="text-lg font-semibold text-red-400 mb-3">⚠️ Important Considerations</h4>
  <div class="space-y-4">
    <div>
      <h5 class="font-semibold text-white mb-2">1. Code Quality and Reliability</h5>
      <p class="text-gray-300 text-sm">While AI can generate code quickly, human oversight remains crucial for ensuring quality and maintainability.</p>
    </div>
    <div>
      <h5 class="font-semibold text-white mb-2">2. Security Implications</h5>
      <p class="text-gray-300 text-sm">AI-generated code may replicate security vulnerabilities, requiring specialized testing and review processes.</p>
    </div>
    <div>
      <h5 class="font-semibold text-white mb-2">3. Skill Evolution</h5>
      <p class="text-gray-300 text-sm">Developers need to adapt to AI prompt engineering and understand tool capabilities and limitations.</p>
    </div>
  </div>
</div>

<h2 id="future-outlook" class="text-2xl font-bold text-white mt-12 mb-6">Looking Ahead: 2025 and Beyond</h2>

<p class="text-gray-300 leading-relaxed mb-6">The future of AI in software development looks incredibly promising:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
    <h4 class="text-lg font-semibold text-primary-blue mb-4">Near-term (2025-2026)</h4>
    <ul class="text-gray-300 space-y-2 text-sm">
      <li>• Autonomous development workflows</li>
      <li>• Predictive maintenance systems</li>
      <li>• Enhanced natural language programming</li>
      <li>• AI-first architecture patterns</li>
    </ul>
  </div>
  <div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
    <h4 class="text-lg font-semibold text-accent-purple mb-4">Long-term (2027+)</h4>
    <ul class="text-gray-300 space-y-2 text-sm">
      <li>• Self-healing applications</li>
      <li>• Fully autonomous development teams</li>
      <li>• AI-driven business logic generation</li>
      <li>• Quantum-AI hybrid systems</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-white mt-8 mb-4">Preparing for Success</h3>
<div class="bg-green-900/20 border border-green-500/30 rounded-lg p-6 my-8">
  <h4 class="text-lg font-semibold text-green-400 mb-4">🚀 Action Steps for Organizations</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h5 class="font-semibold text-white mb-2">For Development Teams</h5>
      <ul class="text-gray-300 space-y-1 text-sm">
        <li>• Experiment with AI development tools</li>
        <li>• Adapt workflows for AI assistance</li>
        <li>• Implement robust testing processes</li>
        <li>• Stay updated on AI developments</li>
      </ul>
    </div>
    <div>
      <h5 class="font-semibold text-white mb-2">For Business Leaders</h5>
      <ul class="text-gray-300 space-y-1 text-sm">
        <li>• Develop AI adoption strategies</li>
        <li>• Invest in team training</li>
        <li>• Ensure proper infrastructure</li>
        <li>• Understand compliance requirements</li>
      </ul>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold text-white mt-12 mb-6">Conclusion</h2>

<p class="text-gray-300 leading-relaxed mb-6">AI is not replacing developers—it's augmenting their capabilities and transforming the software development landscape. Organizations that embrace AI tools and adapt their processes will gain significant competitive advantages in speed, quality, and innovation.</p>

<p class="text-gray-300 leading-relaxed mb-8">The key to success is finding the right balance between AI automation and human creativity, ensuring that technology serves to enhance rather than replace human expertise.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">Ready to Transform Your Development Process?</h3>
  <p class="text-gray-300 mb-6">Contact CodenixAI to learn how we can help integrate cutting-edge AI solutions into your software development workflow.</p>
  <div class="flex flex-col sm:flex-row gap-4">
    <a href="/contact" class="btn-primary">Get Started</a>
    <a href="/services/ai-automation" class="btn-secondary">Learn More</a>
  </div>
</div>

</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">

<p class="text-xl text-gray-300 leading-relaxed mb-8">La Inteligencia Artificial ya no es un concepto futurista—está transformando activamente cómo construimos, probamos y desplegamos software. Mientras avanzamos hacia 2025, la integración de IA en el desarrollo de software se está volviendo más sofisticada y accesible que nunca.</p>

<h2 id="key-trends" class="text-2xl font-bold text-white mt-12 mb-6">Tendencias Clave que Moldean el Futuro</h2>

<h3 id="automated-code" class="text-xl font-bold text-white mt-8 mb-4">1. Generación Automática de Código</h3>
<p class="text-gray-300 leading-relaxed mb-4">Herramientas impulsadas por IA como GitHub Copilot y Amazon CodeWhisperer están revolucionando cómo los desarrolladores escriben código.</p>

<div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 my-8">
  <h4 class="text-lg font-semibold text-primary-blue mb-3">💡 Impacto Real</h4>
  <p class="text-gray-300">Los desarrolladores que usan herramientas de generación de código IA reportan ciclos de desarrollo <strong class="text-white">30-50% más rápidos</strong>.</p>
</div>

<h2 id="impact-teams" class="text-2xl font-bold text-white mt-12 mb-6">El Impacto en los Equipos de Desarrollo</h2>

<p class="text-gray-300 leading-relaxed mb-6">La IA está democratizando el desarrollo de software y aumentando la productividad de los equipos de maneras sin precedentes.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">¿Listo para Transformar tu Proceso de Desarrollo?</h3>
  <p class="text-gray-300 mb-6">Contacta a CodenixAI para aprender cómo podemos ayudar a integrar soluciones de IA de vanguardia en tu flujo de trabajo de desarrollo de software.</p>
  <div class="flex flex-col sm:flex-row gap-4">
    <a href="/contact" class="btn-primary">Comenzar</a>
    <a href="/services/ai-automation" class="btn-secondary">Saber Más</a>
  </div>
</div>

</div>
      `,
      date: "2024-12-15",
      category: locale === "en" ? "AI Trends" : "Tendencias IA",
      readTime: locale === "en" ? "8 min read" : "8 min lectura",
      tags: ["AI", "Software Development", "Automation", "Machine Learning"],
      author: "CodenixAI Team",
    },
    "building-intelligent-chatbots": {
      slug: "building-intelligent-chatbots",
      title:
        locale === "en"
          ? "Building Intelligent Chatbots: A Complete Guide for Businesses"
          : "Construyendo Chatbots Inteligentes: Guía Completa para Empresas",
      excerpt:
        locale === "en"
          ? "Learn how to design, develop, and deploy AI-powered chatbots that provide exceptional customer experiences and drive business growth."
          : "Aprende cómo diseñar, desarrollar e implementar chatbots impulsados por IA que brinden experiencias excepcionales al cliente.",
      date: "2024-01-10",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Modern chatbot interface on smartphone"
          : "Interfaz de chatbot moderno en smartphone",
      imageCredit: "Romain V",
      category: locale === "en" ? "AI Development" : "Desarrollo IA",
      readTime: locale === "en" ? "10 min read" : "10 min lectura",
      tags: ["Chatbots", "AI", "Customer Service", "Automation"],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "technology",
          title:
            locale === "en"
              ? "Understanding Modern Chatbot Technology"
              : "Tecnología de Chatbots Moderna",
          level: 2,
        },
        {
          id: "planning",
          title:
            locale === "en"
              ? "Planning Your Chatbot Strategy"
              : "Planificando tu Estrategia",
          level: 2,
        },
        {
          id: "design",
          title: locale === "en" ? "Design Principles" : "Principios de Diseño",
          level: 2,
        },
        {
          id: "implementation",
          title:
            locale === "en"
              ? "Technical Implementation"
              : "Implementación Técnica",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
# Building Intelligent Chatbots: A Complete Guide for Businesses

In today's digital landscape, chatbots have evolved from simple rule-based systems to sophisticated AI-powered assistants that can understand context, learn from interactions, and provide personalized experiences. This comprehensive guide will walk you through everything you need to know about building intelligent chatbots for your business.

## Understanding Modern Chatbot Technology

### Evolution of Chatbots
- **Rule-Based Chatbots**: Simple if-then logic systems
- **AI-Powered Chatbots**: Machine learning and NLP capabilities
- **Conversational AI**: Advanced understanding and context awareness
- **Generative AI Chatbots**: Creative and dynamic response generation

### Key Technologies Behind Intelligent Chatbots
1. **Natural Language Processing (NLP)**
2. **Machine Learning (ML)**
3. **Large Language Models (LLMs)**
4. **Intent Recognition**
5. **Entity Extraction**
6. **Context Management**

## Planning Your Chatbot Strategy

### Define Your Objectives
- Customer support automation
- Lead generation and qualification
- Sales assistance
- Information retrieval
- Internal process automation

### Identify Use Cases
- Frequently asked questions
- Order tracking and status
- Appointment scheduling
- Product recommendations
- Technical support

### Choose the Right Platform
- **Web Chatbots**: Website integration
- **WhatsApp Business API**: Direct customer communication
- **Facebook Messenger**: Social media engagement
- **Slack/Teams**: Internal business processes
- **Custom Applications**: Tailored solutions

## Design Principles for Intelligent Chatbots

### 1. Conversational Design
- Natural language flow
- Clear conversation paths
- Graceful error handling
- Human handoff capabilities

### 2. Personality and Tone
- Consistent brand voice
- Appropriate formality level
- Cultural sensitivity
- Empathetic responses

### 3. User Experience (UX)
- Intuitive interaction patterns
- Quick response times
- Visual elements and rich media
- Mobile-first design

## Technical Implementation

### Architecture Components
\`\`\`
User Input → NLP Processing → Intent Classification → 
Entity Extraction → Business Logic → Response Generation → 
Context Update → User Output
\`\`\`

### Key Development Considerations
- **Scalability**: Handle multiple concurrent conversations
- **Integration**: Connect with existing business systems
- **Security**: Protect sensitive customer data
- **Analytics**: Track performance and user interactions

### Popular Development Frameworks
- **Microsoft Bot Framework**
- **Google Dialogflow**
- **Amazon Lex**
- **Rasa Open Source**
- **Custom AI Solutions**

## Advanced Features for Intelligent Chatbots

### 1. Context Awareness
- Remember previous conversations
- Understand conversation history
- Maintain session state
- Cross-platform continuity

### 2. Personalization
- User preference learning
- Behavior-based recommendations
- Dynamic content adaptation
- Custom user profiles

### 3. Multi-language Support
- Automatic language detection
- Real-time translation
- Cultural adaptation
- Localized responses

### 4. Integration Capabilities
- CRM systems
- E-commerce platforms
- Payment gateways
- Calendar and scheduling tools
- Knowledge bases

## Measuring Chatbot Success

### Key Performance Indicators (KPIs)
- **User Engagement**: Session duration, message count
- **Task Completion Rate**: Successful interaction percentage
- **Customer Satisfaction**: User ratings and feedback
- **Cost Savings**: Reduced support ticket volume
- **Revenue Impact**: Sales generated or assisted

### Analytics and Optimization
- Conversation flow analysis
- Intent recognition accuracy
- Response time metrics
- User drop-off points
- Continuous improvement cycles

## Best Practices for Chatbot Deployment

### 1. Start Simple
- Begin with common use cases
- Gradually add complexity
- Test thoroughly before launch
- Monitor user feedback closely

### 2. Provide Clear Expectations
- Explain chatbot capabilities
- Set appropriate user expectations
- Offer alternative contact methods
- Transparent about AI limitations

### 3. Continuous Training
- Regular model updates
- New intent addition
- Performance optimization
- User feedback incorporation

### 4. Human Handoff Strategy
- Clear escalation triggers
- Seamless transition process
- Context preservation
- Support team training

## Future Trends in Chatbot Technology

### Emerging Capabilities
- **Voice Integration**: Conversational interfaces
- **Emotional Intelligence**: Sentiment analysis and empathy
- **Proactive Engagement**: Predictive assistance
- **Multi-modal Interaction**: Text, voice, and visual inputs

### Industry Applications
- **Healthcare**: Patient support and symptom checking
- **Finance**: Account management and financial advice
- **E-commerce**: Personal shopping assistants
- **Education**: Personalized learning support

## Getting Started with CodenixAI

Ready to build an intelligent chatbot for your business? CodenixAI offers end-to-end chatbot development services:

- **Strategy Consultation**: Define objectives and use cases
- **Custom Development**: Tailored AI solutions
- **Platform Integration**: Seamless system connectivity
- **Ongoing Support**: Continuous optimization and updates

Contact us today to transform your customer engagement with intelligent chatbot technology.
      `
          : `
# Construyendo Chatbots Inteligentes: Guía Completa para Empresas

En el panorama digital actual, los chatbots han evolucionado desde sistemas simples basados en reglas hasta asistentes sofisticados impulsados por IA que pueden entender contexto, aprender de interacciones y brindar experiencias personalizadas.

## Entendiendo la Tecnología Moderna de Chatbots

### Evolución de los Chatbots
- **Chatbots Basados en Reglas**: Sistemas simples de lógica si-entonces
- **Chatbots Impulsados por IA**: Capacidades de machine learning y PLN
- **IA Conversacional**: Comprensión avanzada y conciencia de contexto
- **Chatbots de IA Generativa**: Generación de respuestas creativas y dinámicas

## Planificando tu Estrategia de Chatbot

### Define tus Objetivos
- Automatización de soporte al cliente
- Generación y calificación de leads
- Asistencia en ventas
- Recuperación de información
- Automatización de procesos internos

*¿Listo para construir un chatbot inteligente para tu negocio? CodenixAI ofrece servicios completos de desarrollo de chatbots. Contáctanos hoy para transformar tu engagement con clientes usando tecnología inteligente de chatbots.*
      `,
    },
    "rpa-business-automation": {
      slug: "rpa-business-automation",
      title:
        locale === "en"
          ? "RPA vs Traditional Automation: Which is Right for Your Business?"
          : "RPA vs Automatización Tradicional: ¿Cuál es Mejor para tu Negocio?",
      excerpt:
        locale === "en"
          ? "Compare Robotic Process Automation with traditional automation methods and discover which approach delivers the best ROI for your organization."
          : "Compara la Automatización Robótica de Procesos con métodos tradicionales y descubre qué enfoque ofrece el mejor ROI para tu organización.",
      date: "2024-12-05",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Robotic process automation concept"
          : "Concepto de automatización robótica de procesos",
      imageCredit: "Alex Knight",
      category: locale === "en" ? "Automation" : "Automatización",
      readTime: locale === "en" ? "10 min read" : "10 min lectura",
      tags: ["RPA", "Automation", "Business Process", "Efficiency"],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "rpa-overview",
          title: locale === "en" ? "What is RPA?" : "Qué es RPA?",
          level: 2,
        },
        {
          id: "comparison",
          title:
            locale === "en"
              ? "RPA vs Traditional Automation"
              : "RPA vs Automatización Tradicional",
          level: 2,
        },
        {
          id: "benefits",
          title:
            locale === "en"
              ? "Benefits and Use Cases"
              : "Beneficios y Casos de Uso",
          level: 2,
        },
        {
          id: "implementation",
          title:
            locale === "en"
              ? "Implementation Strategy"
              : "Estrategia de Implementación",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">As businesses seek to optimize operations and reduce costs, the choice between Robotic Process Automation (RPA) and traditional automation becomes crucial. Understanding the differences, benefits, and ideal use cases for each approach will help you make the right decision for your organization.</p>

<h2 id="rpa-overview" class="text-2xl font-bold text-white mt-12 mb-6">Understanding RPA vs Traditional Automation</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="bg-primary-blue/10 border border-primary-blue/30 rounded-lg p-6">
    <h3 class="text-xl font-bold text-primary-blue mb-4">Robotic Process Automation (RPA)</h3>
    <ul class="text-gray-300 space-y-2 text-sm">
      <li>• Software robots mimic human actions</li>
      <li>• Works with existing systems</li>
      <li>• No coding required for basic tasks</li>
      <li>• Quick implementation</li>
      <li>• User interface interaction</li>
    </ul>
  </div>
  <div class="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-6">
    <h3 class="text-xl font-bold text-accent-purple mb-4">Traditional Automation</h3>
    <ul class="text-gray-300 space-y-2 text-sm">
      <li>• Custom programming solutions</li>
      <li>• System integration required</li>
      <li>• Technical expertise needed</li>
      <li>• Longer development cycles</li>
      <li>• API and database integration</li>
    </ul>
  </div>
</div>

<p class="text-gray-300 leading-relaxed mb-6">The choice between RPA and traditional automation depends on your specific needs, technical infrastructure, and long-term goals.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">Ready to Automate Your Business Processes?</h3>
  <p class="text-gray-300 mb-6">CodenixAI specializes in both RPA and traditional automation solutions. Let us help you choose and implement the right approach for your business.</p>
  <div class="flex flex-col sm:flex-row gap-4">
    <a href="/contact" class="btn-primary">Get Started</a>
    <a href="/services/automation" class="btn-secondary">Learn More</a>
  </div>
</div>
</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">A medida que las empresas buscan optimizar operaciones y reducir costos, la elección entre Automatización Robótica de Procesos (RPA) y automatización tradicional se vuelve crucial.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">¿Listo para Automatizar tus Procesos de Negocio?</h3>
  <p class="text-gray-300 mb-6">CodenixAI se especializa en soluciones RPA y automatización tradicional. Permítenos ayudarte a elegir e implementar el enfoque correcto.</p>
  <div class="flex flex-col sm:flex-row gap-4">
    <a href="/contact" class="btn-primary">Comenzar</a>
    <a href="/services/automation" class="btn-secondary">Saber Más</a>
  </div>
</div>
</div>
      `,
    },
    "ai-powered-web-development": {
      slug: "ai-powered-web-development",
      title:
        locale === "en"
          ? "AI-Powered Web Development: Tools and Techniques for 2025"
          : "Desarrollo Web Impulsado por IA: Herramientas y Técnicas para 2025",
      excerpt:
        locale === "en"
          ? "Discover the latest AI tools and techniques that are transforming web development, from automated testing to intelligent code optimization."
          : "Descubre las últimas herramientas y técnicas de IA que están transformando el desarrollo web, desde pruebas automatizadas hasta optimización inteligente.",
      date: "2024-11-28",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Web development with AI tools"
          : "Desarrollo web con herramientas de IA",
      imageCredit: "Luca Bravo",
      category: locale === "en" ? "Web Development" : "Desarrollo Web",
      readTime: locale === "en" ? "9 min read" : "9 min lectura",
      tags: ["Web Development", "AI Tools", "Automation", "Code Optimization"],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "ai-tools",
          title:
            locale === "en"
              ? "AI Development Tools"
              : "Herramientas de Desarrollo IA",
          level: 2,
        },
        {
          id: "automation",
          title:
            locale === "en"
              ? "Testing Automation"
              : "Automatización de Pruebas",
          level: 2,
        },
        {
          id: "optimization",
          title:
            locale === "en" ? "Code Optimization" : "Optimización de Código",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">AI is revolutionizing web development with tools that automate testing, optimize code, and enhance user experiences. Explore the cutting-edge technologies shaping the future of web development.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">Transform Your Web Development Process</h3>
  <p class="text-gray-300 mb-6">Let CodenixAI help you integrate AI-powered tools into your web development workflow for faster, more efficient development.</p>
  <a href="/contact" class="btn-primary">Get Started</a>
</div>
</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">La IA está revolucionando el desarrollo web con herramientas que automatizan pruebas, optimizan código y mejoran experiencias de usuario.</p>
</div>
      `,
    },
    "machine-learning-business-applications": {
      slug: "machine-learning-business-applications",
      title:
        locale === "en"
          ? "Machine Learning in Business: Real-World Applications and Case Studies"
          : "Machine Learning en Negocios: Aplicaciones del Mundo Real y Casos de Estudio",
      excerpt:
        locale === "en"
          ? "Explore practical machine learning applications across industries with real case studies showing measurable business impact and ROI."
          : "Explora aplicaciones prácticas de machine learning en diferentes industrias con casos de estudio reales que muestran impacto y ROI medibles.",
      date: "2024-11-20",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Business analytics and machine learning dashboard"
          : "Dashboard de análisis de negocios y machine learning",
      imageCredit: "Lukas Blazek",
      category: locale === "en" ? "Machine Learning" : "Machine Learning",
      readTime: locale === "en" ? "15 min read" : "15 min lectura",
      tags: [
        "Machine Learning",
        "Business Intelligence",
        "Data Analytics",
        "Case Studies",
      ],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "applications",
          title: locale === "en" ? "Key Applications" : "Aplicaciones Clave",
          level: 2,
        },
        {
          id: "case-studies",
          title: locale === "en" ? "Case Studies" : "Casos de Estudio",
          level: 2,
        },
        {
          id: "implementation",
          title:
            locale === "en" ? "Implementation Guide" : "Guía de Implementación",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">Machine learning is transforming businesses across all industries. Discover real-world applications and case studies that demonstrate the tangible value of ML implementations.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">Ready to Implement Machine Learning?</h3>
  <p class="text-gray-300 mb-6">Contact CodenixAI to explore how machine learning can transform your business operations and drive measurable results.</p>
  <a href="/contact" class="btn-primary">Get Started</a>
</div>
</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">El machine learning está transformando negocios en todas las industrias. Descubre aplicaciones del mundo real y casos de estudio.</p>
</div>
      `,
    },
    "cloud-native-ai-deployment": {
      slug: "cloud-native-ai-deployment",
      title:
        locale === "en"
          ? "Cloud-Native AI: Best Practices for Scalable ML Deployment"
          : "IA Nativa en la Nube: Mejores Prácticas para Despliegue Escalable de ML",
      excerpt:
        locale === "en"
          ? "Learn how to deploy and scale AI applications in the cloud using modern DevOps practices, containerization, and microservices architecture."
          : "Aprende cómo desplegar y escalar aplicaciones de IA en la nube usando prácticas modernas de DevOps, contenedorización y arquitectura de microservicios.",
      date: "2024-11-15",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Cloud computing and AI infrastructure"
          : "Computación en la nube e infraestructura de IA",
      imageCredit: "NASA",
      category: locale === "en" ? "Cloud & DevOps" : "Cloud y DevOps",
      readTime: locale === "en" ? "11 min read" : "11 min lectura",
      tags: ["Cloud Computing", "AI Deployment", "DevOps", "Scalability"],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "cloud-native",
          title:
            locale === "en"
              ? "Cloud-Native Principles"
              : "Principios Cloud-Native",
          level: 2,
        },
        {
          id: "deployment",
          title:
            locale === "en"
              ? "Deployment Strategies"
              : "Estrategias de Despliegue",
          level: 2,
        },
        {
          id: "scaling",
          title:
            locale === "en"
              ? "Scaling Best Practices"
              : "Mejores Prácticas de Escalado",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">Cloud-native AI deployment enables organizations to build scalable, resilient, and cost-effective machine learning solutions. Learn the best practices for deploying AI applications in the cloud.</p>

<div class="bg-gradient-to-r from-primary-blue/20 to-accent-purple/20 border border-primary-blue/30 rounded-lg p-8 my-12">
  <h3 class="text-xl font-bold text-white mb-4">Scale Your AI Solutions</h3>
  <p class="text-gray-300 mb-6">Partner with CodenixAI to design and deploy cloud-native AI solutions that scale with your business needs.</p>
  <a href="/contact" class="btn-primary">Get Started</a>
</div>
</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">
<p class="text-xl text-gray-300 leading-relaxed mb-8">El despliegue de IA nativa en la nube permite a las organizaciones construir soluciones de machine learning escalables, resistentes y rentables.</p>
</div>
      `,
    },
    "github-universe-2025": {
      slug: "github-universe-2025",
      title:
        locale === "en"
          ? "CodenixAI at GitHub Universe 2025: Building the Future of AI Software"
          : "CodenixAI en GitHub Universe 2025: Construyendo el futuro del software con IA",
      excerpt:
        locale === "en"
          ? "CodenixAI joins GitHub Universe 2025 — a global gathering of developers, innovators, and AI builders shaping the next era of software development."
          : "CodenixAI participará en GitHub Universe 2025 — el evento global que reúne a desarrolladores, innovadores y creadores de IA que están dando forma a la próxima era del desarrollo de software.",
      date: "2025-10-28",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      imageAlt:
        locale === "en"
          ? "Developers collaborating at GitHub Universe"
          : "Desarrolladores colaborando en GitHub Universe",
      imageCredit: "GitHub",
      category: locale === "en" ? "Events" : "Eventos",
      readTime: locale === "en" ? "5 min read" : "5 min lectura",
      tags: [
        "AI",
        "GitHub Universe",
        "Innovation",
        "Software Development",
        "Networking",
      ],
      author: "CodenixAI Team",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      tableOfContents: [
        {
          id: "announcement",
          title:
            locale === "en"
              ? "Exciting Announcement"
              : "Un Anuncio Emocionante",
          level: 2,
        },
        {
          id: "mission",
          title:
            locale === "en" ? "CodenixAI’s Mission" : "La Misión de CodenixAI",
          level: 2,
        },
        {
          id: "community",
          title:
            locale === "en"
              ? "Connecting with the Developer Community"
              : "Conectando con la Comunidad de Desarrolladores",
          level: 2,
        },
      ],
      content:
        locale === "en"
          ? `
<div class="prose prose-invert prose-lg max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    We're thrilled to announce that <strong>CodenixAI</strong> will be participating in <strong>GitHub Universe 2025</strong>! 🚀  
    This event unites the global developer community — creators, innovators, and builders shaping the future of software.
  </p>

  <h2 id="announcement">🎉 Exciting Announcement</h2>
  <p>
    GitHub Universe 2025 represents more than a conference — it’s a space where technology, collaboration, and creativity converge.  
    For us, it’s an incredible opportunity to connect with tech leaders, exchange ideas, and showcase what we’re building at CodenixAI.
  </p>

  <h2 id="mission">💡 CodenixAI’s Mission</h2>
  <p>
    At <strong>CodenixAI</strong>, we’re on a mission to empower startups and enterprises with <strong>AI-driven software solutions</strong> that accelerate innovation — from custom SaaS platforms to intelligent automation tools.  
    We believe in building technology that not only scales but also inspires creativity and growth.
  </p>

  <h2 id="community">🤝 Connecting with the Developer Community</h2>
  <p>
    GitHub Universe 2025 is the perfect place to meet fellow entrepreneurs, developers, and AI enthusiasts who are passionate about creating the future with code.  
    If you’re attending — let’s connect and share ideas that move the tech world forward! 🌍✨
  </p>

  <div class="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-8 my-12 text-center">
    <h3 class="text-xl font-bold text-white mb-4">Join Us at GitHub Universe 2025</h3>
    <p class="text-gray-300 mb-6">Let’s shape the next generation of software development together.</p>
    <a href="https://githubuniverse.com" target="_blank" class="btn-primary">Learn More</a>
  </div>
</div>
      `
          : `
<div class="prose prose-invert prose-lg max-w-none">
  <p class="text-xl text-gray-300 leading-relaxed mb-8">
    ¡Nos emociona anunciar que <strong>CodenixAI</strong> participará en <strong>GitHub Universe 2025</strong>! 🚀  
    Este evento reúne a la comunidad global de desarrolladores — creadores, innovadores y constructores que están dando forma al futuro del software.
  </p>

  <h2 id="announcement">🎉 Un Anuncio Emocionante</h2>
  <p>
    GitHub Universe 2025 es más que una conferencia: es un espacio donde la tecnología, la colaboración y la creatividad convergen.  
    Para nosotros, es una oportunidad única para conectar con líderes tecnológicos, intercambiar ideas y mostrar lo que estamos construyendo en CodenixAI.
  </p>

  <h2 id="mission">💡 La Misión de CodenixAI</h2>
  <p>
    En <strong>CodenixAI</strong>, nuestra misión es impulsar a startups y empresas con <strong>soluciones de software basadas en IA</strong> que aceleren la innovación — desde plataformas SaaS personalizadas hasta herramientas de automatización inteligente.  
    Creemos en crear tecnología que no solo escale, sino que también inspire creatividad y crecimiento.
  </p>

  <h2 id="community">🤝 Conectando con la Comunidad de Desarrolladores</h2>
  <p>
    GitHub Universe 2025 es el lugar ideal para conocer a emprendedores, desarrolladores y entusiastas de la IA apasionados por construir el futuro con código.  
    Si también asistirás — ¡conectemos y creemos juntos el futuro del software! 🌍✨
  </p>

  <div class="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-lg p-8 my-12 text-center">
    <h3 class="text-xl font-bold text-white mb-4">Acompáñanos en GitHub Universe 2025</h3>
    <p class="text-gray-300 mb-6">Construyamos juntos la próxima generación del desarrollo de software.</p>
    <a href="https://githubuniverse.com" target="_blank" class="btn-primary">Más información</a>
  </div>
</div>
      `,
    },
  };

  return posts[slug] || null;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const { locale, slug } = paramsObj;

  const post = await getBlogPost(slug, locale);

  if (!post) {
    return {
      title: "Post Not Found - CodenixAI",
    };
  }

  return {
    title: `${post.title} - CodenixAI`,
    description: post.excerpt,
    alternates: {
      canonical: `https://codenixai.com/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://codenixai.com/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: PageParams) {
  const paramsObj = await params;
  const { locale, slug } = paramsObj;

  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen">
      <BreadcrumbStructuredData
        locale={locale}
        currentPage={`/blog/${slug}`}
        currentPageTitle={post.title}
      />

      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-primary-blue transition-colors"
                >
                  {locale === "en" ? "Home" : "Inicio"}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="hover:text-primary-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-300">{post.title}</li>
            </ol>
          </nav>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="px-3 py-1 bg-primary-blue/20 text-primary-blue rounded-full border border-primary-blue/30">
                {post.category}
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  locale === "en" ? "en-US" : "es-ES",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </time>
              <span>{post.readTime}</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Article Image */}
          <div className="relative aspect-video rounded-xl mb-12 overflow-hidden group">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded px-3 py-1">
              <span className="text-white/80 text-xs">
                Photo by {post.imageCredit}
              </span>
            </div>
          </div>

          {/* Table of Contents */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-12">
              <h2 className="text-xl font-bold text-white mb-4">
                {locale === "en" ? "Table of Contents" : "Tabla de Contenidos"}
              </h2>
              <nav>
                <ul className="space-y-2">
                  {post.tableOfContents.map((item, index) => (
                    <li key={index}>
                      <a
                        href={`#${item.id}`}
                        className={`block text-gray-300 hover:text-primary-blue transition-colors ${
                          item.level === 3 ? "ml-4 text-sm" : ""
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/\n/g, "<br />")
                  .replace(
                    /### /g,
                    '<h3 class="text-white font-bold text-xl mt-8 mb-4">'
                  )
                  .replace(
                    /## /g,
                    '<h2 class="text-white font-bold text-2xl mt-10 mb-6">'
                  )
                  .replace(
                    /# /g,
                    '<h1 class="text-white font-bold text-3xl mt-12 mb-8">'
                  ),
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-start gap-4 p-6 bg-gray-900/30 rounded-xl border border-gray-700">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {locale === "en" ? "About the Author" : "Sobre el Autor"}
                </h3>
                <p className="text-gray-300 font-medium mb-2">{post.author}</p>
                <p className="text-gray-400 text-sm">
                  {locale === "en"
                    ? "Our team of AI and software development experts brings years of experience in creating innovative solutions for businesses worldwide."
                    : "Nuestro equipo de expertos en IA y desarrollo de software aporta años de experiencia creando soluciones innovadoras para empresas de todo el mundo."}
                </p>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center text-primary-blue hover:text-accent-blue transition-colors duration-300 font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {locale === "en" ? "Back to Blog" : "Volver al Blog"}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
