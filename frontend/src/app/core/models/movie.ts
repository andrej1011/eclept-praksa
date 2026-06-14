import { Genre } from './genre';
import { Showing } from './showing';

export interface Movie {
  id: string;
  name: string;
  available: boolean;
  duration: number;
  poster_url: string | null;
  short_description: string | null;
  release_date: string | null;
  imdb_link: string | null;
  showings: Showing[];
  genres: Genre[];
}

export type MovieSortField = 'name' | 'duration' | 'release_date' | 'available';
export type SortOrder = 'asc' | 'desc';

export interface MovieFilter {
  name?: string;
  genre_id?: string;
  sort_by?: MovieSortField;
  order?: SortOrder;
  limit?: number;
  offset?: number;
}