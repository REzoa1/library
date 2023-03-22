import { Button, Spinner, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchBook, fetchBooks, selectData } from "../../store/slices/books";
import { BookWrapper } from "../BookWrapper";

export const BooksContainer = () => {
  const dispatch = useAppDispatch();
  const { books, searchData, status } = useAppSelector(selectData);

  const { totalItems, items } = books;
  const { startIndex } = searchData;
  const disabled = items?.length === totalItems;

  const loadMore = () => {
    const loadData = { ...searchData, startIndex: startIndex + 30 };
    dispatch(fetchBooks(loadData));
  };

  const getBook = (id: string) => {
    dispatch(fetchBook(id));
  };

  return (
    <main className="main">
      <h6 className="text-center m-3">Found {totalItems} results</h6>

      <Stack className="jc flex-wrap" direction="horizontal" gap={4}>
        {items.map(({ volumeInfo, id }, index) => (
          <Button
            key={index}
            variant="light p-0 rounded-0"
            onClick={() => getBook(id)}
            disabled={status === "loading"}
          >
            <BookWrapper volumeInfo={volumeInfo} />
          </Button>
        ))}
      </Stack>

      <div className="text-center m-5">
        {status === "loading" ? (
          <Spinner variant="dark" />
        ) : (
          <Button variant="light h-36" disabled={disabled} onClick={loadMore}>
            Load more
          </Button>
        )}
      </div>
    </main>
  );
};
