import { cookies, headers } from "next/headers";
import { SUPPORTED_LOCALES, type Locale, t as translate } from "@/lib/i18n";

export const getServerLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const browserLang = acceptLanguage.split(",")[0]?.slice(0, 2).toLowerCase() as Locale;
  if (browserLang && SUPPORTED_LOCALES.includes(browserLang)) {
    return browserLang;
  }

  return "en";
};

export const getServerT = async () => {
  const locale = await getServerLocale();
  return {
    locale,
    t: (key: string, vars?: Record<string, string>) => translate(locale, key, vars),
  };
};
