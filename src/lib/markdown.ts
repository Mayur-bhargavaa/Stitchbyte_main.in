/**
 * Robust, lightweight Markdown-to-HTML parser and heading extractor for StitchByte blogs.
 * Converts markdown headings (#), lists (- / * / 1.), dividers (---),
 * blockquotes, links, bold, italics, tables, and paragraphs to clean,
 * accessible, and styled HTML with anchor IDs for Table of Contents.
 */

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Creates a URL-friendly, safe slug ID from heading text.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "") // strip any html tags
    .replace(/[^\w\s-]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Extracts table of contents headings (#, ##, ###) from markdown.
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  if (!markdown || typeof markdown !== "string") return [];

  const rawLines = markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const headings: HeadingItem[] = [];
  const idCounts: Record<string, number> = {};

  let inCodeBlock = false;

  for (const line of rawLines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      // Skip H1 if used as document title, keep H2, H3, H4
      const rawText = match[2].replace(/\*\*/g, "").replace(/\*/g, "").trim();
      let baseId = slugifyHeading(rawText);
      if (!baseId) baseId = `section-${headings.length + 1}`;

      let finalId = baseId;
      if (idCounts[baseId]) {
        idCounts[baseId]++;
        finalId = `${baseId}-${idCounts[baseId]}`;
      } else {
        idCounts[baseId] = 1;
      }

      headings.push({
        id: finalId,
        text: rawText,
        level,
      });
    }
  }

  return headings;
}

/**
 * Parses markdown into modern, beautifully styled blog HTML.
 */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown || typeof markdown !== "string") return "";

  const rawLines = markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  const output: string[] = [];
  const idCounts: Record<string, number> = {};

  let inList: "ul" | "ol" | null = null;
  let inBlockquote = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      const text = paragraphLines.join("<br/>");
      if (text.trim()) {
        output.push(
          `<p class="mb-6 leading-relaxed text-gray-700 text-base sm:text-[17px] font-normal">${formatInline(
            text
          )}</p>`
        );
      }
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (inList) {
      output.push(`</${inList}>`);
      inList = null;
    }
  };

  const flushBlockquote = () => {
    if (inBlockquote) {
      output.push(`</blockquote>`);
      inBlockquote = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const parsedTable = renderTable(tableRows);
      output.push(parsedTable);
      inTable = false;
      tableRows = [];
    }
  };

  const generateId = (text: string) => {
    const raw = text.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").replace(/\*/g, "").trim();
    let base = slugifyHeading(raw);
    if (!base) base = "section";
    if (idCounts[base]) {
      idCounts[base]++;
      return `${base}-${idCounts[base]}`;
    }
    idCounts[base] = 1;
    return base;
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // 1. Code blocks (```)
    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();

      if (inCodeBlock) {
        output.push(
          `<div class="relative my-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-md"><div class="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 text-xs font-mono text-gray-400"><span>Code Snippet</span></div><pre class="p-5 overflow-x-auto text-sm font-mono text-gray-100 leading-relaxed"><code>${escapeHtml(
            codeBlockContent.join("\n")
          )}</code></pre></div>`
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // 2. Empty line resets paragraphs, lists, blockquotes
    if (!trimmed) {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();
      continue;
    }

    // 3. Horizontal Rule (---, ***, ___)
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();
      output.push(`<hr class="my-12 border-gray-200/80" />`);
      continue;
    }

    // 4. Headings (#, ##, ###, ####, #####, ######)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();

      const level = headingMatch[1].length;
      const rawText = headingMatch[2].trim();
      const slugId = generateId(rawText);
      const content = formatInline(rawText);

      switch (level) {
        case 1:
        case 2:
          output.push(
            `<h2 id="${slugId}" class="scroll-mt-28 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 mt-12 mb-5 pb-3 border-b border-gray-100 flex items-center justify-between group"><span>${content}</span><a href="#${slugId}" class="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-700 text-lg transition-opacity ml-2 flex-shrink-0" aria-label="Link to section">#</a></h2>`
          );
          break;
        case 3:
          output.push(
            `<h3 id="${slugId}" class="scroll-mt-28 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mt-9 mb-4 flex items-center justify-between group"><span>${content}</span><a href="#${slugId}" class="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-700 text-base transition-opacity ml-2 flex-shrink-0" aria-label="Link to section">#</a></h3>`
          );
          break;
        case 4:
          output.push(
            `<h4 id="${slugId}" class="scroll-mt-28 text-lg sm:text-xl font-bold text-gray-900 mt-7 mb-3">${content}</h4>`
          );
          break;
        default:
          output.push(
            `<h5 id="${slugId}" class="scroll-mt-28 text-base sm:text-lg font-semibold text-gray-800 mt-6 mb-2">${content}</h5>`
          );
          break;
      }
      continue;
    }

    // 5. Unordered List (- or * or +)
    const ulMatch = line.match(/^(\s*)([-*+])\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      flushBlockquote();
      flushTable();

      if (inList !== "ul") {
        flushList();
        output.push(`<ul class="my-6 space-y-3 pl-1">`);
        inList = "ul";
      }

      output.push(
        `<li class="flex items-start gap-3 text-gray-700 text-base sm:text-[17px] leading-relaxed"><span class="mt-2.5 w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0"></span><span class="flex-1">${formatInline(
          ulMatch[3].trim()
        )}</span></li>`
      );
      continue;
    }

    // 6. Ordered List (1. , 2. )
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      flushBlockquote();
      flushTable();

      if (inList !== "ol") {
        flushList();
        output.push(`<ol class="my-6 space-y-3 pl-1">`);
        inList = "ol";
      }

      output.push(
        `<li class="flex items-start gap-3 text-gray-700 text-base sm:text-[17px] leading-relaxed"><span class="mt-0.5 w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 border border-indigo-100">${
          olMatch[2]
        }</span><span class="flex-1">${formatInline(olMatch[3].trim())}</span></li>`
      );
      continue;
    }

    // 7. Blockquote (> quote)
    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      flushTable();

      const quoteContent = trimmed.replace(/^>\s*/, "");
      if (!inBlockquote) {
        output.push(
          `<blockquote class="relative my-8 p-6 bg-gradient-to-r from-indigo-50/70 via-neutral-50/80 to-white rounded-2xl border-l-4 border-indigo-600 shadow-xs">`
        );
        inBlockquote = true;
      }
      output.push(
        `<p class="text-gray-800 text-base sm:text-[17px] italic font-medium leading-relaxed mb-2 last:mb-0">${formatInline(
          quoteContent
        )}</p>`
      );
      continue;
    }

    // 8. Markdown Table lines (| Col 1 | Col 2 |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      flushBlockquote();

      inTable = true;
      tableRows.push(trimmed);
      continue;
    }

    // If we were in a list, blockquote, or table, but reached a regular text line
    flushList();
    flushBlockquote();
    flushTable();

    // 9. Regular text paragraph line
    paragraphLines.push(trimmed);
  }

  // Flush remaining buffers at the end of content
  flushParagraph();
  flushList();
  flushBlockquote();
  flushTable();

  return output.join("\n");
}

