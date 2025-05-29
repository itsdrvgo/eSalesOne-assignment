import { getAbsoluteURL } from "@/lib/utils";

export const siteConfig: SiteConfig = {
    name: "Products Store",
    description: "A collection of products",
    longDescription:
        "A collection of products that are useful for developers and tech enthusiasts. Explore a variety of tools, gadgets, and resources to enhance your productivity and creativity.",
    keywords: [],
    category: "E-commerce",
    developer: {
        name: "DRVGO",
        url: "https://itsdrvgo.me/",
    },
    og: {
        url: getAbsoluteURL("/og.webp"),
        width: 1200,
        height: 630,
    },
    links: {
        Twitter: "https://x.com/itsdrvgo",
        Instagram: "https://www.instagram.com/itsdrvgo",
        Github: "https://github.com/itsdrvgo",
        Youtube: "https://youtube.com/@itsdrvgodev",
    },
};
