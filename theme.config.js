import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import useLocalesMap from "./utils/use-locales-map";
import {
  editTextMap,
  feedbackLinkMap,
  gitTimestampMap,
  headDescriptionMap,
  languageMap,
  searchPlaceholderMap,
  tableOfContentsTitleMap,
  titleMap,
  build134AndEditor135Release,
  metaTags,
} from "./translations/text";
import Logo from "./components/logo";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
const themeConfig = {
  project: {
    link: process.env.NEXT_PUBLIC_SOURCE_CODE_URL,
  },
  docsRepositoryBase: process.env.NEXT_PUBLIC_DOCS_SOURCE_CODE_URL + '/src/branch/main/',
  chat: {
    link: process.env.NEXT_PUBLIC_DISCORD_URL,
  },
  banner: {
    key: 'build-134-and-editor-135-release',
    text: () => {
      const text = useLocalesMap(build134AndEditor135Release);
      return (
        <>
          <a href="/blog/devlog-1">
            {text}
          </a>
        </>
      );
    }
  },
  primaryHue: {
    dark: 41,
    light: 41,
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – " + process.env.NEXT_PUBLIC_SITE_NAME,
    };
  },
  toc: {
    float: true,
    title: () => useLocalesMap(tableOfContentsTitleMap),
  },
  search: {
    placeholder: () => useLocalesMap(searchPlaceholderMap),
  },
  editLink: {
    text: () => useLocalesMap(editTextMap),
  },
  feedback: {
    content: () => useLocalesMap(feedbackLinkMap),
  },
  logo: () => {
    const title = useLocalesMap(titleMap);
    return (
      <>
        <Logo height={24} />
        <span
          className="mx-4 font-bold hidden md:inline select-none"
          title={`${process.env.NEXT_PUBLIC_SITE_NAME}: ${title}`}
        >
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </span>
      </>
    );
  },
  head: () => {
    const { route, locales, locale } = useRouter();
    const { frontMatter, title } = useConfig();
    const titleSuffix = useLocalesMap(titleMap);
    const description = useLocalesMap(headDescriptionMap);

    const imageUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL + "/favicon/og-image.jpg");

    if (!/\/index\.+/.test(route)) {
      imageUrl;
    }

    const contentLanguage = locales.join(", ");
    const ogTitle = title ? `${title} – ${process.env.NEXT_PUBLIC_SITE_NAME}` : `${process.env.NEXT_PUBLIC_SITE_NAME}: ${titleSuffix}`;
    const ogDescription = frontMatter.description || description;
    const ogImage = frontMatter.image || imageUrl.toString();

    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, minimum-scale=0.86"></meta>
        <meta httpEquiv="Content-Language" content={contentLanguage} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_SITE_NAME} />
        <meta name="description" content={ogDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={locale} />
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <meta property="og:locale:alternate" content={l} key={l} />
          ))}
        <meta name="keywords" content={useLocalesMap(metaTags)} />
      </>
    );
  },
  footer: {
    text: `${new Date().getFullYear()} © Red Projects | All rights to the S.T.A.L.K.E.R. and X-Ray Engine belong to GSC Game World`,
  },
  gitTimestamp({ timestamp }) {
    const { locale } = useRouter();
    const lastUpdatedOn = useLocalesMap(gitTimestampMap);

    return (
      <>
        {lastUpdatedOn}{" "}
        <time dateTime={timestamp.toISOString()}>
          {timestamp.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </>
    );
  },
  i18n: Object.entries(languageMap).map(([locale, text]) => ({
    locale,
    text,
  })),
};

export default themeConfig;
