import { useAppSelector } from "../../store";
import { selectData } from "../../store/slices/books";
import { BooksContainer } from "../BooksContainer/BooksContainer";
import { BookView } from "../BookView/BookView";
import { MainBlockPreloader } from "./MainBlockPreloader";

export const MainBlock = () => {
  const { books, book } = useAppSelector(selectData);
  const { items } = books;
  const isBookView = book.title;

  return (
    <MainBlockPreloader>
      {!!items.length && (isBookView ? <BookView /> : <BooksContainer />)}
    </MainBlockPreloader>
  );
};
