// Content + settings for every tool landing page.
// Each page gets its own route, meta tags, sitemap entry and prerendered HTML automatically.
// To add a tool page: add an entry here — nothing else needed.

import type { CompressionToolProps } from "@/components/CompressionTool";
import type { ConverterToolProps } from "@/components/ConverterTool";
import { converterPages } from "./converterPages";

export interface ToolSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

/** Results from running the tool on real files, shown as a table on the page. */
export interface ToolTest {
  heading: string;
  intro: string;
  columns: string[];
  rows: string[][];
  /** Short conclusions drawn from the results */
  notes?: string[];
}

export interface ToolPageConfig {
  path: string;
  /** Short label for grids and links */
  name: string;
  /** One-line summary for the tools grid */
  blurb: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** Compression tool settings (compress pages) */
  tool?: CompressionToolProps;
  /** Converter settings (convert / PDF pages) — use this OR `tool` */
  converter?: ConverterToolProps;
  sections: ToolSection[];
  /** Real test results — rendered after the first section */
  test?: ToolTest;
  faqs: { q: string; a: string }[];
  related: string[];
  /** Optional source link shown under the page content */
  source?: { label: string; url: string };
}

const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.webp,.bmp,.gif";
const IMAGE_HINT = "JPG, PNG or WebP — saved as JPG";
const PDF_ACCEPT = ".pdf";

