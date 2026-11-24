export type Swatch = { token: string; hex: string; use: string };
export type SwatchGroup = { name: string; swatches: Swatch[] };

// Labels for the starter page. The colours themselves come from globals.css.
export const palette: SwatchGroup[] = [
  {
    name: "Backgrounds",
    swatches: [
      {
        token: "page",
        hex: "#0f1924",
        use: "Home page and footer background"
      },
      {
        token: "page-product",
        hex: "#1b2838",
        use: "Product page background"
      },
      {
        token: "header",
        hex: "#171d25",
        use: "Top header"
      },
      {
        token: "nav",
        hex: "#182535",
        use: "Store menu bar (middle of its gradient)"
      },
      {
        token: "media",
        hex: "#000000",
        use: "Behind media and price boxes"
      }
    ]
  },
  {
    name: "Text",
    swatches: [
      {
        token: "text-strong",
        hex: "#ffffff",
        use: "Titles, prices"
      },
      {
        token: "text-menu",
        hex: "#dcdedf",
        use: "Header links"
      },
      {
        token: "text",
        hex: "#c6d4df",
        use: "Body text"
      },
      {
        token: "text-long",
        hex: "#acb2b8",
        use: "Long descriptions"
      },
      {
        token: "text-quiet",
        hex: "#8b929a",
        use: "Old prices, footer"
      }
    ]
  },
  {
    name: "Blue",
    swatches: [
      {
        token: "accent",
        hex: "#1a9fff",
        use: "Active menu item, search button"
      },
      {
        token: "link",
        hex: "#67c1f5",
        use: "Links, tags, secondary buttons"
      },
      {
        token: "review-positive",
        hex: "#66c0f4",
        use: "Positive review summary"
      },
      {
        token: "button-blue-from",
        hex: "#47bfff",
        use: "Blue button gradient start"
      },
      {
        token: "button-blue-to",
        hex: "#1a44c2",
        use: "Blue button gradient end"
      }
    ]
  },
  {
    name: "Green",
    swatches: [
      {
        token: "buy-from",
        hex: "#75b022",
        use: "Buy button gradient start"
      },
      {
        token: "buy-to",
        hex: "#588a1b",
        use: "Buy button gradient end"
      },
      {
        token: "buy-text",
        hex: "#d2efa9",
        use: "Buy button text"
      },
      {
        token: "discount",
        hex: "#a1cd44",
        use: "Home discount badge, top sellers"
      },
      {
        token: "discount-product",
        hex: "#4c6b22",
        use: "Product page discount badge"
      },
      {
        token: "discount-product-text",
        hex: "#beee11",
        use: "Product page discount text"
      },
      {
        token: "install",
        hex: "#5c7e10",
        use: "Install Steam button"
      }
    ]
  },
  {
    name: "Other",
    swatches: [
      {
        token: "review-mixed",
        hex: "#b9a074",
        use: "Mixed review summary"
      }
    ]
  }
];
