export function OrderedList({
  children,
  className = "",
  listStyle = "decimal",
  start,
}) {
  const styleClass =
    {
      decimal: "list-decimal",
      "lower-alpha": "list-[lower-alpha]",
      "upper-alpha": "list-[upper-alpha]",
      "lower-roman": "list-[lower-roman]",
      "upper-roman": "list-[upper-roman]",
    }[listStyle] ?? "list-decimal";

  return (
    <ol
      className={`list-outside pl-6 text-zinc-300 space-y-1 ${styleClass} ${className}`}
      role="list"
      start={start}
    >
      {children}
    </ol>
  );
}

export function OrderedListItem({ children, className = "" }) {
  return (
    <li className={`text-zinc-300 dark:text-zinc-300 pl-1 ${className}`}>
      {children}
    </li>
  );
}
