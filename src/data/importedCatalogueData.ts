/**
 * JK Enterprises — Expanded Product Catalogue Data
 * 
 * Sourced factually from:
 * 1. FINGERS October 2026 E-Catalogue PDF ("FINGERS E-Catalogue_Oct2026.pdf")
 * 2. HP Store India Accessories (https://www.hp.com/in-en/shop/listings/accessories)
 * 
 * Status: PENDING_BUSINESS_REVIEW (Marked DRAFT / Unverified until approved by business owners)
 */

export interface ImportedSpecification {
  group?: string;
  key: string;
  value: string;
  isFilterable: boolean;
}

export interface ImportedProductImage {
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
}

export interface ImportedProductRecord {
  name: string;
  slug: string;
  brand: 'FINGERS' | 'HP' | 'HyperX' | 'Poly';
  parentCategorySlug: string;
  categorySlug: string;
  categoryName: string;
  modelNumber: string;
  sku: string;
  description: string;
  mrpINR: number | null;
  sourcePriceINR: number | null;
  discountPercentage: number | null;
  warrantyInfo: string;
  specifications: ImportedSpecification[];
  images: ImportedProductImage[];
  sourceUrl: string;
  sourceRetrievalDate: string;
  sourceAvailability: string;
  publicationStatus: 'DRAFT';
  isDemo: boolean;
  isPriceConfirmed: boolean;
  isWarrantyConfirmed: boolean;
}

export interface ImportedCategoryRecord {
  name: string;
  slug: string;
  parentSlug?: string;
  description: string;
  icon?: string;
}

export interface ImportedBrandRecord {
  name: string;
  slug: string;
  description: string;
}

export const IMPORTED_PARENT_CATEGORIES: ImportedCategoryRecord[] = [
  {
    "name": "Computer Peripherals",
    "slug": "computer-peripherals",
    "description": "Keyboards, mice, desktop combos, monitors, USB docks, PC chassis, power protection, and barcode hardware.",
    "icon": "⌨️"
  },
  {
    "name": "Laptop & Computer Accessories",
    "slug": "laptop-accessories",
    "description": "Protective laptop bags, ergonomic stands, professional headsets, power adapters, and workspace supplies.",
    "icon": "💼"
  },
  {
    "name": "Gaming Accessories",
    "slug": "gaming-accessories",
    "description": "High-precision gaming optical mice, mechanical keyboards, and immersive surround-sound headsets.",
    "icon": "🎮"
  }
];

export const IMPORTED_SUBCATEGORIES: ImportedCategoryRecord[] = [
  {
    "name": "Mice",
    "slug": "mice",
    "parentSlug": "computer-peripherals",
    "description": "Wired, 2.4 GHz wireless, and multi-device Bluetooth optical mice."
  },
  {
    "name": "Keyboards",
    "slug": "keyboards",
    "parentSlug": "computer-peripherals",
    "description": "Standard, slim, and wireless commercial computer keyboards."
  },
  {
    "name": "Keyboard & Mouse Combos",
    "slug": "keyboard-mouse-combos",
    "parentSlug": "computer-peripherals",
    "description": "Paired desktop keyboard and optical mouse desksets."
  },
  {
    "name": "Mouse Pads & Desk Mats",
    "slug": "mouse-pads",
    "parentSlug": "computer-peripherals",
    "description": "High-density micro-weave fabric mouse pads and executive desk mats."
  },
  {
    "name": "USB Hubs & Docking Stations",
    "slug": "usb-hubs-docks",
    "parentSlug": "computer-peripherals",
    "description": "Multi-port USB Type-C hubs, Ethernet adapters, and Thunderbolt docking stations."
  },
  {
    "name": "Webcams & Conferencing",
    "slug": "webcams",
    "parentSlug": "computer-peripherals",
    "description": "Full HD and 2K webcams with built-in microphones for video conferencing."
  },
  {
    "name": "PC Cabinets & Cases",
    "slug": "pc-cabinets",
    "parentSlug": "computer-peripherals",
    "description": "ATX and Micro-ATX desktop chassis with cooling support and front I/O."
  },
  {
    "name": "SMPS & Power Supplies",
    "slug": "pc-power-supplies",
    "parentSlug": "computer-peripherals",
    "description": "Reliable ATX power supply units with surge and overload protection."
  },
  {
    "name": "Barcode Scanners & Readers",
    "slug": "barcode-scanners",
    "parentSlug": "computer-peripherals",
    "description": "1D and 2D handheld and omnidirectional barcode laser/optical readers."
  },
  {
    "name": "Monitors & Displays",
    "slug": "monitors",
    "parentSlug": "computer-peripherals",
    "description": "Full HD, curved, and IPS desktop displays for business and lab workstations."
  },
  {
    "name": "UPS & Power Protection",
    "slug": "ups-power",
    "parentSlug": "computer-peripherals",
    "description": "Line-interactive uninterruptible power supply systems."
  },
  {
    "name": "Networking & WiFi",
    "slug": "networking",
    "parentSlug": "computer-peripherals",
    "description": "High-gain USB WiFi adapters and commercial network peripherals."
  },
  {
    "name": "Laptop Bags & Backpacks",
    "slug": "laptop-bags-backpacks",
    "parentSlug": "laptop-accessories",
    "description": "Padded backpacks, sleeves, slings, and briefcases for laptops up to 16 inches."
  },
  {
    "name": "Headsets & Audio",
    "slug": "headsets-audio",
    "parentSlug": "laptop-accessories",
    "description": "Stereo USB headsets, conferencing microphones, and business earphones."
  },
  {
    "name": "Laptop Stands & Ergonomics",
    "slug": "laptop-stands",
    "parentSlug": "laptop-accessories",
    "description": "Adjustable aluminum laptop stands for elevated desktop ergonomics."
  },
  {
    "name": "Power Strips & Surge Protectors",
    "slug": "power-strips",
    "parentSlug": "laptop-accessories",
    "description": "Multi-socket surge-protected power strips with integrated USB charging."
  },
  {
    "name": "Workspace Accessories",
    "slug": "workspace-accessories",
    "parentSlug": "laptop-accessories",
    "description": "Essential desktop and office organization supplies."
  },
  {
    "name": "Gaming Mice",
    "slug": "gaming-mice",
    "parentSlug": "gaming-accessories",
    "description": "Ultra-lightweight high-DPI esports and gaming optical mice."
  },
  {
    "name": "Gaming Headsets",
    "slug": "gaming-headsets",
    "parentSlug": "gaming-accessories",
    "description": "Surround sound spatial gaming headsets with noise-cancelling boom microphones."
  }
];

export const IMPORTED_BRANDS: ImportedBrandRecord[] = [
  {
    "name": "FINGERS",
    "slug": "fingers",
    "description": "Dynamic Indian digital accessories and computer peripherals brand by Dynamic Conglomerate."
  },
  {
    "name": "HP",
    "slug": "hp",
    "description": "Hewlett-Packard official commercial computer accessories, docking stations, and peripherals."
  },
  {
    "name": "HyperX",
    "slug": "hyperx",
    "description": "High-performance gaming accessories and peripherals brand from HP."
  },
  {
    "name": "Poly",
    "slug": "poly",
    "description": "Enterprise enterprise audio, conferencing, and headset technology (formerly Plantronics and Polycom, an HP company)."
  }
];

