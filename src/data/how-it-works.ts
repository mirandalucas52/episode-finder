import type { Locale } from "@/lib/i18n";

type HowItWorksContent = {
  backToSearch: string;
  heading1: string;
  heading2: string;
  subtitle: string;

  problemTitle: string;
  problemP1: string;
  problemP2Prefix: string;
  problemP2: string;

  stepsTitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Intro: string;
  step2List: string[];
  step3Title: string;
  step3Text: string;

  examplesTitle: string;
  examples: { searchLabel: string; search: string; resultLabel: string; result: string }[];

  langTitle: string;
  langText: string;

  tipsTitle: string;
  tips: string[];

  tryNow: string;
};

export const howItWorksContent: Record<Locale, HowItWorksContent> = {
  en: {
    backToSearch: "Back to search",
    heading1: "How to find an",
    heading2: "episode from a scene",
    subtitle:
      "Ever remembered a specific TV scene but forgot which episode it was from? Here's exactly how our tool helps you find it in seconds.",

    problemTitle: "The problem we solve",
    problemP1:
      "You remember a TV scene perfectly — maybe a character's monologue, a shocking death, or a funny moment — but you can't remember which episode it was from. Scrolling through seasons to find it is painful. Googling vague descriptions rarely works because search engines match keywords, not context.",
    problemP2Prefix: "Find My Episode",
    problemP2:
      " solves this by understanding your description semantically. Describe a scene in your own words — character names, dialogue fragments, locations, plot points, or just the vibe — and our system identifies the exact episode, movie, or series.",

    stepsTitle: "How it works in 3 steps",
    step1Title: "Choose your search mode",
    step1Text:
      "Pick Movie if you're looking for a film, Series to identify a TV show as a whole, or Episode for a specific episode. This helps narrow down results and improves accuracy.",
    step2Title: "Describe the scene",
    step2Intro: "Type what you remember. The more details you add, the better. Good descriptions include:",
    step2List: [
      "Character names or nicknames",
      "Dialogue snippets or memorable quotes",
      "Location (forest, restaurant, spaceship...)",
      "What happened (fight, confession, death...)",
      "Emotional tone or context",
    ],
    step3Title: "Get your answer instantly",
    step3Text:
      "You'll get the title, season and episode number (for TV shows), synopsis, confidence level, and links to where you can watch it. If the first match isn't right, we'll show alternative possibilities.",

    examplesTitle: "Examples of what works",
    examples: [
      {
        searchLabel: "Search",
        search: "A man on a bench tells a woman his life story while eating chocolates",
        resultLabel: "Result",
        result: "Forrest Gump (1994)",
      },
      {
        searchLabel: "Search",
        search: "A wedding that turns into a massacre in a medieval castle",
        resultLabel: "Result",
        result: "Game of Thrones — S03E09 \"The Rains of Castamere\"",
      },
      {
        searchLabel: "Search",
        search: "A chemistry teacher diagnosed with cancer starts making drugs",
        resultLabel: "Result",
        result: "Breaking Bad",
      },
    ],

    langTitle: "Languages supported",
    langText:
      "Our tool works in English, French, Spanish, and Portuguese. Describe the scene in your native language and get results back in the same language — movie titles are translated to their official local version when available.",

    tipsTitle: "Tips for better results",
    tips: [
      "Be specific about the genre — mentioning \"sci-fi\", \"comedy\", or \"thriller\" narrows the search.",
      "Include unique identifiers — an unusual character name, a specific object, or a memorable line of dialogue.",
      "Mention the era if you know it — \"a 90s movie where...\" or \"an early 2000s series\".",
      "Don't worry about exact words — our system understands paraphrasing and context, not just keywords.",
    ],

    tryNow: "Try it now",
  },

  fr: {
    backToSearch: "Retour à la recherche",
    heading1: "Comment retrouver un",
    heading2: "épisode à partir d'une scène",
    subtitle:
      "Il vous arrive de vous souvenir d'une scène précise sans plus savoir de quel épisode elle vient ? Voici comment notre outil vous aide à la retrouver en quelques secondes.",

    problemTitle: "Le problème que nous résolvons",
    problemP1:
      "Vous vous souvenez parfaitement d'une scène — un monologue culte, une mort choquante, un moment drôle — mais impossible de retrouver l'épisode. Parcourir les saisons une par une est fastidieux. Googler une description vague ne marche jamais car les moteurs de recherche matchent des mots-clés, pas du contexte.",
    problemP2Prefix: "Retrouve mon épisode",
    problemP2:
      " résout ce problème en comprenant votre description sémantiquement. Décrivez la scène avec vos mots — noms de personnages, bouts de dialogue, lieux, intrigue ou simplement l'ambiance — et notre système identifie l'épisode, le film ou la série exacte.",

    stepsTitle: "Comment ça marche en 3 étapes",
    step1Title: "Choisissez votre mode de recherche",
    step1Text:
      "Sélectionnez Film pour chercher un film, Série pour identifier une série globalement, ou Épisode pour un épisode précis. Cela affine les résultats et améliore la précision.",
    step2Title: "Décrivez la scène",
    step2Intro: "Tapez ce dont vous vous souvenez. Plus il y a de détails, mieux c'est. Une bonne description inclut :",
    step2List: [
      "Les noms ou surnoms des personnages",
      "Des bribes de dialogue ou des répliques marquantes",
      "Le lieu (forêt, restaurant, vaisseau spatial...)",
      "Ce qui s'est passé (combat, aveu, mort...)",
      "L'ambiance ou le contexte émotionnel",
    ],
    step3Title: "Obtenez votre réponse instantanément",
    step3Text:
      "Vous obtenez le titre, le numéro de saison et d'épisode (pour les séries), le synopsis, le niveau de confiance et les liens pour regarder. Si le premier résultat n'est pas bon, nous proposons des alternatives.",

    examplesTitle: "Exemples qui fonctionnent",
    examples: [
      {
        searchLabel: "Recherche",
        search: "Un homme sur un banc raconte sa vie à une femme en mangeant des chocolats",
        resultLabel: "Résultat",
        result: "Forrest Gump (1994)",
      },
      {
        searchLabel: "Recherche",
        search: "Un mariage qui tourne au massacre dans un château médiéval",
        resultLabel: "Résultat",
        result: "Game of Thrones — S03E09 « Les Pluies de Castamere »",
      },
      {
        searchLabel: "Recherche",
        search: "Un prof de chimie atteint d'un cancer qui se met à fabriquer de la drogue",
        resultLabel: "Résultat",
        result: "Breaking Bad",
      },
    ],

    langTitle: "Langues disponibles",
    langText:
      "Notre outil fonctionne en français, anglais, espagnol et portugais. Décrivez la scène dans votre langue et recevez les résultats dans la même langue — les titres sont traduits dans leur version locale officielle quand elle existe.",

    tipsTitle: "Astuces pour de meilleurs résultats",
    tips: [
      "Soyez précis sur le genre — mentionner « SF », « comédie » ou « thriller » affine la recherche.",
      "Ajoutez des identifiants uniques — un nom de personnage peu commun, un objet précis, une réplique marquante.",
      "Mentionnez l'époque si vous la connaissez — « un film des années 90 où... » ou « une série du début 2000 ».",
      "Pas besoin des mots exacts — notre système comprend les paraphrases et le contexte, pas seulement les mots-clés.",
    ],

    tryNow: "Essayer maintenant",
  },

  es: {
    backToSearch: "Volver a la búsqueda",
    heading1: "Cómo encontrar un",
    heading2: "episodio a partir de una escena",
    subtitle:
      "¿Alguna vez recordaste una escena pero olvidaste de qué episodio era? Así es exactamente como nuestra herramienta te ayuda a encontrarla en segundos.",

    problemTitle: "El problema que resolvemos",
    problemP1:
      "Recuerdas perfectamente una escena — un monólogo de un personaje, una muerte impactante o un momento divertido — pero no recuerdas de qué episodio era. Recorrer temporadas es agotador. Googlear descripciones vagas rara vez funciona porque los buscadores buscan palabras clave, no contexto.",
    problemP2Prefix: "Encuentra mi episodio",
    problemP2:
      " resuelve esto entendiendo tu descripción semánticamente. Describe una escena con tus palabras — nombres de personajes, fragmentos de diálogo, lugares, tramas o simplemente el ambiente — y nuestro sistema identifica el episodio, película o serie exacta.",

    stepsTitle: "Cómo funciona en 3 pasos",
    step1Title: "Elige tu modo de búsqueda",
    step1Text:
      "Selecciona Película si buscas un filme, Serie para identificar una serie en su conjunto, o Episodio para un episodio específico. Esto afina los resultados y mejora la precisión.",
    step2Title: "Describe la escena",
    step2Intro: "Escribe lo que recuerdas. Cuantos más detalles, mejor. Una buena descripción incluye:",
    step2List: [
      "Nombres o apodos de personajes",
      "Fragmentos de diálogo o frases memorables",
      "El lugar (bosque, restaurante, nave espacial...)",
      "Lo que ocurrió (pelea, confesión, muerte...)",
      "El tono emocional o contexto",
    ],
    step3Title: "Obtén tu respuesta al instante",
    step3Text:
      "Obtendrás el título, la temporada y número de episodio (para series), sinopsis, nivel de confianza y enlaces para ver la obra. Si el primer resultado no es el correcto, mostramos alternativas.",

    examplesTitle: "Ejemplos que funcionan",
    examples: [
      {
        searchLabel: "Búsqueda",
        search: "Un hombre en un banco le cuenta a una mujer su vida mientras come chocolates",
        resultLabel: "Resultado",
        result: "Forrest Gump (1994)",
      },
      {
        searchLabel: "Búsqueda",
        search: "Una boda que acaba en masacre en un castillo medieval",
        resultLabel: "Resultado",
        result: "Game of Thrones — S03E09 \"Las Lluvias de Castamere\"",
      },
      {
        searchLabel: "Búsqueda",
        search: "Un profesor de química con cáncer empieza a fabricar drogas",
        resultLabel: "Resultado",
        result: "Breaking Bad",
      },
    ],

    langTitle: "Idiomas disponibles",
    langText:
      "Nuestra herramienta funciona en español, inglés, francés y portugués. Describe la escena en tu idioma y recibe los resultados en el mismo idioma — los títulos se traducen a su versión local oficial cuando existe.",

    tipsTitle: "Consejos para mejores resultados",
    tips: [
      "Sé específico sobre el género — mencionar \"ciencia ficción\", \"comedia\" o \"thriller\" afina la búsqueda.",
      "Incluye identificadores únicos — un nombre de personaje inusual, un objeto específico o una línea de diálogo memorable.",
      "Menciona la época si la conoces — \"una película de los 90 donde...\" o \"una serie de principios de 2000\".",
      "No te preocupes por las palabras exactas — nuestro sistema entiende paráfrasis y contexto, no solo palabras clave.",
    ],

    tryNow: "Probar ahora",
  },

  pt: {
    backToSearch: "Voltar à pesquisa",
    heading1: "Como encontrar um",
    heading2: "episódio a partir de uma cena",
    subtitle:
      "Já se lembrou de uma cena específica mas esqueceu de que episódio era? Veja como a nossa ferramenta o ajuda a encontrá-la em segundos.",

    problemTitle: "O problema que resolvemos",
    problemP1:
      "Lembra-se perfeitamente de uma cena — um monólogo, uma morte chocante, um momento engraçado — mas não se lembra de que episódio era. Percorrer temporadas é cansativo. Pesquisar descrições vagas no Google raramente funciona porque os motores procuram palavras-chave, não contexto.",
    problemP2Prefix: "Encontre meu episódio",
    problemP2:
      " resolve isto entendendo a sua descrição semanticamente. Descreva uma cena com as suas palavras — nomes de personagens, fragmentos de diálogo, locais, enredos ou apenas o ambiente — e o nosso sistema identifica o episódio, filme ou série exata.",

    stepsTitle: "Como funciona em 3 passos",
    step1Title: "Escolha o seu modo de pesquisa",
    step1Text:
      "Escolha Filme se procura um filme, Série para identificar uma série como um todo, ou Episódio para um episódio específico. Isto afina os resultados e melhora a precisão.",
    step2Title: "Descreva a cena",
    step2Intro: "Escreva o que se lembra. Quantos mais detalhes, melhor. Uma boa descrição inclui:",
    step2List: [
      "Nomes ou alcunhas de personagens",
      "Fragmentos de diálogo ou frases memoráveis",
      "O local (floresta, restaurante, nave espacial...)",
      "O que aconteceu (luta, confissão, morte...)",
      "O tom emocional ou contexto",
    ],
    step3Title: "Obtenha a resposta instantaneamente",
    step3Text:
      "Obterá o título, a temporada e o número do episódio (para séries), sinopse, nível de confiança e links para assistir. Se o primeiro resultado não for o correto, mostramos alternativas.",

    examplesTitle: "Exemplos que funcionam",
    examples: [
      {
        searchLabel: "Pesquisa",
        search: "Um homem num banco conta a sua vida a uma mulher enquanto come chocolates",
        resultLabel: "Resultado",
        result: "Forrest Gump (1994)",
      },
      {
        searchLabel: "Pesquisa",
        search: "Um casamento que acaba em massacre num castelo medieval",
        resultLabel: "Resultado",
        result: "Game of Thrones — S03E09 \"As Chuvas de Castamere\"",
      },
      {
        searchLabel: "Pesquisa",
        search: "Um professor de química com cancro começa a fabricar drogas",
        resultLabel: "Resultado",
        result: "Breaking Bad",
      },
    ],

    langTitle: "Idiomas disponíveis",
    langText:
      "A nossa ferramenta funciona em português, inglês, francês e espanhol. Descreva a cena no seu idioma e receba os resultados no mesmo idioma — os títulos são traduzidos para a versão local oficial quando existe.",

    tipsTitle: "Dicas para melhores resultados",
    tips: [
      "Seja específico sobre o género — mencionar \"ficção científica\", \"comédia\" ou \"thriller\" afina a pesquisa.",
      "Inclua identificadores únicos — um nome de personagem invulgar, um objeto específico ou uma frase memorável.",
      "Mencione a época se souber — \"um filme dos anos 90 onde...\" ou \"uma série do início dos anos 2000\".",
      "Não se preocupe com as palavras exatas — o nosso sistema entende paráfrases e contexto, não só palavras-chave.",
    ],

    tryNow: "Experimentar agora",
  },
};
