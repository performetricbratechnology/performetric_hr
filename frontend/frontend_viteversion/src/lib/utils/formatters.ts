import type { PriorityTypes } from "../../types/pdi";

export const formatPriorityText = (text: PriorityTypes) => {
  switch (text) {
    case "high":
      return "Alta";
      break;
    case "medium":
      return "Média";
      break;
    case "low":
      return "Baixa";
      break;
  }
};

export const formatPriorityColor = (text: PriorityTypes) => {
  switch (text) {
    case "high":
      return "bg-red-200! text-red-900!";
      break;
    case "medium":
      return "bg-orange-200! text-orange-900!";
      break;
    case "low":
      return "bg-green-200! text-green-900!";
      break;
  }
};
