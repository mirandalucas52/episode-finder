import type { Locale } from "@/lib/i18n";

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "How does Find My Episode work?",
      answer:
        "Describe a scene from a TV show or movie in your own words — character names, dialogue, locations, or plot details. Our system analyzes your description and identifies the exact episode, movie, or series in seconds. You get the title, season and episode number, synopsis, trailer, and where to watch it.",
    },
    {
      question: "Is Find My Episode free to use?",
      answer:
        "Yes, the service is completely free. There are no accounts to create, no ads, and no paywalls. We rate-limit searches to prevent abuse, but normal usage is unlimited.",
    },
    {
      question: "What languages are supported?",
      answer:
        "You can search in English, French, Spanish, or Portuguese. Describe the scene in your native language and receive results in the same language. Movie and series titles are translated to their official local versions when available.",
    },
    {
      question: "What if I only remember a small detail?",
      answer:
        "Even partial details work. Our tool is designed to identify scenes from vague descriptions. If there's not enough information for a confident match, we'll suggest 2-3 alternative possibilities so you can pick the right one.",
    },
    {
      question: "Can it find any TV show or movie?",
      answer:
        "Our tool covers a massive catalog of movies and TV series from around the world, including mainstream hits, cult classics, anime, documentaries, and older productions. Obscure or very recent shows may occasionally be missed, but the coverage is extensive.",
    },
    {
      question: "How accurate is the identification?",
      answer:
        "Each result comes with a confidence level (high, medium, or low). High confidence means we're very sure; medium or low confidence includes alternative suggestions you can review. The system is particularly accurate when you provide character names, specific dialogue, or unique plot points.",
    },
    {
      question: "Does it work for specific episodes of long-running shows?",
      answer:
        "Yes. Select the 'Episode' mode when searching, and the tool will identify the exact season and episode number. This works well for iconic scenes from popular series like Breaking Bad, Game of Thrones, The Office, Friends, and hundreds more.",
    },
    {
      question: "Why do I need to specify Film, Series, or Episode?",
      answer:
        "Choosing the right mode helps narrow the search and improves accuracy. 'Film' searches only movies. 'Series' identifies a TV show as a whole without pinpointing a specific episode. 'Episode' finds the exact episode within a series, including season and episode numbers.",
    },
    {
      question: "Can I see where to watch the result?",
      answer:
        "Yes. Each result includes 'Where to watch' buttons showing the streaming, rental, or purchase options available in your country, powered by JustWatch data.",
    },
    {
      question: "Is my search history private?",
      answer:
        "Your search history stays on your device and is never sent to our servers. You can clear it at any time. Search queries are cached on our backend to speed up repeat searches, but they're not linked to any personal identifier.",
    },
  ],

  fr: [
    {
      question: "Comment fonctionne Retrouve mon épisode ?",
      answer:
        "Décrivez une scène d'une série ou d'un film avec vos propres mots — noms des personnages, dialogues, lieux ou détails de l'intrigue. Notre système analyse votre description et identifie en quelques secondes l'épisode exact, le film ou la série. Vous obtenez le titre, la saison et le numéro d'épisode, le synopsis, la bande-annonce et où le regarder.",
    },
    {
      question: "Le service est-il gratuit ?",
      answer:
        "Oui, le service est entièrement gratuit. Pas de compte à créer, pas de publicité, pas de paywall. Nous limitons le débit pour éviter les abus, mais l'usage normal est illimité.",
    },
    {
      question: "Quelles langues sont supportées ?",
      answer:
        "Vous pouvez chercher en français, anglais, espagnol ou portugais. Décrivez la scène dans votre langue et recevez les résultats dans la même langue. Les titres sont traduits vers leur version officielle locale lorsqu'elle existe.",
    },
    {
      question: "Et si je ne me souviens que d'un petit détail ?",
      answer:
        "Même les détails partiels fonctionnent. Notre outil est conçu pour identifier des scènes à partir de descriptions vagues. S'il n'y a pas assez d'informations, nous proposons 2-3 alternatives pour que vous choisissiez la bonne.",
    },
    {
      question: "Peut-il trouver n'importe quelle série ou film ?",
      answer:
        "Notre outil couvre un vaste catalogue de films et séries du monde entier : blockbusters, classiques cultes, animés, documentaires, productions anciennes. Les œuvres très confidentielles ou très récentes peuvent parfois manquer, mais la couverture est très étendue.",
    },
    {
      question: "Quelle est la précision de l'identification ?",
      answer:
        "Chaque résultat indique un niveau de confiance (élevé, moyen ou faible). Une confiance élevée signifie que nous sommes quasi certains ; une confiance moyenne ou faible propose des alternatives. Le système est particulièrement précis avec des noms de personnages, des dialogues ou des éléments d'intrigue uniques.",
    },
    {
      question: "Cela fonctionne-t-il pour des épisodes précis de longues séries ?",
      answer:
        "Oui. Sélectionnez le mode 'Épisode' et l'outil identifie la saison et le numéro d'épisode exact. C'est parfait pour les scènes iconiques de Breaking Bad, Game of Thrones, The Office, Friends et des centaines d'autres.",
    },
    {
      question: "Pourquoi choisir Film, Série ou Épisode ?",
      answer:
        "Choisir le bon mode affine la recherche et améliore la précision. 'Film' cherche uniquement dans les films. 'Série' identifie une série dans son ensemble sans épisode précis. 'Épisode' trouve l'épisode exact avec saison et numéro d'épisode.",
    },
    {
      question: "Puis-je voir où regarder le résultat ?",
      answer:
        "Oui. Chaque résultat inclut des boutons 'Où regarder' montrant les options de streaming, location ou achat disponibles dans votre pays, grâce aux données JustWatch.",
    },
    {
      question: "Mon historique est-il privé ?",
      answer:
        "Votre historique de recherche reste sur votre appareil et n'est jamais envoyé à nos serveurs. Vous pouvez l'effacer à tout moment. Les requêtes sont mises en cache côté serveur pour accélérer les recherches récurrentes, mais elles ne sont liées à aucun identifiant personnel.",
    },
  ],

  es: [
    {
      question: "¿Cómo funciona Encuentra mi episodio?",
      answer:
        "Describe una escena de una serie o película con tus propias palabras: nombres de personajes, diálogos, lugares o detalles de la trama. Nuestro sistema analiza tu descripción e identifica en segundos el episodio exacto, la película o la serie. Obtendrás el título, la temporada y el número de episodio, la sinopsis, el tráiler y dónde verlo.",
    },
    {
      question: "¿Es gratis?",
      answer:
        "Sí, el servicio es totalmente gratuito. Sin cuentas que crear, sin publicidad, sin muros de pago. Limitamos las búsquedas para evitar abusos, pero el uso normal es ilimitado.",
    },
    {
      question: "¿Qué idiomas son compatibles?",
      answer:
        "Puedes buscar en español, inglés, francés o portugués. Describe la escena en tu idioma y recibe los resultados en el mismo idioma. Los títulos se traducen a su versión local oficial cuando existe.",
    },
    {
      question: "¿Y si solo recuerdo un pequeño detalle?",
      answer:
        "Incluso los detalles parciales funcionan. Nuestra herramienta está diseñada para identificar escenas a partir de descripciones vagas. Si no hay suficiente información, sugerimos 2-3 alternativas para que elijas la correcta.",
    },
    {
      question: "¿Puede encontrar cualquier serie o película?",
      answer:
        "Cubrimos un vasto catálogo de películas y series de todo el mundo: grandes éxitos, clásicos de culto, anime, documentales, producciones antiguas. Las obras muy oscuras o muy recientes pueden fallar ocasionalmente, pero la cobertura es amplia.",
    },
    {
      question: "¿Qué tan precisa es la identificación?",
      answer:
        "Cada resultado incluye un nivel de confianza (alto, medio o bajo). Confianza alta significa casi certeza; media o baja incluye alternativas para revisar. El sistema es especialmente preciso con nombres de personajes, diálogos específicos o detalles únicos de la trama.",
    },
    {
      question: "¿Funciona para episodios específicos de series largas?",
      answer:
        "Sí. Selecciona el modo 'Episodio' y la herramienta identificará la temporada y el número de episodio exacto. Funciona muy bien con escenas icónicas de Breaking Bad, Game of Thrones, The Office, Friends y cientos más.",
    },
    {
      question: "¿Por qué elegir Película, Serie o Episodio?",
      answer:
        "Elegir el modo correcto afina la búsqueda y mejora la precisión. 'Película' busca solo en películas. 'Serie' identifica una serie completa sin un episodio específico. 'Episodio' encuentra el episodio exacto con temporada y número.",
    },
    {
      question: "¿Puedo ver dónde ver el resultado?",
      answer:
        "Sí. Cada resultado incluye botones '¿Dónde ver?' que muestran las opciones de streaming, alquiler o compra disponibles en tu país, gracias a los datos de JustWatch.",
    },
    {
      question: "¿Mi historial es privado?",
      answer:
        "Tu historial de búsqueda permanece en tu dispositivo y nunca se envía a nuestros servidores. Puedes borrarlo en cualquier momento. Las consultas se almacenan en caché en el backend para acelerar búsquedas repetidas, pero no están vinculadas a ningún identificador personal.",
    },
  ],

  pt: [
    {
      question: "Como funciona o Encontre meu episódio?",
      answer:
        "Descreva uma cena de uma série ou filme com as suas próprias palavras: nomes de personagens, diálogos, locais ou detalhes do enredo. O nosso sistema analisa a descrição e identifica em segundos o episódio exato, o filme ou a série. Obterá o título, a temporada e o número do episódio, a sinopse, o trailer e onde assistir.",
    },
    {
      question: "É gratuito?",
      answer:
        "Sim, o serviço é totalmente gratuito. Sem contas para criar, sem publicidade, sem paywalls. Limitamos as pesquisas para evitar abusos, mas o uso normal é ilimitado.",
    },
    {
      question: "Quais idiomas são suportados?",
      answer:
        "Pode pesquisar em português, inglês, francês ou espanhol. Descreva a cena no seu idioma e receba os resultados no mesmo idioma. Os títulos são traduzidos para a versão local oficial quando existe.",
    },
    {
      question: "E se eu só lembrar de um pequeno detalhe?",
      answer:
        "Mesmo detalhes parciais funcionam. A nossa ferramenta identifica cenas a partir de descrições vagas. Se não houver informação suficiente, sugerimos 2-3 alternativas para escolher a correta.",
    },
    {
      question: "Pode encontrar qualquer série ou filme?",
      answer:
        "Cobrimos um vasto catálogo de filmes e séries de todo o mundo: grandes sucessos, clássicos cult, anime, documentários, produções antigas. Obras muito obscuras ou muito recentes podem ocasionalmente falhar, mas a cobertura é ampla.",
    },
    {
      question: "Quão precisa é a identificação?",
      answer:
        "Cada resultado tem um nível de confiança (alto, médio ou baixo). Confiança alta significa quase certeza; média ou baixa inclui alternativas para rever. O sistema é particularmente preciso com nomes de personagens, diálogos ou detalhes únicos do enredo.",
    },
    {
      question: "Funciona para episódios específicos de séries longas?",
      answer:
        "Sim. Selecione o modo 'Episódio' e a ferramenta identificará a temporada e o número exato do episódio. Funciona muito bem com cenas icónicas de Breaking Bad, Game of Thrones, The Office, Friends e centenas mais.",
    },
    {
      question: "Porquê escolher Filme, Série ou Episódio?",
      answer:
        "Escolher o modo certo refina a pesquisa e melhora a precisão. 'Filme' pesquisa apenas filmes. 'Série' identifica uma série como um todo sem episódio específico. 'Episódio' encontra o episódio exato com temporada e número.",
    },
    {
      question: "Posso ver onde assistir ao resultado?",
      answer:
        "Sim. Cada resultado inclui botões 'Onde assistir' mostrando as opções de streaming, aluguer ou compra disponíveis no seu país, graças aos dados do JustWatch.",
    },
    {
      question: "O meu histórico é privado?",
      answer:
        "O seu histórico de pesquisa fica no seu dispositivo e nunca é enviado para os nossos servidores. Pode apagá-lo a qualquer momento. As consultas são mantidas em cache no backend para acelerar pesquisas repetidas, mas não estão ligadas a qualquer identificador pessoal.",
    },
  ],
};
