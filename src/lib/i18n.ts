export type Locale = "fr" | "en" | "es" | "pt";

export const SUPPORTED_LOCALES: Locale[] = ["fr", "en", "es", "pt"];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  pt: "Português",
};

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    "site.title": "Retrouve mon épisode",
    "site.subtitle": "Décrivez une scène de mémoire. On retrouve l'épisode exact pour vous.",
    "site.heading1": "Retrouve mon",
    "site.heading2": "épisode",

    "search.placeholder": "Décrivez la scène dont vous vous souvenez...",
    "search.charsRemaining": "caractères restants",
    "search.hint": "Entrée pour rechercher",
    "search.loading": "Recherche...",
    "search.button": "Rechercher",
    "search.minChars": "Décrivez la scène avec au moins 10 caractères.",

    "mode.film": "Film",
    "mode.series": "Série",
    "mode.episode": "Épisode",

    "result.confidenceHigh": "Confiance élevée",
    "result.confidenceMedium": "Confiance moyenne",
    "result.confidenceLow": "Confiance faible",
    "result.seasons": "saison",
    "result.seasonsPlural": "saisons",
    "result.ended": "Terminée",
    "result.ongoing": "En cours",
    "result.film": "Film",
    "result.series": "Série",
    "result.synopsisEpisode": "Synopsis de l'épisode",
    "result.synopsisSeries": "Présentation",
    "result.synopsisFilm": "Synopsis",
    "result.whyThis": "Pourquoi ce résultat",
    "result.cached": "Résultat en cache — réponse instantanée",
    "result.notFoundEpisode": "Épisode non identifié",
    "result.notFoundSeries": "Série non identifiée",
    "result.notFoundFilm": "Film non identifié",
    "result.moreDetails": "Essayez d'ajouter plus de détails : noms de personnages, lieu, dialogues...",

    "watch.title": "Où regarder",
    "watch.flatrate": "Streaming",
    "watch.rent": "Location",
    "watch.buy": "Achat",

    "spoiler.reveal": "Cliquer pour révéler le résumé (Spoilers)",

    "loading.text": "Exploration de notre mémoire cinématographique...",

    "share.button": "Partager",
    "share.text": "J'ai cherché : \"{query}\" — et j'ai trouvé : {title} !",
    "share.copied": "Lien copié dans le presse-papier",
    "share.nativeTitle": "Retrouve mon épisode",

    "quota.title": "Petite pause, on revient vite",
    "quota.message": "Ce site est gratuit et financé par la communauté. Beaucoup de monde l'utilise en ce moment — nos serveurs ont besoin de souffler quelques instants.",
    "quota.retry": "Réessayer",
    "quota.donationText": "Chaque recherche a un coût serveur. Vos dons financent directement les quotas de recherche pour toute la communauté.",
    "quota.donationButton": "Offrir un café pour faire tourner les serveurs",
    "quota.donationSubtext": "Un café = des dizaines de recherches offertes",

    "footer.coffee": "Si ce site a sauvé votre soirée, offrez-moi un café pour faire tourner les serveurs",
    "footer.madeIn": "Fait avec soin à Paris",

    "history.title": "Recherches récentes",
    "history.clear": "Effacer",

    "suggestions.title": "Ou essayez un exemple",

    "feedback.ask": "Ce résultat est-il correct ?",
    "feedback.thanks": "Merci pour votre retour !",

    "result.didYouMean": "Autres possibilités",

    "rateLimit.title": "Ralentissez un instant",
    "rateLimit.message": "Trop de recherches en peu de temps. Réessayez dans une minute.",

    "trailer.title": "Bande-annonce",
  },

  en: {
    "site.title": "Find My Episode",
    "site.subtitle": "Describe a scene from memory. We'll find the exact episode for you.",
    "site.heading1": "Find my",
    "site.heading2": "episode",

    "search.placeholder": "Describe the scene you remember...",
    "search.charsRemaining": "characters remaining",
    "search.hint": "Enter to search",
    "search.loading": "Searching...",
    "search.button": "Search",
    "search.minChars": "Describe the scene with at least 10 characters.",

    "mode.film": "Movie",
    "mode.series": "Series",
    "mode.episode": "Episode",

    "result.confidenceHigh": "High confidence",
    "result.confidenceMedium": "Medium confidence",
    "result.confidenceLow": "Low confidence",
    "result.seasons": "season",
    "result.seasonsPlural": "seasons",
    "result.ended": "Ended",
    "result.ongoing": "Ongoing",
    "result.film": "Movie",
    "result.series": "Series",
    "result.synopsisEpisode": "Episode synopsis",
    "result.synopsisSeries": "Overview",
    "result.synopsisFilm": "Synopsis",
    "result.whyThis": "Why this result",
    "result.cached": "Cached result — instant response",
    "result.notFoundEpisode": "Episode not found",
    "result.notFoundSeries": "Series not found",
    "result.notFoundFilm": "Movie not found",
    "result.moreDetails": "Try adding more details: character names, location, dialogue...",

    "watch.title": "Where to watch",
    "watch.flatrate": "Streaming",
    "watch.rent": "Rent",
    "watch.buy": "Buy",

    "spoiler.reveal": "Click to reveal summary (Spoilers)",

    "loading.text": "Searching our cinematic memory...",

    "share.button": "Share",
    "share.text": "I searched: \"{query}\" — and found: {title}!",
    "share.copied": "Link copied to clipboard",
    "share.nativeTitle": "Find My Episode",

    "quota.title": "Quick break, we'll be right back",
    "quota.message": "This site is free and community-funded. Many people are using it right now — our servers need a moment to catch up.",
    "quota.retry": "Try again",
    "quota.donationText": "Every search has a server cost. Your donations directly fund search capacity for the entire community.",
    "quota.donationButton": "Buy me a coffee to keep the servers running",
    "quota.donationSubtext": "One coffee = dozens of free searches",

    "footer.coffee": "If this site saved your evening, buy me a coffee to keep the servers running",
    "footer.madeIn": "Made with care in Paris",

    "history.title": "Recent searches",
    "history.clear": "Clear",

    "suggestions.title": "Or try an example",

    "feedback.ask": "Is this result correct?",
    "feedback.thanks": "Thanks for your feedback!",

    "result.didYouMean": "Other possibilities",

    "rateLimit.title": "Slow down a moment",
    "rateLimit.message": "Too many searches in a short time. Try again in a minute.",

    "trailer.title": "Trailer",
  },

  es: {
    "site.title": "Encuentra mi episodio",
    "site.subtitle": "Describe una escena de memoria. Encontramos el episodio exacto para ti.",
    "site.heading1": "Encuentra mi",
    "site.heading2": "episodio",

    "search.placeholder": "Describe la escena que recuerdas...",
    "search.charsRemaining": "caracteres restantes",
    "search.hint": "Enter para buscar",
    "search.loading": "Buscando...",
    "search.button": "Buscar",
    "search.minChars": "Describe la escena con al menos 10 caracteres.",

    "mode.film": "Película",
    "mode.series": "Serie",
    "mode.episode": "Episodio",

    "result.confidenceHigh": "Confianza alta",
    "result.confidenceMedium": "Confianza media",
    "result.confidenceLow": "Confianza baja",
    "result.seasons": "temporada",
    "result.seasonsPlural": "temporadas",
    "result.ended": "Finalizada",
    "result.ongoing": "En emisión",
    "result.film": "Película",
    "result.series": "Serie",
    "result.synopsisEpisode": "Sinopsis del episodio",
    "result.synopsisSeries": "Presentación",
    "result.synopsisFilm": "Sinopsis",
    "result.whyThis": "Por qué este resultado",
    "result.cached": "Resultado en caché — respuesta instantánea",
    "result.notFoundEpisode": "Episodio no identificado",
    "result.notFoundSeries": "Serie no identificada",
    "result.notFoundFilm": "Película no identificada",
    "result.moreDetails": "Intenta agregar más detalles: nombres de personajes, lugar, diálogos...",

    "watch.title": "Dónde ver",
    "watch.flatrate": "Streaming",
    "watch.rent": "Alquiler",
    "watch.buy": "Compra",

    "spoiler.reveal": "Clic para revelar el resumen (Spoilers)",

    "loading.text": "Explorando nuestra memoria cinematográfica...",

    "share.button": "Compartir",
    "share.text": "Busqué: \"{query}\" — ¡y encontré: {title}!",
    "share.copied": "Enlace copiado al portapapeles",
    "share.nativeTitle": "Encuentra mi episodio",

    "quota.title": "Pequeña pausa, volvemos pronto",
    "quota.message": "Este sitio es gratuito y financiado por la comunidad. Mucha gente lo está usando ahora — nuestros servidores necesitan un momento.",
    "quota.retry": "Reintentar",
    "quota.donationText": "Cada búsqueda tiene un costo de servidor. Tus donaciones financian directamente la capacidad de búsqueda para toda la comunidad.",
    "quota.donationButton": "Invítame un café para mantener los servidores",
    "quota.donationSubtext": "Un café = decenas de búsquedas gratuitas",

    "footer.coffee": "Si este sitio salvó tu noche, invítame un café para mantener los servidores",
    "footer.madeIn": "Hecho con cariño en París",

    "history.title": "Búsquedas recientes",
    "history.clear": "Borrar",

    "suggestions.title": "O prueba un ejemplo",

    "feedback.ask": "¿Es correcto este resultado?",
    "feedback.thanks": "¡Gracias por tu opinión!",

    "result.didYouMean": "Otras posibilidades",

    "rateLimit.title": "Más despacio un momento",
    "rateLimit.message": "Demasiadas búsquedas en poco tiempo. Inténtalo de nuevo en un minuto.",

    "trailer.title": "Tráiler",
  },

  pt: {
    "site.title": "Encontre meu episódio",
    "site.subtitle": "Descreva uma cena de memória. Encontramos o episódio exato para você.",
    "site.heading1": "Encontre meu",
    "site.heading2": "episódio",

    "search.placeholder": "Descreva a cena que você lembra...",
    "search.charsRemaining": "caracteres restantes",
    "search.hint": "Enter para pesquisar",
    "search.loading": "Pesquisando...",
    "search.button": "Pesquisar",
    "search.minChars": "Descreva a cena com pelo menos 10 caracteres.",

    "mode.film": "Filme",
    "mode.series": "Série",
    "mode.episode": "Episódio",

    "result.confidenceHigh": "Confiança alta",
    "result.confidenceMedium": "Confiança média",
    "result.confidenceLow": "Confiança baixa",
    "result.seasons": "temporada",
    "result.seasonsPlural": "temporadas",
    "result.ended": "Finalizada",
    "result.ongoing": "Em exibição",
    "result.film": "Filme",
    "result.series": "Série",
    "result.synopsisEpisode": "Sinopse do episódio",
    "result.synopsisSeries": "Apresentação",
    "result.synopsisFilm": "Sinopse",
    "result.whyThis": "Por que este resultado",
    "result.cached": "Resultado em cache — resposta instantânea",
    "result.notFoundEpisode": "Episódio não identificado",
    "result.notFoundSeries": "Série não identificada",
    "result.notFoundFilm": "Filme não identificado",
    "result.moreDetails": "Tente adicionar mais detalhes: nomes de personagens, local, diálogos...",

    "watch.title": "Onde assistir",
    "watch.flatrate": "Streaming",
    "watch.rent": "Aluguel",
    "watch.buy": "Compra",

    "spoiler.reveal": "Clique para revelar o resumo (Spoilers)",

    "loading.text": "Explorando nossa memória cinematográfica...",

    "share.button": "Compartilhar",
    "share.text": "Pesquisei: \"{query}\" — e encontrei: {title}!",
    "share.copied": "Link copiado para a área de transferência",
    "share.nativeTitle": "Encontre meu episódio",

    "quota.title": "Pequena pausa, voltamos logo",
    "quota.message": "Este site é gratuito e financiado pela comunidade. Muitas pessoas estão usando agora — nossos servidores precisam de um momento.",
    "quota.retry": "Tentar novamente",
    "quota.donationText": "Cada pesquisa tem um custo de servidor. Suas doações financiam diretamente a capacidade de pesquisa para toda a comunidade.",
    "quota.donationButton": "Me pague um café para manter os servidores",
    "quota.donationSubtext": "Um café = dezenas de pesquisas gratuitas",

    "footer.coffee": "Se este site salvou sua noite, me pague um café para manter os servidores",
    "footer.madeIn": "Feito com carinho em Paris",

    "history.title": "Pesquisas recentes",
    "history.clear": "Limpar",

    "suggestions.title": "Ou experimente um exemplo",

    "feedback.ask": "Este resultado está correto?",
    "feedback.thanks": "Obrigado pelo seu feedback!",

    "result.didYouMean": "Outras possibilidades",

    "rateLimit.title": "Devagar um momento",
    "rateLimit.message": "Demasiadas pesquisas em pouco tempo. Tente novamente em um minuto.",

    "trailer.title": "Trailer",
  },
};

export const t = (locale: Locale, key: string, vars?: Record<string, string>): string => {
  let text = translations[locale]?.[key] || translations.fr[key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
};

export const detectLocale = (): Locale => {
  if (typeof window === "undefined") return "fr";

  const stored = localStorage.getItem("locale");
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  const match = SUPPORTED_LOCALES.find((l) => l === browserLang);
  return match || "fr";
};
