import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t("title")} - CodenixAI`,
    description: t("description"),
    alternates: {
      canonical: `https://codenixai.com/${locale}/blog`,
    },
    openGraph: {
      title: `${t("title")} - CodenixAI`,
      description: t("description"),
      url: `https://codenixai.com/${locale}/blog`,
      type: "website",
    },
  };
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

export default async function BlogPage({ params }: PageParams) {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: "blog" });

  // Sample blog posts - in production, these would come from a CMS or database
  const blogPosts: BlogPost[] = [
    {
      slug: "future-of-ai-software-development",
      title:
        locale === "en"
          ? "The Future of AI in Software Development: Trends for 2025"
          : "El Futuro de la IA en el Desarrollo de Software: Tendencias para 2025",
      excerpt:
        locale === "en"
          ? "Explore how artificial intelligence is revolutionizing software development, from automated code generation to intelligent testing and deployment."
          : "Explora cómo la inteligencia artificial está revolucionando el desarrollo de software, desde la generación automática de código hasta las pruebas inteligentes.",
      date: "2024-12-15",
      category: locale === "en" ? "AI Trends" : "Tendencias IA",
      readTime: locale === "en" ? "8 min read" : "8 min lectura",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
      tags: ["AI", "Software Development", "Automation", "Machine Learning"],
    },
    {
      slug: "building-intelligent-chatbots",
      title:
        locale === "en"
          ? "Building Intelligent Chatbots: A Complete Guide for Businesses"
          : "Construyendo Chatbots Inteligentes: Guía Completa para Empresas",
      excerpt:
        locale === "en"
          ? "Learn how to design, develop, and deploy AI-powered chatbots that provide exceptional customer experiences and drive business growth."
          : "Aprende cómo diseñar, desarrollar e implementar chatbots impulsados por IA que brinden experiencias excepcionales al cliente.",
      date: "2024-12-10",
      category: locale === "en" ? "Chatbots" : "Chatbots",
      readTime: locale === "en" ? "12 min read" : "12 min lectura",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      tags: ["Chatbots", "AI", "Customer Service", "Automation"],
    },
    {
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
      category: locale === "en" ? "Automation" : "Automatización",
      readTime: locale === "en" ? "10 min read" : "10 min lectura",
      image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      tags: ["RPA", "Automation", "Business Process", "Efficiency"],
    },
    {
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
      category: locale === "en" ? "Web Development" : "Desarrollo Web",
      readTime: locale === "en" ? "9 min read" : "9 min lectura",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      tags: ["Web Development", "AI Tools", "Automation", "Code Optimization"],
    },
    {
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
      category: locale === "en" ? "Machine Learning" : "Machine Learning",
      readTime: locale === "en" ? "15 min read" : "15 min lectura",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      tags: [
        "Machine Learning",
        "Business Intelligence",
        "Data Analytics",
        "Case Studies",
      ],
    },
    {
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
      category: locale === "en" ? "Cloud & DevOps" : "Cloud y DevOps",
      readTime: locale === "en" ? "11 min read" : "11 min lectura",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      tags: ["Cloud Computing", "AI Deployment", "DevOps", "Scalability"],
    },
    {
      slug: "github-universe-2025-future-of-ai-software-development",
      title:
        locale === "en"
          ? "GitHub Universe 2025: The Future of AI in Software Development"
          : "GitHub Universe 2025: El Futuro de la IA en el Desarrollo de Software",
      excerpt:
        locale === "en"
          ? "GitHub Universe 2025 brings together global developers to explore how AI is reshaping software creation — from automated coding to intelligent collaboration."
          : "GitHub Universe 2025 reúne a desarrolladores de todo el mundo para explorar cómo la IA está transformando la creación de software, desde la codificación automatizada hasta la colaboración inteligente.",
      date: "2025-11-12",
      category: locale === "en" ? "Tech Events" : "Eventos Tech",
      readTime: locale === "en" ? "6 min read" : "6 min lectura",
      image: "/github-blog.jpg",
      tags: [
        "GitHub Universe",
        "AI",
        "Software Development",
        "Innovation",
        "Networking",
      ],
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-black to-accent-purple/10" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-primary-blue/50 transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary-blue/20 backdrop-blur-sm text-primary-blue text-sm rounded-full border border-primary-blue/30">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
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
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary-blue transition-colors duration-300">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-blue hover:text-accent-blue transition-colors duration-300 font-medium"
                  >
                    {locale === "en" ? "Read More" : "Leer Más"}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
