import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Link for navigation data defined as plain path strings (menus, footers).
 * The router resolves the string at runtime; typed links are used elsewhere.
 */
export function NavLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <Link to={href as never} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
