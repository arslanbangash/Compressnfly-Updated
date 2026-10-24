// Format converters, PDF tools and extra compress-to-size pages.
// Each page has its own wording — don't copy sections between pages,
// Google treats near-identical pages as thin content.

import type { ToolPageConfig } from "./toolPages";

const HEIC_ACCEPT = ".heic,.heif,image/heic,image/heif";
const PHOTO_ACCEPT = ".jpg,.jpeg,.png,.webp,.bmp,.gif";

export const converterPages: ToolPageConfig[] = [
  // ─── HEIC ──────────────────────────────────────────────────────────────────
  {
    path: "/heic-to-jpg",
    name: "HEIC to JPG",
    blurb: "iPhone photos that open anywhere",
    h1: "HEIC to JPG Converter",
    title: "HEIC to JPG Converter — Free, Private, No Upload | Compressnfly",
    description:
      "Convert iPhone HEIC photos to JPG in your browser. Batch convert, keep full resolution, and your photos never leave your device.",
    intro:
      "Turn iPhone HEIC photos into JPGs that open on Windows, Android, and every upload form. Drop in as many as you like — conversion happens right here in your browser.",
    converter: { mode: "image", to: "jpg", accept: HEIC_ACCEPT, dropHint: "HEIC or HEIF photos from iPhone or iPad" },
    sections: [
      {
        heading: "What is a HEIC file?",
        paragraphs: [
          "HEIC (High Efficiency Image Container) is the photo format iPhones and iPads have used by default since iOS 11. It stores a photo in roughly half the space of a JPG at similar quality, which is why Apple switched to it.",
          "The catch is compatibility. Many Windows PCs need an extra extension to open HEIC, older Android phones can't show it, and plenty of websites — job portals, government forms, online shops — reject it outright.",
        ],
      },
      {
        heading: "When to convert HEIC to JPG",
        list: [
          "An upload form says \"JPG or PNG only\" and won't take your iPhone photo.",
          "You're sending photos to someone on Windows or an older Android phone.",
          "You want to print photos at a shop or kiosk that doesn't read HEIC.",
          "You're adding photos to a document, slide deck or website builder.",
        ],
      },
      {
        heading: "Stop your iPhone saving HEIC",
        paragraphs: [
          "If you always need JPG, go to Settings → Camera → Formats and choose Most Compatible. New photos will be saved as JPG. Existing photos stay HEIC, so convert those here.",
        ],
      },
    ],
    faqs: [
      { q: "Does converting HEIC to JPG reduce quality?", a: "Only very slightly. We save at high JPG quality and keep the full resolution, so the difference isn't visible at normal viewing size. The JPG will be larger than the HEIC, though — that's the trade-off for compatibility." },
      { q: "Can I convert many HEIC photos at once?", a: "Yes. Select or drop a whole batch and download them together as a ZIP file." },
      { q: "Are my photos uploaded?", a: "No. The conversion runs entirely in your browser, so your photos never leave your phone or computer." },
      { q: "What about Live Photos?", a: "The still image is converted to JPG. The short video part of a Live Photo isn't included." },
    ],
    related: ["/heic-to-png", "/jpg-to-pdf", "/compress-image-to-100kb"],
  },
  {
    path: "/heic-to-png",
    name: "HEIC to PNG",
    blurb: "Lossless copies for editing",
    h1: "HEIC to PNG Converter",
    title: "HEIC to PNG Converter — Lossless, Free & Private | Compressnfly",
    description:
      "Convert HEIC photos to lossless PNG for editing and design work. Runs in your browser — no upload, no sign-up, no watermark.",
    intro:
      "Need a lossless copy of an iPhone photo? Convert HEIC to PNG here and get an image you can edit, crop and re-save without it degrading each time.",
    converter: { mode: "image", to: "png", accept: HEIC_ACCEPT, dropHint: "HEIC or HEIF photos from iPhone or iPad" },
    sections: [
      {
        heading: "PNG or JPG — which should you pick?",
        paragraphs: [
          "Both open everywhere. The difference is how they store detail. JPG is lossy: every time you edit and re-save, a little quality is thrown away. PNG is lossless: what you save is exactly what you get back, no matter how many times you edit it.",
          "That makes PNG the better choice when the photo is a starting point — for editing, design work, cut-outs or adding text — and JPG the better choice when you just want to share or upload it.",
        ],
      },
      {
        heading: "Expect bigger files",
        paragraphs: [
          "Lossless comes at a price. A 2MB HEIC photo can easily become a 10–15MB PNG, because PNG keeps every pixel exactly. If the file is only for sharing, convert to JPG instead — it'll be a fraction of the size.",
        ],
      },
      {
        heading: "Good uses for HEIC to PNG",
        list: [
          "Editing in Photoshop, GIMP, Canva or Figma without stacking up JPG artefacts.",
          "Screenshots and screen photos with sharp text you want to keep crisp.",
          "Preparing an image you'll later remove the background from.",
        ],
      },
    ],
    faqs: [
      { q: "Will the PNG have a transparent background?", a: "No — iPhone photos don't contain transparency, so the PNG looks exactly like the photo. PNG simply gives you a lossless file to work from." },
      { q: "Why is my PNG so much larger than the HEIC?", a: "HEIC uses very efficient lossy compression; PNG stores every pixel exactly. For sharing, JPG is a better fit." },
      { q: "Is my photo uploaded to a server?", a: "No. It's converted inside your browser and never leaves your device." },
    ],
    related: ["/heic-to-jpg", "/png-to-jpg", "/compress-png"],
  },

  // ─── WebP ──────────────────────────────────────────────────────────────────
  {
    path: "/webp-to-jpg",
    name: "WebP to JPG",
    blurb: "Fix images saved from websites",
    h1: "WebP to JPG Converter",
    title: "WebP to JPG Converter — Free Online, No Upload | Compressnfly",
    description:
      "Convert WebP images to JPG so they open in any app or upload form. Batch convert in your browser — fast, free and private.",
    intro:
      "Saved an image from a website and got a .webp file your app won't open? Convert it to a regular JPG here in a second.",
    converter: { mode: "image", to: "jpg", accept: ".webp", dropHint: "WebP images" },
    sections: [
      {
        heading: "Why you keep getting WebP files",
        paragraphs: [
          "WebP is an image format Google introduced to make websites load faster — its files are typically around a quarter to a third smaller than JPG at similar quality. Most big sites now serve WebP, so when you right-click and save an image, that's often what you get.",
          "Browsers handle WebP perfectly, but some desktop apps, older photo editors, print services and upload forms still don't. JPG is the safe, open-anywhere format.",
        ],
      },
      {
        heading: "What happens to transparency",
        paragraphs: [
          "WebP can have a transparent background; JPG can't. Transparent areas are filled with white when you convert. If you need to keep the transparency — for a logo or sticker — use WebP to PNG instead.",
        ],
      },
      {
        heading: "Common reasons to convert",
        list: [
          "An app or editor says the file type isn't supported.",
          "A form or marketplace only accepts JPG or PNG.",
          "You want to print the image or add it to a Word or PowerPoint file.",
        ],
      },
    ],
    faqs: [
      { q: "Is WebP to JPG conversion free?", a: "Yes, with no sign-up, no watermark and no limit on the number of files." },
      { q: "Will the image lose quality?", a: "We save at high JPG quality and keep the original dimensions, so it looks the same. The file may be a bit larger than the WebP." },
      { q: "Can I convert an animated WebP?", a: "Only the first frame is converted, since JPG can't hold animation." },
    ],
    related: ["/webp-to-png", "/jpg-to-webp", "/compress-jpg"],
  },
  {
    path: "/webp-to-png",
    name: "WebP to PNG",
    blurb: "Keep transparent backgrounds",
    h1: "WebP to PNG Converter",
    title: "WebP to PNG Converter — Keeps Transparency | Compressnfly",
    description:
      "Convert WebP to PNG and keep transparent backgrounds intact. Free, batch-friendly and processed entirely in your browser.",
    intro:
      "Convert WebP logos, icons and graphics to PNG without losing their transparent background. Works on whole batches at once.",
    converter: { mode: "image", to: "png", accept: ".webp", dropHint: "WebP images" },
    sections: [
      {
        heading: "When PNG is the right target",
        paragraphs: [
          "Pick PNG when the image has a transparent background or sharp edges — logos, icons, stickers, screenshots and illustrations. PNG keeps transparency and stores every pixel exactly, so edges stay clean.",
          "For ordinary photos, WebP to JPG gives a much smaller file and is usually the better choice.",
        ],
      },
      {
        heading: "Where WebP still causes trouble",
        list: [
          "Older versions of design tools and some office apps can't import WebP.",
          "Many print-on-demand and merch sites ask for PNG artwork.",
          "Some CMS themes and email builders only accept JPG, PNG or GIF.",
        ],
      },
      {
        heading: "About file size",
        paragraphs: [
          "Because PNG is lossless, the converted file is often larger than the WebP — sometimes several times larger for photographic images. That's normal and doesn't mean anything went wrong.",
        ],
      },
    ],
    faqs: [
      { q: "Does WebP to PNG keep the transparent background?", a: "Yes. Transparent areas stay transparent in the PNG." },
      { q: "Is any quality lost?", a: "No further loss happens in the conversion. PNG stores exactly what the WebP image contains." },
      { q: "Are my images uploaded anywhere?", a: "No. Everything happens in your browser." },
    ],
    related: ["/webp-to-jpg", "/compress-png", "/png-to-jpg"],
  },

  // ─── PNG / JPG / AVIF ──────────────────────────────────────────────────────
  {
    path: "/png-to-jpg",
    name: "PNG to JPG",
    blurb: "Much smaller photo files",
    h1: "PNG to JPG Converter",
    title: "PNG to JPG Converter — Shrink Photos Free | Compressnfly",
    description:
      "Convert PNG to JPG to make photos dramatically smaller for email, forms and websites. Free, batch convert, no upload.",
    intro:
      "Photos saved as PNG are often several times bigger than they need to be. Convert them to JPG and they'll be much easier to email, upload and share.",
    converter: { mode: "image", to: "jpg", accept: ".png", dropHint: "PNG images" },
    sections: [
      {
        heading: "Why PNG photos are so large",
        paragraphs: [
          "PNG was designed for graphics: it stores every pixel exactly. That's ideal for logos and screenshots, but photos have millions of subtly different colours, so a photo saved as PNG can be 5–10 times the size of the same photo as JPG.",
          "Converting a photo to JPG removes detail your eye can't see and usually cuts the file size dramatically while it still looks the same.",
        ],
      },
      {
        heading: "When to keep PNG instead",
        list: [
          "The image has a transparent background — JPG fills it with white.",
          "It's a screenshot or diagram full of small, sharp text.",
          "It's a logo or icon with flat colours and crisp edges.",
        ],
      },
      {
        heading: "Need a specific size too?",
        paragraphs: [
          "If a form wants the photo under a limit like 100KB, use the Compress Image to 100KB tool instead — it converts to JPG and hits the size in one step.",
        ],
      },
    ],
    faqs: [
      { q: "What happens to transparent areas?", a: "They're filled with white, since JPG doesn't support transparency." },
      { q: "How much smaller will my file be?", a: "For photos, often 70–90% smaller. Screenshots and graphics shrink less and may look softer, so keep those as PNG." },
      { q: "Can I convert multiple PNGs?", a: "Yes — drop a batch and download them all as a ZIP." },
    ],
    related: ["/jpg-to-png", "/compress-image-to-100kb", "/compress-png"],
  },
  {
    path: "/jpg-to-png",
    name: "JPG to PNG",
    blurb: "When a form needs PNG",
    h1: "JPG to PNG Converter",
    title: "JPG to PNG Converter — Free & Private, No Upload | Compressnfly",
    description:
      "Convert JPG or JPEG images to PNG in your browser. Useful when a site requires PNG or you want a lossless copy for editing.",
    intro:
      "Convert JPG images to PNG when an app or upload form insists on PNG, or when you want a lossless copy to edit without further quality loss.",
    converter: { mode: "image", to: "png", accept: ".jpg,.jpeg", dropHint: "JPG or JPEG images" },
    sections: [
      {
        heading: "What converting to PNG does — and doesn't — do",
        paragraphs: [
          "Converting to PNG locks the image in a lossless format, so future edits and re-saves won't degrade it further. It does not restore detail the JPG already lost, and it won't make the background transparent on its own.",
          "If you need a transparent background, you'll still have to remove the background in an editor — but starting from a PNG gives that editor a clean file to work with.",
        ],
      },
      {
        heading: "Good reasons to convert",
        list: [
          "A website, app store listing or print service asks specifically for PNG.",
          "You're going to edit the image several times and want to avoid repeated JPG compression.",
          "You're placing the image in a design that will be exported as PNG anyway.",
        ],
      },
      {
        heading: "File size will go up",
        paragraphs: [
          "PNG files of photos are usually several times larger than the JPG. If size matters more than editing, keep the JPG.",
        ],
      },
    ],
    faqs: [
      { q: "Will converting JPG to PNG improve quality?", a: "No. It preserves the image exactly as it is now, but can't bring back detail lost when the JPG was created." },
      { q: "Will the background become transparent?", a: "No. The PNG looks identical to the JPG. Transparency has to be added in an editor." },
      { q: "Is it free?", a: "Yes — no limits, no watermark, nothing uploaded." },
    ],
    related: ["/png-to-jpg", "/compress-png", "/heic-to-png"],
  },
  {
    path: "/jpg-to-webp",
    name: "JPG to WebP",
    blurb: "Faster images for websites",
    h1: "JPG to WebP Converter",
    title: "JPG to WebP Converter — Speed Up Your Website | Compressnfly",
    description:
      "Convert JPG and PNG images to WebP for faster-loading web pages. Free, batch convert, processed privately in your browser.",
    intro:
      "Make your website images lighter. Convert JPG or PNG files to WebP and serve the same picture in a noticeably smaller file.",
    converter: { mode: "image", to: "webp", accept: ".jpg,.jpeg,.png", dropHint: "JPG or PNG images" },
    sections: [
      {
        heading: "Why websites use WebP",
        paragraphs: [
          "WebP files are typically around a quarter to a third smaller than JPGs of similar quality, and it supports transparency like PNG. Smaller images mean faster pages, which visitors notice and search engines reward.",
          "Every modern browser — Chrome, Edge, Firefox and Safari — displays WebP, so it's safe to use on the web today.",
        ],
      },
      {
        heading: "When to stay with JPG",
        list: [
          "The file is going to someone by email or for printing — JPG is more universally supported outside browsers.",
          "An upload form lists only JPG and PNG.",
          "Your website platform doesn't accept WebP uploads yet.",
        ],
      },
      {
        heading: "Tips for web images",
        paragraphs: [
          "Resize images to the width they'll actually be shown at before converting — a 4,000-pixel photo displayed at 800 pixels wastes bandwidth no matter what format it's in. Then convert to WebP for the final saving.",
        ],
      },
    ],
    faqs: [
      { q: "Does WebP keep PNG transparency?", a: "Yes. Transparent PNGs stay transparent as WebP." },
      { q: "Does it work on iPhone?", a: "Yes. If your browser can't create WebP itself, the tool uses its own built-in encoder automatically." },
      { q: "How much smaller will my images be?", a: "It depends on the image, but savings of 25–35% over JPG are common at similar quality." },
    ],
    related: ["/webp-to-jpg", "/compress-image-to-200kb", "/compress-jpg"],
  },
  {
    path: "/avif-to-jpg",
    name: "AVIF to JPG",
    blurb: "Open next-gen images anywhere",
    h1: "AVIF to JPG Converter",
    title: "AVIF to JPG Converter — Free, In Your Browser | Compressnfly",
    description:
      "Convert AVIF images to JPG so they open in any app, editor or upload form. Free and private — nothing is uploaded.",
    intro:
      "AVIF is great for websites but awkward everywhere else. Convert AVIF images to JPG to open, edit and share them without compatibility headaches.",
    converter: { mode: "image", to: "jpg", accept: ".avif", dropHint: "AVIF images" },
    sections: [
      {
        heading: "What is AVIF?",
        paragraphs: [
          "AVIF is a newer image format based on the AV1 video codec. It can produce even smaller files than WebP at similar quality, so more websites are starting to serve it — which means you may end up with .avif files when saving images.",
          "Support outside the browser is still patchy. Many photo editors, office apps, upload forms and older devices can't open AVIF at all.",
        ],
      },
      {
        heading: "When converting helps",
        list: [
          "Your image viewer or editor shows an error or a blank file.",
          "A form, marketplace or social site rejects the upload.",
          "You want to print the image or put it in a document.",
        ],
      },
      {
        heading: "Browser requirements",
        paragraphs: [
          "The conversion uses your browser's own AVIF support. Current versions of Chrome, Edge, Firefox and Safari all handle it; if you see an error, update your browser and try again.",
        ],
      },
    ],
    faqs: [
      { q: "Will the JPG look the same?", a: "Yes. We keep the full resolution and save at high quality. The JPG will usually be larger than the AVIF." },
      { q: "What happens to transparency?", a: "Transparent areas become white, because JPG doesn't support transparency." },
      { q: "Is anything uploaded?", a: "No — the image is decoded and converted inside your browser." },
    ],
    related: ["/webp-to-jpg", "/heic-to-jpg", "/compress-jpg"],
  },

  // ─── PDF tools ─────────────────────────────────────────────────────────────
  {
    path: "/pdf-to-jpg",
    name: "PDF to JPG",
    blurb: "Every page as an image",
    h1: "PDF to JPG Converter",
    title: "PDF to JPG Converter — Every Page as an Image | Compressnfly",
    description:
      "Convert each page of a PDF into a high-quality JPG. Choose screen or print quality, download all pages as a ZIP. Free and private.",
    intro:
      "Turn every page of a PDF into a separate JPG image — handy for sharing a page on WhatsApp, adding it to slides, or uploading a document where only images are accepted.",
    converter: { mode: "pdf-to-image", to: "jpg", accept: ".pdf", dropHint: "A PDF document" },
    sections: [
      {
        heading: "Choosing the right quality",
        list: [
          "Standard (150 DPI) — sharp on any screen, small files. Best for sharing, messaging and web uploads.",
          "High (300 DPI) — print quality. Use it when you'll print the pages or need to zoom in on fine text.",
        ],
      },
      {
        heading: "When PDF to JPG is useful",
        list: [
          "An application portal wants a certificate or ID as an image, not a PDF.",
          "You want to post a page on social media or send it in a chat app.",
          "You're adding a page to a presentation or a design.",
          "You need a preview thumbnail of a document.",
        ],
      },
      {
        heading: "What changes after converting",
        paragraphs: [
          "Each page becomes a picture, so text can no longer be selected, searched or copied. Keep the original PDF if you'll need that later.",
        ],
      },
    ],
    faqs: [
      { q: "How do I get all pages at once?", a: "After converting, click Download all to get every page in one ZIP file. You can also download pages individually." },
      { q: "Can I convert a password-protected PDF?", a: "Not directly. Open it in a PDF reader, remove the password, then convert it here." },
      { q: "Is my PDF uploaded?", a: "No. The pages are rendered inside your browser, so the document never leaves your device." },
      { q: "Can I get PNG instead of JPG?", a: "JPG is best for most documents and keeps files small. If you need lossless pages, let us know through the contact page." },
    ],
    related: ["/jpg-to-pdf", "/split-pdf", "/compress-pdf"],
  },
  {
    path: "/jpg-to-pdf",
    name: "JPG to PDF",
    blurb: "Photos and scans into one PDF",
    h1: "JPG to PDF Converter",
    title: "JPG to PDF Converter — Combine Images Into One PDF | Compressnfly",
    description:
      "Turn JPG, PNG and phone photos into a single PDF. Reorder pages, pick A4 or Letter, and download instantly — nothing uploaded.",
    intro:
      "Combine photos or scanned pages into one tidy PDF. Add your images, put them in order, choose a page size and download.",
    converter: {
      mode: "images-to-pdf",
      accept: ".jpg,.jpeg,.png,.webp,.heic,.heif",
      dropHint: "JPG, PNG, WebP or HEIC images",
    },
    sections: [
      {
        heading: "Picking a page size",
        list: [
          "Same as image — each page matches its photo exactly, with no borders. Best for photos and screenshots.",
          "A4 — the standard paper size in Pakistan, the UK, Europe and most of the world. Best for documents you might print or submit.",
          "US Letter — the standard in the US and Canada.",
        ],
      },
      {
        heading: "Common uses",
        list: [
          "Turning phone photos of a signed form into one PDF to email back.",
          "Combining scans of degree certificates, CNIC and transcripts for an application.",
          "Sending receipts or invoices as a single document.",
        ],
      },
      {
        heading: "Tips for scanned documents",
        paragraphs: [
          "Photograph pages in good, even light from directly above, and crop out the table around the paper before converting. If the final PDF is too big for a portal, run it through the Compress PDF tool afterwards.",
        ],
      },
    ],
    faqs: [
      { q: "Can I change the page order?", a: "Yes. Use the up and down arrows next to each image before creating the PDF." },
      { q: "Does it work with iPhone HEIC photos?", a: "Yes. HEIC photos are converted automatically as they're added to the PDF." },
      { q: "Is there a limit on images?", a: "No fixed limit. Very large batches just take a little longer, since everything happens on your device." },
      { q: "Are my images uploaded?", a: "No. The PDF is built in your browser." },
    ],
    related: ["/pdf-to-jpg", "/merge-pdf", "/compress-pdf-to-1mb"],
  },
  {
    path: "/merge-pdf",
    name: "Merge PDF",
    blurb: "Combine PDFs into one file",
    h1: "Merge PDF Files",
    title: "Merge PDF — Combine PDF Files Free, No Upload | Compressnfly",
    description:
      "Combine multiple PDFs into one document in the order you choose. Pages stay sharp and text stays selectable. Free and private.",
    intro:
      "Combine several PDFs into a single file. Add them, arrange the order, and merge — pages are copied exactly as they are.",
    converter: { mode: "merge-pdf", accept: ".pdf", dropHint: "Two or more PDF files" },
    sections: [
      {
        heading: "How merging works",
        paragraphs: [
          "Pages are copied from each PDF into a new document without being re-rendered, so text stays sharp, selectable and searchable, and the merged file is roughly the size of the originals added together.",
          "Interactive extras such as fillable form fields and bookmarks may not carry over — the visible page content always does.",
        ],
      },
      {
        heading: "When you'd merge PDFs",
        list: [
          "An application portal accepts only one file but you have several documents.",
          "Putting a cover letter, CV and certificates into one submission.",
          "Combining monthly statements or invoices for your records.",
        ],
      },
      {
        heading: "If the result is too large",
        paragraphs: [
          "Merging adds the sizes together. If the final PDF is over a portal's limit, use Compress PDF to 1MB or Compress PDF to 2MB on the merged file.",
        ],
      },
    ],
    faqs: [
      { q: "Can I choose the order?", a: "Yes. Use the arrows to move each file up or down before merging." },
      { q: "Can I merge password-protected PDFs?", a: "Remove the password in a PDF reader first; locked files can't be opened here." },
      { q: "Will the quality change?", a: "No. Pages are copied as-is, not re-rendered." },
    ],
    related: ["/split-pdf", "/jpg-to-pdf", "/compress-pdf"],
  },
  {
    path: "/split-pdf",
    name: "Split PDF",
    blurb: "Extract pages or split every page",
    h1: "Split PDF Files",
    title: "Split PDF — Extract Pages Free, No Upload | Compressnfly",
    description:
      "Split a PDF into single pages or extract the page ranges you need. Fast, free and private — your document stays on your device.",
    intro:
      "Pull out just the pages you need, or split a PDF into one file per page. Pages are copied exactly, with no loss of quality.",
    converter: { mode: "split-pdf", accept: ".pdf", dropHint: "A PDF document" },
    sections: [
      {
        heading: "Two ways to split",
        list: [
          "One PDF per page — every page becomes its own file, downloaded together as a ZIP.",
          "Custom ranges — type ranges like 1-3, 5, 8-10. Each range becomes its own PDF, so 1-3 gives you one three-page file.",
        ],
      },
      {
        heading: "When splitting helps",
        list: [
          "A portal wants each certificate uploaded separately.",
          "You only need to send one section of a long report.",
          "A file is too big to upload in one go and the site allows several parts.",
        ],
      },
      {
        heading: "Range tips",
        paragraphs: [
          "Leave the end of a range open to go to the last page — 5- means page 5 to the end. The tool tells you the page count as soon as you add the file, and warns you if a range doesn't exist.",
        ],
      },
    ],
    faqs: [
      { q: "Will text still be selectable?", a: "Yes. Pages are copied directly, not turned into images." },
      { q: "Can I extract a single page?", a: "Yes — choose Custom ranges and type the page number, for example 4." },
      { q: "Is my document uploaded?", a: "No. Splitting happens in your browser." },
    ],
    related: ["/merge-pdf", "/pdf-to-jpg", "/compress-pdf-to-500kb"],
  },

  // ─── More compress-to-size pages ───────────────────────────────────────────
  {
    path: "/compress-image-to-30kb",
    name: "Image to 30KB",
    blurb: "Tight photo limits on exam forms",
    h1: "Compress Image to 30KB",
    title: "Compress Image to 30KB — Photos & Signatures, Free | Compressnfly",
    description:
      "Get a photo or signature under 30KB for online exam and job forms. Keeps your face clear and works on your phone — no upload.",
    intro:
      "Many exam and recruitment forms cap photos at around 30KB. Add your photo or signature and download a clear JPG that fits.",
    tool: { mode: "target", defaultTargetKB: 30, targetOptionsKB: [20, 25, 30, 40], accept: PHOTO_ACCEPT, dropHint: "JPG, PNG or WebP — saved as JPG" },
    sections: [
      {
        heading: "Making a face photo look good at 30KB",
        paragraphs: [
          "At 30KB a typical portrait comes out around 450–700 pixels on its longest side — plenty for the small preview box on an application form. The tool shrinks the dimensions first, so the face stays clean instead of turning blocky.",
          "A plain white or light-blue background helps a lot: flat colour costs almost nothing to store, leaving more of the 30KB for your face.",
        ],
      },
      {
        heading: "Signatures at 30KB",
        paragraphs: [
          "Sign in dark ink on plain white paper, photograph it in good light, and crop tightly around the signature before compressing. A tight crop keeps the strokes sharp even at small sizes.",
        ],
      },
      {
        heading: "Check the form's other rules",
        list: [
          "Minimum size: some forms also require at least 10KB or 20KB — the result shows the exact size.",
          "Pixel dimensions: if the form asks for something like 200×230 pixels, crop to that shape first.",
          "Format: forms almost always want JPG, which is what this tool produces.",
        ],
      },
    ],
    faqs: [
      { q: "Can I compress a photo from 5MB to 30KB?", a: "Yes. Large phone photos are resized and recompressed in one step, usually in under a second." },
      { q: "The form says under 30KB but rejects my file — why?", a: "Some sites count 1KB as 1,000 bytes. Choose 25KB or type a custom value like 28 to leave a margin." },
      { q: "Is my photo stored anywhere?", a: "No. It's processed in your browser and never uploaded." },
    ],
    related: ["/compress-image-to-20kb", "/compress-image-to-50kb", "/compress-photo-for-job-application"],
  },
  {
    path: "/compress-image-to-500kb",
    name: "Image to 500KB",
    blurb: "High-quality uploads with a cap",
    h1: "Compress Image to 500KB",
    title: "Compress Image to 500KB — Keep Photos Sharp | Compressnfly",
    description:
      "Shrink large photos to under 500KB while keeping them sharp enough for listings, portfolios and documents. Free, in your browser.",
    intro:
      "500KB is enough for a detailed, full-screen photo. Add your images and each one comes back as a high-quality JPG under 500KB.",
    tool: { mode: "target", defaultTargetKB: 500, targetOptionsKB: [300, 400, 500, 800], accept: PHOTO_ACCEPT, dropHint: "JPG, PNG or WebP — saved as JPG" },
    sections: [
      {
        heading: "Where 500KB limits show up",
        list: [
          "Property and car listings that cap each photo.",
          "Scholarship, visa and admission portals that want a clear scan of a document.",
          "Website builders and forums with per-image limits.",
          "Photos you want to email in bulk without hitting attachment limits.",
        ],
      },
      {
        heading: "How sharp is a 500KB photo?",
        paragraphs: [
          "At 500KB most photos keep around 2,000–2,800 pixels on the longest side — larger than most laptop screens and good enough for a small print. Often the only change you'll notice is the file size.",
        ],
      },
      {
        heading: "Documents and scans",
        paragraphs: [
          "For a scanned certificate or ID, 500KB keeps small print and stamps readable. Crop away the background around the paper first so the space goes to the document itself.",
        ],
      },
    ],
    faqs: [
      { q: "Will compressing to 500KB lower the quality?", a: "Barely. At this size the tool can keep high JPG quality and most of the original resolution." },
      { q: "My photo is already under 500KB — what happens?", a: "It's re-saved as a clean JPG at the best quality that stays under the limit." },
      { q: "Can I do many photos at once?", a: "Yes — select them together and download all as a ZIP." },
    ],
    related: ["/compress-image-to-200kb", "/compress-jpg", "/jpg-to-pdf"],
  },
  {
    path: "/compress-pdf-to-200kb",
    name: "PDF to 200KB",
    blurb: "Very small document uploads",
    h1: "Compress PDF to 200KB",
    title: "Compress PDF to 200KB — Free & Private, No Upload | Compressnfly",
    description:
      "Shrink a PDF to under 200KB for strict application and admission portals. Smart compression in your browser — your file stays private.",
    intro:
      "Some portals allow only 200KB per document. Add your PDF and the tool makes it 200KB or smaller with the best readability it can keep.",
    tool: { mode: "target", defaultTargetKB: 200, targetOptionsKB: [100, 150, 200], accept: ".pdf", dropHint: "PDF documents" },
    sections: [
      {
        heading: "What fits in 200KB",
        paragraphs: [
          "A one- or two-page typed document usually fits without any visible change. A single scanned page fits comfortably too, with text still readable on screen. Multi-page scans are the hard case — the more pages, the lower the resolution has to go.",
        ],
      },
      {
        heading: "Getting a scan under 200KB",
        list: [
          "Upload one document per file where the portal allows it.",
          "Scan in greyscale rather than colour if colour isn't required.",
          "Remove blank pages and the back sides of single-sided documents.",
          "Use Split PDF first if a portal wants separate files.",
        ],
      },
      {
        heading: "How the tool decides",
        paragraphs: [
          "It tries a lossless clean-up first, which keeps text selectable. Only if that isn't enough does it re-render pages as images, starting at good resolution and stepping down until the file fits. The result tells you which method was used.",
        ],
      },
    ],
    faqs: [
      { q: "Can a 10-page scanned PDF fit in 200KB?", a: "Usually only at low resolution. Split it or check whether the portal accepts a larger file — readability matters to whoever reviews it." },
      { q: "Will my stamp and signature be visible?", a: "On a single page at 200KB, yes." },
      { q: "Is the PDF uploaded?", a: "No. Compression runs in your browser." },
    ],
    related: ["/compress-pdf-to-500kb", "/split-pdf", "/compress-pdf"],
  },
  {
    path: "/compress-pdf-to-2mb",
    name: "PDF to 2MB",
    blurb: "Portals and email attachments",
    h1: "Compress PDF to 2MB",
    title: "Compress PDF to 2MB — Keep Text Sharp, Free | Compressnfly",
    description:
      "Get a PDF under 2MB for job portals, university applications and email. Keeps text selectable when possible. Nothing uploaded.",
    intro:
      "2MB is a common cap on job and university portals. Add your PDF and it'll be made 2MB or smaller — usually without any visible change.",
    tool: { mode: "target", defaultTargetKB: 2048, targetOptionsKB: [1024, 2048, 3072], accept: ".pdf", dropHint: "PDF documents" },
    sections: [
      {
        heading: "Why 2MB is usually easy",
        paragraphs: [
          "Most typed documents — CVs, cover letters, reports — are already well under 2MB. The ones that aren't usually contain large photos or scans, and those shrink a lot with compression while staying perfectly readable.",
        ],
      },
      {
        heading: "Typical 2MB uploads",
        list: [
          "CVs with a photo or design elements.",
          "Research proposals, theses or portfolios with images.",
          "A merged application pack — certificates, transcripts and ID in one file.",
        ],
      },
      {
        heading: "Keeping text selectable",
        paragraphs: [
          "Recruiters' systems often scan CVs for keywords, so selectable text matters. The tool always tries lossless compression first and only converts pages to images if that's the only way to reach 2MB — and it tells you if it did.",
        ],
      },
    ],
    faqs: [
      { q: "Will compressing to 2MB affect my CV's formatting?", a: "No. Layout, fonts and links are kept when lossless compression is enough, which it usually is at 2MB." },
      { q: "My merged PDF is 8MB — can it reach 2MB?", a: "Usually, if most of the size is scanned pages. Text-heavy files may need splitting instead." },
      { q: "Is it free?", a: "Yes, with no sign-up and no watermark." },
    ],
    related: ["/compress-pdf-to-1mb", "/merge-pdf", "/compress-pdf"],
  },
];