/**
 * Format inline markdown elements:
 * - **bold** and __bold__
 * - *italic* and _italic_
 * - `code`
 * - [text](url)
 */
function formatInline(text: string): string {
  if (!text) return "";

  let res = text;

  // Code: `code`
  res = res.replace(
    /`([^`]+)`/g,
    '<code class="bg-indigo-50/80 text-indigo-700 px-2 py-0.5 rounded-md text-sm font-mono border border-indigo-100/60 font-medium">$1</code>'
  );

  // Bold: **text** or __text__
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-950">$1</strong>');
  res = res.replace(/__(.*?)__/g, '<strong class="font-bold text-gray-950">$1</strong>');

  // Italic: *text* or _text_
  res = res.replace(/(^|[^*])\*(?!\*)(.*?)\*(?!\*)/g, '$1<em class="italic text-gray-800">$2</em>');
  res = res.replace(/(^|[^_])_(?!_)(.*?)_(?!_)/g, '$1<em class="italic text-gray-800">$2</em>');

  // Links: [label](url)
  res = res.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-medium underline underline-offset-4 decoration-indigo-300 hover:decoration-indigo-600 hover:text-indigo-800 transition-colors">$1</a>'
  );

  return res;
}

/**
 * Render Markdown Table Rows into styled HTML Table
 */
function renderTable(rows: string[]): string {
  if (rows.length < 2) return "";

  const parseRow = (row: string) =>
    row
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());

  const headerCells = parseRow(rows[0]);
  const isSeparator = (r: string) => /^[|\s-:]+$/.test(r);

  const startDataIndex = isSeparator(rows[1]) ? 2 : 1;
  const dataRows = rows.slice(startDataIndex).map(parseRow);

  let html = `<div class="overflow-x-auto my-8 border border-gray-200/90 rounded-2xl shadow-xs bg-white"><table class="min-w-full divide-y divide-gray-200 text-sm sm:text-base">`;

  // Thead
  html += `<thead class="bg-gray-50/90"><tr>`;
  headerCells.forEach((c) => {
    html += `<th class="px-5 py-3.5 text-left font-bold text-gray-900 tracking-tight">${formatInline(c)}</th>`;
  });
  html += `</tr></thead>`;

  // Tbody
  html += `<tbody class="divide-y divide-gray-100 bg-white">`;
  dataRows.forEach((r, idx) => {
    const bgClass = idx % 2 === 1 ? "bg-gray-50/40" : "bg-white";
    html += `<tr class="${bgClass} hover:bg-indigo-50/30 transition-colors">`;
    r.forEach((c) => {
      html += `<td class="px-5 py-3.5 text-gray-700 leading-normal">${formatInline(c)}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table></div>`;

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
