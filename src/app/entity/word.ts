export interface Word{
    error?: string;
    word: string;
    phonetics: {
      text: string;
      audio: string;
      sourceUrl?: string;
      license: {
        name: string;
        url: string;
      }
    }[];
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        synonyms: string[];
        antonyms: string[];
        example?: string;
      }[];
      synonyms: string[];
      antonyms: string[];
    }[];
    license: {
      name: string;
      url: string;
    };
    sourceUrls: string[];
  }
  