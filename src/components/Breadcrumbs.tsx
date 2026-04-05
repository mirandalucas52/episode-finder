import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && { item: item.href }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-ink transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ink-light">{item.label}</span>
              )}
              {i < items.length - 1 && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-ink-subtle/60"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
