import { useState } from "react";

let idCounter = 0;

export function generateID(prefix = "good-dock-id-") {
  return `${prefix}${(idCounter += 1)}`;
}

export function useId(givenId?: string) {
  const [id] = useState(givenId ?? generateID());

  return id;
}
