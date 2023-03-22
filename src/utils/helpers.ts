import { ImageLinks } from "../models";

export const cn = (...classes: Array<string | boolean>) =>
  [...classes].filter(Boolean).join(" ");

export const getSecureSrc = (imageLinks: ImageLinks) => {
  const [left, right] = imageLinks.small.split(":");
  return left + "s:" + right;
};
