"use client";
import z from "zod";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const ZBreadcrumb = z.object({
  labels: z.array(z.string().or(z.null())).optional(),
});

export type IBreadcumbProps = z.infer<typeof ZBreadcrumb>;

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toUpperCase();
};

/**
 * Breadcrumb
 *
 * A component that displays a breadcrumb for the current page.
 * It is used to help users navigate through the application.
 *
 * Props:
 * @param labels: string[] - an array of strings that will be used as the labels for the breadcrumb if no labels are provided the path will be used
 * @example
 * labels={["home", "document"]}
 * labels={["home", "document", "view"]}
 *
 * @component
 */
export const Breadcrumb: React.FC<IBreadcumbProps> = (
  props: IBreadcumbProps
) => {
  const { labels } = ZBreadcrumb.parse(props);

  const pathname = usePathname();

  const linkPath = pathname.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    return {
      breadcrumb: path,
      href: "/" + linkPath.slice(0, i + 1).join("/"),
      label: labels && labels[i] ? labels[i] : undefined,
    };
  });

  if (!pathArray) {
    return null;
  }

  return (
    <nav
      className="flex flex-wrap items-center w-full rounded-md bg-background"
      aria-label="breadcrumbs"
    >
      <ul className="flex flex-row items-center gap-x-1">
        {pathArray
          .filter((i) => i.label)
          .map((item, index) => {
            return (
              <li key={index} className="flex flex-row items-center gap-x-1">
                {index > 0 && <ChevronRight size={22} />}
                <Link
                  href={item.href}
                  className="text-gray-500 dark:text-white hover:text-zinc-800 focus:text-primary active:text-gray-900"
                  prefetch={false}
                >
                  {item.label ?? convertBreadcrumb(item.breadcrumb)}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
