export interface Movies {
  results: { id: number; title: string }[];
  total_pages: number;
}

export interface Movie {
  release_date: string;
  original_title: string;
  overview: string;
}
