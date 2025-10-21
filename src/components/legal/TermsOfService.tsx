"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Scale,
  FileCheck,
  AlertCircle,
  Users,
  Zap,
  Trash2,
  Lock,
} from "lucide-react";

const TermsOfService = () => {
  const t = useTranslations();
  const [expandedSection, setExpandedSection] = useState(0);

  const sections = [
    "section1",
    "section2",
    "section3",
    "section4",
    "section5",
    "section6",
    "section7",
    "section8",
  ];

  const icons = [
    Scale,
    FileCheck,
    AlertCircle,
    Users,
    Zap,
    Trash2,
    Lock,
    Scale,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text mb-4">
              <Scale className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
              {t("legal.terms.title")}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t("legal.terms.description")}
            </p>
          </div>

          {/* Secciones interactivas */}
          <div className="grid gap-4 max-w-4xl mx-auto">
            {sections.map((section, index) => {
              const Icon = icons[index];
              const isExpanded = expandedSection === index;

              return (
                <div
                  key={section}
                  className="group relative overflow-hidden rounded-xl transition-all duration-500"
                >
                  {/* Fondo degradado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Border animado */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                      isExpanded ? "opacity-30" : ""
                    }`}
                  />

                  {/* Contenedor principal */}
                  <div
                    onClick={() => setExpandedSection(isExpanded ? -1 : index)}
                    className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 group-hover:border-slate-600/50 rounded-xl p-6 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1 p-2 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                          <Icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                            {t(`legal.terms.sections.${section}.title`)}
                          </h2>
                          {!isExpanded && (
                            <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                              {t(`legal.terms.sections.${section}.description`)}
                            </p>
                          )}
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-500 flex-shrink-0 mt-1 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Contenido expandido */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? "max-h-96 mt-4" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-4 pt-4 border-t border-slate-700/50">
                        <p className="text-gray-300 leading-relaxed">
                          {t(`legal.terms.sections.${section}.content`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
