const BASE_URL = 'https://www.abibliadigital.com.br/api';
// Usaremos a versão NVI (Nova Versão Internacional) como padrão, mas pode ser alterada.
const VERSION = 'nvi';

export const bibleApi = {
  // Buscar todos os livros da Bíblia
  getBooks: async () => {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      if (!response.ok) throw new Error('Erro ao buscar livros');
      return await response.json();
    } catch (error) {
      console.error('Erro na API da Bíblia (getBooks):', error);
      return [];
    }
  },

  // Buscar os detalhes de um livro (quantos capítulos ele tem)
  getBook: async (bookAbbrev: string) => {
    try {
      const response = await fetch(`${BASE_URL}/books/${bookAbbrev}`);
      if (!response.ok) throw new Error('Erro ao buscar detalhes do livro');
      return await response.json();
    } catch (error) {
      console.error('Erro na API da Bíblia (getBook):', error);
      return null;
    }
  },

  // Buscar os versículos de um capítulo específico
  getChapter: async (bookAbbrev: string, chapter: number) => {
    try {
      const response = await fetch(`${BASE_URL}/verses/${VERSION}/${bookAbbrev}/${chapter}`);
      if (!response.ok) throw new Error('Erro ao buscar capítulo');
      return await response.json();
    } catch (error) {
      console.error('Erro na API da Bíblia (getChapter):', error);
      return null;
    }
  },
  
  // Buscar um versículo aleatório do dia
  getRandomVerse: async () => {
    try {
      const response = await fetch(`${BASE_URL}/verses/${VERSION}/random`);
      if (!response.ok) throw new Error('Erro ao buscar versículo aleatório');
      return await response.json();
    } catch (error) {
      console.error('Erro na API da Bíblia (getRandomVerse):', error);
      return null;
    }
  }
};
