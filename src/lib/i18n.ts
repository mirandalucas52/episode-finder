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
    "site.subtitle": "Une scène, un personnage, une intrigue floue — on retrouve le film, la série ou l'épisode exact.",
    "site.heading1": "Décrivez.",
    "site.heading2": "Découvrez.",

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
    "loading.step1": "Analyse de votre description...",
    "loading.step2": "Recherche dans notre base de données...",
    "loading.step3": "Identification du contenu...",
    "loading.step4": "Vérification de la correspondance...",
    "loading.step5": "Récupération des informations...",
    "loading.funFact": "Le saviez-vous ?",

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
    "scroll.hint": "Défiler pour découvrir",
    "social.count": "moments retrouvés avec précision",

    "feedback.ask": "Ce résultat est-il correct ?",
    "feedback.thanks": "Merci pour votre retour !",
    "feedback.correctPrompt": "Quel est le bon titre ?",
    "feedback.correctPlaceholder": "Ex: Breaking Bad, Forrest Gump...",
    "feedback.send": "Envoyer",
    "feedback.skipCorrection": "Je ne sais pas, mais ce n'est pas le bon",
    "feedback.correctionSaved": "Merci ! On en tiendra compte pour les prochaines recherches.",

    "result.didYouMean": "Autres possibilités",

    "rateLimit.title": "Ralentissez un instant",
    "rateLimit.message": "Trop de recherches en peu de temps. Réessayez dans une minute.",

    "trailer.title": "Bande-annonce",
    "trailer.tryAnother": "Essayer une autre version",
    "trailer.watchOnYoutube": "Voir sur YouTube",

    "nav.home": "Accueil",
    "nav.trending": "Tendances",
    "nav.howItWorks": "Comment ça marche",
    "nav.faq": "FAQ",
    "nav.backToSearch": "Retour à la recherche",

    "footer.description": "Décrivez une scène et retrouvez l'épisode ou le film exact d'où elle vient.",
    "footer.explore": "Explorer",
    "footer.languages": "Langues",

    "trending.title1": "Recherches",
    "trending.title2": "tendances",
    "trending.subtitle": "Les épisodes, films et scènes les plus identifiés en ce moment par notre communauté.",
    "trending.thisWeek": "Populaires cette semaine",
    "trending.allTime": "Grands classiques",
    "trending.searches": "recherches",
    "trending.search": "recherche",
    "trending.empty": "Aucune recherche pour le moment. Soyez le premier à",
    "trending.emptyCta": "retrouver un épisode",

    "faq.title1": "Questions",
    "faq.title2": "fréquentes",
    "faq.subtitle": "Tout ce qu'il faut savoir pour retrouver un épisode ou un film à partir d'une description.",

    "home.seoTitle1": "Retrouvez n'importe quel",
    "home.seoTitle2": "épisode ou film",
    "home.seoSubtitle": "Décrivez une scène de mémoire — notre outil identifie l'épisode, le film ou la série exacte en quelques secondes.",
    "home.howItWorksTitle": "Comment ça marche",
    "home.howItWorksSubtitle": "Trois étapes simples pour retrouver n'importe quelle scène.",
    "home.step1Title": "Choisissez un mode",
    "home.step1Text": "Film, Série ou Épisode — choisissez ce que vous cherchez.",
    "home.step2Title": "Décrivez la scène",
    "home.step2Text": "Tapez ce dont vous vous souvenez : personnages, dialogues, lieu ou intrigue.",
    "home.step3Title": "Obtenez la réponse",
    "home.step3Text": "Titre, saison, épisode, synopsis, bande-annonce et où regarder.",
    "home.readGuide": "Lire le guide complet",
    "home.faqTitle": "Questions fréquentes",
    "home.faqSubtitle": "Tout ce qu'il faut savoir.",
    "home.seeAllFaq": "Voir toutes les questions",

    "home.featureAny": "Toute série, tout film",
    "home.featureAnyDesc": "Notre catalogue couvre les grandes séries, les classiques cultes, les animes, les documentaires et les films du monde entier.",
    "home.featureLang": "4 langues disponibles",
    "home.featureLangDesc": "Cherchez en français, anglais, espagnol ou portugais. Les résultats reviennent dans votre langue.",
    "home.featureEpisode": "Trouvez des épisodes précis",
    "home.featureEpisodeDesc": "Pas seulement la série — la saison et le numéro d'épisode exact. Parfait pour les scènes iconiques.",
    "home.featureWatch": "Où regarder",
    "home.featureWatchDesc": "Chaque résultat inclut les options de streaming, location et achat dans votre pays.",
    "home.featureFree": "100% gratuit, sans compte",
    "home.featureFreeDesc": "Pas de compte, pas de carte bancaire, pas de pub. Cherchez et obtenez vos résultats instantanément.",
    "home.featureTrailer": "Regardez la bande-annonce",
    "home.featureTrailerDesc": "Chaque résultat inclut la bande-annonce officielle pour confirmer que c'est le bon.",

    "notFound.title": "Cette scène n'est pas dans notre bibliothèque",
    "notFound.text": "La page que vous cherchez n'existe pas. Mais on peut vous aider à retrouver celle que vous voulez — décrivez simplement la scène.",
    "notFound.search": "Chercher une scène",
    "notFound.browse": "Voir les tendances",

    "related.title": "Vous aimerez aussi",
    "resultPage.synopsis": "Synopsis",
    "resultPage.whyThis": "Pourquoi ce résultat",
    "resultPage.searchAnother": "Chercher une autre scène",
  },

  en: {
    "site.title": "Find My Episode",
    "site.subtitle": "A scene, a character, a fuzzy plot — we'll find the exact movie, series, or episode.",
    "site.heading1": "Describe.",
    "site.heading2": "Discover.",

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
    "loading.step1": "Analyzing your description...",
    "loading.step2": "Searching our database...",
    "loading.step3": "Identifying the content...",
    "loading.step4": "Verifying the match...",
    "loading.step5": "Fetching details...",
    "loading.funFact": "Did you know?",

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
    "scroll.hint": "Scroll to explore",
    "social.count": "scenes identified with precision",

    "feedback.ask": "Is this result correct?",
    "feedback.thanks": "Thanks for your feedback!",
    "feedback.correctPrompt": "What's the correct title?",
    "feedback.correctPlaceholder": "E.g. Breaking Bad, Forrest Gump...",
    "feedback.send": "Send",
    "feedback.skipCorrection": "I don't know, but this isn't right",
    "feedback.correctionSaved": "Thanks! We'll use this to improve future searches.",

    "result.didYouMean": "Other possibilities",

    "rateLimit.title": "Slow down a moment",
    "rateLimit.message": "Too many searches in a short time. Try again in a minute.",

    "trailer.title": "Trailer",
    "trailer.tryAnother": "Try another version",
    "trailer.watchOnYoutube": "Watch on YouTube",

    "nav.home": "Home",
    "nav.trending": "Trending",
    "nav.howItWorks": "How it works",
    "nav.faq": "FAQ",
    "nav.backToSearch": "Back to search",

    "footer.description": "Describe any scene and find the exact TV episode or movie it comes from.",
    "footer.explore": "Explore",
    "footer.languages": "Languages",

    "trending.title1": "Trending",
    "trending.title2": "searches",
    "trending.subtitle": "The most popular TV episodes, movies, and scenes being identified right now by our community.",
    "trending.thisWeek": "Popular this week",
    "trending.allTime": "All-time favorites",
    "trending.searches": "searches",
    "trending.search": "search",
    "trending.empty": "No searches yet. Be the first to",
    "trending.emptyCta": "find an episode",

    "faq.title1": "Frequently asked",
    "faq.title2": "questions",
    "faq.subtitle": "Everything you need to know about finding TV episodes and movies from scene descriptions.",

    "home.seoTitle1": "Find any",
    "home.seoTitle2": "episode or movie",
    "home.seoSubtitle": "Describe a scene from memory — our tool identifies the exact episode, movie, or series in seconds.",
    "home.howItWorksTitle": "How it works",
    "home.howItWorksSubtitle": "Three simple steps to find any scene you remember.",
    "home.step1Title": "Choose a mode",
    "home.step1Text": "Film, Series, or Episode — pick what you're looking for.",
    "home.step2Title": "Describe the scene",
    "home.step2Text": "Type what you remember: characters, dialogue, location, or plot.",
    "home.step3Title": "Get the answer",
    "home.step3Text": "Title, season, episode, synopsis, trailer, and where to watch.",
    "home.readGuide": "Read the full guide",
    "home.faqTitle": "Frequently asked questions",
    "home.faqSubtitle": "Everything you need to know.",
    "home.seeAllFaq": "See all questions",

    "home.featureAny": "Any TV show, any movie",
    "home.featureAnyDesc": "Our catalog covers mainstream series, cult classics, anime, documentaries, and films from around the world.",
    "home.featureLang": "4 languages supported",
    "home.featureLangDesc": "Search in English, French, Spanish, or Portuguese. Results come back in your native language.",
    "home.featureEpisode": "Find specific episodes",
    "home.featureEpisodeDesc": "Not just the show — the exact season and episode number. Perfect for pinpointing iconic scenes.",
    "home.featureWatch": "Where to watch",
    "home.featureWatchDesc": "Each result includes streaming, rental, and purchase options for your country.",
    "home.featureFree": "100% free, no signup",
    "home.featureFreeDesc": "No account needed, no credit card, no ads. Just search and get results instantly.",
    "home.featureTrailer": "Watch the trailer",
    "home.featureTrailerDesc": "Every result comes with the official trailer so you can confirm it's the right one.",

    "notFound.title": "This scene isn't in our library",
    "notFound.text": "The page you're looking for doesn't exist. But we can help you find the one you meant — just describe the scene.",
    "notFound.search": "Search for a scene",
    "notFound.browse": "Browse trending",

    "related.title": "You might also like",
    "resultPage.synopsis": "Synopsis",
    "resultPage.whyThis": "Why this result",
    "resultPage.searchAnother": "Search another scene",
  },

  es: {
    "site.title": "Encuentra mi episodio",
    "site.subtitle": "Una escena, un personaje, una trama difusa — encontramos la película, serie o episodio exacto.",
    "site.heading1": "Describe.",
    "site.heading2": "Descubre.",

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
    "loading.step1": "Analizando tu descripción...",
    "loading.step2": "Buscando en nuestra base de datos...",
    "loading.step3": "Identificando el contenido...",
    "loading.step4": "Verificando la coincidencia...",
    "loading.step5": "Recuperando detalles...",
    "loading.funFact": "¿Sabías que?",

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
    "scroll.hint": "Desplázate para explorar",
    "social.count": "escenas identificadas con precisión",

    "feedback.ask": "¿Es correcto este resultado?",
    "feedback.thanks": "¡Gracias por tu opinión!",
    "feedback.correctPrompt": "¿Cuál es el título correcto?",
    "feedback.correctPlaceholder": "Ej: Breaking Bad, Forrest Gump...",
    "feedback.send": "Enviar",
    "feedback.skipCorrection": "No sé, pero este no es correcto",
    "feedback.correctionSaved": "¡Gracias! Lo tendremos en cuenta para futuras búsquedas.",

    "result.didYouMean": "Otras posibilidades",

    "rateLimit.title": "Más despacio un momento",
    "rateLimit.message": "Demasiadas búsquedas en poco tiempo. Inténtalo de nuevo en un minuto.",

    "trailer.title": "Tráiler",
    "trailer.tryAnother": "Probar otra versión",
    "trailer.watchOnYoutube": "Ver en YouTube",

    "nav.home": "Inicio",
    "nav.trending": "Tendencias",
    "nav.howItWorks": "Cómo funciona",
    "nav.faq": "Preguntas",
    "nav.backToSearch": "Volver a la búsqueda",

    "footer.description": "Describe una escena y encuentra el episodio o película exacta de donde proviene.",
    "footer.explore": "Explorar",
    "footer.languages": "Idiomas",

    "trending.title1": "Búsquedas",
    "trending.title2": "tendencia",
    "trending.subtitle": "Los episodios, películas y escenas más identificados por nuestra comunidad en este momento.",
    "trending.thisWeek": "Populares esta semana",
    "trending.allTime": "Favoritos de siempre",
    "trending.searches": "búsquedas",
    "trending.search": "búsqueda",
    "trending.empty": "Aún no hay búsquedas. Sé el primero en",
    "trending.emptyCta": "encontrar un episodio",

    "faq.title1": "Preguntas",
    "faq.title2": "frecuentes",
    "faq.subtitle": "Todo lo que necesitas saber para encontrar episodios y películas a partir de descripciones de escenas.",

    "home.seoTitle1": "Encuentra cualquier",
    "home.seoTitle2": "episodio o película",
    "home.seoSubtitle": "Describe una escena de memoria — nuestra herramienta identifica el episodio, película o serie exacta en segundos.",
    "home.howItWorksTitle": "Cómo funciona",
    "home.howItWorksSubtitle": "Tres pasos simples para encontrar cualquier escena que recuerdes.",
    "home.step1Title": "Elige un modo",
    "home.step1Text": "Película, Serie o Episodio — elige lo que buscas.",
    "home.step2Title": "Describe la escena",
    "home.step2Text": "Escribe lo que recuerdas: personajes, diálogos, lugar o trama.",
    "home.step3Title": "Obtén la respuesta",
    "home.step3Text": "Título, temporada, episodio, sinopsis, tráiler y dónde ver.",
    "home.readGuide": "Leer la guía completa",
    "home.faqTitle": "Preguntas frecuentes",
    "home.faqSubtitle": "Todo lo que necesitas saber.",
    "home.seeAllFaq": "Ver todas las preguntas",

    "home.featureAny": "Cualquier serie, cualquier película",
    "home.featureAnyDesc": "Nuestro catálogo cubre series mainstream, clásicos de culto, anime, documentales y películas de todo el mundo.",
    "home.featureLang": "4 idiomas disponibles",
    "home.featureLangDesc": "Busca en español, inglés, francés o portugués. Los resultados vuelven en tu idioma.",
    "home.featureEpisode": "Encuentra episodios específicos",
    "home.featureEpisodeDesc": "No solo la serie — la temporada y número de episodio exacto. Perfecto para escenas icónicas.",
    "home.featureWatch": "Dónde ver",
    "home.featureWatchDesc": "Cada resultado incluye opciones de streaming, alquiler y compra en tu país.",
    "home.featureFree": "100% gratis, sin registro",
    "home.featureFreeDesc": "Sin cuenta, sin tarjeta, sin anuncios. Solo busca y obtén resultados al instante.",
    "home.featureTrailer": "Mira el tráiler",
    "home.featureTrailerDesc": "Cada resultado incluye el tráiler oficial para confirmar que es el correcto.",

    "notFound.title": "Esta escena no está en nuestra biblioteca",
    "notFound.text": "La página que buscas no existe. Pero podemos ayudarte a encontrar la que querías — solo describe la escena.",
    "notFound.search": "Buscar una escena",
    "notFound.browse": "Ver tendencias",

    "related.title": "También te puede gustar",
    "resultPage.synopsis": "Sinopsis",
    "resultPage.whyThis": "Por qué este resultado",
    "resultPage.searchAnother": "Buscar otra escena",
  },

  pt: {
    "site.title": "Encontre meu episódio",
    "site.subtitle": "Uma cena, uma personagem, um enredo vago — encontramos o filme, a série ou o episódio exato.",
    "site.heading1": "Descreva.",
    "site.heading2": "Descubra.",

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
    "loading.step1": "Analisando sua descrição...",
    "loading.step2": "Pesquisando em nossa base de dados...",
    "loading.step3": "Identificando o conteúdo...",
    "loading.step4": "Verificando a correspondência...",
    "loading.step5": "Buscando detalhes...",
    "loading.funFact": "Você sabia?",

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
    "scroll.hint": "Role para explorar",
    "social.count": "momentos encontrados com precisão",

    "feedback.ask": "Este resultado está correto?",
    "feedback.thanks": "Obrigado pelo seu feedback!",
    "feedback.correctPrompt": "Qual é o título correto?",
    "feedback.correctPlaceholder": "Ex: Breaking Bad, Forrest Gump...",
    "feedback.send": "Enviar",
    "feedback.skipCorrection": "Não sei, mas este não é o correto",
    "feedback.correctionSaved": "Obrigado! Vamos considerar nas próximas pesquisas.",

    "result.didYouMean": "Outras possibilidades",

    "rateLimit.title": "Devagar um momento",
    "rateLimit.message": "Demasiadas pesquisas em pouco tempo. Tente novamente em um minuto.",

    "trailer.title": "Trailer",
    "trailer.tryAnother": "Tentar outra versão",
    "trailer.watchOnYoutube": "Ver no YouTube",

    "nav.home": "Início",
    "nav.trending": "Tendências",
    "nav.howItWorks": "Como funciona",
    "nav.faq": "FAQ",
    "nav.backToSearch": "Voltar à pesquisa",

    "footer.description": "Descreva uma cena e encontre o episódio ou filme exato de onde ela vem.",
    "footer.explore": "Explorar",
    "footer.languages": "Idiomas",

    "trending.title1": "Pesquisas",
    "trending.title2": "em tendência",
    "trending.subtitle": "Os episódios, filmes e cenas mais identificados pela nossa comunidade neste momento.",
    "trending.thisWeek": "Populares esta semana",
    "trending.allTime": "Favoritos de sempre",
    "trending.searches": "pesquisas",
    "trending.search": "pesquisa",
    "trending.empty": "Ainda sem pesquisas. Seja o primeiro a",
    "trending.emptyCta": "encontrar um episódio",

    "faq.title1": "Perguntas",
    "faq.title2": "frequentes",
    "faq.subtitle": "Tudo o que precisa de saber para encontrar episódios e filmes a partir de descrições de cenas.",

    "home.seoTitle1": "Encontre qualquer",
    "home.seoTitle2": "episódio ou filme",
    "home.seoSubtitle": "Descreva uma cena de memória — a nossa ferramenta identifica o episódio, filme ou série exata em segundos.",
    "home.howItWorksTitle": "Como funciona",
    "home.howItWorksSubtitle": "Três passos simples para encontrar qualquer cena que se lembre.",
    "home.step1Title": "Escolha um modo",
    "home.step1Text": "Filme, Série ou Episódio — escolha o que procura.",
    "home.step2Title": "Descreva a cena",
    "home.step2Text": "Escreva o que se lembra: personagens, diálogos, local ou enredo.",
    "home.step3Title": "Obtenha a resposta",
    "home.step3Text": "Título, temporada, episódio, sinopse, trailer e onde assistir.",
    "home.readGuide": "Ler o guia completo",
    "home.faqTitle": "Perguntas frequentes",
    "home.faqSubtitle": "Tudo o que precisa de saber.",
    "home.seeAllFaq": "Ver todas as perguntas",

    "home.featureAny": "Qualquer série, qualquer filme",
    "home.featureAnyDesc": "O nosso catálogo cobre séries populares, clássicos cult, anime, documentários e filmes de todo o mundo.",
    "home.featureLang": "4 idiomas suportados",
    "home.featureLangDesc": "Pesquise em português, inglês, francês ou espanhol. Os resultados voltam no seu idioma.",
    "home.featureEpisode": "Encontre episódios específicos",
    "home.featureEpisodeDesc": "Não apenas a série — a temporada e o número exato do episódio. Perfeito para cenas icónicas.",
    "home.featureWatch": "Onde assistir",
    "home.featureWatchDesc": "Cada resultado inclui opções de streaming, aluguer e compra no seu país.",
    "home.featureFree": "100% gratuito, sem registo",
    "home.featureFreeDesc": "Sem conta, sem cartão, sem anúncios. Basta pesquisar e obter resultados instantâneos.",
    "home.featureTrailer": "Veja o trailer",
    "home.featureTrailerDesc": "Cada resultado inclui o trailer oficial para confirmar que é o correto.",

    "notFound.title": "Esta cena não está na nossa biblioteca",
    "notFound.text": "A página que procura não existe. Mas podemos ajudá-lo a encontrar a que queria — basta descrever a cena.",
    "notFound.search": "Pesquisar uma cena",
    "notFound.browse": "Ver tendências",

    "related.title": "Também pode gostar",
    "resultPage.synopsis": "Sinopse",
    "resultPage.whyThis": "Porquê este resultado",
    "resultPage.searchAnother": "Pesquisar outra cena",
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
