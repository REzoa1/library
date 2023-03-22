import { Button, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeBook, selectData } from "../../store/slices/books";
import { getSecureSrc } from "../../utils/helpers";
import { ReactComponent as BackIcon } from "./../../assets/arrow-left.svg";

export const BookView = () => {
  const dispatch = useAppDispatch();

  const { book } = useAppSelector(selectData);
  const { categories, title, description, imageLinks } = book;

  const goBack = () => {
    dispatch(removeBook());
  };

  const isSmallThumbnail =
    imageLinks && Object.keys(imageLinks).some((item) => item === "small");

  return (
    <Stack className="fd-c h-100 w-100 bg-light" direction="horizontal">
      <Stack className="left align-items-start pb-4">
        <Button
          variant="light rounded-0 bg-transparent border-0"
          onClick={goBack}
        >
          <BackIcon />
        </Button>
        {isSmallThumbnail && (
          <img
            className="image thumbnail"
            src={getSecureSrc(imageLinks)}
            alt="book"
          />
        )}
      </Stack>

      <div className="right w-75">
        <div className="pb-4">{categories?.join(", ")}</div>
        <h2 className="pb-2">{title}</h2>
        <div className="pb-4 text-secondary text-decoration-underline">
          {book?.authors?.join(", ")}
        </div>
        {description && (
          <div className="description shadow-sm border p-2 mb-3">
            {description}
          </div>
        )}
      </div>
    </Stack>
  );
};
