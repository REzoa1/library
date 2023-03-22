export type SearchData = {
  q: string;
  orderBy: string;
  category: string;
  startIndex: number;
};
export type ImageLinks = {
  thumbnail: string;
  smallThumbnail: string;
  small: string;
};

export type VolumeInfo = {
  title: string;
  imageLinks?: ImageLinks;
  description?: string;
  categories?: Array<string>;
  authors?: Array<string>;
};

export type BookData = {
  id: string;
  volumeInfo: VolumeInfo;
};

export type BooksData = {
  kind: string;
  totalItems: number;
  items: BookData[];
};
