import { cn } from "../../utils/cn";

export function UnorderedList({ children, className = "", marker = "disc" }) {
  const markerClass = {
    disc: "list-disc",
    circle: "list-[circle]",
    square: "list-[square]",
    none: "list-none",
  }[marker];

  return (
    <ul
      className={cn(
        "list-outside space-y-1 pl-6 text-zinc-300",
        markerClass,
        className
      )}
      role="list"
    >
      {children}
    </ul>
  );
}

export function ListItem({ children, className = "" }) {
  return (
    <li className={cn("text-zinc-300 dark:text-zinc-300", className)}>
      {children}
    </li>
  );
}
