import { ReactComponent as InboxIcon } from "./../../assets/inbox.svg";
import { selectData } from "../../store/slices/books";
import { Spinner, Stack } from "react-bootstrap";
import { useAppSelector } from "../../store";
import { cn } from "../../utils/helpers";

type Props = {
  children: JSX.Element | false;
};

export const MainBlockPreloader = ({ children }: Props) => {
  const { books, searchData, status } = useAppSelector(selectData);
  const isFirstLoad = status === "loading" && books.items.length === 0;

  const stackClass = cn(
    books.kind && "main",
    "h-100 justify-content-center align-items-center"
  );

  const noresult = (
    <Stack className={stackClass}>
      <InboxIcon className="text-secondary" />
      <span className="text-secondary">no results for {searchData.q}</span>
    </Stack>
  );

  return isFirstLoad ? (
    <Stack className={stackClass}>
      <Spinner variant="light" animation="grow" />
    </Stack>
  ) : (
    children || (books.kind ? noresult : <></>)
  );
};
