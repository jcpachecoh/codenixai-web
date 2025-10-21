import WhatsAppAutomationPage from "@/components/whatsapp/WhatsAppAutomationPage";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({
    locale,
    namespace: "whatsappAutomation.hero",
  });

  return {
    title: "CodenixAI - " + t("title"),
    description: t("subtitle"),
  };
}
export default async function WhatsAppAutomation({ params }: PageParams) {
  await params;
  return <WhatsAppAutomationPage />;
}
