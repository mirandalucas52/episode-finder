export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
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
      "Your search history is stored locally in your browser (via localStorage) and never sent to our servers. You can clear it at any time. The search queries themselves are cached on our backend to speed up repeat searches, but they're not linked to any personal identifier.",
  },
];
