
import { ADD_CATEGORY } from "../Constants/action-types";

export function addCategory(category) {
  return { type: "ADD_CATEGORY", category }
};
