'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  className?: string;
  deletingSpeed?: number;
  pauseDuration?: number;
  phrases: string[];
  typingSpeed?: number;
}

/**
 * Animates through a list of phrases with a typewriter cursor effect.
 * @param root0
 * @param root0.phrases
 * @param root0.typingSpeed
 * @param root0.deletingSpeed
 * @param root0.pauseDuration
 * @param root0.className
 */
export default function Typewriter({
  className,
  deletingSpeed = 35,
  pauseDuration = 2200,
  phrases,
  typingSpeed = 75,
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] ?? '';
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentPhrase.slice(0, text.length - 1)
            : currentPhrase.slice(0, text.length + 1),
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}
