import { cn } from "../../utils/cn";

export function DescriptionList({ children, className = "" }) {
  return (
    <dl className={cn("space-y-3 text-zinc-300", className)} role="list">
      {children}
    </dl>
  );
}

export function DescriptionTerm({ children, className = "" }) {
  return (
    <dt className={cn("font-medium text-zinc-100", className)}>{children}</dt>
  );
}

export function DescriptionDetails({ children, className = "" }) {
  return <dd className={cn("ml-4 text-zinc-400", className)}>{children}</dd>;
}
