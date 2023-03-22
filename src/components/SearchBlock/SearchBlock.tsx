import { useState, FormEvent, ChangeEvent } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useAppDispatch } from "../../store";
import { fetchBooks, resetSearh } from "../../store/slices/books";
import { ReactComponent as SearchIcon } from "./../../assets/search.svg";
import { SelectWrapper } from "../SelectWrapper";

export const SearchBlock = () => {
  const dispatch = useAppDispatch();

  const [orderBy, setOrderBy] = useState("relevance");
  const [category, setCategory] = useState("all");
  const [formValue, setFormValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchData = {
      q: formValue,
      orderBy,
      startIndex: 0,
      category: category,
    };

    dispatch(resetSearh());
    dispatch(fetchBooks(searchData));
  };

  return (
    <Container className="wrapper mt-5">
      <h1 className="text-white text-center fw-bold mb-4">Search for books</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            className="rounded-0"
            type="search"
            placeholder="Input for search"
            value={formValue}
            onChange={handleChange}
          />
          <Button variant="light rounded-0" type="submit" disabled={!formValue}>
            <SearchIcon />
          </Button>
        </InputGroup>
      </Form>
      <Stack
        className="pb-3 justify-content-between flex-wrap"
        direction="horizontal"
        gap={3}
      >
        <SelectWrapper
          type="Categories"
          state={category}
          setState={setCategory}
        />
        <SelectWrapper
          type="Sorting By"
          state={orderBy}
          setState={setOrderBy}
        />
      </Stack>
    </Container>
  );
};
