import { VolumeInfo } from "../models";

type Props = {
  volumeInfo: VolumeInfo;
};

export const BookWrapper = ({ volumeInfo }: Props) => {
  const { imageLinks, categories, title, authors } = volumeInfo;
  return (
    <div className="book text-start">
      {imageLinks?.smallThumbnail && (
        <img className="image" src={imageLinks?.smallThumbnail} alt="book" />
      )}
      <span className="text-secondary text-decoration-underline">
        {categories?.length && categories[0]}
      </span>
      <span className="fw-bold">
        {title?.length <= 60 ? title : title.slice(0, 60) + "..."}
      </span>
      <span className="text-secondary">{authors?.join(", ")}</span>
    </div>
  );
};