export const toolPages: ToolPageConfig[] = [
  // ─── Exact image sizes ──────────────────────────────────────────────────────
  {
    path: "/compress-image-to-20kb",
    name: "Image to 20KB",
    blurb: "For strict form uploads and signatures",
    h1: "Compress Image to 20KB",
    title: "Compress Image to 20KB Online — Free, No Upload | Compressnfly",
    description:
      "Shrink a photo or signature to 20KB or less in seconds. Free, works on phone and desktop, and your image never leaves your device.",
    intro:
      "Drop in a photo, scan or signature and get a JPG that's 20KB or smaller. The tool finds the best balance of sharpness and size automatically — no sliders to fiddle with.",
    tool: { mode: "target", defaultTargetKB: 20, targetOptionsKB: [10, 15, 20, 30], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "When you need an image under 20KB",
        paragraphs: [
          "20KB is one of the tightest limits you'll run into. It mostly shows up on online application forms that ask for a passport-style photo or a scanned signature, where the portal wants tiny files so thousands of applications don't fill up its storage.",
          "A photo straight from a phone camera is usually 2–8MB — a hundred times too big — so it has to be resized as well as compressed. That's exactly what this tool does.",
        ],
      },
      {
        heading: "What a 20KB image looks like",
        paragraphs: [
          "At 20KB a full phone photo ends up about 280×370 pixels (see our test below). That's plenty for a face photo or a signature on an application form, and still looks clean at the size forms display it. Cropping first puts those pixels where they matter.",
        ],
      },
      {
        heading: "Tips for the best result at 20KB",
        list: [
          "Crop first. A tightly cropped face or signature keeps more detail than a wide shot squeezed down.",
          "Use a plain, light background — it compresses far better than a patterned one.",
          "For signatures, sign in dark ink on white paper and photograph it in good light.",
          "If the form also gives pixel dimensions (for example 200×230), resize to those first, then compress here.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three phone photos to 20 KB",
      "intro": "We ran three real 12-megapixel phone photos through this page in Chrome on an ordinary laptop. Here's exactly what came out:",
      "columns": [
        "Photo",
        "Original",
        "Result",
        "Dimensions",
        "Time"
      ],
      "rows": [
        [
          "Pixel 2 photo",
          "4.16 MB",
          "19.9 KB",
          "277×370",
          "0.3 s"
        ],
        [
          "iPhone 6 Plus photo",
          "3.51 MB",
          "19.8 KB",
          "277×370",
          "0.3 s"
        ],
        [
          "Galaxy S7 Edge photo",
          "3.97 MB",
          "19.2 KB",
          "370×277",
          "0.3 s"
        ]
      ],
      "notes": [
        "All three phones landed on the same 277×370 pixels, so for a full photo that's what 20 KB buys. At the size a form shows it, the picture was perfectly clear. For comparison, 15 KB gave 240×320 and 10 KB gave 196×261.",
        "Crop to your head and shoulders first and those same pixels go to your face instead of the background.",
        "One result was 20,418 bytes: under 20 KB the way Windows counts (1 KB = 1,024 bytes), but over 20,000 bytes. If a form rejects it, set a custom target of 18 KB."
      ]
    },
    faqs: [
      {
        q: "Will my photo be blurry at 20KB?",
        a: "Not at the sizes forms display it. The tool lowers the resolution before lowering quality, so the result stays clean instead of blocky. It only looks soft if you zoom far in.",
      },
      {
        q: "Why is my result 18KB instead of exactly 20KB?",
        a: "The tool guarantees the file is at or under your limit and gets as close as it can. Landing slightly under is normal and keeps you safe if a website counts kilobytes slightly differently.",
      },
      {
        q: "Can I compress a PNG signature to 20KB?",
        a: "Yes. It's converted to JPG with a white background, which is what most forms expect and is much smaller than PNG for scanned signatures.",
      },
      {
        q: "Is my photo uploaded anywhere?",
        a: "No. Everything happens inside your browser, so your photo never leaves your phone or computer.",
      },
    ],
    related: ["/compress-image-to-50kb", "/compress-photo-for-job-application", "/reduce-image-size-in-kb"],
  },
  {
    path: "/compress-image-to-50kb",
    name: "Image to 50KB",
    blurb: "Photos for online applications",
    h1: "Compress Image to 50KB",
    title: "Compress Image to 50KB — JPG, PNG & Photos, Free | Compressnfly",
    description:
      "Reduce any photo to under 50KB without making it blurry. Free, private — compression runs in your browser and nothing is uploaded.",
    intro:
      "Need a photo under 50KB? Add your image, keep 50KB selected, and download a sharp JPG that fits the limit. Works with phone photos, scans and screenshots.",
    tool: { mode: "target", defaultTargetKB: 50, targetOptionsKB: [30, 40, 50, 60], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "Where the 50KB limit comes from",
        paragraphs: [
          "50KB is a common cap for profile photos and applicant photos on government, university and job portals. It's small enough for the site to store cheaply, but big enough to keep a face clearly recognisable.",
          "If your form says something like \"maximum 50KB\" or \"between 20KB and 50KB\", pick 50KB here. If there's a minimum too, check the result size shown after compressing.",
        ],
      },
      {
        heading: "How much detail fits in 50KB",
        paragraphs: [
          "A full phone photo at 50KB comes out about 440×580 pixels. That's more than enough for a passport-style photo, an ID card scan viewed on screen, or a profile picture, and more still if you crop first.",
          "The tool works this out for you: it shrinks the dimensions just enough that the image can be saved at high quality and still stay under 50KB, instead of keeping the full camera size and crushing the quality.",
        ],
      },
      {
        heading: "Common reasons a 50KB upload still fails",
        list: [
          "The site wants JPG and you uploaded PNG — this tool always outputs JPG.",
          "The site also has pixel-size rules (for example, \"minimum 300 pixels wide\"). Check the dimensions shown with your result.",
          "The file name has spaces or symbols. Rename it to something simple like photo_50kb.jpg.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three phone photos to 50 KB",
      "intro": "We ran three real 12-megapixel phone photos through this page in Chrome on an ordinary laptop. Here's exactly what came out:",
      "columns": [
        "Photo",
        "Original",
        "Result",
        "Dimensions",
        "Time"
      ],
      "rows": [
        [
          "Pixel 2 photo",
          "4.16 MB",
          "48.7 KB",
          "438×584",
          "0.4 s"
        ],
        [
          "iPhone 6 Plus photo",
          "3.51 MB",
          "49.6 KB",
          "438×584",
          "0.4 s"
        ],
        [
          "Galaxy S7 Edge photo",
          "3.97 MB",
          "47.8 KB",
          "584×438",
          "0.3 s"
        ]
      ],
      "notes": [
        "50 KB gives a full photo about 440×580 pixels, comfortably sharp for any form or profile picture. Nearby sizes: 40 KB → 392×523, 60 KB → 480×640.",
        "The iPhone result was 50,798 bytes: under 50 KB in 1,024-byte kilobytes, over 50,000 bytes. If a portal is strict, use 45 KB."
      ]
    },
    faqs: [
      {
        q: "How do I reduce a photo from 3MB to 50KB?",
        a: "Drop the 3MB photo into the tool above with 50KB selected and click Compress. It resizes and recompresses in one step — usually in under a second.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes. It works in Chrome, Safari and other mobile browsers. Pick the photo from your gallery and the compressed version downloads to your phone.",
      },
      {
        q: "Can I compress several photos to 50KB at once?",
        a: "Yes — select multiple images. Each one is compressed to 50KB or less, and you can download them all as a ZIP.",
      },
      {
        q: "Will the photo keep my phone's location data?",
        a: "No. Re-encoding removes the hidden metadata (EXIF), including GPS location, which also saves a few kilobytes.",
      },
    ],
    related: ["/compress-image-to-20kb", "/compress-image-to-100kb", "/compress-photo-for-job-application"],
  },
  {
    path: "/compress-image-to-100kb",
    name: "Image to 100KB",
    blurb: "The most common upload limit",
    h1: "Compress Image to 100KB",
    title: "Compress Image to 100KB Online Free — No Quality Loss | Compressnfly",
    description:
      "Get any JPG, PNG or phone photo under 100KB in seconds. Keeps the image sharp, works on mobile, and never uploads your file.",
    intro:
      "100KB is the limit you'll see most often. Add your images below and each one comes back as a JPG of 100KB or less — sharp enough for forms, emails and websites.",
    tool: { mode: "target", defaultTargetKB: 100, targetOptionsKB: [80, 100, 150], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "Why so many sites ask for 100KB",
        paragraphs: [
          "100KB keeps pages and databases light while still allowing a clear, detailed photo. You'll find it on job portals, admission forms, visa and ID applications, forum avatars and many content management systems.",
          "It's also a good target for images on your own website: a page with ten 100KB images loads about 1MB of pictures, which is fast even on a mobile connection.",
        ],
      },
      {
        heading: "What resolution you get at 100KB",
        paragraphs: [
          "A full phone photo compressed to 100KB ends up about 620×830 pixels, which looks like a normal photo on a laptop screen. If an image is simple enough to fit with room to spare, the tool uses the extra space to keep more pixels.",
          "After compressing, the result card shows the exact file size and pixel dimensions, so you can confirm it meets the form's rules before you upload.",
        ],
      },
      {
        heading: "Scans and documents at 100KB",
        paragraphs: [
          "For a scanned certificate or ID card, crop away the table or background around the paper first. Less empty area means more of the 100KB budget goes to the text, so it stays readable.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three phone photos to 100 KB",
      "intro": "We ran three real 12-megapixel phone photos through this page in Chrome on an ordinary laptop. Here's exactly what came out:",
      "columns": [
        "Photo",
        "Original",
        "Result",
        "Dimensions",
        "Time"
      ],
      "rows": [
        [
          "Pixel 2 photo",
          "4.16 MB",
          "96.8 KB",
          "620×826",
          "0.6 s"
        ],
        [
          "iPhone 6 Plus photo",
          "3.51 MB",
          "99.0 KB",
          "620×826",
          "0.5 s"
        ],
        [
          "Galaxy S7 Edge photo",
          "3.97 MB",
          "95.5 KB",
          "826×620",
          "0.3 s"
        ]
      ],
      "notes": [
        "100 KB keeps about 620×830 pixels, which looks like an ordinary photo on a laptop screen. 80 KB gave 554×739 and 150 KB gave 759×1012.",
        "Each one took between 0.3 and 0.6 seconds, even from 4 MB originals."
      ]
    },
    faqs: [
      {
        q: "Can I compress an image to 100KB without losing quality?",
        a: "Some quality is always traded for size, but at 100KB the difference is rarely visible on screen. The tool keeps JPG quality high and reduces dimensions only as much as needed.",
      },
      {
        q: "My image is already under 100KB — what happens?",
        a: "It's still re-saved as a clean JPG at the highest quality that stays under 100KB, which usually keeps it close to the original.",
      },
      {
        q: "Does 100KB mean 100,000 bytes or 102,400?",
        a: "This tool uses 1KB = 1,024 bytes, the way Windows and most upload forms count. If a site counts 1KB as 1,000 bytes, choose a custom target of 95KB to be safe.",
      },
      {
        q: "Is it free?",
        a: "Yes — no sign-up, no watermark and no daily limit.",
      },
    ],
    related: ["/compress-image-to-50kb", "/compress-image-to-200kb", "/compress-jpg"],
  },
  {
    path: "/compress-image-to-200kb",
    name: "Image to 200KB",
    blurb: "Websites, blogs and email",
    h1: "Compress Image to 200KB",
    title: "Compress Image to 200KB — Fast, Free & Private | Compressnfly",
    description:
      "Reduce photos to 200KB or less while keeping them crisp — ideal for websites, blogs, marketplaces and email. Free and processed in your browser.",
    intro:
      "200KB gives you room for a detailed, full-screen-quality photo while still loading quickly. Drop your images in and get JPGs at 200KB or under.",
    tool: { mode: "target", defaultTargetKB: 200, targetOptionsKB: [150, 200, 250, 300], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "Good uses for 200KB images",
        list: [
          "Blog and website images that need to look sharp on large screens without slowing the page down.",
          "Product photos for online shops and marketplaces with an upload cap.",
          "Photos you want to email or message without hitting attachment limits.",
          "Portfolio and gallery images where detail matters.",
        ],
      },
      {
        heading: "How sharp is a 200KB photo?",
        paragraphs: [
          "At 200KB, a full phone photo keeps about 880×1,170 pixels, enough to fill a phone screen sharply and look good on a laptop at normal size. For comparison, the original from a modern phone is often 4,000 pixels on its long side and several megabytes.",
        ],
      },
      {
        heading: "Faster pages with smaller images",
        paragraphs: [
          "Images are usually the heaviest part of a web page. Cutting a 3MB photo to 200KB makes it load about fifteen times faster, which matters for visitors on mobile data and for how search engines judge your page speed.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three phone photos to 200 KB",
      "intro": "We ran three real 12-megapixel phone photos through this page in Chrome on an ordinary laptop. Here's exactly what came out:",
      "columns": [
        "Photo",
        "Original",
        "Result",
        "Dimensions",
        "Time"
      ],
      "rows": [
        [
          "Pixel 2 photo",
          "4.16 MB",
          "196 KB",
          "876×1168",
          "0.5 s"
        ],
        [
          "iPhone 6 Plus photo",
          "3.51 MB",
          "198 KB",
          "876×1168",
          "0.6 s"
        ],
        [
          "Galaxy S7 Edge photo",
          "3.97 MB",
          "183 KB",
          "1168×876",
          "0.4 s"
        ]
      ],
      "notes": [
        "200 KB keeps about 880×1170 pixels. That fills a phone screen sharply and looks good on a laptop at normal size, at roughly a twentieth of the original file. 250 KB gave 980×1306 and 300 KB gave 1073×1431."
      ]
    },
    faqs: [
      {
        q: "Should I use 100KB or 200KB for my website?",
        a: "Use 200KB for large hero or gallery images that fill the screen, and 100KB or less for images shown smaller inside an article.",
      },
      {
        q: "Can I keep the PNG format?",
        a: "This page always saves JPG, which is far smaller for photos. If you need to keep transparency, use the PNG compressor instead.",
      },
      {
        q: "How many images can I do at once?",
        a: "As many as you like. Select them together and download everything as a single ZIP.",
      },
    ],
    related: ["/compress-image-to-100kb", "/compress-jpg", "/compress-png"],
  },
  {
    path: "/reduce-image-size-in-kb",
    name: "Reduce image size in KB",
    blurb: "Pick any size you need",
    h1: "Reduce Image Size in KB",
    title: "Reduce Image Size in KB — Choose Any Size, Free | Compressnfly",
    description:
      "Type the size you need in KB and get an image that fits. Works for any limit — 10KB, 30KB, 75KB, 300KB. Free and fully private.",
    intro:
      "Every website seems to have a different limit. Pick a preset or type any number of kilobytes, and each image you add will be made that size or smaller.",
    tool: { mode: "target", defaultTargetKB: 100, targetOptionsKB: [10, 30, 50, 100, 200, 500], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "How to reduce an image to a specific size",
        list: [
          "Add your image (or several) using the box above.",
          "Choose a preset size, or type your own number in the Custom box — for example 75 for 75KB.",
          "Click Compress. Each file is resized and recompressed until it fits.",
          "Check the result: it shows the final size, the pixel dimensions and a tick when it's under your limit.",
        ],
      },
      {
        heading: "KB, MB and what websites mean",
        paragraphs: [
          "1MB is 1,024KB. So a \"2MB limit\" is about 2,048KB and a \"0.5MB limit\" is about 512KB — type those numbers in if a form gives the limit in MB.",
          "Some websites count 1KB as 1,000 bytes instead of 1,024. If an upload is rejected even though the size looks right, set a target a few KB lower.",
        ],
      },
      {
        heading: "What happens behind the scenes",
        paragraphs: [
          "The tool first estimates how many pixels your size budget can hold at good quality, resizes to that, then fine-tunes the JPG quality to land just under your limit. If there's still room to spare, it scales back up to use it. The result is the sharpest image that fits — not just the first one that does.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: one photo, seven sizes",
      "intro": "We took one 4.16 MB, 12-megapixel photo from a Pixel 2 and reduced it to different sizes on this page:",
      "columns": [
        "Target",
        "Result",
        "Dimensions",
        "Saved"
      ],
      "rows": [
        [
          "10 KB",
          "9.9 KB",
          "196×261",
          "99.8%"
        ],
        [
          "20 KB",
          "19.9 KB",
          "277×370",
          "99.5%"
        ],
        [
          "50 KB",
          "48.7 KB",
          "438×584",
          "98.9%"
        ],
        [
          "100 KB",
          "96.8 KB",
          "620×826",
          "97.7%"
        ],
        [
          "200 KB",
          "196 KB",
          "876×1168",
          "95.4%"
        ],
        [
          "500 KB",
          "498 KB",
          "1386×1848",
          "88.3%"
        ],
        [
          "800 KB",
          "776 KB",
          "1753×2337",
          "81.8%"
        ]
      ],
      "notes": [
        "The pattern is simple: to halve the file size you lose roughly 30% of the width and height. Photos from an iPhone 6 Plus and a Galaxy S7 Edge landed on the same dimensions at every size, so this table works as a guide for most phone photos.",
        "Each one took between a quarter of a second and two seconds."
      ]
    },
    faqs: [
      {
        q: "What's the smallest size I can choose?",
        a: "Any size works, but below about 10KB photos become very small in pixels. If the tool can't reach your target it tells you and gives you the smallest version possible.",
      },
      {
        q: "Can I reduce image size in KB on my phone?",
        a: "Yes. The tool runs in mobile browsers, and the compressed image downloads straight to your phone.",
      },
      {
        q: "Does it change the image's width and height?",
        a: "Usually yes, because reducing dimensions is the best way to save space while keeping the image sharp. The final dimensions are shown with each result.",
      },
    ],
    related: ["/compress-image-to-20kb", "/compress-image-to-100kb", "/compress-image-to-200kb"],
  },

  // ─── Formats ─────────────────────────────────────────────────────────────────
  {
    path: "/compress-jpg",
    name: "Compress JPG",
    blurb: "Shrink JPEG photos",
    h1: "Compress JPG Images",
    title: "Compress JPG Online — Reduce JPEG Size Free | Compressnfly",
    description:
      "Make JPG and JPEG photos smaller in one click. Choose a quality level or an exact size — batch support, no upload, no watermark.",
    intro:
      "Shrink JPG photos for email, websites or storage. Choose a quality level, or switch to \"exact size\" if you have a strict limit to hit.",
    tool: { accept: ".jpg,.jpeg", dropHint: "JPG and JPEG photos", defaultLevel: "web-optimized" },
    sections: [
      {
        heading: "Why JPG files get so big",
        paragraphs: [
          "Modern phones save photos at 12–50 megapixels with high quality settings, so a single JPG is often 3–10MB. That detail is useful for printing large, but far more than you need for sharing or the web.",
          "Compressing a JPG lowers the stored detail you can't see on a screen and, if you choose, reduces the pixel dimensions. The result is typically 70–90% smaller and looks the same at normal viewing size.",
        ],
      },
      {
        heading: "Which setting should I pick?",
        list: [
          "High Quality — for photos you might print or edit later. Smallest change, smallest saving.",
          "Web Optimized — the best default for sharing and websites. Keeps full-HD sharpness.",
          "Balanced — for email and messaging when size matters more.",
          "Small Size — maximum saving, fine for thumbnails and previews.",
          "To an exact size — when a form or website gives you a strict KB limit.",
        ],
      },
      {
        heading: "Compressing many JPGs at once",
        paragraphs: [
          "Select a whole batch of photos at once. Each is compressed with the same setting and you can download them together as a ZIP — handy after a trip or an event.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three phone photos, four levels",
      "intro": "Here's what each level did to three real 12-megapixel phone photos:",
      "columns": [
        "Level",
        "Pixel 2 (4.16 MB)",
        "iPhone 6 Plus (3.51 MB)",
        "Galaxy S7 Edge (3.97 MB)"
      ],
      "rows": [
        [
          "High Quality",
          "1.11 MB · 2599×3465",
          "1.06 MB · 2208×2945",
          "986 KB · 3648×2736"
        ],
        [
          "Web Optimized",
          "305 KB · 1368×1824",
          "353 KB · 1299×1732",
          "214 KB · 1920×1440"
        ],
        [
          "Balanced",
          "117 KB · 912×1216",
          "153 KB · 866×1155",
          "78 KB · 1280×960"
        ],
        [
          "Small Size",
          "45 KB · 600×800",
          "50 KB · 541×722",
          "25 KB · 800×600"
        ]
      ],
      "notes": [
        "Even High Quality cut each photo by 70–76% with no difference we could see on screen. Web Optimized is the best default for sharing: still sharp at full screen width, about 13× lighter.",
        "Each photo took between half a second and 1.6 seconds."
      ]
    },
    faqs: [
      {
        q: "Is JPG compression lossy?",
        a: "Yes, JPG always discards some detail when saved. At the High Quality and Web Optimized levels, the difference isn't visible at normal size.",
      },
      {
        q: "Does compressing a JPG again make it worse each time?",
        a: "Each re-save loses a little more detail, so compress from the original photo when you can rather than from an already-compressed copy.",
      },
      {
        q: "Will the EXIF data be removed?",
        a: "Yes. Camera details and GPS location are stripped during compression, which also makes the file smaller and safer to share.",
      },
    ],
    related: ["/compress-png", "/compress-image-to-100kb", "/compress-image-to-200kb"],
  },
  {
    path: "/compress-png",
    name: "Compress PNG",
    blurb: "Screenshots and graphics",
    h1: "Compress PNG Images",
    title: "Compress PNG Online — Smaller PNGs, Free | Compressnfly",
    description:
      "Reduce PNG file size for screenshots, logos and graphics while keeping them in PNG format. Free, private and works in your browser.",
    intro:
      "Make screenshots, logos and graphics lighter without leaving PNG. Choose a level below — or switch to exact size if you're fine with a JPG output.",
    tool: { accept: ".png", dropHint: "PNG screenshots, logos and graphics", defaultLevel: "web-optimized" },
    sections: [
      {
        heading: "PNG vs JPG: which do you need?",
        paragraphs: [
          "PNG is lossless and supports transparency, which makes it ideal for logos, icons, diagrams and screenshots with sharp text. JPG is much smaller for photographs but can't be transparent and blurs hard edges slightly.",
          "If your PNG is actually a photo, you'll save far more by converting it to JPG — use the \"To an exact size\" option or one of the KB tools. If it's a graphic or needs a transparent background, stay in PNG.",
        ],
      },
      {
        heading: "How PNGs get smaller here",
        paragraphs: [
          "PNG is lossless, so there's no quality slider like JPG. Re-saving with better packing helps a little (High Quality saved 18–24% on our screenshots at full size), but the big savings come from reducing pixel dimensions. Screenshots from high-resolution screens are often twice the size they need to be for sharing, so scaling them to a normal width cuts the file a lot without making text unreadable.",
        ],
      },
      {
        heading: "Tips for smaller screenshots",
        list: [
          "Crop to just the part you need before compressing.",
          "Avoid screenshots of photos — save those as JPG instead.",
          "For documentation, the Web Optimized level keeps text crisp at normal zoom.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: real screenshots and a photo saved as PNG",
      "intro": "We took two Retina screenshots (2880×1800) of web pages, one mostly text and one with large coloured areas, plus a 12-megapixel phone photo saved as PNG:",
      "columns": [
        "File",
        "Original",
        "High Quality",
        "Web Optimized",
        "Balanced"
      ],
      "rows": [
        [
          "Text-heavy screenshot",
          "332 KB",
          "252 KB · 2880×1800",
          "212 KB · 1920×1200",
          "112 KB · 1280×800"
        ],
        [
          "Colourful screenshot",
          "488 KB",
          "398 KB · 2880×1800",
          "196 KB · 1920×1200",
          "113 KB · 1280×800"
        ],
        [
          "Phone photo as PNG",
          "20.94 MB",
          "—",
          "551 KB · 859×1145",
          "233 KB · 570×763"
        ]
      ],
      "notes": [
        "High Quality kept full resolution and still saved 18–24%. Web Optimized is ideal for screenshots: 1920×1200 keeps text perfectly readable.",
        "The photo shows why photos shouldn't be PNG: 20.94 MB, and even compressed it had to shrink to 859 pixels wide. Simply converting it to JPG gave a 3.46 MB file at full size. Use PNG to JPG for photos.",
        "But for the text screenshot, JPG was 11% bigger than the PNG. For text and sharp edges, PNG is the right format."
      ]
    },
    faqs: [
      {
        q: "Will transparency be kept?",
        a: "Yes, when you use a quality level the output stays PNG with transparency. Exact-size mode converts to JPG, which fills transparent areas with white.",
      },
      {
        q: "Why didn't my PNG shrink much?",
        a: "Small or already-optimised PNGs have little to remove. Try a stronger level, or convert to JPG if the image is a photo.",
      },
      {
        q: "Can I compress PNG to under 100KB?",
        a: "Yes — switch to \"To an exact size\" and choose 100KB. Note that this saves the result as JPG.",
      },
    ],
    related: ["/compress-jpg", "/compress-image-to-100kb", "/reduce-image-size-in-kb"],
  },

  // ─── PDF ─────────────────────────────────────────────────────────────────────
  {
    path: "/compress-pdf",
    name: "Compress PDF",
    blurb: "Shrink PDFs for email and upload",
    h1: "Compress PDF Files",
    title: "Compress PDF Online Free — Reduce PDF Size, No Upload | Compressnfly",
    description:
      "Reduce PDF file size in your browser. Keep text sharp with standard compression, or shrink scanned PDFs dramatically. Nothing is uploaded.",
    intro:
      "Make a PDF small enough to email or upload. Start with Balanced; for scanned documents, choose Small Size or set an exact size.",
    tool: { accept: PDF_ACCEPT, dropHint: "PDF documents", defaultLevel: "balanced" },
    sections: [
      {
        heading: "Two kinds of PDF compression",
        paragraphs: [
          "Most PDFs shrink in one of two ways. The gentle way cleans up the file's internal structure — duplicate data, unused objects and inefficient storage — and keeps text selectable and searchable. This is what the High Quality, Web Optimized and Balanced levels do.",
          "Scanned PDFs and photo-heavy reports need the stronger way: each page is re-rendered at screen resolution and saved as a compressed image. This can shrink a scanned file by 80–95%, but text in the result can no longer be selected or searched. Small Size and exact-size mode use this only when it saves a lot, and the result tells you when it was used.",
        ],
      },
      {
        heading: "Which option should you choose?",
        list: [
          "Typed documents, contracts, CVs: Balanced. Keeps text selectable.",
          "Scans, photographed pages, image-heavy reports: Small Size.",
          "A strict limit like 1MB or 500KB: switch to \"To an exact size\".",
        ],
      },
      {
        heading: "Private by design",
        paragraphs: [
          "PDFs are often contracts, bank statements or ID scans. Here, the file is opened and compressed inside your browser — it is never uploaded to a server, so there's nothing stored for anyone else to access.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three very different PDFs",
      "intro": "We compressed a text-only handbook, a Word report with photos, and an 8-page contract saved the way scanning apps save pages (each page a 300 DPI image):",
      "columns": [
        "PDF",
        "Original",
        "Balanced (lossless)",
        "Small Size"
      ],
      "rows": [
        [
          "Text handbook, 19 pages",
          "100 KB",
          "64 KB (−36%)",
          "64 KB (images would be bigger)"
        ],
        [
          "Report with photos, 9 pages",
          "2.31 MB",
          "2.30 MB",
          "625 KB (−74%)"
        ],
        [
          "Scanned contract, 8 pages",
          "9.49 MB",
          "9.48 MB",
          "804 KB (−92%)"
        ]
      ],
      "notes": [
        "Balanced keeps text selectable and helps text PDFs, but barely touches scans and photos, because the images are the weight. Small Size re-renders pages as images, which is what shrinks scans: the 8-page scan took about 7 seconds.",
        "Full details, including how small a scan can go and still be readable, are in our PDF compression test."
      ]
    },
    faqs: [
      {
        q: "Why did my PDF only get a little smaller?",
        a: "Text-only PDFs are already compact, so standard compression saves less. Big savings come from PDFs that contain scans or photos — try Small Size for those.",
      },
      {
        q: "Will compressing a PDF lose quality?",
        a: "Standard levels don't change how text looks at all. Small Size and exact-size mode render pages at screen resolution, which looks the same on screen but isn't ideal for high-quality printing.",
      },
      {
        q: "Can I compress a password-protected PDF?",
        a: "Usually not — remove the password in your PDF reader first, then compress.",
      },
      {
        q: "Is there a page limit?",
        a: "No fixed limit. Very large PDFs (hundreds of scanned pages) take longer because every page is processed on your device.",
      },
    ],
    related: ["/compress-pdf-to-1mb", "/compress-pdf-to-500kb", "/compress-image-to-100kb"],
  },
  {
    path: "/compress-pdf-to-1mb",
    name: "PDF to 1MB",
    blurb: "Fit strict PDF upload limits",
    h1: "Compress PDF to 1MB",
    title: "Compress PDF to 1MB or Less — Free & Private | Compressnfly",
    description:
      "Shrink any PDF to under 1MB for online forms, portals and email. Keeps text selectable when possible; nothing leaves your device.",
    intro:
      "Upload portals love a 1MB limit. Add your PDF and it'll be made 1MB or smaller — keeping text selectable if the gentle method is enough.",
    tool: { mode: "target", defaultTargetKB: 1024, targetOptionsKB: [1024, 2048], accept: PDF_ACCEPT, dropHint: "PDF documents" },
    sections: [
      {
        heading: "How the tool gets your PDF under 1MB",
        list: [
          "First it tries a lossless clean-up. If that's enough, your PDF keeps selectable, searchable text.",
          "If not, it re-renders each page as an image, starting at high resolution and stepping down only until the file fits.",
          "If the result has plenty of room to spare, it tries once more at a higher resolution, so you get the sharpest version that still fits.",
        ],
      },
      {
        heading: "What fits in 1MB",
        paragraphs: [
          "A typed document of dozens of pages usually fits easily without any loss. For scans, our 8-page test document fit in 894KB and stayed sharp, and text remains readable down to about 40KB per page, so 1MB can hold around 20–25 scanned pages if you accept slightly softer text. Longer scans may need to be split into parts.",
        ],
      },
      {
        heading: "If it still won't fit",
        list: [
          "Remove pages the form doesn't need — blank pages and duplicate copies are common.",
          "Split the document into separate files if the portal allows multiple uploads.",
          "Re-scan in black and white or greyscale at 150 DPI instead of colour at 300 DPI.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: three PDFs to 1 MB",
      "intro": "Here's what this page produced from three real test PDFs:",
      "columns": [
        "PDF",
        "Original",
        "Result",
        "Text selectable?"
      ],
      "rows": [
        [
          "Text handbook, 19 pages",
          "100 KB",
          "100 KB (already under 1 MB, left as is)",
          "Yes"
        ],
        [
          "Report with photos, 9 pages",
          "2.31 MB",
          "948 KB",
          "No (pages as images)"
        ],
        [
          "Scanned contract, 8 pages",
          "9.49 MB",
          "894 KB (~112 KB per page)",
          "No, but scans never were"
        ]
      ],
      "notes": [
        "The 8-page scan stayed sharp on screen at 1 MB. In our tests, scanned pages stay comfortably readable down to about 40 KB per page, so 1 MB can hold roughly 20–25 scanned pages if you accept slightly softer text.",
        "Files already under the target are returned unchanged, so you never lose quality for nothing."
      ]
    },
    faqs: [
      {
        q: "Will my text still be readable?",
        a: "Yes. Pages are only rendered as images when needed, and the tool starts at high resolution, so text stays readable on screen.",
      },
      {
        q: "Can I still select or copy text afterwards?",
        a: "If the gentle clean-up was enough, yes. If pages had to be converted to images, the result tells you, and text won't be selectable.",
      },
      {
        q: "Does 1MB mean 1,000KB or 1,024KB?",
        a: "This tool uses 1MB = 1,024KB. If a portal is strict about 1,000KB, pick a custom target of 950KB.",
      },
    ],
    related: ["/compress-pdf-to-500kb", "/compress-pdf", "/compress-documents-for-pakistan-passport"],
  },
  {
    path: "/compress-pdf-to-500kb",
    name: "PDF to 500KB",
    blurb: "For tight document limits",
    h1: "Compress PDF to 500KB",
    title: "Compress PDF to 500KB — Free Online, No Upload | Compressnfly",
    description:
      "Get a PDF under 500KB for application portals and forms with tight limits. Smart compression in your browser — your file stays private.",
    intro:
      "Some portals cap each document at 500KB or less. Add your PDF and the tool makes it 500KB or smaller with the best quality it can keep.",
    tool: { mode: "target", defaultTargetKB: 500, targetOptionsKB: [200, 300, 500], accept: PDF_ACCEPT, dropHint: "PDF documents" },
    sections: [
      {
        heading: "Where 500KB limits appear",
        paragraphs: [
          "Admissions, scholarship and recruitment portals often limit each certificate, transcript or ID copy to a few hundred kilobytes. With dozens of documents per applicant, small limits keep their systems manageable.",
        ],
      },
      {
        heading: "Getting a scanned certificate under 500KB",
        list: [
          "One certificate per file: a single page fits in 500KB comfortably, even as a clear scan.",
          "Crop off the scanner bed or table around the paper before making the PDF.",
          "If you photographed the document with your phone, use good, even light — shadows and noise take up space.",
        ],
      },
      {
        heading: "Choosing between 200KB, 300KB and 500KB",
        paragraphs: [
          "Use the largest size the form allows. A one-page scan at 500KB is noticeably crisper than the same page at 200KB, and some reviewers zoom in to check stamps and signatures.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: PDFs to 500 KB and 300 KB",
      "intro": "Results from two image-heavy test PDFs:",
      "columns": [
        "PDF",
        "Original",
        "500 KB target",
        "300 KB target"
      ],
      "rows": [
        [
          "Scanned contract, 8 pages",
          "9.49 MB",
          "346 KB (~43 KB/page)",
          "252 KB (~32 KB/page)"
        ],
        [
          "Report with photos, 9 pages",
          "2.31 MB",
          "469 KB",
          "—"
        ]
      ],
      "notes": [
        "At about 43 KB per page, the scanned text was clearly readable on screen with slight softness when zoomed in. At 32 KB per page it was still readable but noticeably softer.",
        "A single scanned page at 500 KB keeps far more detail than that, so one certificate per file is the best way to keep stamps and signatures crisp."
      ]
    },
    faqs: [
      {
        q: "Can a multi-page PDF fit in 500KB?",
        a: "Typed multi-page documents usually can. Several scanned pages may need lower resolution to fit — the tool handles this automatically and tells you if the target can't be reached.",
      },
      {
        q: "Will the stamp and signature still be visible?",
        a: "Yes, at 300–500KB for a single page they remain clear on screen.",
      },
      {
        q: "My file is a JPG, not a PDF — can I still use this?",
        a: "Use one of the image tools instead, such as Reduce Image Size in KB, which accepts JPG and PNG.",
      },
    ],
    related: ["/compress-pdf-to-1mb", "/compress-pdf", "/reduce-image-size-in-kb"],
  },

  // ─── Pakistan-specific ───────────────────────────────────────────────────────
  {
    path: "/compress-photo-for-job-application",
    name: "Photo for job forms (FPSC, PPSC, NTS)",
    blurb: "Applicant photos for online forms",
    h1: "Compress Photo for Online Job Applications (FPSC, PPSC, NTS)",
    title: "Compress Photo for FPSC, PPSC & NTS Online Forms | Compressnfly",
    description:
      "Resize your applicant photo to the KB limit your online job form asks for — 20KB, 30KB, 50KB or any size. Free, on your phone, no upload.",
    intro:
      "Recruitment portals reject photos that are even 1KB over their limit. Check the size your form asks for, choose it below, and get a JPG that fits.",
    tool: { mode: "target", defaultTargetKB: 50, targetOptionsKB: [20, 30, 50, 100], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "First, check your form's exact requirement",
        paragraphs: [
          "Each commission and testing service sets its own rules, and they can change between advertisements. Before compressing, read the instructions on the application page or in the job advertisement for the maximum file size, the file type (usually JPG) and any pixel dimensions or background colour.",
          "Then choose that size above. If the form says \"less than 30KB\", choose 30KB — the tool always lands at or under your limit.",
        ],
      },
      {
        heading: "Taking a photo that passes review",
        list: [
          "Plain white or light blue background, with even light and no shadows.",
          "Face the camera directly, with your head and shoulders in the frame.",
          "Crop to a passport-style frame before compressing so more of the size budget goes to your face.",
          "Don't use filters, beauty modes or heavy edits.",
        ],
      },
      {
        heading: "Doing it all on your phone",
        paragraphs: [
          "You don't need a computer or an app. Take the photo, open this page in your phone's browser, select the photo from your gallery, pick the size and download. The photo never leaves your phone.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: one phone photo at common form limits",
      "intro": "We reduced a 4.16 MB photo from a Pixel 2 to the limits recruitment forms use most:",
      "columns": [
        "Form limit",
        "Result",
        "Dimensions",
        "Exact bytes"
      ],
      "rows": [
        [
          "20 KB",
          "19.9 KB",
          "277×370",
          "20,418"
        ],
        [
          "30 KB",
          "29.3 KB",
          "339×453",
          "30,028"
        ],
        [
          "50 KB",
          "48.7 KB",
          "438×584",
          "49,910"
        ],
        [
          "100 KB",
          "96.8 KB",
          "620×826",
          "99,166"
        ]
      ],
      "notes": [
        "Look at the last column. Two results are slightly over 20,000 and 30,000 bytes, which is fine if the portal counts 1 KB as 1,024 bytes but gets rejected if it counts 1,000. If your upload fails with a size error, type a custom size about 10% lower (18, 27, 45 or 90) and try again.",
        "These dimensions are for the whole photo. Crop to head and shoulders before compressing and the same bytes give a much sharper face."
      ]
    },
    faqs: [
      {
        q: "What size should my FPSC, PPSC or NTS photo be?",
        a: "It depends on the specific advertisement and portal, and requirements change, so always go by the instructions on the form you're filling. Common limits are between 20KB and 100KB in JPG format.",
      },
      {
        q: "The portal says my photo is too large but it shows under the limit — why?",
        a: "Some systems count 1KB as 1,000 bytes. Set a custom target a couple of KB lower (for example 28KB for a 30KB limit) and try again.",
      },
      {
        q: "Can I also compress my CNIC or degree scans here?",
        a: "Yes, if they're images. For PDF documents, use the Compress PDF to 500KB or 1MB tools.",
      },
      {
        q: "Is it safe to compress my CNIC photo on this site?",
        a: "Yes — the image is processed entirely on your device and never uploaded to any server.",
      },
    ],
    related: ["/compress-image-to-20kb", "/compress-image-to-50kb", "/compress-pdf-to-500kb"],
  },
  {
    path: "/compress-documents-for-pakistan-passport",
    name: "Pakistan passport documents",
    blurb: "DGIP online application uploads",
    h1: "Compress Documents for Pakistan Online Passport Application",
    title: "Pakistan Online Passport Document Size — Compress to 1MB | Compressnfly",
    description:
      "Get your supporting documents under DGIP's 1MB limit and in JPG format for the Pakistan online passport application. Free and private.",
    intro:
      "The DGIP online passport portal accepts only JPG, JPEG and PNG files, with a 1MB limit for supporting documents. Add your scans below to get JPGs that fit.",
    tool: { mode: "target", defaultTargetKB: 900, targetOptionsKB: [500, 900, 2800], accept: IMAGE_ACCEPT, dropHint: IMAGE_HINT },
    sections: [
      {
        heading: "DGIP upload limits",
        paragraphs: [
          "According to the Directorate General of Immigration & Passports' guidance for online applications, attachments must be .JPEG, .JPG or .PNG files. The maximum sizes are:",
        ],
        list: [
          "Supporting documents: 1MB each",
          "Fingerprint form: 3MB",
          "Photograph: 5MB",
        ],
      },
      {
        heading: "Which preset to use",
        list: [
          "900KB for supporting documents — safely under the 1MB limit.",
          "2,800KB (about 2.7MB) for the fingerprint form — under the 3MB limit while keeping fingerprints clear.",
          "500KB if you want faster uploads on a slow connection.",
        ],
      },
      {
        heading: "Have a PDF instead of an image?",
        paragraphs: [
          "The portal doesn't accept PDFs. Take a clear photo or screenshot of each page, or export the page as an image from your PDF reader, then compress it here. Follow DGIP's other rule too: use simple file names with only letters, numbers, dashes and underscores — no spaces or special characters.",
        ],
      },
    ],
    test: {
      "heading": "We tested it: phone photos at 900 KB and 2,800 KB",
      "intro": "We ran three 12-megapixel phone photos through this page at the two main presets:",
      "columns": [
        "Photo",
        "Original",
        "900 KB preset",
        "2,800 KB preset"
      ],
      "rows": [
        [
          "Pixel 2",
          "4.16 MB",
          "897 KB · 1859×2479",
          "2.67 MB · full size"
        ],
        [
          "iPhone 6 Plus",
          "3.51 MB",
          "884 KB · 1859×2479",
          "2.36 MB · full size"
        ],
        [
          "Galaxy S7 Edge",
          "3.97 MB",
          "817 KB · 2479×1859",
          "2.52 MB · full size"
        ]
      ],
      "notes": [
        "At 900 KB, a photographed document page keeps about 1,860×2,480 pixels, plenty to read small print and stamps. At 2,800 KB, all three photos kept their full camera resolution and only the JPG quality was trimmed, so fingerprints stay as detailed as the original photo.",
        "Each file took between half a second and four seconds."
      ]
    },
    faqs: [
      {
        q: "Does this tool submit anything to DGIP?",
        a: "No. It only prepares your files on your own device. You upload them yourself on the official portal.",
      },
      {
        q: "Why 900KB and not exactly 1MB?",
        a: "It leaves a small safety margin in case the portal counts sizes slightly differently, so your upload isn't rejected for being a few bytes over.",
      },
      {
        q: "Will my documents still be readable?",
        a: "Yes. At 900KB a full-page scan keeps plenty of detail; crop off the background around the paper for the best result.",
      },
      {
        q: "Are these limits current?",
        a: "They match DGIP's published guidance at the time of writing. Always double-check the instructions on the portal itself when you apply.",
      },
    ],
    related: ["/compress-pdf-to-1mb", "/reduce-image-size-in-kb", "/compress-photo-for-job-application"],
    source: {
      label: "DGIP — Attaching documents to your online application",
      url: "https://onlinemrp.dgip.gov.pk/?p=2587",
    },
  },
  ...converterPages,
];

export type ToolGroup = "compress" | "image" | "pdf";

export const groupOf = (t: ToolPageConfig): ToolGroup =>
  !t.converter ? "compress" : t.converter.mode === "image" ? "image" : "pdf";

export const GROUP_LABELS: Record<ToolGroup, string> = {
  compress: "Compress",
  image: "Convert images",
  pdf: "PDF tools",
};

/** Shown in the "Popular tools" block on every tool page. */
export const POPULAR_PATHS = [
  "/heic-to-jpg",
  "/compress-image-to-100kb",
  "/pdf-to-jpg",
  "/jpg-to-pdf",
  "/webp-to-jpg",
  "/compress-pdf",
  "/merge-pdf",
  "/png-to-jpg",
];

// Display order for grids and the footer: sizes small → large, then formats, then Pakistan-specific.
const DISPLAY_ORDER = [
  "/compress-image-to-20kb", "/compress-image-to-30kb", "/compress-image-to-50kb", "/compress-image-to-100kb",
  "/compress-image-to-200kb", "/compress-image-to-500kb", "/reduce-image-size-in-kb",
  "/compress-jpg", "/compress-png", "/compress-pdf",
  "/compress-pdf-to-200kb", "/compress-pdf-to-500kb", "/compress-pdf-to-1mb", "/compress-pdf-to-2mb",
  "/compress-photo-for-job-application", "/compress-documents-for-pakistan-passport",
];
const rank = (p: string) => { const i = DISPLAY_ORDER.indexOf(p); return i === -1 ? DISPLAY_ORDER.length : i; };
toolPages.sort((a, b) => rank(a.path) - rank(b.path)); // stable: converters keep their written order

export const toolPagesByPath: Record<string, ToolPageConfig> = Object.fromEntries(
  toolPages.map((t) => [t.path, t]),
);