export const IMPORTED_PRODUCTS: ImportedProductRecord[] = [
  {
    "name": "HP KM180 Wired Mouse and Keyboard Combo",
    "slug": "hp-hp-km180-wired-mouse-and-keyboard-combo-7j4g3aa-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "7J4G3AA#ACJ",
    "sku": "JK-HP-7J4G3AAACJ",
    "description": "HP KM180 Wired Mouse and Keyboard Combo (Part No. 7J4G3AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1598.99,
    "sourcePriceINR": 1202,
    "discountPercentage": 25,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "7J4G3AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Keyboard & Mouse Combos",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,202",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,598.99",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "25% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-km180-wired-mouse-and-keyboard-combo-7j4g3aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Bundle Type",
        "value": "Desktop Keyboard & Mouse Combo",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/5/1/5164t49mdml._sl1500__2.jpg?store=in-en",
        "altText": "HP KM180 Wired Mouse and Keyboard Combo photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-km180-wired-mouse-and-keyboard-combo-7j4g3aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP USB-C Travel Hub G3",
    "slug": "hp-hp-usb-c-travel-hub-g3-86s97ut",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "7J4G3AA#ACJ",
    "sku": "JK-HP-7J4G3AAA-1",
    "description": "HP USB-C Travel Hub G3 (Part No. 7J4G3AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 7380,
    "sourcePriceINR": 7380,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "7J4G3AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹7,380",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹7,380",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-travel-hub-g3-86s97ut",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/f/o/fox3_blackc_coreset_bottomfront_whitebg_m1556889.png?store=in-en",
        "altText": "HP USB-C Travel Hub G3 photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-travel-hub-g3-86s97ut",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP USB-C to RJ45 Adapter G2",
    "slug": "hp-hp-usb-c-to-rj45-adapter-g2-4z527aa",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "86S97UT",
    "sku": "JK-HP-86S97UT",
    "description": "HP USB-C to RJ45 Adapter G2 (Part No. 86S97UT). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 4503,
    "sourcePriceINR": 1599,
    "discountPercentage": 64,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "86S97UT",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,599",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹4,503",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "64% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-to-rj45-adapter-g2-4z527aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/o/hotdog2_jetblack_coreset_frontleft_whitebg_m1801385.png?store=in-en",
        "altText": "HP USB-C to RJ45 Adapter G2 photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-to-rj45-adapter-g2-4z527aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Everyday 16-inch Laptop Backpack",
    "slug": "hp-hp-everyday-16-inch-laptop-backpack-a08klut",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "4Z527AA",
    "sku": "JK-HP-4Z527AA",
    "description": "HP Everyday 16-inch Laptop Backpack (Part No. 4Z527AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1837,
    "sourcePriceINR": 1837,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "4Z527AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,837",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,837",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a08klut",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 16.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_everyday_16inch_laptop_backpack_front_white_m2855140_1.png?store=in-en",
        "altText": "HP Everyday 16-inch Laptop Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a08klut",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "Headphone with Microphone",
    "slug": "hp-headphone-with-microphone-b4b09pa-acj",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "A08KLUT",
    "sku": "JK-HP-A08KLUT",
    "description": "Headphone with Microphone (Part No. A08KLUT). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 999,
    "sourcePriceINR": 699,
    "discountPercentage": 30,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A08KLUT",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Headsets & Audio",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹699",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹999",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "30% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/headphone-with-microphone-b4b09pa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/5/1/51r32zqafal._sl1500__1.jpg?store=in-en",
        "altText": "Headphone with Microphone photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/headphone-with-microphone-b4b09pa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Stereo USB Headset",
    "slug": "hp-hp-stereo-usb-headset-9z4v9aa-acj",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "B4B09PA#ACJ",
    "sku": "JK-HP-B4B09PAACJ",
    "description": "HP Stereo USB Headset (Part No. B4B09PA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2150,
    "sourcePriceINR": 1319,
    "discountPercentage": 39,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "B4B09PA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Headsets & Audio",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,319",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,150",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "39% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-stereo-usb-headset-9z4v9aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/9/z/9z4v9aa_m2849127_1.png?store=in-en",
        "altText": "HP Stereo USB Headset photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-stereo-usb-headset-9z4v9aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP KM160 Wired Mouse and Keyboard Combo",
    "slug": "hp-hp-km160-wired-mouse-and-keyboard-combo-99y13aa-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "9Z4V9AA#ACJ",
    "sku": "JK-HP-9Z4V9AAACJ",
    "description": "HP KM160 Wired Mouse and Keyboard Combo (Part No. 9Z4V9AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1399,
    "sourcePriceINR": 864,
    "discountPercentage": 38,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9Z4V9AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Keyboard & Mouse Combos",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹864",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,399",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "38% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-km160-wired-mouse-and-keyboard-combo-99y13aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Bundle Type",
        "value": "Desktop Keyboard & Mouse Combo",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/k/m/km160_99y13aa_m1553737_1.png?store=in-en",
        "altText": "HP KM160 Wired Mouse and Keyboard Combo photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-km160-wired-mouse-and-keyboard-combo-99y13aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 320 FHD Webcam",
    "slug": "hp-hp-320-fhd-webcam-53x26aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "webcams",
    "categoryName": "Webcams & Conferencing",
    "modelNumber": "99Y13AA#ACJ",
    "sku": "JK-HP-99Y13AAACJ",
    "description": "HP 320 FHD Webcam (Part No. 99Y13AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 4995,
    "sourcePriceINR": 4995,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "99Y13AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Webcams & Conferencing",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹4,995",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹4,995",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-320-fhd-webcam-53x26aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/s/a/sabanlite_jetblack_cameracoveroff_coreset_front_v2_6893652_1.png?store=in-en",
        "altText": "HP 320 FHD Webcam photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-320-fhd-webcam-53x26aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "Tel:+9118001084749",
    "slug": "hp-tel:+9118001084749",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "AY228AA",
    "sku": "JK-HP-AY228AA",
    "description": "Tel:+9118001084749 (Part No. AY228AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AY228AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Workspace Accessories",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.comtel:+9118001084749",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      }
    ],
    "images": [],
    "sourceUrl": "https://www.hp.comtel:+9118001084749",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 400 Quiet Wireless Mouse",
    "slug": "hp-hp-400-quiet-wireless-mouse-az7b4aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AZ7B4AA#UUF",
    "sku": "JK-HP-AZ7B4AAUUF",
    "description": "HP 400 Quiet Wireless Mouse (Part No. AZ7B4AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2500,
    "sourcePriceINR": 2149,
    "discountPercentage": 14,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AZ7B4AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,149",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,500",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "14% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b4aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_400_quiet_wireless_mouse_cooper_blue_e50cfae8-0530-46d1-941f-2ebb5a645d16.png.png?store=in-en",
        "altText": "HP 400 Quiet Wireless Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b4aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 400 Quiet Wireless Mouse",
    "slug": "hp-hp-400-quiet-wireless-mouse-az7b5aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AZ7B4AA#UUF",
    "sku": "JK-HP-AZ7B4AAU-1",
    "description": "HP 400 Quiet Wireless Mouse (Part No. AZ7B4AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2500,
    "sourcePriceINR": 2500,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AZ7B4AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,500",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,500",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b5aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/c/o/cooper_mouse_pink_coreset_top_whitebg_4720813.png?store=in-en",
        "altText": "HP 400 Quiet Wireless Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b5aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 230 Slim Wireless Mouse",
    "slug": "hp-hp-230-slim-wireless-mouse-aj7c2aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AZ7B5AA#UUF",
    "sku": "JK-HP-AZ7B5AAUUF",
    "description": "HP 230 Slim Wireless Mouse (Part No. AZ7B5AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2200,
    "sourcePriceINR": 2200,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AZ7B5AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,200",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,200",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-230-slim-wireless-mouse-aj7c2aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/4/24c2_hp_230_slim_wireless_mouse_jetblack_catalog_topdown_whitebg_m2849129.png?store=in-en",
        "altText": "HP 230 Slim Wireless Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-230-slim-wireless-mouse-aj7c2aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 240 Pike Silver Bluetooth Mouse",
    "slug": "hp-hp-240-pike-silver-bluetooth-mouse-43n04aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AJ7C2AA#UUF",
    "sku": "JK-HP-AJ7C2AAUUF",
    "description": "HP 240 Pike Silver Bluetooth Mouse (Part No. AJ7C2AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1698,
    "sourcePriceINR": 1178,
    "discountPercentage": 31,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AJ7C2AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,178",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,698",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "31% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-240-pike-silver-bluetooth-mouse-43n04aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_240_bluetooth_mouse_naturalsilver_coreset_topdown_m1927954.png?store=in-en",
        "altText": "HP 240 Pike Silver Bluetooth Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-240-pike-silver-bluetooth-mouse-43n04aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 430 Multi-Device Wireless Mouse",
    "slug": "hp-hp-430-multi-device-wireless-mouse-3b4q2aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "43N04AA#UUF",
    "sku": "JK-HP-43N04AAUUF",
    "description": "HP 430 Multi-Device Wireless Mouse (Part No. 43N04AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "43N04AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-430-multi-device-wireless-mouse-3b4q2aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/1/21c2_hp_430_multi_device_wireless_mouse_cadbury_consumer_jetblack_coreset_topdown_4k_m2017425_1.png?store=in-en",
        "altText": "HP 430 Multi-Device Wireless Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-430-multi-device-wireless-mouse-3b4q2aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 400 Quiet Wireless Mouse",
    "slug": "hp-hp-400-quiet-wireless-mouse-az7b2aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "3B4Q2AA#UUF",
    "sku": "JK-HP-3B4Q2AAUUF",
    "description": "HP 400 Quiet Wireless Mouse (Part No. 3B4Q2AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2500,
    "sourcePriceINR": 2500,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "3B4Q2AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,500",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,500",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b2aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_400_quiet_wireless_mouse_cooper_black_83ac7875-8424-4b31-b981-a2063aab4018.png.png?store=in-en",
        "altText": "HP 400 Quiet Wireless Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-400-quiet-wireless-mouse-az7b2aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Z3700 Dual Black Mouse",
    "slug": "hp-hp-z3700-dual-black-mouse-758a8aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AZ7B2AA#UUF",
    "sku": "JK-HP-AZ7B2AAUUF",
    "description": "HP Z3700 Dual Black Mouse (Part No. AZ7B2AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1998,
    "sourcePriceINR": 1998,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AZ7B2AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,998",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,998",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-z3700-dual-black-mouse-758a8aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wired USB",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/3/23c1_hp_z3700_dual_mouse_jackblack_coreset_top_white_bcf0e891-a979-4436-b42a-733c984e633c.png.png?store=in-en",
        "altText": "HP Z3700 Dual Black Mouse photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-z3700-dual-black-mouse-758a8aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Pulsefire Haste 2 Core Wls - Gaming Mouse (Black/ Black)",
    "slug": "hp-hyperx-pulsefire-haste-2-core-wls-gaming-mouse-black-black-8r2e6aa",
    "brand": "HyperX",
    "parentCategorySlug": "gaming-accessories",
    "categorySlug": "gaming-mice",
    "categoryName": "Gaming Mice",
    "modelNumber": "758A8AA#UUF",
    "sku": "JK-HYX-758A8AAUUF",
    "description": "HyperX Pulsefire Haste 2 Core Wls - Gaming Mouse (Black/ Black) (Part No. 758A8AA#UUF). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "758A8AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Gaming Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-pulsefire-haste-2-core-wls-gaming-mouse-black-black-8r2e6aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wired USB",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/f/d/fd4a8454-8d9c-4845-8b8b-4a5c73c700c1.png?store=in-en",
        "altText": "HyperX Pulsefire Haste 2 Core Wls - Gaming Mouse (Black/ Black) photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-pulsefire-haste-2-core-wls-gaming-mouse-black-black-8r2e6aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Pulsefire Fuse Wireless Gaming Mouse (Black)",
    "slug": "hp-hyperx-pulsefire-fuse-wireless-gaming-mouse-black-a1ky6aa",
    "brand": "HyperX",
    "parentCategorySlug": "gaming-accessories",
    "categorySlug": "gaming-mice",
    "categoryName": "Gaming Mice",
    "modelNumber": "8R2E6AA",
    "sku": "JK-HYX-8R2E6AA",
    "description": "HyperX Pulsefire Fuse Wireless Gaming Mouse (Black) (Part No. 8R2E6AA). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "8R2E6AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Gaming Mice",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-pulsefire-fuse-wireless-gaming-mouse-black-a1ky6aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Optical Mouse",
        "isFilterable": true
      },
      {
        "group": "Technical",
        "key": "Connectivity",
        "value": "Wireless / Bluetooth",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/b/c/bc3748fe-4d07-4d7f-9c15-a302b550d2e9.png?store=in-en",
        "altText": "HyperX Pulsefire Fuse Wireless Gaming Mouse (Black) photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-pulsefire-fuse-wireless-gaming-mouse-black-a1ky6aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP K160 Wired Keyboard",
    "slug": "hp-hp-k160-wired-keyboard-9z4v7aa-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "9Z4V7AA#ACJ",
    "sku": "JK-HP-9Z4V7AAACJ",
    "description": "HP K160 Wired Keyboard (Part No. 9Z4V7AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1299.99,
    "sourcePriceINR": 619,
    "discountPercentage": 52,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9Z4V7AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Keyboards",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹619",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,299.99",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "52% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-k160-wired-keyboard-9z4v7aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Keyboard",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/k/e/key1.png?store=in-en",
        "altText": "HP K160 Wired Keyboard photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-k160-wired-keyboard-9z4v7aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 350 Compact Multi-Device Bluetooth Keyboard",
    "slug": "hp-hp-350-compact-multi-device-bluetooth-keyboard-692t0aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "9Z4V7AA#ACJ",
    "sku": "JK-HP-9Z4V7AAA-1",
    "description": "HP 350 Compact Multi-Device Bluetooth Keyboard (Part No. 9Z4V7AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9Z4V7AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Keyboards",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-350-compact-multi-device-bluetooth-keyboard-692t0aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Keyboard",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/2/22c2_pocky_ceramicwhite_coreset_top_m1803790.png?store=in-en",
        "altText": "HP 350 Compact Multi-Device Bluetooth Keyboard photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-350-compact-multi-device-bluetooth-keyboard-692t0aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP 350 Compact Multi-Device Bluetooth Keyboard",
    "slug": "hp-hp-350-compact-multi-device-bluetooth-keyboard-692s8aa-uuf",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "692T0AA#UUF",
    "sku": "JK-HP-692T0AAUUF",
    "description": "HP 350 Compact Multi-Device Bluetooth Keyboard (Part No. 692T0AA#UUF). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "692T0AA#UUF",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Keyboards",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-350-compact-multi-device-bluetooth-keyboard-692s8aa-uuf",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Device Type",
        "value": "Keyboard",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/2/22c2_pocky_jackblack_coreset_top_whitebg_m1803812.png?store=in-en",
        "altText": "HP 350 Compact Multi-Device Bluetooth Keyboard photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-350-compact-multi-device-bluetooth-keyboard-692s8aa-uuf",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-thunderbolt-4-ultra-180w-g6-dock-9x481ut-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "9X481UT#ACJ",
    "sku": "JK-HP-9X481UTACJ",
    "description": "One line (Part No. 9X481UT#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 45000,
    "sourcePriceINR": 29999,
    "discountPercentage": 33,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9X481UT#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹29,999",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹45,000",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "33% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-ultra-180w-g6-dock-9x481ut-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp-thunderbolt-4-ultra-180w-g6-dock-meteorsilver-hero-whitebg-front-top-green-led_27e3e5a2-2b6e-4b4e-9981-d533a8ac9559.png.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-ultra-180w-g6-dock-9x481ut-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-thunderbolt-4-100w-g6-dock-9x472ut-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "9X481UT#ACJ",
    "sku": "JK-HP-9X481UTA-1",
    "description": "One line (Part No. 9X481UT#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9X481UT#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-100w-g6-dock-9x472ut-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp-thunderbolt-4-100w-g6-dock-meteorsilver-hero-visid-graybg-front-top-red-led_a4021e1e-c275-40a7-8ec2-2174daa9e314.png.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-100w-g6-dock-9x472ut-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-usb-c-100w-g6-dock-9x3v1ut-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "9X472UT#ACJ",
    "sku": "JK-HP-9X472UTACJ",
    "description": "One line (Part No. 9X472UT#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9X472UT#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-100w-g6-dock-9x3v1ut-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_usb-c_100w_g6_dock_product__product_only_right_facing_b6980faa-397b-4703-bada-47da8adc04e6.png.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-100w-g6-dock-9x3v1ut-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP USB-C 100W Standard Manageability G6 Dock",
    "slug": "hp-hp-usb-c-100w-standard-manageability-g6-dock-d6ml0aa-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "9X3V1UT#ACJ",
    "sku": "JK-HP-9X3V1UTACJ",
    "description": "HP USB-C 100W Standard Manageability G6 Dock (Part No. 9X3V1UT#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9X3V1UT#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-100w-standard-manageability-g6-dock-d6ml0aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_usb-c_100w_g6_dock_product_jet_black_product_only_other_2962549e-b77d-4e3c-a064-ce01a28ec9f3.png_1.png?store=in-en",
        "altText": "HP USB-C 100W Standard Manageability G6 Dock photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-100w-standard-manageability-g6-dock-d6ml0aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-thunderbolt-4-ultra-280w-g6-dock-aw5m5ut-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "D6ML0AA#ACJ",
    "sku": "JK-HP-D6ML0AAACJ",
    "description": "One line (Part No. D6ML0AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "D6ML0AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-ultra-280w-g6-dock-aw5m5ut-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp-thunderbolt-4-ultra-280w-g6-dock-meteorsilver-catalog-visid-graybg-front-top_c255d0d4-df8c-4b0d-a9d4-7e29152b5996.png.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-thunderbolt-4-ultra-280w-g6-dock-aw5m5ut-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-usb-c-dock-g5-5tw10aa-acj",
    "brand": "HP",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "AW5M5UT#ACJ",
    "sku": "JK-HP-AW5M5UTACJ",
    "description": "One line (Part No. AW5M5UT#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AW5M5UT#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-dock-g5-5tw10aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_usb-c_dock_g5_f315b93e-2086-4f3d-839e-32fda75cd91c.png.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-usb-c-dock-g5-5tw10aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Everyday 14-inch Laptop Bag",
    "slug": "hp-hp-everyday-14-inch-laptop-bag-a08jvaa",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "A08KLUT",
    "sku": "JK-HP-A08KLUT-1",
    "description": "HP Everyday 14-inch Laptop Bag (Part No. A08KLUT). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2999.01,
    "sourcePriceINR": 2998,
    "discountPercentage": 0,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A08KLUT",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,998",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,999.01",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-14-inch-laptop-bag-a08jvaa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 14.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_everyday_16inch_laptop_briefcase_quick_access_white_5221315.png?store=in-en",
        "altText": "HP Everyday 14-inch Laptop Bag photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-14-inch-laptop-bag-a08jvaa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Creator 13.3-inch Laptop Sling",
    "slug": "hp-hp-creator-13-3-inch-laptop-sling-6m5s4aa",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "A08JVAA",
    "sku": "JK-HP-A08JVAA",
    "description": "HP Creator 13.3-inch Laptop Sling (Part No. A08JVAA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A08JVAA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-creator-13-3-inch-laptop-sling-6m5s4aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Standard Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_creator_13_3in_laptop_sling_weri_white_ff_m1768166.png?store=in-en",
        "altText": "HP Creator 13.3-inch Laptop Sling photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-creator-13-3-inch-laptop-sling-6m5s4aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Everyday 16-inch Laptop Backpack",
    "slug": "hp-hp-everyday-16-inch-laptop-backpack-a0bj8aa",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "6M5S4AA",
    "sku": "JK-HP-6M5S4AA",
    "description": "HP Everyday 16-inch Laptop Backpack (Part No. 6M5S4AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 3100,
    "sourcePriceINR": 3100,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "6M5S4AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹3,100",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹3,100",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a0bj8aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 16.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_everyday_16inch_laptop_backpack_moonlessnight_front_white_m2849579.png?store=in-en",
        "altText": "HP Everyday 16-inch Laptop Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a0bj8aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Knight Backpack",
    "slug": "hp-hyperx-knight-backpack-8c525aa",
    "brand": "HyperX",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "A0BJ8AA",
    "sku": "JK-HYX-A0BJ8AA",
    "description": "HyperX Knight Backpack (Part No. A0BJ8AA). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A0BJ8AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-knight-backpack-8c525aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Standard Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/3/c/3c4f0e76-449f-4750-9e6c-7a495ce98c04.png?store=in-en",
        "altText": "HyperX Knight Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-knight-backpack-8c525aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Everyday 14-inch Laptop Briefcase",
    "slug": "hp-hp-everyday-14-inch-laptop-briefcase-a08jsaa",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "8C525AA",
    "sku": "JK-HP-8C525AA",
    "description": "HP Everyday 14-inch Laptop Briefcase (Part No. 8C525AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2299.01,
    "sourcePriceINR": 2299,
    "discountPercentage": 0,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "8C525AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹2,299",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,299.01",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-14-inch-laptop-briefcase-a08jsaa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 14.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_everyday_16inch_laptop_briefcase_quick_access_white_m2849621.png?store=in-en",
        "altText": "HP Everyday 14-inch Laptop Briefcase photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-14-inch-laptop-briefcase-a08jsaa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Prelude Backpack 15.6",
    "slug": "hp-hp-prelude-backpack-15-6-1e7d6ut",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "A08JSAA",
    "sku": "JK-HP-A08JSAA",
    "description": "HP Prelude Backpack 15.6 (Part No. A08JSAA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1862,
    "sourcePriceINR": 1299,
    "discountPercentage": 30,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A08JSAA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,299",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,862",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "30% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-prelude-backpack-15-6-1e7d6ut",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Standard Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/p/r/prelude_backpack_front_m1612552.png?store=in-en",
        "altText": "HP Prelude Backpack 15.6 photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-prelude-backpack-15-6-1e7d6ut",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "Notebook Backpack",
    "slug": "hp-notebook-bundle-backpack-w3z70pa-acj",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "1E7D6UT",
    "sku": "JK-HP-1E7D6UT",
    "description": "Notebook Backpack (Part No. 1E7D6UT). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 2147,
    "sourcePriceINR": 1689,
    "discountPercentage": 21,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "1E7D6UT",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,689",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹2,147",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "21% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/notebook-bundle-backpack-w3z70pa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Standard Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/b/p/bpk_1.png?store=in-en",
        "altText": "Notebook Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/notebook-bundle-backpack-w3z70pa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Campus Core Blue 16-inch Laptop Backpack",
    "slug": "hp-hp-campus-core-blue-16-inch-laptop-backpack-b9ra6aa-acj",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "W3Z70PA#ACJ",
    "sku": "JK-HP-W3Z70PAACJ",
    "description": "HP Campus Core Blue 16-inch Laptop Backpack (Part No. W3Z70PA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 1800,
    "sourcePriceINR": 1800,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "W3Z70PA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,800",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹1,800",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-campus-core-blue-16-inch-laptop-backpack-b9ra6aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 16.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_campuscore_blue_16in_laptop_backpack_center_facing_3563962.png?store=in-en",
        "altText": "HP Campus Core Blue 16-inch Laptop Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-campus-core-blue-16-inch-laptop-backpack-b9ra6aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP Everyday 16-inch Laptop Backpack",
    "slug": "hp-hp-everyday-16-inch-laptop-backpack-a08jxaa",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "B9RA6AA#ACJ",
    "sku": "JK-HP-B9RA6AAACJ",
    "description": "HP Everyday 16-inch Laptop Backpack (Part No. B9RA6AA#ACJ). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 3100,
    "sourcePriceINR": 3100,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "B9RA6AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹3,100",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹3,100",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a08jxaa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Up to 16.0\" Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/h/p/hp_everyday_16inch_laptop_backpack_front_white_m2855140.png?store=in-en",
        "altText": "HP Everyday 16-inch Laptop Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-everyday-16-inch-laptop-backpack-a08jxaa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Delta Backpack",
    "slug": "hp-hyperx-delta-backpack-8c524aa",
    "brand": "HyperX",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "A08JXAA",
    "sku": "JK-HYX-A08JXAA",
    "description": "HyperX Delta Backpack (Part No. A08JXAA). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "A08JXAA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Laptop Bags & Backpacks",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-delta-backpack-8c524aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Compatibility",
        "value": "Standard Laptop",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/4/9/49176ce9-6358-410d-9f09-feac00fa9d77.png?store=in-en",
        "altText": "HyperX Delta Backpack photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-delta-backpack-8c524aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "Poly Blackwire 3220 Stereo USB-C Headset +USB-C/A Adapter",
    "slug": "hp-poly-blackwire-3220-stereo-usb-c-headset-usb-c-a-adapter-8x228aa",
    "brand": "Poly",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "9Z4V9AA#ACJ",
    "sku": "JK-PLY-9Z4V9AAACJ",
    "description": "Poly Blackwire 3220 Stereo USB-C Headset +USB-C/A Adapter (Part No. 9Z4V9AA#ACJ). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 5642,
    "sourcePriceINR": 5642,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "9Z4V9AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹5,642",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹5,642",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3220-stereo-usb-c-headset-usb-c-a-adapter-8x228aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/p/o/poly_blackwire_3220_usb_c_print_rgb_with_dongle_m1551381_1.jpg?store=in-en",
        "altText": "Poly Blackwire 3220 Stereo USB-C Headset +USB-C/A Adapter photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3220-stereo-usb-c-headset-usb-c-a-adapter-8x228aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP G370 Wired Gaming Headset",
    "slug": "hp-hp-g370-wired-gaming-headset-d69z5aa-acj",
    "brand": "HP",
    "parentCategorySlug": "gaming-accessories",
    "categorySlug": "gaming-headsets",
    "categoryName": "Gaming Headsets",
    "modelNumber": "8X228AA",
    "sku": "JK-HP-8X228AA",
    "description": "HP G370 Wired Gaming Headset (Part No. 8X228AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 3800,
    "sourcePriceINR": 1700,
    "discountPercentage": 55,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "8X228AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Gaming Headsets",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,700",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹3,800",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "55% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-g370-wired-gaming-headset-d69z5aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/2/6/26c1_-_hp_g370_wired_gaming_headset_jackblack_wire_usb_prouct_catalog_left_facing_9077851.png?store=in-en",
        "altText": "HP G370 Wired Gaming Headset photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-g370-wired-gaming-headset-d69z5aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-poly-mission-625-stereo-usb-wired-headset-c01c6aa-ac3",
    "brand": "Poly",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "D69Z5AA#ACJ",
    "sku": "JK-PLY-D69Z5AAACJ",
    "description": "One line (Part No. D69Z5AA#ACJ). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "D69Z5AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Headsets & Audio",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-poly-mission-625-stereo-usb-wired-headset-c01c6aa-ac3",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/5/5/55188acf-465b-4067-85e6-bc4233927c7d.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-poly-mission-625-stereo-usb-wired-headset-c01c6aa-ac3",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-hp-poly-mission-425-stereo-usb-wired-headset-c01b6aa-ac3",
    "brand": "Poly",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "C01C6AA#AC3",
    "sku": "JK-PLY-C01C6AAAC3",
    "description": "One line (Part No. C01C6AA#AC3). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "C01C6AA#AC3",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Headsets & Audio",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-poly-mission-425-stereo-usb-wired-headset-c01b6aa-ac3",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/9/5/95a9d93e-ad71-4632-8915-6404bc4b90b7.png?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-poly-mission-425-stereo-usb-wired-headset-c01b6aa-ac3",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-poly-blackwire-3225-stereo-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x229aa",
    "brand": "Poly",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "C01B6AA#AC3",
    "sku": "JK-PLY-C01B6AAAC3",
    "description": "One line (Part No. C01B6AA#AC3). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "C01B6AA#AC3",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3225-stereo-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x229aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/p/o/poly_blackwire_3225_usb_c_print_rgb_with_dongle_m1551371.jpg?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3225-stereo-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x229aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-poly-blackwire-8225-stereo-microsoft-teams-certified-usb-c-headset-usb-c-a-adapter-8x225aa",
    "brand": "Poly",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "8X229AA",
    "sku": "JK-PLY-8X229AA",
    "description": "One line (Part No. 8X229AA). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "8X229AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-8225-stereo-microsoft-teams-certified-usb-c-headset-usb-c-a-adapter-8x225aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/b/l/blackwire_8225-m_corded_uc_headset_with_usb-c_to_usb-a_adapter_m1648830.jpg?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-8225-stereo-microsoft-teams-certified-usb-c-headset-usb-c-a-adapter-8x225aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Cloud Stinger 2 Core Gaming Headsets",
    "slug": "hp-hyperx-cloud-stinger-2-core-gaming-headsets-683l9aa",
    "brand": "HyperX",
    "parentCategorySlug": "gaming-accessories",
    "categorySlug": "gaming-headsets",
    "categoryName": "Gaming Headsets",
    "modelNumber": "8X225AA",
    "sku": "JK-HYX-8X225AA",
    "description": "HyperX Cloud Stinger 2 Core Gaming Headsets (Part No. 8X225AA). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "8X225AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Gaming Headsets",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-cloud-stinger-2-core-gaming-headsets-683l9aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/a/3/a3bac879-b182-4961-aaad-ca12072a4639.png?store=in-en",
        "altText": "HyperX Cloud Stinger 2 Core Gaming Headsets photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-cloud-stinger-2-core-gaming-headsets-683l9aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HyperX Cloud Stinger 2 wireless - Gaming Headset",
    "slug": "hp-hyperx-cloud-stinger-2-wireless-gaming-headset-676a2aa",
    "brand": "HyperX",
    "parentCategorySlug": "gaming-accessories",
    "categorySlug": "gaming-headsets",
    "categoryName": "Gaming Headsets",
    "modelNumber": "683L9AA",
    "sku": "JK-HYX-683L9AA",
    "description": "HyperX Cloud Stinger 2 wireless - Gaming Headset (Part No. 683L9AA). Genuine HyperX commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HyperX",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "683L9AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Gaming Headsets",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hyperx-cloud-stinger-2-wireless-gaming-headset-676a2aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Wired USB / 3.5mm",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/5/7/571a797f-ba45-4dd1-94d6-38409131fd95.png?store=in-en",
        "altText": "HyperX Cloud Stinger 2 wireless - Gaming Headset photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hyperx-cloud-stinger-2-wireless-gaming-headset-676a2aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "HP H250 Wireless Earbuds White",
    "slug": "hp-hp-h250-wireless-earbuds-white-ab3d7aa-acj",
    "brand": "HP",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "676A2AA",
    "sku": "JK-HP-676A2AA",
    "description": "HP H250 Wireless Earbuds White (Part No. 676A2AA). Genuine HP commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": 5000,
    "sourcePriceINR": 1399,
    "discountPercentage": 72,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "HP",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "676A2AA",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "Headsets & Audio",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "₹1,399",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "₹5,000",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "72% Off",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/hp-h250-wireless-earbuds-white-ab3d7aa-acj",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Audio Interface",
        "value": "Bluetooth / Wireless",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/6/1/61t6o2kz0jl._sl1500_.jpg?store=in-en",
        "altText": "HP H250 Wireless Earbuds White photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/hp-h250-wireless-earbuds-white-ab3d7aa-acj",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "One line",
    "slug": "hp-poly-blackwire-3325-stereo-microsoft-teams-certified-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x222aa",
    "brand": "Poly",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "AB3D7AA#ACJ",
    "sku": "JK-PLY-AB3D7AAACJ",
    "description": "One line (Part No. AB3D7AA#ACJ). Genuine Poly commercial computer hardware and accessories designed for enterprise productivity, office workstations, and reliable day-to-day operation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "HP Standard 1-Year Limited Commercial Warranty (Subject to business verification)",
    "specifications": [
      {
        "group": "General",
        "key": "Brand",
        "value": "Poly",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Part Number",
        "value": "AB3D7AA#ACJ",
        "isFilterable": true
      },
      {
        "group": "General",
        "key": "Category",
        "value": "USB Hubs & Docking Stations",
        "isFilterable": true
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed Price",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Source Listed MRP",
        "value": "Unlisted",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Indicative Discount",
        "value": "None",
        "isFilterable": false
      },
      {
        "group": "Commercial Reference",
        "key": "Pricing Status",
        "value": "Unverified Reference Price (Subject to Bikaner Desk Review)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Reference Website",
        "value": "HP Store India (Official)",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Source URL",
        "value": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3325-stereo-microsoft-teams-certified-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x222aa",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Retrieval Date",
        "value": "2026-10-25",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Catalog Batch",
        "value": "BATCH-2026-10-HP",
        "isFilterable": false
      },
      {
        "group": "Source Metadata",
        "key": "Verification Status",
        "value": "PENDING_BUSINESS_REVIEW",
        "isFilterable": false
      },
      {
        "group": "Technical",
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.hp.com/in-en/shop/media/catalog/product/p/o/poly_blackwire_3325_m_usb_c_print_rgb_with_dongle_m1644014.jpg?store=in-en",
        "altText": "One line photo",
        "isPrimary": true
      }
    ],
    "sourceUrl": "https://www.hp.com/in-en/shop/products/accessories/poly-blackwire-3325-stereo-microsoft-teams-certified-usb-c-headset-3-5mm-plug-usb-c-a-adapter-8x222aa",
    "sourceRetrievalDate": "2026-10-25",
    "sourceAvailability": "IN_STOCK_ON_SOURCE",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoulSound-64 Party Speaker with 2 U-Band Mics",
    "slug": "fingers-soulsound-64",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoulSound-64",
    "sku": "JK-FIG-SOULSOUND64",
    "description": "High-power 90W party speaker bundled with 2 wireless U-band microphones, soothing RGB lights, comfort grip handle, vocal cut karaoke function, and TWS dual-speaker pairing.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "90 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Microphone",
        "value": "2 Bundled Wireless U-Band Mics + Mic Echo Control",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth / USB / MicroSD / AUX / FM Radio / Mic Port",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Lighting",
        "value": "Soothing Multi-Colour RGB Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Karaoke Features",
        "value": "Vocal Cut Function & Mic Echo Control",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Special Features",
        "value": "TWS Pairing, Mobile Stand Slot, Remote Control",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Finish",
        "value": "Premium White Finish",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soulsound-64.png",
        "altText": "FINGERS SoulSound-64 Party Speaker with 2 U-Band Mics Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RollingParties-124 Party Speaker with 2 Wireless Mics",
    "slug": "fingers-rollingparties-124",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "RollingParties-124",
    "sku": "JK-FIG-ROLLINGPARTIES124",
    "description": "Flagship 120W peak output party speaker featuring window-shattering bass, smooth rolling wheels, 2 wireless 2.4GHz microphones, guitar input, 8 RGB preset lighting modes, and up to 6 hours playtime.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "120 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Microphone",
        "value": "2 Wireless 2.4 GHz Mics Bundled + 2 Additional Mic Inputs",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 6 Hours Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Lighting",
        "value": "Stunning RGB Lights with 8 Pre-set Modes",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Instrument Input",
        "value": "Dedicated Guitar Input Port",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Mobility",
        "value": "Smooth Trolley Wheels & Comfortable Grip Handle",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth / USB / MicroSD / AUX / FM Radio",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Audio Controls",
        "value": "Bass, Treble & Mic Echo Controls, Vocal Cut",
        "isFilterable": false,
        "group": "Audio Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rollingparties-124.png",
        "altText": "FINGERS RollingParties-124 Party Speaker with 2 Wireless Mics Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RollingParties-110 Party Speaker",
    "slug": "fingers-rollingparties-110",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "RollingParties-110",
    "sku": "JK-FIG-ROLLINGPARTIES110",
    "description": "110W peak output rolling party speaker delivering window-shattering bass and booming vocals with spectacular 6-mode RGB lights and up to 8 hours playback.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "110 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 8 Hours Playback",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Lighting",
        "value": "Spectacular RGB Lights (6 Pre-set Modes)",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Mobility",
        "value": "Smooth Rolling Wheels & Comfortable Handle",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth / USB / MicroSD / AUX / FM",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rollingparties-110.png",
        "altText": "FINGERS RollingParties-110 Party Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS WoodSound-81 Party Speaker with 2 U-Band Mics",
    "slug": "fingers-woodsound-81",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "WoodSound-81",
    "sku": "JK-FIG-WOODSOUND81",
    "description": "70W wooden-enclosure party speaker with natural acoustic resonance, smooth trolley wheels, up to 7 hours playback, remote control, and 2 wireless U-band microphones.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "70 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Enclosure Material",
        "value": "Natural Wood Acoustic Resonance Cabinet",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 7 Hours Playback",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Microphone",
        "value": "2 Wireless U-Band Microphones Included",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Controls",
        "value": "Independent Bass & Treble Equalizer Dials",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Mobility",
        "value": "Smooth Wheels & Heavy-Duty Handle",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-woodsound-81.png",
        "altText": "FINGERS WoodSound-81 Party Speaker with 2 U-Band Mics Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 2Mic-ThunderBox45 Party Speaker",
    "slug": "fingers-2mic-thunderbox45",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "2Mic-ThunderBox45",
    "sku": "JK-FIG-2MICTHUNDERBOX45",
    "description": "40W peak output pure immersive audio party speaker with thrilling 6-mode RGB lights, up to 6.5 hours playback, and bundled dual wireless microphones.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "40 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 6.5 Hours Playback",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Lighting",
        "value": "Thrilling RGB Lights with 6 Pre-set Modes",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Microphone",
        "value": "Dual Wireless Microphone Support",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth / USB / MicroSD / AUX / FM",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-2mic-thunderbox45.png",
        "altText": "FINGERS 2Mic-ThunderBox45 Party Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RollingParties-51 Portable Party Speaker",
    "slug": "fingers-rollingparties-51",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "RollingParties-51",
    "sku": "JK-FIG-ROLLINGPARTIES51",
    "description": "50W peak output party speaker with smooth wheels, pole-mounting provision, stunning RGB lights, up to 15 hours marathon playback, remote control, and 2 wireless U-band mics.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Peak Output Power",
        "value": "50 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 15 Hours Marathon Playback",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Mounting",
        "value": "Provision for Tripod / Pole Mounting",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Microphone",
        "value": "2 Wireless U-Band Mics Bundled + Guitar Port",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Mobility",
        "value": "Smooth Wheels and Comfortable Grip Handle",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Controls",
        "value": "Bass & Treble Rotary Knobs",
        "isFilterable": false,
        "group": "Audio Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rollingparties-51.png",
        "altText": "FINGERS RollingParties-51 Portable Party Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Octane-100 Multimedia Sound Bar with Woofer",
    "slug": "fingers-octane-100",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Octane-100",
    "sku": "JK-FIG-OCTANE100",
    "description": "100W multimedia sound bar system with powerful dedicated subwoofer, 4 precision audio drivers, customized EQ modes (Movies, Music, News), and included wall mount brackets.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Total Output Power",
        "value": "100 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Drivers",
        "value": "4 High-Fidelity Drivers + Powerful External Woofer",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Equalizer Modes",
        "value": "Customized EQ for Movies, Music & News",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Mounting",
        "value": "Wall Mountable (Free Brackets Included)",
        "isFilterable": false,
        "group": "Installation"
      },
      {
        "key": "Remote",
        "value": "Multi-functional Full Remote Control Included",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth, Optical, HDMI ARC, AUX, USB",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-octane-100.png",
        "altText": "FINGERS Octane-100 Multimedia Sound Bar with Woofer Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RoomFilling-352 Multimedia Sound Bar",
    "slug": "fingers-roomfilling-352",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "RoomFilling-352",
    "sku": "JK-FIG-ROOMFILLING352",
    "description": "60W room-filling sound bar engineered to fill living rooms up to 350 sq ft with deep bass, clear dialogue, and masterfully tuned acoustics.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Total Output Power",
        "value": "60 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Coverage",
        "value": "Acoustically Tuned for Rooms up to 350 sq. ft.",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Subwoofer",
        "value": "Powerful Dedicated Bass Woofer",
        "isFilterable": false,
        "group": "Acoustics"
      },
      {
        "key": "Equalizer",
        "value": "Movie, Music & News Preset EQ Modes",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Remote Control",
        "value": "Multi-functional Remote Control",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-roomfilling-352.png",
        "altText": "FINGERS RoomFilling-352 Multimedia Sound Bar Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Octane-200 Multimedia Sound Bar with Woofer",
    "slug": "fingers-octane-200",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Octane-200",
    "sku": "JK-FIG-OCTANE200",
    "description": "Flagship 200W home theatre sound bar system equipped with 6 high-grade acoustic drivers, deep thunderous bass woofer, sleek metallic profile, and free wall-mount brackets.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Total Output Power",
        "value": "200 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Drivers",
        "value": "6 Audio Drivers + Heavy-Duty Subwoofer",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Equalizer",
        "value": "Cinema, Music & Dialogue Modes",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Mounting",
        "value": "Wall Mountable with Free Hardware Kit",
        "isFilterable": false,
        "group": "Installation"
      },
      {
        "key": "Connectivity",
        "value": "HDMI ARC, Optical In, Bluetooth, AUX, USB",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Design",
        "value": "Sleek & Elegant Architectural Soundbar Profile",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-octane-200.png",
        "altText": "FINGERS Octane-200 Multimedia Sound Bar with Woofer Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Octane-WM65 Lightweight 2.0 CH Sound Bar",
    "slug": "fingers-octane-wm65",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Octane-WM65",
    "sku": "JK-FIG-OCTANEWM65",
    "description": "65W lightweight 2.0 channel multimedia sound bar featuring 4 stereo drivers, wall mountable slim form factor, and multi-mode equalizer.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Total Output Power",
        "value": "65 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Channel Configuration",
        "value": "2.0 CH Stereo with 4 Acoustic Drivers",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Form Factor",
        "value": "Lightweight Slimline Soundbar",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Mounting",
        "value": "Wall Mount Support (Free Brackets Included)",
        "isFilterable": false,
        "group": "Installation"
      },
      {
        "key": "Controls",
        "value": "Multi-functional Remote Control Included",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-octane-wm65.png",
        "altText": "FINGERS Octane-WM65 Lightweight 2.0 CH Sound Bar Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 2Mic-GrooveBox Portable Speaker with 2 Mics",
    "slug": "fingers-2mic-groovebox",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "2Mic-GrooveBox",
    "sku": "JK-FIG-2MICGROOVEBOX",
    "description": "30W jaw-dropping bass portable speaker with 5.25-inch full frequency driver, 6.5 hours playback, multi-point pairing, 2 bundled U-band wireless mics, voice changeover effects, and one-touch vocal muting.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Power",
        "value": "30 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Speaker Driver",
        "value": "5.25-inch Full Frequency Hi-Fi Driver",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 6.5 Hours",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Microphones",
        "value": "2 Bundled U-Band Wireless Microphones",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Vocal Silence",
        "value": "One-touch Button Mutes Vocals for Pure Karaoke",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Voice Effects",
        "value": "Fun Voice Changeover Effects & Mic Priority",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-2mic-groovebox.png",
        "altText": "FINGERS 2Mic-GrooveBox Portable Speaker with 2 Mics Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Swag5 Portable Wireless Speaker",
    "slug": "fingers-swag5",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Swag5",
    "sku": "JK-FIG-SWAG5",
    "description": "10W explosive room-filling portable speaker with RGB colour-changing lights, 4 hours playtime, mic input slot, and magnetic remote control.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Power",
        "value": "10 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 4 Hours",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Lighting",
        "value": "RGB Colour-Changing Ambient Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Remote",
        "value": "Bundled with Magnetic Remote Control",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Microphone Slot",
        "value": "Provisional Slot for Wired & Wireless Mics",
        "isFilterable": false,
        "group": "Connectivity"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-swag5.png",
        "altText": "FINGERS Swag5 Portable Wireless Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Musilicious3 Portable Bluetooth Speaker",
    "slug": "fingers-musilicious3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Musilicious3",
    "sku": "JK-FIG-MUSILICIOUS3",
    "description": "Compact Bluetooth speaker with magnificent audio, deep punchy bass, 4 hours playtime, multi-point device pairing, and built-in mic for hands-free calls.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Audio Quality",
        "value": "Magnificent Audio with Deep Punchy Bass",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 4 Hours",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Microphone",
        "value": "Built-in Mic for Hands-Free Calling",
        "isFilterable": false,
        "group": "Communication"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-musilicious3.png",
        "altText": "FINGERS Musilicious3 Portable Bluetooth Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS HootBeats7 Owl-Design Portable Speaker",
    "slug": "fingers-hootbeats7",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "HootBeats7",
    "sku": "JK-FIG-HOOTBEATS7",
    "description": "Iconic owl-design speaker built for big bold sound, 4 spectacular RGB lighting modes, 7 hours playback, multi-point pairing, and 6.3mm mic input for instant karaoke.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Design",
        "value": "Iconic Owl Aesthetic Character Profile",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Lighting",
        "value": "4 Spectacular RGB Modes",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 7 Hours",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Karaoke Input",
        "value": "6.3 mm Mic Input (Wired & Wireless Mics)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-hootbeats7.png",
        "altText": "FINGERS HootBeats7 Owl-Design Portable Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundNugget-BT6 Compact RGB Portable Speaker",
    "slug": "fingers-soundnugget-bt6",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundNugget-BT6",
    "sku": "JK-FIG-SOUNDNUGGETBT6",
    "description": "Compact powerhouse wireless speaker with non-stop 12-hour playtime, spectacular RGB lights, multi-point pairing, IPX4 splash resistance, and free carry strap.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Battery Playtime",
        "value": "Non-stop 12-Hour Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Water Resistance",
        "value": "IPX4 Splash Resistant Rating",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Lighting",
        "value": "Spectacular Dynamic RGB Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Accessories",
        "value": "Free Carry Strap for Easy Portability",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundnugget-bt6.png",
        "altText": "FINGERS SoundNugget-BT6 Compact RGB Portable Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundKing Portable Wireless Speaker",
    "slug": "fingers-soundking",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundKing",
    "sku": "JK-FIG-SOUNDKING",
    "description": "Portable wireless speaker delivering magnificent sound with bold bass, brilliant 12-hour battery life, multi-point pairing, and hands-free microphone.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Audio Quality",
        "value": "Magnificent Sound with Bold Bass",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playtime",
        "value": "Brilliant 12-Hour Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Microphone",
        "value": "Built-in Mic for Hands-Free Calling",
        "isFilterable": false,
        "group": "Communication"
      },
      {
        "key": "Accessories",
        "value": "Free Carry Strap Included",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundking.png",
        "altText": "FINGERS SoundKing Portable Wireless Speaker Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundPower-20 20W Portable Speaker with FM",
    "slug": "fingers-soundpower-20",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundPower-20",
    "sku": "JK-FIG-SOUNDPOWER20",
    "description": "20-watt portable Bluetooth speaker with best-in-class FM radio reception, mesmerizing RGB lights, 9-hour battery life, and hands-free calling.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Power",
        "value": "20 W High-Impact Audio",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Radio",
        "value": "Best-in-Class Clear FM Radio Receiver",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Lighting",
        "value": "Mesmerizing RGB Ambient Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 9 Hours",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundpower-20.png",
        "altText": "FINGERS SoundPower-20 20W Portable Speaker with FM Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RGB-FunBeats 2.0 Multimedia Speakers",
    "slug": "fingers-rgb-funbeats",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "RGB-FunBeats",
    "sku": "JK-FIG-RGBFUNBEATS",
    "description": "Compact 2.0 desktop speakers with punchy bass, crisp audio, 6-mode RGB illumination, in-line volume controller, and simple USB plug-n-play setup.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Configuration",
        "value": "2.0 Stereo Desktop Speakers",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Lighting",
        "value": "Modern RGB Lights with 6 Changeable Modes",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Controls",
        "value": "In-line Volume Controller & RGB Switch",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Power",
        "value": "USB-Powered Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rgb-funbeats.png",
        "altText": "FINGERS RGB-FunBeats 2.0 Multimedia Speakers Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS DeskSound 2.0 Multimedia Speakers",
    "slug": "fingers-desksound-20",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "DeskSound 2.0",
    "sku": "JK-FIG-DESKSOUND20",
    "description": "Space-saving compact 2.0 computer speakers with sensational audio clarity, size-defying bass, and in-line volume control for office and home workstations.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Configuration",
        "value": "2.0 Space-Saving Stereo Speakers",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Sound Quality",
        "value": "Sensational Sound with Size-Defying Bass",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Controls",
        "value": "In-line Rotary Volume Controller",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Interface",
        "value": "3.5 mm Audio + USB Power Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-desksound-20.png",
        "altText": "FINGERS DeskSound 2.0 Multimedia Speakers Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Challenger 2.1 Speaker System with Subwoofer",
    "slug": "fingers-challenger-21",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Challenger 2.1",
    "sku": "JK-FIG-CHALLENGER21",
    "description": "18W stereo 2.1 speaker system with 4-inch dedicated subwoofer, 3-inch satellite drivers, illuminated volume dial, bass adjustment controller, and remote control.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Power",
        "value": "18 W Stereo Output",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Subwoofer Driver",
        "value": "4-inch (10.16 cm) Deep Bass Driver",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Satellite Drivers",
        "value": "3-inch (7.62 cm) Full-Range Drivers",
        "isFilterable": false,
        "group": "Acoustics"
      },
      {
        "key": "Controls",
        "value": "Bass Controller + Illuminated Volume Dial",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Remote",
        "value": "Direct Track Selection Remote Control Bundled",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-challenger-21.png",
        "altText": "FINGERS Challenger 2.1 Speaker System with Subwoofer Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS StereoCuboid 2.1 Bluetooth Speaker System",
    "slug": "fingers-stereocuboid-21",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "StereoCuboid 2.1",
    "sku": "JK-FIG-STEREOCUBOID21",
    "description": "13W geometric 2.1 speaker system with lively dynamic RGB lights, Bluetooth multi-point connectivity, compact wooden/cuboid build, and plug-n-play setup.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Power",
        "value": "13 W",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Configuration",
        "value": "2.1 Subwoofer + Satellite System",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Lighting",
        "value": "Lively Dynamic RGB Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth Multi-Point + AUX USB Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-stereocuboid-21.png",
        "altText": "FINGERS StereoCuboid 2.1 Bluetooth Speaker System Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FunBeats 2.0 Computer Speakers",
    "slug": "fingers-funbeats",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "FunBeats",
    "sku": "JK-FIG-FUNBEATS",
    "description": "High-quality stereo 2.0 speakers designed for movies, music, and gaming with powerful bass, exquisite design, and in-line volume controller.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Configuration",
        "value": "2.0 Stereo Speakers",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Audio Quality",
        "value": "High-Quality Audio with Powerful Bass",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Controls",
        "value": "In-line Volume Controller",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Power",
        "value": "USB-Powered Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-funbeats.png",
        "altText": "FINGERS FunBeats 2.0 Computer Speakers Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS ACP-FunBeats AC-Powered 2.0 Speakers",
    "slug": "fingers-acp-funbeats",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "ACP-FunBeats",
    "sku": "JK-FIG-ACPFUNBEATS",
    "description": "AC-powered 2.0 desktop speakers providing amplified stereo volume, deep rich bass, sleek modern profile, and dedicated rotary volume knob.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Power Source",
        "value": "AC-Powered for High Amplification",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Audio Quality",
        "value": "Superior Sound with Powerful Bass",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Controls",
        "value": "Rotary Volume Controller Knob",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Design",
        "value": "Modern Sleek Desk Profile",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-acp-funbeats.png",
        "altText": "FINGERS ACP-FunBeats AC-Powered 2.0 Speakers Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Freedom Mic-U221 Dual U-Band Wireless Microphones",
    "slug": "fingers-freedom-mic-u221",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Freedom Mic-U221",
    "sku": "JK-FIG-FREEDOMMICU221",
    "description": "Professional dual U-Band wireless microphone set with 30 selectable frequencies (UHF 650-684.5 MHz), 25m range, HD LED display, 1200mAh Type-C rechargeable battery with 10 hours life, and metal protective grille.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Dual Wireless U-Band Handheld System",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Frequency Range",
        "value": "Mic A: UHF 650-668.5 MHz, Mic B: UHF 670-684.5 MHz (30 Channels)",
        "isFilterable": true,
        "group": "RF Specifications"
      },
      {
        "key": "Operating Distance",
        "value": "25 m Line of Sight Working Distance",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Life",
        "value": "1200 mAh Rechargeable Battery (Up to 10 Hours on Single Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Charging",
        "value": "USB Type-C Charging for Receiver & Microphones",
        "isFilterable": false,
        "group": "Battery & Power"
      },
      {
        "key": "Display",
        "value": "High-Definition LED Backlight Display",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Grille & Filter",
        "value": "Metal Protective Mesh Grille + Thickened Cotton Filter",
        "isFilterable": false,
        "group": "Durability"
      },
      {
        "key": "Jack Compatibility",
        "value": "6.35 mm Pin Jack for PA Systems, Speakers & Mixers",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-freedom-mic-u221.png",
        "altText": "FINGERS Freedom Mic-U221 Dual U-Band Wireless Microphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Freedom Mic-G124 Dual 2.4GHz Wireless Microphones",
    "slug": "fingers-freedom-mic-g124",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Freedom Mic-G124",
    "sku": "JK-FIG-FREEDOMMICG124",
    "description": "Dual 2.4 GHz digital wireless microphones delivering interference-free audio, 25m range, 35-hour marathon battery life from 1200mAh Type-C cells, and metal mesh grilles.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Dual Wireless 2.4 GHz Digital Handheld System",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Frequency",
        "value": "Uni-Directional 2.4 GHz Digital Wireless",
        "isFilterable": true,
        "group": "RF Specifications"
      },
      {
        "key": "Operating Distance",
        "value": "25 m Line of Sight Working Distance",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Life",
        "value": "1200 mAh Battery (Up to 35 Hours per Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Charging",
        "value": "USB Type-C Rechargeable",
        "isFilterable": false,
        "group": "Battery & Power"
      },
      {
        "key": "Display",
        "value": "High-Definition LED Backlight Display",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Build",
        "value": "Metal Protective Mesh Grille + Sponge Filter",
        "isFilterable": false,
        "group": "Durability"
      },
      {
        "key": "Compatibility",
        "value": "6.35 mm Connector for Speakers & PA Systems",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-freedom-mic-g124.png",
        "altText": "FINGERS Freedom Mic-G124 Dual 2.4GHz Wireless Microphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Freedom Mic-U105 Single U-Band Wireless Microphone",
    "slug": "fingers-freedom-mic-u105",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Freedom Mic-U105",
    "sku": "JK-FIG-FREEDOMMICU105",
    "description": "Uni-directional U-band (UHF 693 MHz) wireless microphone with 50m long-distance transmission, HD LED display, 10-hour battery life with Type-C recharge, and 6.35mm receiver.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Single Wireless U-Band Handheld Microphone",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Frequency",
        "value": "Uni-Directional U-Band (UHF 693 MHz)",
        "isFilterable": true,
        "group": "RF Specifications"
      },
      {
        "key": "Operating Distance",
        "value": "50 m Line of Sight Long Distance",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Life",
        "value": "1200 mAh Battery (Up to 10 Hours on Single Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Charging",
        "value": "Type-C Rechargeable for Both Receiver & Mic",
        "isFilterable": false,
        "group": "Battery & Power"
      },
      {
        "key": "Connector",
        "value": "6.35 mm Plug for Music & PA Systems",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-freedom-mic-u105.png",
        "altText": "FINGERS Freedom Mic-U105 Single U-Band Wireless Microphone Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Freedom Mic-G26 Single 2.4GHz Wireless Microphone",
    "slug": "fingers-freedom-mic-g26",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Freedom Mic-G26",
    "sku": "JK-FIG-FREEDOMMICG26",
    "description": "2.4 GHz wireless handheld microphone featuring 25m operating distance, 35 hours battery life from 1200mAh Type-C rechargeable battery, and quiet on-off switch.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Single Wireless 2.4 GHz Microphone",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Frequency",
        "value": "Uni-Directional 2.4 GHz Frequency",
        "isFilterable": true,
        "group": "RF Specifications"
      },
      {
        "key": "Operating Distance",
        "value": "25 m Line of Sight",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Life",
        "value": "Up to 35 Hours Battery Life on Single Charge",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Charging",
        "value": "Type-C Rechargeable",
        "isFilterable": false,
        "group": "Battery & Power"
      },
      {
        "key": "Connector",
        "value": "6.35 mm Pin Receiver",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-freedom-mic-g26.png",
        "altText": "FINGERS Freedom Mic-G26 Single 2.4GHz Wireless Microphone Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Mic-W5 Wired Dynamic Microphone with Wind-Muff",
    "slug": "fingers-mic-w5",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Mic-W5",
    "sku": "JK-FIG-MICW5",
    "description": "Uni-directional wired vocal dynamic microphone with 6.35mm gold-plated pin connector, distortion-free crisp sound reproduction, and bundled wind-muff filter.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Uni-Directional Wired Dynamic Microphone",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Connector",
        "value": "6.35 mm Pin Jack",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Acoustics",
        "value": "Distortion-Free Crisp Vocal Reproduction",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Accessories",
        "value": "Bundled Wind-Muff Foam Filter",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-mic-w5.png",
        "altText": "FINGERS Mic-W5 Wired Dynamic Microphone with Wind-Muff Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PhoneMic-3C-2Mic Lavalier Wireless Microphone 3-in-1",
    "slug": "fingers-phonemic-3c-2mic",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "PhoneMic-3C-2Mic",
    "sku": "JK-FIG-PHONEMIC3C2MIC",
    "description": "Professional dual wireless lavalier microphone system with 3-in-1 receiver (Type-C, Lightning, 3.5mm), intelligent noise reduction chip, real-time ear return monitoring, 6 hours playback, 20m range, and free hard case.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Microphone Type",
        "value": "Dual Wireless Lavalier Clip-on Microphones",
        "isFilterable": true,
        "group": "Microphone System"
      },
      {
        "key": "Receiver Compatibility",
        "value": "3-in-1 Receiver (USB Type-C, Apple Lightning, 3.5 mm Aux)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Noise Reduction",
        "value": "Intelligent DSP Noise Reduction Chip",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Monitoring",
        "value": "Built-in Real-time Ear Return Monitoring Interface",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Transmission Range",
        "value": "20 m Long-Distance Transmission",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Playback",
        "value": "Up to 6 Hours Continuous Recording",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Special Effects",
        "value": "Reverberation Acoustic Effect",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Case",
        "value": "Free Carry-on Hard Zipper Case Included",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-phonemic-3c-2mic.png",
        "altText": "FINGERS PhoneMic-3C-2Mic Lavalier Wireless Microphone 3-in-1 Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundBoss Premium Metallic Wired Earphones",
    "slug": "fingers-soundboss",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundBoss",
    "sku": "JK-FIG-SOUNDBOSS",
    "description": "Premium in-ear wired earphones with metallic acoustic shells, deep punchy bass, in-line mic with call controls, free protective zip pouch, and stylish finish.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "3.5 mm Gold-Plated Audio Jack",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Housing",
        "value": "Premium Metallic Earbud Cavities",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Microphone",
        "value": "In-line Microphone with Call & Track Controls",
        "isFilterable": false,
        "group": "Communication"
      },
      {
        "key": "Colours",
        "value": "Emerald Green / Burgundy / Dark Silver",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Accessories",
        "value": "Free Protective Zip Pouch Included",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundboss.png",
        "altText": "FINGERS SoundBoss Premium Metallic Wired Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundBoomerang Type-C Wired Earphones",
    "slug": "fingers-soundboomerang",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundBoomerang",
    "sku": "JK-FIG-SOUNDBOOMERANG",
    "description": "High-resolution digital Type-C wired earphones offering refreshing energetic bass, dual-tone metallic finish, clear in-line mic, and free zip pouch.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "USB Type-C Digital Audio Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Audio Clarity",
        "value": "High-Resolution DAC with Refreshing Bass",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Microphone",
        "value": "In-line HD Microphone with Volume & Call Controls",
        "isFilterable": false,
        "group": "Communication"
      },
      {
        "key": "Colours",
        "value": "InkBlack+Gold / Imperial Blue+Silver",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Accessories",
        "value": "Free Protective Zip Pouch",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundboomerang.png",
        "altText": "FINGERS SoundBoomerang Type-C Wired Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundBounce Type-C Wired Earphones",
    "slug": "fingers-soundbounce",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundBounce",
    "sku": "JK-FIG-SOUNDBOUNCE",
    "description": "Type-C in-ear earphones with bouncy bass response, ergonomic angled silicone tips, durable cable, and integrated hands-free microphone.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "USB Type-C Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Acoustics",
        "value": "Bouncy Energetic Bass with Balanced Treble",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Fit",
        "value": "Ergonomic Angled Ear-Tips",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Microphone",
        "value": "In-line Mic for Calls & Media",
        "isFilterable": false,
        "group": "Communication"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundbounce.png",
        "altText": "FINGERS SoundBounce Type-C Wired Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundReflex W5 Wired In-Ear Earphones",
    "slug": "fingers-soundreflex-w5",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundReflex W5",
    "sku": "JK-FIG-SOUNDREFLEXW5",
    "description": "3.5mm wired earphones shaped and acoustically tuned for musical ears with balanced acoustics, soft silicone ear gels, and clear voice capture.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "3.5 mm Audio Jack",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Tuning",
        "value": "Acoustically Tuned for Indian Musical Ears",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Colours",
        "value": "Classic Black / Pure White",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Microphone",
        "value": "In-line Voice Microphone",
        "isFilterable": false,
        "group": "Communication"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundreflex-w5.png",
        "altText": "FINGERS SoundReflex W5 Wired In-Ear Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS AudioPop-C Type-C Wired Earphones",
    "slug": "fingers-audiopop-c",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "AudioPop-C",
    "sku": "JK-FIG-AUDIOPOPC",
    "description": "USB Type-C wired earphones combining pop-colour styling with high-fidelity digital audio, powerful bass drivers, and tangle-resistant cable.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "USB Type-C Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Sound Character",
        "value": "Thrilling Dynamic Bass & Pop Clarity",
        "isFilterable": false,
        "group": "Audio Performance"
      },
      {
        "key": "Cable",
        "value": "Tangle-Resistant Flexible TPE Cable",
        "isFilterable": false,
        "group": "Durability"
      },
      {
        "key": "Controls",
        "value": "In-line Smart Remote with Microphone",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-audiopop-c.png",
        "altText": "FINGERS AudioPop-C Type-C Wired Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SoundGlitz2 Metallic Wired Earphones",
    "slug": "fingers-soundglitz2",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SoundGlitz2",
    "sku": "JK-FIG-SOUNDGLITZ2",
    "description": "Metallic 3.5mm earphones with glamorous jewel finish, deep stereo bass, in-line mic, and free zip pouch.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connector",
        "value": "3.5 mm Gold-Plated Audio Jack",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Finish",
        "value": "Glamour Metallic Earbud Shells",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Colours",
        "value": "Burgundy / Rich Grey",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Accessories",
        "value": "Free Zip Pouch Included",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-soundglitz2.png",
        "altText": "FINGERS SoundGlitz2 Metallic Wired Earphones Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Go-Hi-3 True Wireless Earbuds",
    "slug": "fingers-go-hi-3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Go-Hi-3",
    "sku": "JK-FIG-GOHI3",
    "description": "Trendy TWS earbuds with high-definition audio, 17.5 hours total playback (5 hours on single charge), sweat-resistant design, and built-in mic with surround noise cancellation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Battery Playtime",
        "value": "Up to 17.5 Hours Total (5 Hours on Single Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Microphone",
        "value": "Surround Noise Cancellation for Advanced Voice Clarity",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Water Resistance",
        "value": "Hike & Gym Ready Sweat-Resistant Construction",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Design",
        "value": "Hip Trendy Charging Case & Lightweight Pods",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth 5.0 Wireless Audio",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-go-hi-3.png",
        "altText": "FINGERS Go-Hi-3 True Wireless Earbuds Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Go-Zing M6 Fast Charging TWS Earbuds",
    "slug": "fingers-go-zing-m6",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Go-Zing M6",
    "sku": "JK-FIG-GOZINGM6",
    "description": "Artistic TWS earbuds with 13mm big drivers, size-defying bass, 30 hours total playtime, rapid charging (10 mins = 70 mins), intuitive touch controls, and IPX4 sweat resistance.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Driver Size",
        "value": "13 mm Large Dynamic Driver with Deep Bass",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Battery Playtime",
        "value": "30 Hours Total Playtime (7.5 Hours per Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Fast Charging",
        "value": "Terrific Fast Charge: 10 mins Charge = 70 mins Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Pairing",
        "value": "Snap Pair Technology (Pairs on Lid Open)",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Controls",
        "value": "Intuitive Touch Controls for Calls, Tracks & Volume",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Water Resistance",
        "value": "IPX4 Sweat-Resistant Rating",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-go-zing-m6.png",
        "altText": "FINGERS Go-Zing M6 Fast Charging TWS Earbuds Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SizeZero Pods2 Ultra-Compact TWS Earbuds",
    "slug": "fingers-sizezero-pods2",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "SizeZero Pods2",
    "sku": "JK-FIG-SIZEZEROPODS2",
    "description": "World's tiniest TWS earbuds with 1-inch compact case, 15 hours total playtime, fast charging (10 mins = 3 hours), IPX4 sweat resistance, and dual language (English & Hindi) voice prompts.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "World's Tiniest TWS Earbuds (Innovation in an Inch)",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Battery Playtime",
        "value": "15 Hours Total (5 Hours on Single Charge)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Fast Charging",
        "value": "Remarkable Quick Charge: 10 mins = 3 Hours Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Voice Prompts",
        "value": "Dual Language Voice Support (English & Hindi)",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Water Resistance",
        "value": "IPX4 Sweat Resistant",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Colours",
        "value": "Teal / Plum / Matte Black",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-sizezero-pods2.png",
        "altText": "FINGERS SizeZero Pods2 Ultra-Compact TWS Earbuds Front View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Dial-AC Active Noise Cancelling Wireless Headset",
    "slug": "fingers-dial-ac",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Dial-AC",
    "sku": "JK-FIG-DIALAC",
    "description": "Active noise cancelling wireless headset featuring deep bass, clear treble, immersive soundscape, dual gaming and music modes, up to 33 hours playtime, low latency, and IPX4 sweat resistance.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Active Noise Cancellation",
        "value": "ANC Dual Microphone System",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 33 Hours Unstoppable Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Latency",
        "value": "Low Latency Lag-Free Gaming Audio Sync",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Modes",
        "value": "Dual Modes (Optimized for Gaming & Rich Music)",
        "isFilterable": false,
        "group": "Audio Features"
      },
      {
        "key": "Water Resistance",
        "value": "IPX4 Sweat-Resistant Construction",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Connectivity",
        "value": "Bluetooth v5.0 + 3.5 mm AUX",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-dial-ac.png",
        "altText": "FINGERS Dial-AC Active Noise Cancelling Wireless Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS ChillRay Open-Ear Wireless Headset",
    "slug": "fingers-chillray",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "ChillRay",
    "sku": "JK-FIG-CHILLRAY",
    "description": "India's first open-ear wireless headset with 360 Reality Audio, ultra-soft breathable earmuffs, multi-colour LED glow, dual mics (detachable boom + built-in), and 20 hours playtime.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "India's First Open-Ear Wireless Headset",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Audio Technology",
        "value": "Immersive 360 Reality Audio",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 20-Hour Non-stop Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Microphone",
        "value": "Dual Microphones (Detachable Boom Mic + Built-in)",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Lighting",
        "value": "Subtle Glow with Multi-Colour LED Lights",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Colours",
        "value": "Cool Black / Dreamy Lilac",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-chillray.png",
        "altText": "FINGERS ChillRay Open-Ear Wireless Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Jovia-H7 Wireless Over-Ear Headset",
    "slug": "fingers-jovia-h7",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Jovia-H7",
    "sku": "JK-FIG-JOVIAH7",
    "description": "Sleek modern wireless headset with noise-isolating plush ear-cups, featherlight comfort, 18 hours playtime, and rotating headband.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Design",
        "value": "Featherlight Comfort with Rotating Plush Ear-Cups",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 18 Hours Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Noise Isolation",
        "value": "Acoustic Noise-Isolating Ergonomic Fit",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Microphone",
        "value": "Built-in HD Microphone for Calls",
        "isFilterable": false,
        "group": "Communication"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-jovia-h7.png",
        "altText": "FINGERS Jovia-H7 Wireless Over-Ear Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Rock-N-Roll H6 Wireless Club-Bass Headset",
    "slug": "fingers-rock-n-roll-h6",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Rock-N-Roll H6",
    "sku": "JK-FIG-ROCKNROLLH6",
    "description": "Wireless over-ear headset delivering rocking club-like bass, up to 12 hours playtime, FM radio, MicroSD slot, AUX support, and multi-point technology.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Bass Response",
        "value": "Rich Immersive Sound with Rocking Club-Like Bass",
        "isFilterable": true,
        "group": "Audio Performance"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 12 Hours Non-Stop Playlists",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Multi-Source",
        "value": "Bluetooth / FM Radio / MicroSD / AUX",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Multi-Point",
        "value": "Connects 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Colours",
        "value": "Soft Black+Rich Red / Beige",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rock-n-roll-h6.png",
        "altText": "FINGERS Rock-N-Roll H6 Wireless Club-Bass Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Trance ANC 52dB Wireless Headset",
    "slug": "fingers-trance-anc",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Trance ANC",
    "sku": "JK-FIG-TRANCEANC",
    "description": "Flagship wireless headset with 52 dB Active Noise Cancellation, 360 3D spatial audio, 40 ms ultra-low latency, and detachable professional boom microphone.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Noise Cancellation",
        "value": "ANC 52 dB Active Noise Cancellation",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Spatial Audio",
        "value": "360 3D Spatial Audio Processing",
        "isFilterable": true,
        "group": "Audio Features"
      },
      {
        "key": "Gaming Latency",
        "value": "40 ms Ultra-Low Latency Mode",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Microphone",
        "value": "Detachable Professional Boom Mic",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Battery",
        "value": "Long-Lasting Fast Recharge Battery",
        "isFilterable": true,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-trance-anc.png",
        "altText": "FINGERS Trance ANC 52dB Wireless Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Sugar-n-Spice B3 Wireless Foldable Headset",
    "slug": "fingers-sugar-n-spice-b3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Sugar-n-Spice B3",
    "sku": "JK-FIG-SUGARNSPICEB3",
    "description": "Foldable wireless headset with spicy dynamic bass, contrasting colour ear-cups, up to 12 hours playback, FM radio, MicroSD slot, and IPX4 sweat resistance.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Design",
        "value": "Foldable On-The-Go Frame with Contrasting Colour Ear-Cups",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Battery Playtime",
        "value": "Up to 12 Hours Playtime",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Water Resistance",
        "value": "IPX4 Sweat-Resistant Rating",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Inputs",
        "value": "Bluetooth / FM Radio / MicroSD / AUX",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-sugar-n-spice-b3.png",
        "altText": "FINGERS Sugar-n-Spice B3 Wireless Foldable Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS NoisISO C15 Noise-Isolating Wired Headset",
    "slug": "fingers-noisiso-c15",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "NoisISO C15",
    "sku": "JK-FIG-NOISISOC15",
    "description": "Wired headset engineered for clear voice capture, noise isolation, comfortable ear cushions, and reliable performance across call centres, online classes, and PC gaming.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Application",
        "value": "Ideal for Call Centres, Gaming, Video Conferencing & Online Classes",
        "isFilterable": true,
        "group": "Use Case"
      },
      {
        "key": "Microphone",
        "value": "Noise-Isolating Adjustable Boom Mic",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Connector",
        "value": "3.5 mm Audio Jack with In-line Controls",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Comfort",
        "value": "Soft-Cushioned Ear-Pads for All-Day Wear",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-noisiso-c15.png",
        "altText": "FINGERS NoisISO C15 Noise-Isolating Wired Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Talk & Music-10/10 F10 Wired Headset",
    "slug": "fingers-talk-and-music-10-10-f10",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "Talk & Music-10/10 F10",
    "sku": "JK-FIG-TALKMUSIC1010F10",
    "description": "Versatile 3.5mm wired headset with 40mm dynamic drivers, light soft-cushioned ear-cups, and adjustable microphone for voice chat, music, and dictation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Driver Size",
        "value": "Powerful 40 mm Dynamic Audio Driver",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Microphone",
        "value": "Adjustable Omnidirectional Boom Mic",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Comfort",
        "value": "Light & Soft-Cushioned Ear-Cups & Headband",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Connector",
        "value": "3.5 mm Stereo Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-talk-and-music-10-10-f10.png",
        "altText": "FINGERS Talk & Music-10/10 F10 Wired Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS S10 Wired PC Stereo Headset",
    "slug": "fingers-s10",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "S10",
    "sku": "JK-FIG-S10",
    "description": "Distortion-free stereo sound headset with 40mm drivers, soft cushioned ear-cups, and adjustable microphone for internet voice chat and video calls.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Driver",
        "value": "40 mm High-Definition Audio Driver",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Microphone",
        "value": "Adjustable Clear-Voice Mic",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Design",
        "value": "Soft-Cushioned Ear-Cups & Headband",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Interface",
        "value": "3.5 mm Audio Jack",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-s10.png",
        "altText": "FINGERS S10 Wired PC Stereo Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS USB-Tonic H9 Professional USB Headset",
    "slug": "fingers-usb-tonic-h9",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "USB-Tonic H9",
    "sku": "JK-FIG-USBTONICH9",
    "description": "Professional digital USB headset featuring 40mm drivers, flexible noise-filtering microphone, soft-cushioned ear-cups, and plug-n-play connectivity.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB 2.0 Digital Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Driver Size",
        "value": "40 mm High-Definition Audio Driver",
        "isFilterable": true,
        "group": "Acoustics"
      },
      {
        "key": "Microphone",
        "value": "Flexible Noise-Cancelling Microphone",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Comfort",
        "value": "All-Day Soft-Cushioned Headband & Ear-Cups",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-usb-tonic-h9.png",
        "altText": "FINGERS USB-Tonic H9 Professional USB Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS HappyHertz Kids Safe Volume-Limited Headset",
    "slug": "fingers-happyhertz",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "headsets-audio",
    "categoryName": "Headsets & Audio",
    "modelNumber": "HappyHertz",
    "sku": "JK-FIG-HAPPYHERTZ",
    "description": "Kids wired headset with safe 85 dB volume limit to protect young hearing, plush breathable ear-cushions, kid-tough bend-resistant frame, and built-in mic.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Volume Limiter",
        "value": "85 dB Safe Volume Limit (Protects Children's Hearing)",
        "isFilterable": true,
        "group": "Safety"
      },
      {
        "key": "Durability",
        "value": "Kid-Tough Frame Withstands Drops & Bends",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Comfort",
        "value": "Plush Breathable Ear-Cushions & Adjustable Headband",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Colours",
        "value": "Blush Pink / Caramel Beige / Cool Blue",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Interface",
        "value": "3.5 mm Audio Jack",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-happyhertz.png",
        "altText": "FINGERS HappyHertz Kids Safe Volume-Limited Headset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FMC-Micro-05 Micro USB Cable",
    "slug": "fingers-fmc-micro-05",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FMC-Micro-05",
    "sku": "JK-FIG-FMCMICRO05",
    "description": "Durable 1-metre Micro USB data and charging cable, lightweight 28g design with reinforced strain-relief collars.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "Micro USB to USB-A",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Weight",
        "value": "28 g",
        "isFilterable": false,
        "group": "Dimensions"
      },
      {
        "key": "Function",
        "value": "Charging and High-Speed Data Sync",
        "isFilterable": false,
        "group": "Performance"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fmc-micro-05.png",
        "altText": "FINGERS FMC-Micro-05 Micro USB Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FSP-C5A 5.0A Fast Charging USB-A to Type-C Cable",
    "slug": "fingers-fsp-c5a",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FSP-C5A",
    "sku": "JK-FIG-FSPC5A",
    "description": "Heavy-duty fast charging cable supporting up to 5.0A maximum output for rapid mobile fueling and data transfer.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-A to USB Type-C",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Current Rating",
        "value": "Fast Charging up to 5.0 A Max",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Function",
        "value": "Dual Purpose Fast Charging & Data Sync",
        "isFilterable": false,
        "group": "Performance"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fsp-c5a.png",
        "altText": "FINGERS FSP-C5A 5.0A Fast Charging USB-A to Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FMC-Type-C-09 USB Type-C Cable",
    "slug": "fingers-fmc-type-c-09",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FMC-Type-C-09",
    "sku": "JK-FIG-FMCTYPEC09",
    "description": "Reliable 1-metre USB Type-C charging and synchronization cable with 24g lightweight construction.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C to USB-A",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Weight",
        "value": "24 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fmc-type-c-09.png",
        "altText": "FINGERS FMC-Type-C-09 USB Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FMC-C2L2 Type-C to Lightning Cable",
    "slug": "fingers-fmc-c2l2",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FMC-C2L2",
    "sku": "JK-FIG-FMCC2L2",
    "description": "1-metre USB Type-C to Lightning fast charging cable for iOS smartphones and tablets, 42g weight.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C to Apple Lightning",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Weight",
        "value": "42 g",
        "isFilterable": false,
        "group": "Dimensions"
      },
      {
        "key": "Compatibility",
        "value": "Apple iPhone, iPad & iPod Series",
        "isFilterable": true,
        "group": "Compatibility"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fmc-c2l2.png",
        "altText": "FINGERS FMC-C2L2 Type-C to Lightning Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RuggTwist-C02 Rugged Type-C Cable 3.0A",
    "slug": "fingers-ruggtwist-c02",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RuggTwist-C02",
    "sku": "JK-FIG-RUGGTWISTC02",
    "description": "Rugged braided nylon USB Type-C cable supporting up to 3.0A fast charging with bend-resistant connectors.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Current Rating",
        "value": "Fast Charging up to 3.0 A Max",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Build",
        "value": "Rugged Braided Nylon Jacket",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ruggtwist-c02.png",
        "altText": "FINGERS RuggTwist-C02 Rugged Type-C Cable 3.0A Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FMC-C2C Type-C to Type-C Cable",
    "slug": "fingers-fmc-c2c",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FMC-C2C",
    "sku": "JK-FIG-FMCC2C",
    "description": "1-metre high-speed Type-C to Type-C data sync and rapid charging cable for modern laptops, tablets, and phones.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C to USB Type-C",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Weight",
        "value": "42 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fmc-c2c.png",
        "altText": "FINGERS FMC-C2C Type-C to Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Car Backseat Cable-C9FL 9-Foot Type-C Cable",
    "slug": "fingers-car-backseat-cable-c9fl",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Car Backseat Cable-C9FL",
    "sku": "JK-FIG-CARBACKSEATC9FL",
    "description": "Extra-long 2.7m (9 feet) 5.0A fast charging Type-C cable specifically designed for car backseat passengers and spacious desks.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Length",
        "value": "2.7 Metres (9 Feet) Extra-Long",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Interface",
        "value": "USB Type-A to USB Type-C",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Current Rating",
        "value": "Fast Charging up to 5.0 A Max",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Weight",
        "value": "70 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-car-backseat-cable-c9fl.png",
        "altText": "FINGERS Car Backseat Cable-C9FL 9-Foot Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS COL-TypeC-02 Colorful Type-C Cable",
    "slug": "fingers-col-typec-02",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "COL-TypeC-02",
    "sku": "JK-FIG-COLTYPEC02",
    "description": "1-metre high-speed USB Type-C cable with colorful outer sheath and durable copper cores.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Function",
        "value": "Charging & Data Sync",
        "isFilterable": false,
        "group": "Performance"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-col-typec-02.png",
        "altText": "FINGERS COL-TypeC-02 Colorful Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FMC-ChargeScale-C03 Measuring Scale Cable",
    "slug": "fingers-fmc-chargescale-c03",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "FMC-ChargeScale-C03",
    "sku": "JK-FIG-FMCCHARGESCALEC03",
    "description": "India's first mobile cable with a built-in measuring scale printed along its 1-metre length, 3.0A fast charging.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Innovation",
        "value": "India's First Cable with Built-in Measuring Scale",
        "isFilterable": true,
        "group": "Special Features"
      },
      {
        "key": "Current Rating",
        "value": "Fast Charging up to 3.0 A Max",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Interface",
        "value": "USB Type-C",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fmc-chargescale-c03.png",
        "altText": "FINGERS FMC-ChargeScale-C03 Measuring Scale Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Herculean-CL5 Ultra-Tough Type-C to Lightning Cable",
    "slug": "fingers-herculean-cl5",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Herculean-CL5",
    "sku": "JK-FIG-HERCULEANCL5",
    "description": "World's toughest mobile cable featuring reinforced ballistic fibers, 5.0A fast charging, and Type-C to Lightning interface.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Durability",
        "value": "World's Toughest Mobile Cable (Reinforced Core)",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Interface",
        "value": "USB Type-C to Apple Lightning",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Current Rating",
        "value": "Fast Charging up to 5.0 A Max",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Length",
        "value": "1.0 Metre",
        "isFilterable": true,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-herculean-cl5.png",
        "altText": "FINGERS Herculean-CL5 Ultra-Tough Type-C to Lightning Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Herculean-CC4 Ultra-Tough Type-C to Type-C PD 65W Cable",
    "slug": "fingers-herculean-cc4",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Herculean-CC4",
    "sku": "JK-FIG-HERCULEANCC4",
    "description": "Ultra-tough 1.5-metre Type-C to Type-C cable engineered for high-wattage Power Delivery up to 65W for laptops and phones.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Power Delivery",
        "value": "Supports Power Delivery up to 65 W",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Interface",
        "value": "USB Type-C to USB Type-C",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Length",
        "value": "1.5 Metres",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Weight",
        "value": "48 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-herculean-cc4.png",
        "altText": "FINGERS Herculean-CC4 Ultra-Tough Type-C to Type-C PD 65W Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-Dual USB 2.4A Wall Adapter",
    "slug": "fingers-pa-dual-usb",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-Dual USB",
    "sku": "JK-FIG-PADUALUSB",
    "description": "Dual USB wall charger with 5V 2.4A adaptive charging, universal 100-260V AC input, and dual simultaneous output.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Current",
        "value": "2.4 A Max Adaptive Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Dual USB-A Output Ports",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Input Voltage",
        "value": "100 - 240 V AC (260 V AC Max)",
        "isFilterable": false,
        "group": "Electrical"
      },
      {
        "key": "Protection",
        "value": "Overvoltage & Short Circuit Protection",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-dual-usb.png",
        "altText": "FINGERS PA-Dual USB 2.4A Wall Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-Dual USB Wall Charger with Micro Cable",
    "slug": "fingers-pa-dual-usb-with-micro-cable",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-Dual USB (Micro)",
    "sku": "JK-FIG-PADUALUSBMICRO",
    "description": "Dual USB wall charger offering 5V 2.4A adaptive output bundled with high-quality Micro USB charging cable.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Current",
        "value": "2.4 A Max Adaptive Output",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Dual USB-A Ports",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Bundled Cable",
        "value": "Includes 1 m Micro USB Cable",
        "isFilterable": false,
        "group": "Accessories"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-dual-usb-with-micro-cable.png",
        "altText": "FINGERS PA-Dual USB Wall Charger with Micro Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-Dual USB Wall Charger with Type-C Cable",
    "slug": "fingers-pa-dual-usb-with-type-c-cable",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-Dual USB (Type-C)",
    "sku": "JK-FIG-PADUALUSBTYPEC",
    "description": "Dual USB wall charger delivering 5V 2.4A adaptive output bundled with durable USB Type-C charging cable, 40g weight.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Output Current",
        "value": "2.4 A Max Adaptive Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Dual USB-A Ports",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Bundled Cable",
        "value": "Includes 1 m USB Type-C Cable",
        "isFilterable": false,
        "group": "Accessories"
      },
      {
        "key": "Weight",
        "value": "40 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-dual-usb-with-type-c-cable.png",
        "altText": "FINGERS PA-Dual USB Wall Charger with Type-C Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-45 45W Dual Port Fast Charger",
    "slug": "fingers-pa-45",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-45",
    "sku": "JK-FIG-PA45",
    "description": "45W high-speed dual port wall charger with USB-C Power Delivery (PD) with PPS and USB-A Quick Charge (QC).",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Max Wattage",
        "value": "Up to 45 W Fast Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Dual Ports (1x USB-C & 1x USB-A)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Protocols",
        "value": "USB-C PD with PPS + USB-A Quick Charge (QC)",
        "isFilterable": true,
        "group": "Charging Standards"
      },
      {
        "key": "Simultaneous Charging",
        "value": "Charges 2 Devices Simultaneously",
        "isFilterable": false,
        "group": "Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-45.png",
        "altText": "FINGERS PA-45 45W Dual Port Fast Charger Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-Fast-C20 20W Fast Wall Charger",
    "slug": "fingers-pa-fast-c20",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-Fast-C20",
    "sku": "JK-FIG-PAFASTC20",
    "description": "Compact 20W dual-protocol wall charger featuring USB Type-C Power Delivery (PD) and USB Type-A Quick Charge (QC), 40g.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "20 W Fast Output",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Protocols",
        "value": "Type-C PD + Type-A Quick Charge (QC)",
        "isFilterable": true,
        "group": "Charging Standards"
      },
      {
        "key": "Weight",
        "value": "40 g Compact Profile",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-fast-c20.png",
        "altText": "FINGERS PA-Fast-C20 20W Fast Wall Charger Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-36 33W Dual Port Fast Charger",
    "slug": "fingers-pa-36",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-36",
    "sku": "JK-FIG-PA36",
    "description": "33W dual-port wall charger supporting USB-C Power Delivery (PD) with PPS and USB-A Quick Charge (QC).",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Max Wattage",
        "value": "Up to 33 W Fast Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Dual Ports (1x USB-C & 1x USB-A)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Protocols",
        "value": "USB Type-C PD with PPS + USB Type-A QC",
        "isFilterable": true,
        "group": "Charging Standards"
      },
      {
        "key": "Weight",
        "value": "40 g",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-36.png",
        "altText": "FINGERS PA-36 33W Dual Port Fast Charger Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PA-765 65W GaN Triple Port Fast Charger",
    "slug": "fingers-pa-765",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PA-765",
    "sku": "JK-FIG-PA765",
    "description": "65W GaN triple-port fast charger with 2x USB-C PD and 1x USB-A QC, powerful enough to charge Type-C laptops, tablets, and phones simultaneously.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Technology",
        "value": "Integrated Gallium Nitride (GaN) Technology",
        "isFilterable": true,
        "group": "Architecture"
      },
      {
        "key": "Max Output",
        "value": "65 W Fast Output (Supports Laptops)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "Triple Ports (2x USB-C & 1x USB-A)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Power Delivery",
        "value": "Dual Type-C with PD (Max 65 W) + QC (20 W)",
        "isFilterable": true,
        "group": "Charging Standards"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pa-765.png",
        "altText": "FINGERS PA-765 65W GaN Triple Port Fast Charger Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS DoublePower 50W Fast Car Charger",
    "slug": "fingers-doublepower",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "DoublePower",
    "sku": "JK-FIG-DOUBLEPOWER",
    "description": "50W dual-port fast car charger with 2 independent fast-charging outputs for smartphones, tablets, and dashcams.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Max Output",
        "value": "Up to 50 W Fast Car Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Ports",
        "value": "2 Independent Power Charging Ports",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Vehicle Input",
        "value": "12V - 24V Universal Cigarette Lighter Input",
        "isFilterable": false,
        "group": "Electrical"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-doublepower.png",
        "altText": "FINGERS DoublePower 50W Fast Car Charger Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Hold-Me-Up3 Universal Mobile Stand",
    "slug": "fingers-hold-me-up3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Hold-Me-Up3",
    "sku": "JK-FIG-HOLDMEUP3",
    "description": "Compact, foldable aluminum mobile phone stand with anti-slip silicone cushions, anti-shake stability, and charging cable cutout.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Design",
        "value": "Compact, Foldable & Ultra-Portable",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Stability",
        "value": "Anti-Slip & Anti-Shake Base",
        "isFilterable": true,
        "group": "Ergonomics"
      },
      {
        "key": "Cable Management",
        "value": "Bottom Grooving Provision for Charging Cable",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Material",
        "value": "Rust & Corrosion-Proof Alloy",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-hold-me-up3.png",
        "altText": "FINGERS Hold-Me-Up3 Universal Mobile Stand Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Elevate Ergonomic Aluminum Laptop Stand",
    "slug": "fingers-elevate",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-stands",
    "categoryName": "Laptop Stands & Ergonomics",
    "modelNumber": "Elevate",
    "sku": "JK-FIG-ELEVATE",
    "description": "Minimalist modern aluminum laptop stand with ergonomic angle adjustment, sturdy non-slip base, and enhanced thermal dissipation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Material",
        "value": "Premium Brushed Aluminum Alloy",
        "isFilterable": true,
        "group": "Material & Finish"
      },
      {
        "key": "Ergonomics",
        "value": "Multi-Angle Height & Tilt Adjustment",
        "isFilterable": true,
        "group": "Ergonomics"
      },
      {
        "key": "Thermal Dissipation",
        "value": "Open Architecture for Enhanced Airflow",
        "isFilterable": false,
        "group": "Thermal Management"
      },
      {
        "key": "Compatibility",
        "value": "Fits Laptops from 11-inch to 17-inch",
        "isFilterable": true,
        "group": "Compatibility"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-elevate.png",
        "altText": "FINGERS Elevate Ergonomic Aluminum Laptop Stand Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS MagPower-P10 10000mAh Magnetic Wireless Power Bank",
    "slug": "fingers-magpower-p10",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "MagPower-P10",
    "sku": "JK-FIG-MAGPOWERP10",
    "description": "10,000 mAh magnetic wireless power bank with 15W Qi fast wireless charging, PD 20W & QC 22.5W wired outputs, and digital LED battery display.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Battery Capacity",
        "value": "10,000 mAh Li-Polymer Battery",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Wireless Charging",
        "value": "15 W Fast Wireless Charging for Qi Devices",
        "isFilterable": true,
        "group": "Charging Features"
      },
      {
        "key": "Wired Charging",
        "value": "Power Delivery (20 W) & Quick Charge (22.5 W)",
        "isFilterable": true,
        "group": "Charging Features"
      },
      {
        "key": "Display",
        "value": "Digital LED Percentage Display for Battery Status",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-magpower-p10.png",
        "altText": "FINGERS MagPower-P10 10000mAh Magnetic Wireless Power Bank Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Fuel-K3 10000mAh Multi-Port Power Bank",
    "slug": "fingers-fuel-k3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Fuel-K3",
    "sku": "JK-FIG-FUELK3",
    "description": "10,000 mAh power bank with 5 outputs and dual inputs, 22.5W PD & QC fast charging, capable of fueling smartphones and USB-C devices.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "10,000 mAh Li-Polymer",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Outputs",
        "value": "5 Outputs + Dual Inputs",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Fast Charge",
        "value": "22.5 W PD & QC Two-Way Fast Charging",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Colours",
        "value": "Amber Orange / Rich Grey",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fuel-k3.png",
        "altText": "FINGERS Fuel-K3 10000mAh Multi-Port Power Bank Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Kickstart-C11 10000mAh Power Bank with Built-in Cable",
    "slug": "fingers-kickstart-c11",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "Kickstart-C11",
    "sku": "JK-FIG-KICKSTARTC11",
    "description": "10,000 mAh power bank with integrated Type-C charging cable, quad outputs (2x USB-A, 1x Type-C, 1x built-in cable), and triple inputs.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "10,000 mAh Li-Polymer",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Integrated Cable",
        "value": "Built-in USB Type-C Cable",
        "isFilterable": true,
        "group": "Convenience"
      },
      {
        "key": "Outputs",
        "value": "Quad Outputs (2x USB-A + 1x Type-C + 1x Built-in)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Colours",
        "value": "Rich Black / Rich White",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-kickstart-c11.png",
        "altText": "FINGERS Kickstart-C11 10000mAh Power Bank with Built-in Cable Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PowerPump-P65 20000mAh 65W Laptop Power Bank",
    "slug": "fingers-powerpump-p65",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "PowerPump-P65",
    "sku": "JK-FIG-POWERPUMPP65",
    "description": "Gigantic 20,000 mAh 65W high-output power bank capable of fueling Type-C laptops and phones with 5 outputs and built-in cables.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "20,000 mAh Li-Polymer",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Max Output",
        "value": "65 W High-Wattage Power Delivery",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Laptop Charging",
        "value": "Can Fuel USB-C Powered Laptops",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Outputs",
        "value": "5 Outputs (2x USB + 1x Type-C + Built-in Lightning & Type-C)",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-powerpump-p65.png",
        "altText": "FINGERS PowerPump-P65 20000mAh 65W Laptop Power Bank Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FWF150 150M Wireless-N Nano USB Wi-Fi Adapter",
    "slug": "fingers-fwf150",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "FWF150",
    "sku": "JK-FIG-FWF150",
    "description": "Ultra-compact 150 Mbps Wireless-N nano USB adapter providing reliable 2.4 GHz wireless connectivity for desktops and laptops.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Speed",
        "value": "Up to 150 Mbps Wireless-N Speed",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Form Factor",
        "value": "Nano USB Plug-n-Forget",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Frequency Band",
        "value": "2.4 GHz Single Band",
        "isFilterable": true,
        "group": "RF Specifications"
      },
      {
        "key": "Security",
        "value": "64/128-bit WEP, WPA, WPA2 Wireless Encryption",
        "isFilterable": false,
        "group": "Security"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fwf150.png",
        "altText": "FINGERS FWF150 150M Wireless-N Nano USB Wi-Fi Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FWF300 300M Wireless-N Mini USB Wi-Fi Adapter",
    "slug": "fingers-fwf300",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "FWF300",
    "sku": "JK-FIG-FWF300",
    "description": "300 Mbps Wireless-N mini USB Wi-Fi adapter with high-speed 2T2R internal antennas for lag-free streaming and downloading.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Speed",
        "value": "Up to 300 Mbps Wireless-N High Speed",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Form Factor",
        "value": "Mini USB Form Factor",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Frequency Band",
        "value": "2.4 GHz Band",
        "isFilterable": true,
        "group": "RF Specifications"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fwf300.png",
        "altText": "FINGERS FWF300 300M Wireless-N Mini USB Wi-Fi Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FWF602-BT 600M Dual-Band Wi-Fi & Bluetooth 4.2 Adapter",
    "slug": "fingers-fwf602-bt",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "FWF602-BT",
    "sku": "JK-FIG-FWF602BT",
    "description": "2-in-1 dual-band USB adapter combining 600 Mbps AC Wi-Fi (2.4 GHz & 5 GHz) and Bluetooth 4.2 wireless receiver in a single device.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wireless Speed",
        "value": "600 Mbps Dual-Band (150 Mbps 2.4 GHz + 433 Mbps 5 GHz)",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Bluetooth",
        "value": "Integrated Bluetooth 4.2 Controller",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Form Factor",
        "value": "Compact USB Interface",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fwf602-bt.png",
        "altText": "FINGERS FWF602-BT 600M Dual-Band Wi-Fi & Bluetooth 4.2 Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS LP-65W / LPD-65W 65W Universal Laptop Power Adapter",
    "slug": "fingers-lp-65w",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "LP-65W",
    "sku": "JK-FIG-LP65W",
    "description": "65W replacement laptop power adapter with interchangeable DC barrel tips compatible with multiple brand laptops.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "65 W Output Power",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Compatibility",
        "value": "Multiple Brand Laptop DC Connectors",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Protection",
        "value": "Overvoltage, Overcurrent & Short-Circuit Safeguards",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-lp-65w.png",
        "altText": "FINGERS LP-65W / LPD-65W 65W Universal Laptop Power Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS LAPC-65W 65W Type-C Laptop Power Adapter",
    "slug": "fingers-lapc-65w",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "LAPC-65W",
    "sku": "JK-FIG-LAPC65W",
    "description": "65W Type-C Power Delivery laptop AC adapter engineered for universal compatibility with modern USB-C laptops and notebooks.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "65 W USB-C Power Delivery",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Interface",
        "value": "USB Type-C Connector",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Protection",
        "value": "Smart Multi-Level Electrical Safety",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-lapc-65w.png",
        "altText": "FINGERS LAPC-65W 65W Type-C Laptop Power Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS MegaView HDMI 2.0 4K HDR Monitor Display Cables",
    "slug": "fingers-megaview-cables",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "MegaView Cables",
    "sku": "JK-FIG-MEGAVIEWCABLES",
    "description": "HDMI 2.0 high-speed monitor display cable supporting 4K HDR at 60Hz, available in 10m, 15m, and 20m commercial lengths.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "HDMI 2.0 HD Display Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Resolution",
        "value": "Supports 4K UHD @ 60 Hz with HDR",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Available Lengths",
        "value": "Available in 10 m / 15 m / 20 m",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Connectors",
        "value": "Gold-Plated Corrosion-Resistant Terminals",
        "isFilterable": false,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-megaview-cables.png",
        "altText": "FINGERS MegaView HDMI 2.0 4K HDR Monitor Display Cables Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Smoothy-P6 Large DeskMat & Mouse Pad",
    "slug": "fingers-smoothy-p6",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mouse-pads",
    "categoryName": "Mouse Pads & Desk Mats",
    "modelNumber": "Smoothy-P6",
    "sku": "JK-FIG-SMOOTHYP6",
    "description": "Ultra-smooth premium surface desk mat and mouse pad with high-precision optical tracking, anti-slip natural rubber base, and durable anti-fray stitched borders.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Surface",
        "value": "Ultra-Smooth High-Precision Tracking Surface",
        "isFilterable": true,
        "group": "Material & Finish"
      },
      {
        "key": "Base",
        "value": "Anti-Slip Natural Rubber Base",
        "isFilterable": true,
        "group": "Ergonomics"
      },
      {
        "key": "Edges",
        "value": "Durable Anti-Fray Stitched Borders",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Protection",
        "value": "Protects Desk Surface from Scratches, Scuffs & Stains",
        "isFilterable": false,
        "group": "Features"
      },
      {
        "key": "Colours",
        "value": "Mocha Brown / Satin Gold / Velvet Black",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-smoothy-p6.png",
        "altText": "FINGERS Smoothy-P6 Large DeskMat & Mouse Pad Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Quadrant CU2.0 4-Port USB Hub with Type-C",
    "slug": "fingers-quadrant-cu2-0",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "Quadrant CU2.0",
    "sku": "JK-FIG-QUADRANTCU20",
    "description": "Ultra-portable 4-port USB hub featuring 3x USB 2.0 ports and 1x USB Type-C 2.0 port with instant plug-n-play setup.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Ports",
        "value": "4 Ports (3x USB 2.0 + 1x Type-C 2.0)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Form Factor",
        "value": "Ultra-Portable Compact Profile",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Setup",
        "value": "Driverless Plug & Play",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quadrant-cu2-0.png",
        "altText": "FINGERS Quadrant CU2.0 4-Port USB Hub with Type-C Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FlexiPort Multiport Card & USB Hub",
    "slug": "fingers-flexiport",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "FlexiPort",
    "sku": "JK-FIG-FLEXIPORT",
    "description": "Multi-card and USB expansion hub converting USB 2.0/Type-C 3.0 to SD card, MicroSD, and USB 2.0/3.0 ports.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Inputs",
        "value": "Dual Input (USB 2.0 / USB Type-C 3.0)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Slots",
        "value": "SD Card, MicroSD Card & USB Expansion",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Data Speed",
        "value": "High-Speed Memory Card Data Transfer",
        "isFilterable": false,
        "group": "Performance"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-flexiport.png",
        "altText": "FINGERS FlexiPort Multiport Card & USB Hub Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS UltimoDock 5-in-1 Type-C Docking Station",
    "slug": "fingers-ultimodock-5-in-1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "UltimoDock 5-in-1",
    "sku": "JK-FIG-ULTIMODOCK5IN1",
    "description": "5-in-1 Type-C multiport dock with gold-plated Type-C connector, braided nylon cable, multiple USB ports, and display output.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "Type-C Gold-Plated Connector",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Cable",
        "value": "Braided Nylon Tangle-Free Cable",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Multiport",
        "value": "5-in-1 Multiport Hub Architecture",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ultimodock-5-in-1.png",
        "altText": "FINGERS UltimoDock 5-in-1 Type-C Docking Station Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Fast-CU3.0 Slim 4-Port USB 3.0 Data Hub",
    "slug": "fingers-fast-cu3-0",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "Fast-CU3.0",
    "sku": "JK-FIG-FASTCU30",
    "description": "Slimline 4-port USB 3.0 data hub delivering transfer speeds up to 5 Gbps across all connected peripherals.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Transfer Speed",
        "value": "Super Quick Data Transfer up to 5 Gbps",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Ports",
        "value": "4x USB 3.0 High-Speed Ports",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Interface",
        "value": "USB Type-A Host Connector",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fast-cu3-0.png",
        "altText": "FINGERS Fast-CU3.0 Slim 4-Port USB 3.0 Data Hub Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TriPort 3-Port USB 3.0 / 2.0 Hub",
    "slug": "fingers-triport",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "TriPort",
    "sku": "JK-FIG-TRIPORT",
    "description": "Pocket-sized 3-port USB expansion hub with 1x USB 3.0 high-speed port and 2x USB 2.0 ports.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Ports",
        "value": "3 Ports (1x USB 3.0 + 2x USB 2.0)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Form Factor",
        "value": "Pocket-Sized Ultra-Portable",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-triport.png",
        "altText": "FINGERS TriPort 3-Port USB 3.0 / 2.0 Hub Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS NextGen-CCU3.0 Slim USB 3.0 & Type-C Hub",
    "slug": "fingers-nextgen-ccu3-0",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "NextGen-CCU3.0",
    "sku": "JK-FIG-NEXTGENCCU30",
    "description": "Slim 4-port hub with Type-C host interface featuring 3x USB 3.0 ports and 1x Type-C 3.0 port with 5 Gbps data rates.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Host Interface",
        "value": "USB Type-C Connector",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Ports",
        "value": "3x USB 3.0 + 1x Type-C 3.0",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Data Rate",
        "value": "High-Speed Data Transfer up to 5 Gbps",
        "isFilterable": true,
        "group": "Performance"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-nextgen-ccu3-0.png",
        "altText": "FINGERS NextGen-CCU3.0 Slim USB 3.0 & Type-C Hub Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TopNotch 3-in-1 Type-C Multiport Hub with 4K HDMI",
    "slug": "fingers-topnotch-3-in-1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "TopNotch 3-in-1",
    "sku": "JK-FIG-TOPNOTCH3IN1",
    "description": "3-in-1 Type-C hub equipped with USB 3.0 (5 Gbps), 4K @ 30Hz HDMI video port, and up to 100W Power Delivery pass-through charging.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Video Output",
        "value": "HDMI Port Supporting 4K @ 30 Hz",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Power Delivery",
        "value": "Supports PD Pass-Through up to 100 W",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "USB Expansion",
        "value": "USB 3.0 Port (5 Gbps Transfer)",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-topnotch-3-in-1.png",
        "altText": "FINGERS TopNotch 3-in-1 Type-C Multiport Hub with 4K HDMI Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PowerStation Heavy-Duty 2500W 10A Power Strip",
    "slug": "fingers-powerstation",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "power-strips",
    "categoryName": "Power Strips & Surge Protectors",
    "modelNumber": "PowerStation",
    "sku": "JK-FIG-POWERSTATION",
    "description": "Commercial 2500W 10A power strip with inbuilt 10A circuit breaker, child safety shutters, solid copper contacts, 2m power cord, and fire-retardant housing.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Power Capacity",
        "value": "2500 W High Power (10 Amp Rated)",
        "isFilterable": true,
        "group": "Electrical"
      },
      {
        "key": "Circuit Protection",
        "value": "Inbuilt 10A Circuit Breaker for Short Circuit & Overload",
        "isFilterable": true,
        "group": "Safety"
      },
      {
        "key": "Child Safety",
        "value": "Child Safety Shutter Protection on all Sockets",
        "isFilterable": true,
        "group": "Safety"
      },
      {
        "key": "Contacts",
        "value": "Solid Copper Internal Contacts",
        "isFilterable": false,
        "group": "Build Quality"
      },
      {
        "key": "Cord Length",
        "value": "2.0 Metres Heavy-Duty Cord",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Housing",
        "value": "Fire-Retardant Heavy-Duty Enclosure",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-powerstation.png",
        "altText": "FINGERS PowerStation Heavy-Duty 2500W 10A Power Strip Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS GigaNet USB 3.0 to Gigabit Ethernet LAN Adapter",
    "slug": "fingers-giganet",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "GigaNet",
    "sku": "JK-FIG-GIGANET",
    "description": "High-performance USB 3.0 to Gigabit Ethernet adapter delivering 1000 Mbps network speeds with braided nylon cable.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Ethernet Speed",
        "value": "Gigabit Ethernet up to 1000 Mbps (1 Gbps)",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Host Interface",
        "value": "USB 3.0 Type-A",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Build",
        "value": "Braided Nylon Tangle-Free Cable",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-giganet.png",
        "altText": "FINGERS GigaNet USB 3.0 to Gigabit Ethernet LAN Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS GigaSpeed Type-C to Gigabit Ethernet LAN Adapter",
    "slug": "fingers-gigaspeed",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "GigaSpeed",
    "sku": "JK-FIG-GIGASPEED",
    "description": "Type-C to 10/100/1000M Gigabit Ethernet RJ45 adapter with 1 Gbps throughput and braided nylon cable for modern laptops.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Ethernet Speed",
        "value": "Gigabit LAN up to 1000 Mbps (1 Gbps)",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Host Interface",
        "value": "USB Type-C Connector",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Cable",
        "value": "Braided Nylon Shielded Cable",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-gigaspeed.png",
        "altText": "FINGERS GigaSpeed Type-C to Gigabit Ethernet LAN Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SwiftConnect USB 2.0 to 10/100 LAN Adapter",
    "slug": "fingers-swiftconnect",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "networking",
    "categoryName": "Networking & WiFi",
    "modelNumber": "SwiftConnect",
    "sku": "JK-FIG-SWIFTCONNECT",
    "description": "Compact USB 2.0 to 10/100M Fast Ethernet adapter for reliable wired LAN network connectivity.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Ethernet Speed",
        "value": "10/100 Mbps Fast Ethernet RJ45",
        "isFilterable": true,
        "group": "Network Performance"
      },
      {
        "key": "Host Interface",
        "value": "USB 2.0 Type-A",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-swiftconnect.png",
        "altText": "FINGERS SwiftConnect USB 2.0 to 10/100 LAN Adapter Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Compacto Type-C Card Reader & USB Hub",
    "slug": "fingers-compacto",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "Compacto",
    "sku": "JK-FIG-COMPACTO",
    "description": "Type-C card reader with dedicated SD card, MicroSD, and USB 2.0 ports for rapid camera and smartphone media backup.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Interface",
        "value": "USB Type-C Connector",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Slots",
        "value": "SD Card, MicroSD (TF) & USB 2.0",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-compacto.png",
        "altText": "FINGERS Compacto Type-C Card Reader & USB Hub Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Card Reader 3-in-1 Multi-Card Reader",
    "slug": "fingers-card-reader-3-in-1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "usb-hubs-docks",
    "categoryName": "USB Hubs & Docking Stations",
    "modelNumber": "Card Reader 3-in-1",
    "sku": "JK-FIG-CARDREADER3IN1",
    "description": "Universal 3-in-1 USB card reader supporting SD, MicroSD, and USB devices with hot-swapping and multi-OS compatibility.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Slots",
        "value": "SD Card, MicroSD & USB 2.0",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Features",
        "value": "Plug-n-Play + Hot Swapping Support",
        "isFilterable": false,
        "group": "Convenience"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-card-reader-3-in-1.png",
        "altText": "FINGERS Card Reader 3-in-1 Multi-Card Reader Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RAM-L8 8GB DDR Laptop Memory Module",
    "slug": "fingers-ram-l8",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RAM-L8",
    "sku": "JK-FIG-RAML8",
    "description": "8GB DDR high-reliability SODIMM laptop memory module engineered for responsive multitasking and energy efficiency.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "8 GB",
        "isFilterable": true,
        "group": "Memory Specifications"
      },
      {
        "key": "Form Factor",
        "value": "SODIMM Laptop Memory",
        "isFilterable": true,
        "group": "Architecture"
      },
      {
        "key": "Application",
        "value": "Laptop Upgrades & Multitasking",
        "isFilterable": false,
        "group": "Use Case"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ram-l8.png",
        "altText": "FINGERS RAM-L8 8GB DDR Laptop Memory Module Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RAM-L16 16GB DDR Laptop Memory Module",
    "slug": "fingers-ram-l16",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RAM-L16",
    "sku": "JK-FIG-RAML16",
    "description": "16GB high-capacity DDR SODIMM memory module for demanding mobile computing, virtualization, and creative workflows.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "16 GB",
        "isFilterable": true,
        "group": "Memory Specifications"
      },
      {
        "key": "Form Factor",
        "value": "SODIMM Laptop Memory",
        "isFilterable": true,
        "group": "Architecture"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ram-l16.png",
        "altText": "FINGERS RAM-L16 16GB DDR Laptop Memory Module Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RAM-D8 8GB DDR Desktop Memory Module",
    "slug": "fingers-ram-d8",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RAM-D8",
    "sku": "JK-FIG-RAMD8",
    "description": "8GB DDR UDIMM desktop memory module with fast cycle latency and thermal stability for commercial workstations.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "8 GB",
        "isFilterable": true,
        "group": "Memory Specifications"
      },
      {
        "key": "Form Factor",
        "value": "UDIMM Desktop Memory",
        "isFilterable": true,
        "group": "Architecture"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ram-d8.png",
        "altText": "FINGERS RAM-D8 8GB DDR Desktop Memory Module Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RAM-D16 16GB DDR Desktop Memory Module",
    "slug": "fingers-ram-d16",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RAM-D16",
    "sku": "JK-FIG-RAMD16",
    "description": "16GB high-speed DDR UDIMM desktop memory module for business workstations and gaming rigs.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "16 GB",
        "isFilterable": true,
        "group": "Memory Specifications"
      },
      {
        "key": "Form Factor",
        "value": "UDIMM Desktop Memory",
        "isFilterable": true,
        "group": "Architecture"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ram-d16.png",
        "altText": "FINGERS RAM-D16 16GB DDR Desktop Memory Module Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RAM-D32 32GB DDR Desktop Memory Module",
    "slug": "fingers-ram-d32",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "workspace-accessories",
    "categoryName": "Workspace Accessories",
    "modelNumber": "RAM-D32",
    "sku": "JK-FIG-RAMD32",
    "description": "32GB flagship DDR UDIMM desktop memory module engineered for extreme multitasking, 3D CAD, and content creation.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "32 GB",
        "isFilterable": true,
        "group": "Memory Specifications"
      },
      {
        "key": "Form Factor",
        "value": "UDIMM Desktop Memory",
        "isFilterable": true,
        "group": "Architecture"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-ram-d32.png",
        "altText": "FINGERS RAM-D32 32GB DDR Desktop Memory Module Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 720p HD Webcam with Built-in Microphone",
    "slug": "fingers-720p-hd-webcam",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "webcams",
    "categoryName": "Webcams & Conferencing",
    "modelNumber": "720p HD Webcam",
    "sku": "JK-FIG-720PHDWEBCAM",
    "description": "High-definition 720p webcam with manual focus adjustment, integrated USB noise-reducing microphone, and universal monitor clip.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Resolution",
        "value": "HD 720p (1280 x 720) & 480p Video Calling",
        "isFilterable": true,
        "group": "Video Quality"
      },
      {
        "key": "Microphone",
        "value": "Built-in High-Quality USB Microphone",
        "isFilterable": true,
        "group": "Communication"
      },
      {
        "key": "Lens",
        "value": "Advanced Optical Glass Lens with Manual Adjustment",
        "isFilterable": false,
        "group": "Optics"
      },
      {
        "key": "Mount",
        "value": "Universal Mounting Clip for Laptops & LCD/CRT Monitors",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-720p-hd-webcam.png",
        "altText": "FINGERS 720p HD Webcam with Built-in Microphone Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 2K QHD Auto-Focus Webcam",
    "slug": "fingers-2k-qhd-webcam",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "webcams",
    "categoryName": "Webcams & Conferencing",
    "modelNumber": "2K QHD Webcam",
    "sku": "JK-FIG-2KQHDWEBCAM",
    "description": "Professional 2K QHD webcam with resolutions up to 2592 x 1944, auto-focus lens, and clear voice capture microphone for conferencing and streaming.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Resolution",
        "value": "True 2K QHD Resolution up to 2592 x 1944",
        "isFilterable": true,
        "group": "Video Quality"
      },
      {
        "key": "Focus",
        "value": "Built-in Auto-Focus Mechanism",
        "isFilterable": true,
        "group": "Optics"
      },
      {
        "key": "Audio",
        "value": "Clear Voice Capture Microphone for Calls & Streaming",
        "isFilterable": true,
        "group": "Communication"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-2k-qhd-webcam.png",
        "altText": "FINGERS 2K QHD Auto-Focus Webcam Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS MarvelCombo2 Wired Keyboard & Mouse Deskset",
    "slug": "fingers-marvelcombo2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "MarvelCombo2",
    "sku": "JK-FIG-MARVELCOMBO2",
    "description": "Commercial wired deskset featuring a sleek keyboard with 12 soft-touch media controls, sealed membrane keys, and high-precision optical mouse.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Keyboard Controls",
        "value": "12 Quick Soft-Touch Media Controls",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Keys",
        "value": "Sealed Membrane Keyboard Keys",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Mouse",
        "value": "Ergonomic High-Precision Optical Mouse",
        "isFilterable": false,
        "group": "Mouse Features"
      },
      {
        "key": "OS Support",
        "value": "Windows / macOS / Linux",
        "isFilterable": true,
        "group": "Compatibility"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-marvelcombo2.png",
        "altText": "FINGERS MarvelCombo2 Wired Keyboard & Mouse Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Velvet Combo-C4 Wired Keyboard & Mouse Deskset",
    "slug": "fingers-velvet-combo-c4",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "Velvet Combo-C4",
    "sku": "JK-FIG-VELVETCOMBOC4",
    "description": "Colourful designer wired deskset with soft-touch keys, optical tracking mouse, sealed membrane switches, and Pearl Grey + White styling.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Colour Theme",
        "value": "Pearl Grey + White Range",
        "isFilterable": false,
        "group": "Variants"
      },
      {
        "key": "Keyboard",
        "value": "12 Soft-Touch Media Controls, Sealed Membrane",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Mouse Sensor",
        "value": "High-Precision Optical Sensor",
        "isFilterable": true,
        "group": "Mouse Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-velvet-combo-c4.png",
        "altText": "FINGERS Velvet Combo-C4 Wired Keyboard & Mouse Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS ImperialCombo-D2 Wired Scissor-Key Deskset",
    "slug": "fingers-imperialcombo-d2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "ImperialCombo-D2",
    "sku": "JK-FIG-IMPERIALCOMBOD2",
    "description": "Premium desktop combo equipped with laptop-feel X-scissor keys, 12 media controls, and multi-surface tracking optical mouse.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Key Mechanism",
        "value": "X-Scissor Keys for Laptop-Feel Typing Comfort",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Controls",
        "value": "12 Quick Media Keys",
        "isFilterable": false,
        "group": "Keyboard Features"
      },
      {
        "key": "Tracking",
        "value": "Works on Most Desk Surfaces",
        "isFilterable": false,
        "group": "Mouse Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-imperialcombo-d2.png",
        "altText": "FINGERS ImperialCombo-D2 Wired Scissor-Key Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS CheesyDuo-D3 Wired Keyboard & Mouse Deskset",
    "slug": "fingers-cheesyduo-d3",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "CheesyDuo-D3",
    "sku": "JK-FIG-CHEESYDUOD3",
    "description": "Smooth-typing wired deskset with unique aesthetic design, sealed membrane switches, and 12 quick media shortcut keys.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Keyboard Design",
        "value": "Unique Sleek Design with Smooth Keystrokes",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Keys",
        "value": "12 Quick Soft-Touch Media Controls",
        "isFilterable": true,
        "group": "Keyboard Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-cheesyduo-d3.png",
        "altText": "FINGERS CheesyDuo-D3 Wired Keyboard & Mouse Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS CubikCombo Gaming Backlit Keyboard & Mouse Deskset",
    "slug": "fingers-cubikcombo",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "CubikCombo",
    "sku": "JK-FIG-CUBIKCOMBO",
    "description": "Gaming backlit keyboard and mouse deskset with RGB breathing lights, 3 dedicated media keys with rotary volume knob, 7200 DPI gaming mouse, and braided cable.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Mouse DPI",
        "value": "High-Precision Gaming Sensor up to 7200 DPI",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Backlighting",
        "value": "Stunning Backlit Keys with RGB Breathing Lights",
        "isFilterable": true,
        "group": "Lighting"
      },
      {
        "key": "Volume Control",
        "value": "Dedicated Volume Rotary Knob",
        "isFilterable": false,
        "group": "Keyboard Features"
      },
      {
        "key": "Cable",
        "value": "Tangle-Free Extra-Strong Braided Cable",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-cubikcombo.png",
        "altText": "FINGERS CubikCombo Gaming Backlit Keyboard & Mouse Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Duo-Recharge Combo Wireless Rechargeable Deskset",
    "slug": "fingers-duo-recharge-combo",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "Duo-Recharge Combo",
    "sku": "JK-FIG-DUORECHARGECOMBO",
    "description": "2.4 GHz wireless rechargeable keyboard and mouse combo with USB nano receiver, 12 media keys, 4-button mouse, and ability to work while charging.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Rechargeable",
        "value": "Built-in Rechargeable Battery (Works While Charging)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Wireless Connectivity",
        "value": "2.4 GHz Wireless with USB Nano Receiver (10 m Range)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Keyboard Controls",
        "value": "12 Quick Soft-Touch Media Controls",
        "isFilterable": false,
        "group": "Keyboard Features"
      },
      {
        "key": "Mouse",
        "value": "4 Buttons with Scroll Wheel",
        "isFilterable": false,
        "group": "Mouse Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-duo-recharge-combo.png",
        "altText": "FINGERS Duo-Recharge Combo Wireless Rechargeable Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS ComboRegal-D4 Ultra-Slim Wireless Scissor Deskset",
    "slug": "fingers-comboregal-d4",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "ComboRegal-D4",
    "sku": "JK-FIG-COMBOREGALD4",
    "description": "Ultra-slim chic wireless deskset with laptop-like X-scissor keys, 10m range, auto power-saving mode, and 4-button optical mouse, Carbon Grey.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Key Type",
        "value": "X-Scissor Keys for Laptop-Like Typing",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Profile",
        "value": "Ultra-Slim Chic Profile",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Range",
        "value": "Long Operating Distance up to 10 m",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Colours",
        "value": "Carbon Grey / Celestial",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-comboregal-d4.png",
        "altText": "FINGERS ComboRegal-D4 Ultra-Slim Wireless Scissor Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS MiniClicks Duo D7 Compact 75% Wireless Deskset",
    "slug": "fingers-miniclicks-duo-d7",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "MiniClicks Duo D7",
    "sku": "JK-FIG-MINICLICKSDUOD7",
    "description": "Compact 75% 78-key wireless rechargeable deskset with silent-click mouse (800/1200/1600 DPI), X-scissor keys, and 10m wireless range.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "75% Compact Keyboard Layout with 78 Keys",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Mouse Clicks",
        "value": "100% Silent Click Wireless Mouse (800/1200/1600 DPI)",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Battery",
        "value": "Rechargeable Battery (Works While Charging)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Colours",
        "value": "Rich Black / Classic White",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-miniclicks-duo-d7.png",
        "altText": "FINGERS MiniClicks Duo D7 Compact 75% Wireless Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS StellarCombo2 Wireless Keyboard & Mouse Deskset",
    "slug": "fingers-stellarcombo2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboard-mouse-combos",
    "categoryName": "Keyboard & Mouse Combos",
    "modelNumber": "StellarCombo2",
    "sku": "JK-FIG-STELLARCOMBO2",
    "description": "Full-sized 2.4 GHz wireless commercial deskset with auto power save mode, nano receiver, 10m operating distance, and 4-button mouse.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wireless Tech",
        "value": "2.4 GHz Wireless with USB Nano Receiver",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Range",
        "value": "Up to 10 m Operating Range",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Power Saving",
        "value": "Auto Power Save Sleep Mode",
        "isFilterable": false,
        "group": "Power Management"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-stellarcombo2.png",
        "altText": "FINGERS StellarCombo2 Wireless Keyboard & Mouse Deskset Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS QuikFINGERS Lethal-GK1 Wireless Mechanical Keyboard",
    "slug": "fingers-quikfingers-lethal-gk1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "QuikFINGERS Lethal-GK1",
    "sku": "JK-FIG-LETHALGK1",
    "description": "82-key wireless mechanical gaming keyboard with 5-layer gasket mount, pre-lubed linear switches, hot-swappable 3/5-pin sockets, double-shot PBT keycaps, 18 RGB modes, multi-functional knob, tri-mode connection, and 4000 mAh battery.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "82 Keys Compact Layout",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Mounting",
        "value": "5-Layer Gasket Design for Acoustic Damping",
        "isFilterable": true,
        "group": "Architecture"
      },
      {
        "key": "Switches",
        "value": "Pre-Lubed Linear Mechanical Switches (40gf Force)",
        "isFilterable": true,
        "group": "Switch Details"
      },
      {
        "key": "Hot-Swappable",
        "value": "Full Key Hot-Swappable (Supports 3-Pin & 5-Pin)",
        "isFilterable": true,
        "group": "Customization"
      },
      {
        "key": "Keycaps",
        "value": "Double-Injection PBT Moulded Keycaps",
        "isFilterable": true,
        "group": "Keycaps"
      },
      {
        "key": "Connectivity",
        "value": "Tri-Mode (2.4 GHz + Bluetooth + USB-C Wired)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery",
        "value": "Mammoth 4000 mAh Battery (Connects up to 5 Devices)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Lighting & Controls",
        "value": "18 RGB Backlight Modes + Multi-Functional Knob",
        "isFilterable": false,
        "group": "Lighting"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quikfingers-lethal-gk1.png",
        "altText": "FINGERS QuikFINGERS Lethal-GK1 Wireless Mechanical Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Fierce-GK7 Full-Sized Wireless Mechanical Keyboard",
    "slug": "fingers-fierce-gk7",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "Fierce-GK7",
    "sku": "JK-FIG-FIERCEGK7",
    "description": "Full-sized 104-key mechanical keyboard with 5-layer gasket damping, hot-swappable switches, PBT keycaps, 18 RGB modes, volume knob, tri-mode connectivity, and 4000 mAh battery.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "104 Keys Full-Sized Mechanical Layout",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Mounting",
        "value": "5-Layer Gasket Shock Absorption",
        "isFilterable": true,
        "group": "Architecture"
      },
      {
        "key": "Switches",
        "value": "Pre-Lubed Linear Switches, 100% Anti-Ghosting",
        "isFilterable": true,
        "group": "Switch Details"
      },
      {
        "key": "Hot-Swap",
        "value": "3-Pin and 5-Pin Switch Support",
        "isFilterable": true,
        "group": "Customization"
      },
      {
        "key": "Battery",
        "value": "4000 mAh Battery with Tri-Mode Toggle Switch",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Keycaps",
        "value": "Double-Injection PBT Moulded Keycaps",
        "isFilterable": true,
        "group": "Keycaps"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fierce-gk7.png",
        "altText": "FINGERS Fierce-GK7 Full-Sized Wireless Mechanical Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Savage-MK2 Compact 65% Wired Mechanical Keyboard",
    "slug": "fingers-savage-mk2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "Savage-MK2",
    "sku": "JK-FIG-SAVAGEMK2",
    "description": "65% compact 67-key wired mechanical keyboard with tactile clicky switches, dynamic backlighting with 11 modes, multi-functional volume knob, and detachable cable.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "65% Compact Layout (67 Keys)",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Switches",
        "value": "Tactile Clicky Mechanical Switches (50gf)",
        "isFilterable": true,
        "group": "Switch Details"
      },
      {
        "key": "Backlighting",
        "value": "Dynamic Backlighting with 11 Pre-Set Modes",
        "isFilterable": false,
        "group": "Lighting"
      },
      {
        "key": "Knob",
        "value": "Multi-Functional Knob for Volume & Backlight",
        "isFilterable": false,
        "group": "Convenience"
      },
      {
        "key": "Cable",
        "value": "Detachable Braided USB Cable",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Colours",
        "value": "Crystal White / Jet Black",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-savage-mk2.png",
        "altText": "FINGERS Savage-MK2 Compact 65% Wired Mechanical Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Macho-MK1 Full-Sized Wired Mechanical Keyboard",
    "slug": "fingers-macho-mk1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "Macho-MK1",
    "sku": "JK-FIG-MACHOMK1",
    "description": "104-key full-sized wired mechanical keyboard with linear switches, 17 lighting modes, 26 anti-ghost keys, volume control knob, and dual-tone keycaps.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "104 Keys Full-Sized Layout",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Switches",
        "value": "Linear Switches (60gf Actuation)",
        "isFilterable": true,
        "group": "Switch Details"
      },
      {
        "key": "Anti-Ghosting",
        "value": "26 Anti-Ghost Keys for Gaming Accuracy",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Lighting",
        "value": "Dynamic Backlighting with 17 Modes",
        "isFilterable": false,
        "group": "Lighting"
      },
      {
        "key": "Colours",
        "value": "Dual-Tone Black+Orange / White+Blue",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-macho-mk1.png",
        "altText": "FINGERS Macho-MK1 Full-Sized Wired Mechanical Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS ButterClicks2 Standard Wired Keyboard",
    "slug": "fingers-butterclicks2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "ButterClicks2",
    "sku": "JK-FIG-BUTTERCLICKS2",
    "description": "104-key standard wired keyboard with special soft membrane keys for smooth typing, 12 quick soft-touch media controls, and multi-OS support.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "Full-Sized 104 Keys Layout",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Key Action",
        "value": "Special Soft Membrane Keys for Smooth Typing",
        "isFilterable": true,
        "group": "Keycaps"
      },
      {
        "key": "Media Keys",
        "value": "12 Quick Soft-Touch Media Controls",
        "isFilterable": false,
        "group": "Keyboard Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-butterclicks2.png",
        "altText": "FINGERS ButterClicks2 Standard Wired Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS WonderClicks K9 Sleek Wired Keyboard",
    "slug": "fingers-wonderclicks-k9",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "WonderClicks K9",
    "sku": "JK-FIG-WONDERCLICKSK9",
    "description": "104-key commercial computer keyboard with sleek modern profile, durable key legends, and 12 quick access media controls.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Layout",
        "value": "104 Keys Desktop Layout",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Design",
        "value": "Sleek Slim Profile Frame",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Media Keys",
        "value": "12 Quick Media Keys",
        "isFilterable": false,
        "group": "Keyboard Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-wonderclicks-k9.png",
        "altText": "FINGERS WonderClicks K9 Sleek Wired Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SuperHit BT-Freedom 5-in-1 Bluetooth Keyboard",
    "slug": "fingers-superhit-bt-freedom",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "keyboards",
    "categoryName": "Keyboards",
    "modelNumber": "SuperHit BT-Freedom",
    "sku": "JK-FIG-SUPERHITBTFREEDOM",
    "description": "5-in-1 multi-OS Bluetooth wireless keyboard with X-type scissor keys, sealed membrane, 10 million keystroke lifespan, and vibrant colour options.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "OS Support",
        "value": "5-in-1 (Windows, macOS, Android, iOS, Linux, ChromeOS)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Key Type",
        "value": "Special X-Type Scissor Keys with Sealed Membrane",
        "isFilterable": true,
        "group": "Keyboard Features"
      },
      {
        "key": "Durability",
        "value": "10 Million Keystroke Lifespan",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Colours",
        "value": "Royale Blue / Graphite Grey / Blush Pink / Matte Black / Steel Grey",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-superhit-bt-freedom.png",
        "altText": "FINGERS SuperHit BT-Freedom 5-in-1 Bluetooth Keyboard Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS MasterHit Wired USB Optical Mouse",
    "slug": "fingers-masterhit",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "MasterHit",
    "sku": "JK-FIG-MASTERHIT",
    "description": "Lightweight ergonomic wired optical mouse with precise 1000 DPI sensor, anti-slip textured grip, and durable switches.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Sensor",
        "value": "High-Precision 1000 DPI Optical Sensor",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Ergonomics",
        "value": "Lightweight Contoured Anti-Slip Grip",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Interface",
        "value": "USB 2.0 Wired Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-masterhit.png",
        "altText": "FINGERS MasterHit Wired USB Optical Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS SuperHit Dual-Tone Wired Optical Mouse",
    "slug": "fingers-superhit",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "SuperHit",
    "sku": "JK-FIG-SUPERHIT",
    "description": "Dual-tone wired optical mouse designed for accurate tracking on almost all desk surfaces without requiring a mouse pad.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Design",
        "value": "Trendy Dual-Tone Finish",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Tracking",
        "value": "Works on Most Surfaces without Mouse Pad",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Interface",
        "value": "USB Plug-n-Play",
        "isFilterable": true,
        "group": "Connectivity"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-superhit.png",
        "altText": "FINGERS SuperHit Dual-Tone Wired Optical Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS AeroGrip WB9 Dual-Mode Wireless Mouse",
    "slug": "fingers-aerogrip-wb9",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AeroGrip WB9",
    "sku": "JK-FIG-AEROGRIPWB9",
    "description": "Dual-connectivity wireless mouse (Bluetooth & 2.4 GHz) with 800-1200-1600 adjustable DPI, Type-C rechargeable battery lasting up to 25 days.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connectivity",
        "value": "Multi-Device Switching (Bluetooth + 2.4 GHz)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "DPI Resolution",
        "value": "800 / 1200 / 1600 Adjustable DPI",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Battery Life",
        "value": "Up to 25 Days on Single Recharge",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Charging",
        "value": "Type-C Fast Charging Port",
        "isFilterable": false,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-aerogrip-wb9.png",
        "altText": "FINGERS AeroGrip WB9 Dual-Mode Wireless Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS AeroGrip Nova Multi-Device Wireless Mouse",
    "slug": "fingers-aerogrip-nova",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AeroGrip Nova",
    "sku": "JK-FIG-AEROGRIPNOVA",
    "description": "Ergonomic rechargeable wireless mouse with dual-device switching, 800-1600 adjustable DPI, and blazing-fast Type-C recharging.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Multi-Device",
        "value": "Switch Between 2 Devices Simultaneously",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Resolution",
        "value": "800 - 1200 - 1600 Adjustable DPI",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Battery",
        "value": "Type-C Fast Rechargeable (25 Days Life)",
        "isFilterable": true,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-aerogrip-nova.png",
        "altText": "FINGERS AeroGrip Nova Multi-Device Wireless Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RGB-NoviTrend 7-Colour RGB Wireless Mouse",
    "slug": "fingers-rgb-novitrend",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "RGB-NoviTrend",
    "sku": "JK-FIG-RGBNOVITREND",
    "description": "Wireless optical & Bluetooth mouse featuring 7-colour illuminating RGB lights, Type-C fast charging, auto power-saving, and dual-tone finish.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Lighting",
        "value": "Illuminating Dynamic RGB Lights (7 Colours)",
        "isFilterable": true,
        "group": "Lighting"
      },
      {
        "key": "Connectivity",
        "value": "Dual Wireless (Bluetooth + 2.4 GHz)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Charging",
        "value": "Type-C Fast Charging Interface",
        "isFilterable": false,
        "group": "Battery & Power"
      },
      {
        "key": "Colours",
        "value": "Classic White / Ash Brown",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rgb-novitrend.png",
        "altText": "FINGERS RGB-NoviTrend 7-Colour RGB Wireless Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS CherryGrip Multi-Device Wireless Mouse",
    "slug": "fingers-cherrygrip",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "CherryGrip",
    "sku": "JK-FIG-CHERRYGRIP",
    "description": "Ergonomic multi-device wireless mouse with 800-1200-1600 adjustable DPI, textured side grips, and up to 25 days battery life from Type-C recharge.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Multi-Tasking",
        "value": "Switch Between 2 Devices",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "DPI",
        "value": "800 - 1200 - 1600 Adjustable DPI",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Battery",
        "value": "Type-C Rechargeable up to 25 Days",
        "isFilterable": true,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-cherrygrip.png",
        "altText": "FINGERS CherryGrip Multi-Device Wireless Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS AeroGrip Plus Multi-Device Wireless Mouse",
    "slug": "fingers-aerogrip-plus",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "AeroGrip Plus",
    "sku": "JK-FIG-AEROGRIPPLUS",
    "description": "Versatile wireless ergonomic mouse with dual-device Bluetooth/2.4GHz connectivity, 800-1600 DPI, and Type-C rechargeable battery.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Connectivity",
        "value": "Dual-Device Wireless Switching",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Resolution",
        "value": "800 / 1200 / 1600 Adjustable DPI",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Battery",
        "value": "Type-C Rechargeable (25 Days Usage)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Colours",
        "value": "Classic White / Ash Brown",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-aerogrip-plus.png",
        "altText": "FINGERS AeroGrip Plus Multi-Device Wireless Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS CuteClicks WB4 Silent Wireless Rechargeable Mouse",
    "slug": "fingers-cuteclicks-wb4",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "mice",
    "categoryName": "Mice",
    "modelNumber": "CuteClicks WB4",
    "sku": "JK-FIG-CUTECLICKSWB4",
    "description": "Ambidextrous aesthetic wireless mouse with 100% silent clicks, lightweight design, rechargeable battery lasting up to 25 days, and 10m range.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Click Sound",
        "value": "100% Silent Clicks for Noise-Free Workspaces",
        "isFilterable": true,
        "group": "Mouse Features"
      },
      {
        "key": "Design",
        "value": "Ambidextrous Compact Aesthetic Design",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Battery",
        "value": "Rechargeable Battery (Works While Charging, 25 Days Life)",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Colours",
        "value": "Happy White + Teal / Sunshine Yellow",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-cuteclicks-wb4.png",
        "altText": "FINGERS CuteClicks WB4 Silent Wireless Rechargeable Mouse Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS GlowBox-L1 Micro-ATX 3-Sided Glass PC Cabinet",
    "slug": "fingers-glowbox-l1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "GlowBox-L1",
    "sku": "JK-FIG-GLOWBOXL1",
    "description": "Micro-ATX PC chassis featuring 3 sides of toughened glass, front-left dual RGB light strips, dual chamber design, 240mm liquid cooling support, and USB 3.0 + HD Audio.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Panels",
        "value": "Three Sides of Toughened Glass",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Chamber",
        "value": "Dual Chamber Design for Thermal Isolation",
        "isFilterable": false,
        "group": "Architecture"
      },
      {
        "key": "Lighting",
        "value": "Front-Left Dual RGB Light Strips",
        "isFilterable": false,
        "group": "Lighting"
      },
      {
        "key": "Cooling Support",
        "value": "240 mm Liquid Cooling + Up to 5 x 120 mm Fans",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Front I/O",
        "value": "USB 3.0 + USB 2.0 + HD Audio & Mic",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-glowbox-l1.png",
        "altText": "FINGERS GlowBox-L1 Micro-ATX 3-Sided Glass PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FirstClass-E9 Micro-ATX PC Cabinet with SMPS",
    "slug": "fingers-firstclass-e9",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "FirstClass-E9",
    "sku": "JK-FIG-FIRSTCLASSE9",
    "description": "Micro ATX dual chamber PC cabinet with heavy-duty metal panels, bundled 12cm cooling fan, top magnetic dust filter, and bundled BIS-certified high-performance SMPS.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Panels",
        "value": "Heavy-Duty Metal Panels",
        "isFilterable": false,
        "group": "Chassis Construction"
      },
      {
        "key": "Bundled SMPS",
        "value": "High-Performance BIS Certified SMPS Bundled",
        "isFilterable": true,
        "group": "Power Supply"
      },
      {
        "key": "Fan Included",
        "value": "1 x 12 cm Cooling Fan Bundled",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Dust Filter",
        "value": "Magnetic Dust Filter at Top",
        "isFilterable": false,
        "group": "Dust Protection"
      },
      {
        "key": "Front I/O",
        "value": "USB 3.0 x 1 + USB 2.0 x 1 + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-firstclass-e9.png",
        "altText": "FINGERS FirstClass-E9 Micro-ATX PC Cabinet with SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Glass-C Micro-ATX Dual Glass PC Cabinet with SMPS",
    "slug": "fingers-glass-c",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Glass-C",
    "sku": "JK-FIG-GLASSC",
    "description": "Micro ATX dual chamber cabinet with front and left toughened glass panels, bundled 12cm ARGB fan, liquid cooling support, and bundled Gamma-12-407 long cable SMPS.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Glass Panels",
        "value": "Front & Left Side Toughened Glass Panels",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Bundled SMPS",
        "value": "Gamma-12-407 Long Cable SMPS Bundled",
        "isFilterable": true,
        "group": "Power Supply"
      },
      {
        "key": "Fans",
        "value": "12 cm ARGB Fan Bundled (Supports up to 5 Fans)",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Liquid Cooling",
        "value": "Water Cooling Support + Top Magnetic Dust Filter",
        "isFilterable": false,
        "group": "Cooling Support"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-glass-c.png",
        "altText": "FINGERS Glass-C Micro-ATX Dual Glass PC Cabinet with SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RGB-Majesty-N5 Fashionable PC Cabinet",
    "slug": "fingers-rgb-majesty-n5",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "RGB-Majesty-N5",
    "sku": "JK-FIG-RGBMAJESTYN5",
    "description": "Micro ATX fashionable PC chassis with ARGB illuminated front bezel, high ventilation, USB 3.0, and stylish modern profile.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Design",
        "value": "Fashionable Front Panel with ARGB Accent",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Front I/O",
        "value": "USB 3.0 + USB 2.0 + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rgb-majesty-n5.png",
        "altText": "FINGERS RGB-Majesty-N5 Fashionable PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Radiant Micro-ATX PC Cabinet",
    "slug": "fingers-radiant",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Radiant",
    "sku": "JK-FIG-RADIANT",
    "description": "Compact Micro ATX office and commercial PC cabinet featuring clean lines, robust steel frame, and front I/O ports.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Design",
        "value": "Clean Commercial Front Bezel",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Front Ports",
        "value": "USB 3.0 & Audio Ports",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-radiant.png",
        "altText": "FINGERS Radiant Micro-ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TopTier-T1 Micro ATX PC Cabinet",
    "slug": "fingers-toptier-t1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "TopTier-T1",
    "sku": "JK-FIG-TOPTIERT1",
    "description": "Sturdy commercial SPCC steel Micro ATX chassis engineered for corporate workstations and institutional desktop PCs.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Compact Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Structure",
        "value": "SPCC Sturdy Steel Construction",
        "isFilterable": false,
        "group": "Chassis Construction"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-toptier-t1.png",
        "altText": "FINGERS TopTier-T1 Micro ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS RGB-Flow C2 Micro-ATX PC Cabinet",
    "slug": "fingers-rgb-flow-c2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "RGB-Flow C2",
    "sku": "JK-FIG-RGBFLOWC2",
    "description": "Micro ATX computer case with dynamic RGB flow light strip, side viewing window, and optimized airflow routing.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Lighting",
        "value": "Dynamic RGB Flow Light Strip on Front Panel",
        "isFilterable": false,
        "group": "Lighting"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-rgb-flow-c2.png",
        "altText": "FINGERS RGB-Flow C2 Micro-ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Gallant C4 Mid-Tower ATX PC Cabinet",
    "slug": "fingers-gallant-c4",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Gallant C4",
    "sku": "JK-FIG-GALLANTC4",
    "description": "Mid-tower ATX PC cabinet with meshed front panel for high ventilation, USB 3.0 connectivity, and expansive component clearance.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Mid-Tower ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Airflow",
        "value": "Meshed High-Airflow Front Panel",
        "isFilterable": false,
        "group": "Thermal Management"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-gallant-c4.png",
        "altText": "FINGERS Gallant C4 Mid-Tower ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TurboNeo-N2 Clean-Style ATX PC Cabinet",
    "slug": "fingers-turboneo-n2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "TurboNeo-N2",
    "sku": "JK-FIG-TURBONEON2",
    "description": "Mid-tower ATX PC chassis with clean industrial styling, durable steel structure, and front USB 3.0 connectivity.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Style",
        "value": "Clean Industrial Minimalist Styling",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-turboneo-n2.png",
        "altText": "FINGERS TurboNeo-N2 Clean-Style ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Atlantic ATX Commercial PC Cabinet",
    "slug": "fingers-atlantic",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Atlantic",
    "sku": "JK-FIG-ATLANTIC",
    "description": "Full-sized ATX commercial PC chassis built for high durability, excellent component compatibility, and USB 3.0 front ports.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "I/O",
        "value": "USB 3.0 Front Port + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-atlantic.png",
        "altText": "FINGERS Atlantic ATX Commercial PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FirstClass-E1 Micro-ATX Office PC Cabinet",
    "slug": "fingers-firstclass-e1",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "FirstClass-E1",
    "sku": "JK-FIG-FIRSTCLASSE1",
    "description": "Compact Micro ATX office PC cabinet designed with heavy-duty SPCC steel, sleek black finish, and front I/O ports.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Compact Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Material",
        "value": "Heavy-Duty SPCC Steel Structure",
        "isFilterable": false,
        "group": "Chassis Construction"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-firstclass-e1.png",
        "altText": "FINGERS FirstClass-E1 Micro-ATX Office PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TurboCore-N3 ATX Workstation PC Cabinet",
    "slug": "fingers-turbocore-n3",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "TurboCore-N3",
    "sku": "JK-FIG-TURBOCOREN3",
    "description": "Full ATX workstation PC cabinet featuring dual front fan mounts, high-airflow channels, and USB 3.0.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Airflow",
        "value": "Dual Fan Mount Channels for Rapid Heat Dissipation",
        "isFilterable": false,
        "group": "Cooling Support"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-turbocore-n3.png",
        "altText": "FINGERS TurboCore-N3 ATX Workstation PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Metal-C7 Full Metal Workstation PC Cabinet",
    "slug": "fingers-metal-c7",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Metal-C7",
    "sku": "JK-FIG-METALC7",
    "description": "Micro ATX full metal panel workstation chassis engineered for low acoustic resonance and high durability in office environments.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Panels",
        "value": "Full Metal Acoustic Dampened Panels",
        "isFilterable": false,
        "group": "Chassis Construction"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-metal-c7.png",
        "altText": "FINGERS Metal-C7 Full Metal Workstation PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FirstClass-AX9 ATX High-Ventilation PC Cabinet",
    "slug": "fingers-firstclass-ax9",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "FirstClass-AX9",
    "sku": "JK-FIG-FIRSTCLASSAX9",
    "description": "Mid-tower ATX PC cabinet with high-ventilation front grille, spacious interior for graphics cards, and front USB 3.0.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Mid-Tower ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Airflow",
        "value": "High-Ventilation Grille Design",
        "isFilterable": false,
        "group": "Thermal Management"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-firstclass-ax9.png",
        "altText": "FINGERS FirstClass-AX9 ATX High-Ventilation PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Turbo-Mini Compact SFF PC Cabinet",
    "slug": "fingers-turbo-mini",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Turbo-Mini",
    "sku": "JK-FIG-TURBOMINI",
    "description": "Space-saving small form factor (SFF) computer cabinet supporting Micro-ATX and Mini-ITX motherboards for compact desktops.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Small Form Factor (SFF) Micro-ATX / Mini-ITX",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Space Saving",
        "value": "Ultra-Compact Desktop Footprint",
        "isFilterable": false,
        "group": "Dimensions"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-turbo-mini.png",
        "altText": "FINGERS Turbo-Mini Compact SFF PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Pentagon-C14 Geometric Front PC Cabinet",
    "slug": "fingers-pentagon-c14",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Pentagon-C14",
    "sku": "JK-FIG-PENTAGONC14",
    "description": "Futuristic PC chassis featuring 3D geometric faceted front panel, ATX/Micro-ATX motherboard support, and multiple drive bays.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Front Bezel",
        "value": "Angular 3D Geometric Faceted Design",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Form Factor",
        "value": "ATX / Micro-ATX Support",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-pentagon-c14.png",
        "altText": "FINGERS Pentagon-C14 Geometric Front PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PowerTower C8 High-Airflow Tower PC Cabinet",
    "slug": "fingers-powertower-c8",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "PowerTower C8",
    "sku": "JK-FIG-POWERTOWERC8",
    "description": "Tower PC chassis engineered for enterprise workstations requiring high-capacity internal drive bays and continuous airflow.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Tower Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Bays",
        "value": "Multiple Internal 3.5-inch & 2.5-inch Drive Bays",
        "isFilterable": false,
        "group": "Storage"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-powertower-c8.png",
        "altText": "FINGERS PowerTower C8 High-Airflow Tower PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BabyTower Ultra-Compact Micro-ATX PC Cabinet",
    "slug": "fingers-babytower",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "BabyTower",
    "sku": "JK-FIG-BABYTOWER",
    "description": "Ultra-compact Micro-ATX mini tower PC chassis ideal for space-constrained office desks and point-of-sale setups.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Ultra-Compact Micro-ATX Mini Tower",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Application",
        "value": "POS Systems & Compact Office Desks",
        "isFilterable": false,
        "group": "Use Case"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-babytower.png",
        "altText": "FINGERS BabyTower Ultra-Compact Micro-ATX PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Dominion-E15 Dual Chamber ATX Glass PC Cabinet",
    "slug": "fingers-dominion-e15",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Dominion-E15",
    "sku": "JK-FIG-DOMINIONE15",
    "description": "Full ATX dual chamber PC cabinet with left side toughened glass panel, dual magnetic dust filters, USB 3.0, and support for up to 6x 12cm or 4x 14cm fans.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Chamber Design",
        "value": "Dual Chamber Layout for Thermal Isolation",
        "isFilterable": false,
        "group": "Architecture"
      },
      {
        "key": "Side Panel",
        "value": "Left Side Toughened Glass Panel",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Fan Support",
        "value": "Supports up to 6 x 12 cm or 4 x 14 cm Fans",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Dust Filters",
        "value": "Dual Magnetic Dust Filters",
        "isFilterable": false,
        "group": "Dust Protection"
      },
      {
        "key": "Front I/O",
        "value": "1 x USB 3.0 + 2 x USB 2.0 + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-dominion-e15.png",
        "altText": "FINGERS Dominion-E15 Dual Chamber ATX Glass PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 3D-Vision-G3 ATX Dual Chamber 3D Glass PC Cabinet",
    "slug": "fingers-3d-vision-g3",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "3D-Vision-G3",
    "sku": "JK-FIG-3DVISIONG3",
    "description": "ATX dual chamber showcase cabinet with left and front mesh plus toughened 3D curved glass panels, 3 multi-colour ARGB fans bundled, and top magnetic dust filter.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Glass",
        "value": "Toughened 3D Curved Glass Panels + Front Mesh",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Fans Included",
        "value": "3 Multi-Colour ARGB Fans Bundled",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Chamber",
        "value": "Dual Chamber Architecture",
        "isFilterable": false,
        "group": "Architecture"
      },
      {
        "key": "Front I/O",
        "value": "1 x USB 3.0 + 1 x USB 2.0 + HD Audio & Mic",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-3d-vision-g3.png",
        "altText": "FINGERS 3D-Vision-G3 ATX Dual Chamber 3D Glass PC Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FullThrottle-G7 Dual Chamber ATX Type-C Glass Cabinet",
    "slug": "fingers-fullthrottle-g7",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "FullThrottle-G7",
    "sku": "JK-FIG-FULLTHROTTLEG7",
    "description": "Full ATX dual chamber chassis with left toughened glass panel, water cooler provision, dual magnetic dust filters, USB 3.0 + Type-C, and support for up to 9x 12cm or 6x 14cm fans.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Fan Capacity",
        "value": "Supports up to 9 x 12 cm or 6 x 14 cm Fans",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Front Ports",
        "value": "1 x USB 3.0 + 1 x USB 2.0 + 1 x Type-C + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      },
      {
        "key": "Water Cooling",
        "value": "Water Coolers Radiator Provision",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Dust Protection",
        "value": "Dual Magnetic Dust Filters",
        "isFilterable": false,
        "group": "Dust Protection"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fullthrottle-g7.png",
        "altText": "FINGERS FullThrottle-G7 Dual Chamber ATX Type-C Glass Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Wings Panoramic Curved Glass Micro-ATX Cabinet",
    "slug": "fingers-wings",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "Wings",
    "sku": "JK-FIG-WINGS",
    "description": "Panoramic curved glass Micro-ATX dual chamber cabinet supporting GPUs up to 385mm, 5 USB ports including Type-C, bottom magnetic dust filter, and support for up to 12 ARGB fans, Midnight Black.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Glass Architecture",
        "value": "Panoramic Curved Left Toughened Glass Panel",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "GPU Clearance",
        "value": "Supports High-End GPUs up to 385 mm Length",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Front I/O",
        "value": "5 USB Ports Including Type-C + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      },
      {
        "key": "Fan Capacity",
        "value": "Supports up to 12 x 12 cm ARGB Fans (Motherboard Sync)",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Form Factor",
        "value": "Micro ATX Dual Chamber Chassis",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Colour",
        "value": "Midnight Black",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-wings.png",
        "altText": "FINGERS Wings Panoramic Curved Glass Micro-ATX Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PowerMatrix-G6 Full ATX Dual Chamber Glass Cabinet",
    "slug": "fingers-powermatrix-g6",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "PowerMatrix-G6",
    "sku": "JK-FIG-POWERMATRIXG6",
    "description": "Full ATX dual chamber chassis with left toughened glass panel, water cooler provision, dual magnetic dust filters, and support for up to 8x 12cm or 6x 14cm fans.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Full ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Cooling Ready",
        "value": "Water Coolers Ready + Supports up to 8 Fans",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Glass Panel",
        "value": "Left Side Toughened Glass Panel",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Front I/O",
        "value": "1 x USB 3.0 + 1 x USB 2.0 + HD Audio",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-powermatrix-g6.png",
        "altText": "FINGERS PowerMatrix-G6 Full ATX Dual Chamber Glass Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BlazeBolt F4 Micro-ATX Dual Chamber Glass Cabinet",
    "slug": "fingers-blazebolt-f4",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-cabinets",
    "categoryName": "PC Cabinets & Cases",
    "modelNumber": "BlazeBolt F4",
    "sku": "JK-FIG-BLAZEBOLTF4",
    "description": "Micro ATX dual chamber gaming chassis with left toughened glass panel, water cooler provision, top and bottom magnetic dust filters, and support for up to 6 fans.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro ATX Form Factor",
        "isFilterable": true,
        "group": "Chassis Form Factor"
      },
      {
        "key": "Chamber Layout",
        "value": "Dual Chamber Thermal Design",
        "isFilterable": false,
        "group": "Architecture"
      },
      {
        "key": "Glass",
        "value": "Left Side Toughened Glass Panel",
        "isFilterable": true,
        "group": "Chassis Construction"
      },
      {
        "key": "Fan Support",
        "value": "Supports up to 6 x 12 cm or 4 x 14 cm Fans",
        "isFilterable": true,
        "group": "Cooling Support"
      },
      {
        "key": "Dust Filters",
        "value": "Magnetic Dust Filters on Top & Bottom Panels",
        "isFilterable": false,
        "group": "Dust Protection"
      },
      {
        "key": "Front Ports",
        "value": "1 x USB 3.0 + 2 x USB 2.0 + Earphone & Mic Jack",
        "isFilterable": true,
        "group": "Front Panel I/O"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-blazebolt-f4.png",
        "altText": "FINGERS BlazeBolt F4 Micro-ATX Dual Chamber Glass Cabinet Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS TechneTium High-Efficiency Gaming SMPS Power Supply",
    "slug": "fingers-technetium",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "TechneTium",
    "sku": "JK-FIG-TECHNETIUM",
    "description": "High-efficiency gaming and heavy workstation power supply unit with active PFC, silent cooling fan, high-grade capacitors, and multi-protection circuitry.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Efficiency",
        "value": "High-Efficiency Active PFC Circuitry",
        "isFilterable": true,
        "group": "Efficiency"
      },
      {
        "key": "Application",
        "value": "Gaming Rigs & Professional Workstations",
        "isFilterable": true,
        "group": "Use Case"
      },
      {
        "key": "Protection",
        "value": "Overvoltage, Undervoltage & Short-Circuit Safeguards",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-technetium.png",
        "altText": "FINGERS TechneTium High-Efficiency Gaming SMPS Power Supply Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Gamma-401 400W Commercial PC SMPS",
    "slug": "fingers-gamma-401",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "Gamma-401",
    "sku": "JK-FIG-GAMMA401",
    "description": "400W reliable commercial desktop power supply with 80mm silent cooling fan, stable 12V rail delivery, and comprehensive electrical safety.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "400 W Continuous Output Power",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Cooling",
        "value": "Silent Temperature-Controlled Fan",
        "isFilterable": false,
        "group": "Cooling"
      },
      {
        "key": "Application",
        "value": "Commercial Desktop PCs & Office Workstations",
        "isFilterable": false,
        "group": "Use Case"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-gamma-401.png",
        "altText": "FINGERS Gamma-401 400W Commercial PC SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BlackBox-500 500W High-Reliability PC SMPS",
    "slug": "fingers-blackbox-500",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "BlackBox-500",
    "sku": "JK-FIG-BLACKBOX500",
    "description": "500W PC power supply equipped with 120mm ultra-silent cooling fan, robust single 12V rail, and high surge endurance.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "500 W Rated Power Output",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Fan Size",
        "value": "120 mm Ultra-Silent Cooling Fan",
        "isFilterable": true,
        "group": "Cooling"
      },
      {
        "key": "Protection",
        "value": "Comprehensive OVP, OPP & SCP Protection",
        "isFilterable": false,
        "group": "Safety"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-blackbox-500.png",
        "altText": "FINGERS BlackBox-500 500W High-Reliability PC SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BoxIron-800 800W Heavy-Duty PC SMPS",
    "slug": "fingers-boxiron-800",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "BoxIron-800",
    "sku": "JK-FIG-BOXIRON800",
    "description": "800W heavy-duty PC power supply delivering massive current for multi-GPU and high-TDP processor setups, bundled with free heavy-duty power cord.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "800 W High-Wattage Output",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Power Cord",
        "value": "Free Heavy-Duty Power Cord Bundled",
        "isFilterable": true,
        "group": "Accessories"
      },
      {
        "key": "Cooling",
        "value": "High-Airflow Silent Fan",
        "isFilterable": false,
        "group": "Cooling"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-boxiron-800.png",
        "altText": "FINGERS BoxIron-800 800W Heavy-Duty PC SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BoxIron-700 700W Heavy-Duty PC SMPS",
    "slug": "fingers-boxiron-700",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "BoxIron-700",
    "sku": "JK-FIG-BOXIRON700",
    "description": "700W heavy-duty power supply unit with high temperature tolerance, stable DC outputs, and free heavy-duty power cord bundled.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "700 W Continuous Power Output",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Power Cord",
        "value": "Free Power Cord Bundled",
        "isFilterable": true,
        "group": "Accessories"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-boxiron-700.png",
        "altText": "FINGERS BoxIron-700 700W Heavy-Duty PC SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BoxIron-601 600W Heavy-Duty PC SMPS",
    "slug": "fingers-boxiron-601",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "BoxIron-601",
    "sku": "JK-FIG-BOXIRON601",
    "description": "600W heavy-duty SMPS designed for sustained commercial operation with silent thermal fan and free power cord included.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wattage",
        "value": "600 W Power Output",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Power Cord",
        "value": "Free Power Cord Bundled",
        "isFilterable": true,
        "group": "Accessories"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-boxiron-601.png",
        "altText": "FINGERS BoxIron-601 600W Heavy-Duty PC SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Baby-Gamma-401 Micro-ATX 400W SMPS",
    "slug": "fingers-baby-gamma-401",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "Baby-Gamma-401",
    "sku": "JK-FIG-BABYGAMMA401",
    "description": "Compact 400W Micro-ATX form factor power supply tailored specifically for small form factor (SFF) and slimline desktop chassis.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Micro-ATX / Small Form Factor (SFF) PSU",
        "isFilterable": true,
        "group": "Dimensions"
      },
      {
        "key": "Wattage",
        "value": "400 W Output Power",
        "isFilterable": true,
        "group": "Power Rating"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-baby-gamma-401.png",
        "altText": "FINGERS Baby-Gamma-401 Micro-ATX 400W SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Gamma-12-407 Long-Cable 400W Bottom-Mount SMPS",
    "slug": "fingers-gamma-12-407",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "pc-power-supplies",
    "categoryName": "SMPS & Power Supplies",
    "modelNumber": "Gamma-12-407",
    "sku": "JK-FIG-GAMMA12407",
    "description": "400W SMPS with extra-long wiring harnesses specifically engineered for bottom-mounted power supply cabinets, with 120mm silent cooling fan.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Cable Length",
        "value": "Extended Extra-Long Wiring Harnesses for Bottom-Mount Cabinets",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Wattage",
        "value": "400 W Stable Power Delivery",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Fan",
        "value": "120 mm Silent Cooling Fan",
        "isFilterable": false,
        "group": "Cooling"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-gamma-12-407.png",
        "altText": "FINGERS Gamma-12-407 Long-Cable 400W Bottom-Mount SMPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS QuickScan W5 Wired 1D Barcode Scanner",
    "slug": "fingers-quickscan-w5",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "QuickScan W5",
    "sku": "JK-FIG-QUICKSCANW5",
    "description": "High-speed wired 1D barcode reader with USB interface, 300 scans/sec scan rate, 3.0m drop resistance, and LED/beeper indicators.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Scan Rate",
        "value": "Ultra-Fast 300 scans/sec",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Drop Resistance",
        "value": "3.0 m Drop-Resistant Rugged Build",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Interface",
        "value": "USB Wired Interface",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Indicators",
        "value": "Audio Beeper & Visual LED Indicator",
        "isFilterable": false,
        "group": "Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quickscan-w5.png",
        "altText": "FINGERS QuickScan W5 Wired 1D Barcode Scanner Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS QuickScan WL2 Wireless 1D Barcode Scanner with Stand",
    "slug": "fingers-quickscan-wl2",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "QuickScan WL2",
    "sku": "JK-FIG-QUICKSCANWL2",
    "description": "2.4 GHz wireless barcode scanner with 100m open-space range, high-efficiency decoding, and bundled free hands-free desktop stand.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wireless Technology",
        "value": "Reliable 2.4 GHz Wireless (Up to 100 m Open Space Range)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Accessories",
        "value": "Free Hands-Free Stand Bundled",
        "isFilterable": true,
        "group": "Accessories"
      },
      {
        "key": "Compatibility",
        "value": "1D Commercial Barcode Standards",
        "isFilterable": false,
        "group": "Decoding"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quickscan-wl2.png",
        "altText": "FINGERS QuickScan WL2 Wireless 1D Barcode Scanner with Stand Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 2D-QuickScan W18 Wired 2D Barcode Scanner with Stand",
    "slug": "fingers-2d-quickscan-w18",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "2D-QuickScan W18",
    "sku": "JK-FIG-2DQUICKSCANW18",
    "description": "Wired 2D barcode scanner with CMOS image sensor, reads all 1D/2D codes including QR codes and DataMatrix, 200 scans/sec, 5M trigger durability, and free stand.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Sensor",
        "value": "Quick Scan CMOS Image Technology (1D and 2D Codes)",
        "isFilterable": true,
        "group": "Decoding"
      },
      {
        "key": "Scan Rate",
        "value": "200 scans/sec",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Trigger Durability",
        "value": "High-Durability Trigger Tested to 5 Million Presses",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Drop Protection",
        "value": "1.5 m Drops Resistant",
        "isFilterable": false,
        "group": "Durability"
      },
      {
        "key": "Accessories",
        "value": "Free Stand Bundled",
        "isFilterable": false,
        "group": "Accessories"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-2d-quickscan-w18.png",
        "altText": "FINGERS 2D-QuickScan W18 Wired 2D Barcode Scanner with Stand Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS 2D-QuickScan WL15 Wireless 2D Barcode Scanner with Stand",
    "slug": "fingers-2d-quickscan-wl15",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "2D-QuickScan WL15",
    "sku": "JK-FIG-2DQUICKSCANWL15",
    "description": "Wireless 2.4 GHz & Bluetooth 2D barcode scanner with 4MB offline inventory memory (512,000 characters), 20,000 scans per charge, and free stand.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Wireless",
        "value": "2.4 GHz Wireless + Bluetooth with USB Receiver",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Battery Capacity",
        "value": "Scans up to 20,000 Barcodes on a Single Charge",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Internal Memory",
        "value": "4 MB In-Built Storage (Stores 512,000 Characters in Offline Mode)",
        "isFilterable": true,
        "group": "Memory"
      },
      {
        "key": "Decoding",
        "value": "Reads 1D & 2D Barcodes (QR Codes, PDF417, DataMatrix)",
        "isFilterable": true,
        "group": "Decoding"
      },
      {
        "key": "Accessories",
        "value": "Free Stand Bundled",
        "isFilterable": false,
        "group": "Accessories"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-2d-quickscan-wl15.png",
        "altText": "FINGERS 2D-QuickScan WL15 Wireless 2D Barcode Scanner with Stand Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS QuickScan Omni W106 Hands-Free 2D Desktop Scanner",
    "slug": "fingers-quickscan-omni-w106",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "QuickScan Omni W106",
    "sku": "JK-FIG-QUICKSCANOMNIW106",
    "description": "Omni-directional hands-free presentation 2D barcode reader with 10-150mm ultra-wide window, eye-safe red LED light, 40° tilt angle, and 200 scans/sec.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Scanning Window",
        "value": "10 - 150 mm Ultra-Wide Window & Far Reading Distance",
        "isFilterable": true,
        "group": "Optics"
      },
      {
        "key": "Angle Adjustment",
        "value": "40-Degree Adjustable Upwards & Downwards Tilt",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Scan Rate",
        "value": "200 scans/sec Omni-Directional Scanning",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Safety",
        "value": "Eye-Safe Red LED Aiming Light",
        "isFilterable": false,
        "group": "Safety"
      },
      {
        "key": "OS Support",
        "value": "Windows / macOS / Android / Linux",
        "isFilterable": true,
        "group": "Compatibility"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quickscan-omni-w106.png",
        "altText": "FINGERS QuickScan Omni W106 Hands-Free 2D Desktop Scanner Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS QuickScan Ring WL207 Wearable Ring Barcode Scanner",
    "slug": "fingers-quickscan-ring-wl207",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "barcode-scanners",
    "categoryName": "Barcode Scanners & Readers",
    "modelNumber": "QuickScan Ring WL207",
    "sku": "JK-FIG-QUICKSCANRINGWL207",
    "description": "Wearable finger ring barcode scanner with tri-mode connectivity (2.4 GHz, Bluetooth, Type-C wired), 1MB offline memory, 24+ hours battery, and 300 scans/sec.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Form Factor",
        "value": "Smallest Wearable Ring Scanner (Finger Ring Mount)",
        "isFilterable": true,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Connectivity",
        "value": "Tri-Mode (2.4 GHz Wireless + Bluetooth + Type-C Wired)",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Scan Rate",
        "value": "300 scans/sec",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Battery Life",
        "value": "Over 24 Hours Continuous Active Usage",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Memory",
        "value": "1 MB In-Built Offline Storage Memory",
        "isFilterable": false,
        "group": "Memory"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-quickscan-ring-wl207.png",
        "altText": "FINGERS QuickScan Ring WL207 Wearable Ring Barcode Scanner Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-Curve-2700 27-Inch FHD Curved LED Monitor",
    "slug": "fingers-satin-curve-2700",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-Curve-2700",
    "sku": "JK-FIG-SATINCURVE2700",
    "description": "27-inch (68.6 cm) curved LED monitor with R1800 curvature, VA anti-glare display, FHD 1920x1080 resolution, low blue light mode, frameless profile, tiltable stand, Kensington lock, and HDMI + VGA + Audio Out, Rich Black / Rich White.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "27-inch (68.6 cm) Diagonal",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Curvature",
        "value": "R1800 Deep Curvature VA Panel",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Resolution",
        "value": "Full HD (1920 x 1080)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Surface",
        "value": "Anti-Glare Screen Display with Low Blue Light Mode",
        "isFilterable": false,
        "group": "Eye Care"
      },
      {
        "key": "Design",
        "value": "Frameless Ultra-Slim Profile with Tiltable Stand",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      },
      {
        "key": "Mounting",
        "value": "Wall Mountable (VESA) + Kensington Lock",
        "isFilterable": false,
        "group": "Installation"
      },
      {
        "key": "Connectivity",
        "value": "HDMI + VGA + Audio Out",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Colours",
        "value": "Rich Black / Rich White",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-curve-2700.png",
        "altText": "FINGERS Satin-Curve-2700 27-Inch FHD Curved LED Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-Curve-2421 24-Inch FHD Curved LED Monitor",
    "slug": "fingers-satin-curve-2421",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-Curve-2421",
    "sku": "JK-FIG-SATINCURVE2421",
    "description": "24-inch (60.9 cm) curved LED monitor with immersive R1800 curvature, Full HD resolution, standard tilt stand, and frameless viewing edge.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "24-inch (60.9 cm) Diagonal",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Curvature",
        "value": "R1800 Immersive Curvature",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Resolution",
        "value": "Full HD (1920 x 1080)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Design",
        "value": "Frameless Edge Design with Standard Stand",
        "isFilterable": false,
        "group": "Design & Aesthetics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-curve-2421.png",
        "altText": "FINGERS Satin-Curve-2421 24-Inch FHD Curved LED Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-2722 27-Inch FHD 120Hz Height-Adjustable Monitor",
    "slug": "fingers-satin-2722",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-2722",
    "sku": "JK-FIG-SATIN2722",
    "description": "27-inch Full HD LED monitor with ultra-fluid 120Hz refresh rate, height-adjustable ergonomic stand, wide viewing angles, and frameless bezel.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "27-inch (68.6 cm)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Refresh Rate",
        "value": "120 Hz Ultra-Fluid Refresh Rate",
        "isFilterable": true,
        "group": "Performance"
      },
      {
        "key": "Stand",
        "value": "Ergonomic Height-Adjustable Stand + Standard Option",
        "isFilterable": true,
        "group": "Ergonomics"
      },
      {
        "key": "Resolution",
        "value": "Full HD (1920 x 1080)",
        "isFilterable": true,
        "group": "Display"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-2722.png",
        "altText": "FINGERS Satin-2722 27-Inch FHD 120Hz Height-Adjustable Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-2400 24-Inch FHD Flat IPS LED Monitor",
    "slug": "fingers-satin-2400",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-2400",
    "sku": "JK-FIG-SATIN2400",
    "description": "24-inch Full HD flat IPS display monitor with vibrant color reproduction, wide angle viewing, and minimalist white and black bezel choices.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "24-inch Diagonal",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Panel Type",
        "value": "Flat IPS Panel with Wide Angle Viewing",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Resolution",
        "value": "Full HD (1920 x 1080)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Colours",
        "value": "Black / Classic White",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-2400.png",
        "altText": "FINGERS Satin-2400 24-Inch FHD Flat IPS LED Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-2150 21.5-Inch FHD IPS LED Monitor",
    "slug": "fingers-satin-2150",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-2150",
    "sku": "JK-FIG-SATIN2150",
    "description": "21.5-inch (54.6 cm) Full HD IPS LED monitor with frameless ultra-slim bezel, crisp text clarity, and low blue light filter, Black / Classic White.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "21.5-inch (54.6 cm)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Panel",
        "value": "IPS Wide-Angle Screen",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Resolution",
        "value": "Full HD (1920 x 1080)",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Colours",
        "value": "Black / Classic White",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-2150.png",
        "altText": "FINGERS Satin-2150 21.5-Inch FHD IPS LED Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Satin-1957 19.5-Inch Commercial LED Monitor",
    "slug": "fingers-satin-1957",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "monitors",
    "categoryName": "Monitors & Displays",
    "modelNumber": "Satin-1957",
    "sku": "JK-FIG-SATIN1957",
    "description": "19.5-inch commercial desktop LED monitor with wide angle viewing, standard tiltable stand, energy-saving panel, and VGA/HDMI inputs.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Screen Size",
        "value": "19.5-inch Diagonal",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Panel",
        "value": "Wide Angle Viewing Commercial Panel",
        "isFilterable": true,
        "group": "Display"
      },
      {
        "key": "Stand",
        "value": "Standard Tiltable Desk Stand",
        "isFilterable": false,
        "group": "Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-satin-1957.png",
        "altText": "FINGERS Satin-1957 19.5-Inch Commercial LED Monitor Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FR-2000-4S 2000VA / 1200W Fast-Recharge UPS",
    "slug": "fingers-fr-2000-4s",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "ups-power",
    "categoryName": "UPS & Power Protection",
    "modelNumber": "FR-2000-4S",
    "sku": "JK-FIG-FR20004S",
    "description": "2000 VA / 1200 W capacity fast-recharge line-interactive UPS, generator compatible, simulated sine wave, dual battery design, cold start, and 4 output sockets.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "2000 VA / 1200 W Capacity",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Recharge",
        "value": "Faster Recharge Circuitry",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Output Waveform",
        "value": "Simulated Sine Wave Output",
        "isFilterable": true,
        "group": "Electrical"
      },
      {
        "key": "Battery Configuration",
        "value": "Dual Battery Architecture",
        "isFilterable": true,
        "group": "Battery & Power"
      },
      {
        "key": "Generator Compatible",
        "value": "Generator Compatible Frequency Tracking",
        "isFilterable": false,
        "group": "Features"
      },
      {
        "key": "Sockets",
        "value": "4 Power Output Sockets",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Auto-Restart",
        "value": "Auto Restart upon AC Mains Recovery",
        "isFilterable": false,
        "group": "Features"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fr-2000-4s.png",
        "altText": "FINGERS FR-2000-4S 2000VA / 1200W Fast-Recharge UPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FR-630 600VA / 360W Fast-Recharge Compact UPS",
    "slug": "fingers-fr-630",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "ups-power",
    "categoryName": "UPS & Power Protection",
    "modelNumber": "FR-630",
    "sku": "JK-FIG-FR630",
    "description": "600 VA / 360 W compact fast-recharge line-interactive UPS providing reliable battery backup for home and office PCs.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "600 VA / 360 W Capacity",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Technology",
        "value": "Fast-Recharge Line-Interactive UPS",
        "isFilterable": true,
        "group": "Architecture"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fr-630.png",
        "altText": "FINGERS FR-630 600VA / 360W Fast-Recharge Compact UPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FR-630N3 600VA / 360W Fast-Recharge UPS 3 Sockets",
    "slug": "fingers-fr-630n3",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "ups-power",
    "categoryName": "UPS & Power Protection",
    "modelNumber": "FR-630N3",
    "sku": "JK-FIG-FR630N3",
    "description": "600 VA / 360 W fast-recharge UPS equipped with 3 Indian standard output sockets, generator compatibility, and cold start.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "600 VA / 360 W",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Sockets",
        "value": "3 Output Power Sockets",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Recharge",
        "value": "Faster Recharge Technology",
        "isFilterable": false,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fr-630n3.png",
        "altText": "FINGERS FR-630N3 600VA / 360W Fast-Recharge UPS 3 Sockets Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FR-1097-4S 1000VA / 600W Fast-Recharge UPS 4 Sockets",
    "slug": "fingers-fr-1097-4s",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "ups-power",
    "categoryName": "UPS & Power Protection",
    "modelNumber": "FR-1097-4S",
    "sku": "JK-FIG-FR10974S",
    "description": "1000 VA / 600 W fast-recharge UPS with 4 output sockets, robust AVR voltage regulation, and overload protection.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "1000 VA / 600 W Heavy Load Capacity",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Sockets",
        "value": "4 Output Power Sockets",
        "isFilterable": true,
        "group": "Connectivity"
      },
      {
        "key": "Regulation",
        "value": "Automatic Voltage Regulation (AVR)",
        "isFilterable": true,
        "group": "Electrical"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fr-1097-4s.png",
        "altText": "FINGERS FR-1097-4S 1000VA / 600W Fast-Recharge UPS 4 Sockets Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS FR-1250LCD 1200VA / 720W Fast-Recharge LCD UPS",
    "slug": "fingers-fr-1250lcd",
    "brand": "FINGERS",
    "parentCategorySlug": "computer-peripherals",
    "categorySlug": "ups-power",
    "categoryName": "UPS & Power Protection",
    "modelNumber": "FR-1250LCD",
    "sku": "JK-FIG-FR1250LCD",
    "description": "1200 VA / 720 W line-interactive UPS featuring a front LCD status display showing load level, battery status, and input/output voltages.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "1200 VA / 720 W",
        "isFilterable": true,
        "group": "Power Rating"
      },
      {
        "key": "Display",
        "value": "Front Digital LCD Screen for Real-Time Monitoring",
        "isFilterable": true,
        "group": "Features"
      },
      {
        "key": "Recharge",
        "value": "Fast Recharge Circuit Architecture",
        "isFilterable": false,
        "group": "Battery & Power"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-fr-1250lcd.png",
        "altText": "FINGERS FR-1250LCD 1200VA / 720W Fast-Recharge LCD UPS Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Stylora-B4 17-Inch Splash-Proof Laptop Backpack",
    "slug": "fingers-stylora-b4",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "Stylora-B4",
    "sku": "JK-FIG-STYLORAB4",
    "description": "Splash-proof, scratch-resistant, and tear-resistant commercial laptop backpack with dedicated sleeves fitting up to 17-inch (43.1 cm) laptops and tablets, plus roomy utility compartments.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Capacity",
        "value": "Fits Laptops & Tablets up to 43.1 cm (17-inch)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Fabric Protection",
        "value": "Splash-Proof / Scratch-Resistant / Tear-Resistant",
        "isFilterable": true,
        "group": "Durability"
      },
      {
        "key": "Compartments",
        "value": "Dedicated Padded Sleeve + Roomy Accessory Pockets",
        "isFilterable": false,
        "group": "Organization"
      },
      {
        "key": "Ergonomics",
        "value": "Smooth Adjustable Shoulder Webbing",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-stylora-b4.png",
        "altText": "FINGERS Stylora-B4 17-Inch Splash-Proof Laptop Backpack Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS LuxuryLink-B1 15-Inch Luxury Suede Laptop Sleeve",
    "slug": "fingers-luxurylink-b1",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "LuxuryLink-B1",
    "sku": "JK-FIG-LUXURYLINKB1",
    "description": "Luxurious laptop sleeve crafted with super-soft suede and leatherette highlights, thick foam shock protection, fitting up to 15-inch (38.1 cm) laptops and tablets.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Material",
        "value": "Super-Soft Suede with Leatherette Highlights",
        "isFilterable": true,
        "group": "Material & Finish"
      },
      {
        "key": "Compatibility",
        "value": "Fits Laptops and Tablets up to 38.1 cm (15-inch)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Protection",
        "value": "Thick Foam Superior Shock & Bump Protection",
        "isFilterable": true,
        "group": "Protection"
      },
      {
        "key": "Properties",
        "value": "Splash-Proof / Scratch-Resistant / Tear-Resistant",
        "isFilterable": false,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-luxurylink-b1.png",
        "altText": "FINGERS LuxuryLink-B1 15-Inch Luxury Suede Laptop Sleeve Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS IconicCraft-S4 17-Inch Travel Laptop Briefcase",
    "slug": "fingers-iconiccraft-s4",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "IconicCraft-S4",
    "sku": "JK-FIG-ICONICCRAFTS4",
    "description": "Iconic business laptop briefcase with luggage trolley strap, thick foam suede shock lining, fitting up to 17-inch laptops, splash-proof and scratch-resistant.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Travel Feature",
        "value": "Luggage Strap Slides Conveniently onto Suitcase Handle",
        "isFilterable": true,
        "group": "Travel Features"
      },
      {
        "key": "Compatibility",
        "value": "Fits Laptops & Tablets up to 43.1 cm (17-inch)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Protection",
        "value": "Padded Laptop Sleeve with Suede Lining & Thick Foam",
        "isFilterable": true,
        "group": "Protection"
      },
      {
        "key": "Fabric",
        "value": "Splash-Proof, Scratch-Resistant, Tear-Resistant",
        "isFilterable": false,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-iconiccraft-s4.png",
        "altText": "FINGERS IconicCraft-S4 17-Inch Travel Laptop Briefcase Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS PrestigePro-S3 17-Inch Professional Laptop Bag",
    "slug": "fingers-prestigepro-s3",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "PrestigePro-S3",
    "sku": "JK-FIG-PRESTIGEPROS3",
    "description": "Executive laptop bag featuring luxury metal zippers, padded protective sleeve fitting up to 17-inch laptops, and splash-proof tear-resistant weave.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Hardware",
        "value": "Luxury Metal Zippers & Hardware",
        "isFilterable": true,
        "group": "Material & Finish"
      },
      {
        "key": "Compatibility",
        "value": "Fits Laptops & Tablets up to 43.1 cm (17-inch)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Protection",
        "value": "Padded Shock Protection Foam",
        "isFilterable": false,
        "group": "Protection"
      },
      {
        "key": "Fabric",
        "value": "Splash-Proof, Scratch-Resistant, Tear-Resistant",
        "isFilterable": false,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-prestigepro-s3.png",
        "altText": "FINGERS PrestigePro-S3 17-Inch Professional Laptop Bag Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS Eleganto-OG2 15-Inch Organizer Laptop Bag",
    "slug": "fingers-eleganto-og2",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "Eleganto-OG2",
    "sku": "JK-FIG-ELEGANTOOG2",
    "description": "Multi-pocket organizer laptop shoulder bag with water-resistant fabric, thick foam protective sleeve, fitting up to 15-inch (38.1 cm) laptops and tablets.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Organization",
        "value": "Zippered Main Compartment with Multiple Utility Pockets",
        "isFilterable": true,
        "group": "Organization"
      },
      {
        "key": "Compatibility",
        "value": "Fits Laptops up to 38.1 cm (15-inch)",
        "isFilterable": true,
        "group": "Compatibility"
      },
      {
        "key": "Protection",
        "value": "Water-Resistant, Scratch-Resistant, Tear-Resistant",
        "isFilterable": true,
        "group": "Durability"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-eleganto-og2.png",
        "altText": "FINGERS Eleganto-OG2 15-Inch Organizer Laptop Bag Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  },
  {
    "name": "FINGERS BeHold 360 Rolling Laptop & Travel Trolley Bag",
    "slug": "fingers-behold-360",
    "brand": "FINGERS",
    "parentCategorySlug": "laptop-accessories",
    "categorySlug": "laptop-bags-backpacks",
    "categoryName": "Laptop Bags & Backpacks",
    "modelNumber": "BeHold 360",
    "sku": "JK-FIG-BEHOLD360",
    "description": "Premium business rolling laptop trolley with 360° silent spinner wheels, integrated TSA lock, sleek telescopic handle, smart compartments, and Dual-Tone Brown / Classic Black finish.",
    "mrpINR": null,
    "sourcePriceINR": null,
    "discountPercentage": null,
    "warrantyInfo": "1 Year Manufacturer Warranty",
    "specifications": [
      {
        "key": "Mobility",
        "value": "Silent & Smooth 360-Degree Spinner Wheels",
        "isFilterable": true,
        "group": "Mobility"
      },
      {
        "key": "Security",
        "value": "Integrated TSA Lock for Secure Commercial Travel",
        "isFilterable": true,
        "group": "Security"
      },
      {
        "key": "Handle",
        "value": "Sleek Multi-Stage Telescopic Handle",
        "isFilterable": false,
        "group": "Design & Ergonomics"
      },
      {
        "key": "Fabric",
        "value": "Scratch-Resistant & Tear-Resistant Premium Fabric",
        "isFilterable": false,
        "group": "Durability"
      },
      {
        "key": "Colours",
        "value": "Dual Tone Brown & Classic Black",
        "isFilterable": false,
        "group": "Variants"
      }
    ],
    "images": [
      {
        "imageUrl": "https://www.fingers.co.in/secure/api/uploads/products/fingers-behold-360.png",
        "altText": "FINGERS BeHold 360 Rolling Laptop & Travel Trolley Bag Product View",
        "isPrimary": true
      }
    ],
    "sourceUrl": "FINGERS E-Catalogue Oct 2026 (PDF)",
    "sourceRetrievalDate": "2026-10-30",
    "sourceAvailability": "Catalogue Listing",
    "publicationStatus": "DRAFT",
    "isDemo": false,
    "isPriceConfirmed": false,
    "isWarrantyConfirmed": false
  }
];
