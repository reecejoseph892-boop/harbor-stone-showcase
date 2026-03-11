import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            "relative group overflow-hidden py-1",
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <>
            {children}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: isActive ? "100%" : 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </>
        )}
      </RouterNavLink>
    );
  },
);


NavLink.displayName = "NavLink";

export { NavLink };
