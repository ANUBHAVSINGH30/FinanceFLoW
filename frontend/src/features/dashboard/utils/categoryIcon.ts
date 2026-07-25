import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Film,
  Wallet,
  CircleDollarSign,
  Receipt,
} from "lucide-react";

export const CATEGORY_ICONS = {
  Food: UtensilsCrossed,
  Transport: Car,
  Shopping: ShoppingBag,
  Health: HeartPulse,
  Education: GraduationCap,
  Entertainment: Film,
  Salary: CircleDollarSign,
  Other: Receipt,
} as const;

export const getCategoryIcon = (category: string) => {
  return CATEGORY_ICONS[
    category as keyof typeof CATEGORY_ICONS
  ] ?? Wallet;
};