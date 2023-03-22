import { Dropdown, DropdownButton, Stack } from "react-bootstrap";
import { categories, sortItems } from "../utils/constants";

type Props = {
  type: string;
  state: string;
  setState: (state: string) => void;
};

export const SelectWrapper = ({ type, state, setState }: Props) => {
  const Map: { [key: string]: Array<string> } = {
    Categories: categories,
    "Sorting By": sortItems,
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <span className="text-white">{type}</span>
      <DropdownButton
        className="wpx-170"
        variant="secondary rounded-0 d-flex justify-content-between align-items-center w-100"
        menuVariant="dark"
        title={state}
      >
        {Map[type].map((item, index) => (
          <Dropdown.Item
            key={index}
            active={item === state}
            value={state}
            onClick={() => setState(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Stack>
  );
};
