/**
 * Calculate the estimated reading time for a given text.
 * @param text - The content to estimate reading time for.
 * @param wordsPerMinute - The average reading speed (default 200).
 * @returns The estimated reading time in minutes (minimum 1).
 */
export function getReadingTime(text: string, wordsPerMinute = 200): number {
  if (!text) {
    return 1;
  }

  // Remove markdown/HTML characters for a cleaner word count
  const plainText = text.replace(/<[^>]*>?/gm, '').trim();
  if (!plainText) {
    return 1;
  }

  const wordCount = plainText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime);
}
