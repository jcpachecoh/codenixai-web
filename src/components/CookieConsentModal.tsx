"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Cookie, Check } from "lucide-react";

interface CookieConsentModalProps {
  onAccept: () => void;
}

export default function CookieConsentModal({
  onAccept,
}: CookieConsentModalProps) {
  const t = useTranslations("legal.cookies");
  const locale = useLocale();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />

        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-lg">
              <Cookie className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">{t("title")}</h2>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("description")}{" "}
              <Link
                href={`/${locale}/privacy`}
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                {t("privacyLink")}
              </Link>
              .
            </p>

            <button
              onClick={onAccept}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              {t("acceptButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
