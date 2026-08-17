'use client';

import { CircleNotchIcon, WarningCircleIcon } from '@phosphor-icons/react';
import Alert from '@portfolio/design-system/alert';
import AlertDescription from '@portfolio/design-system/alert-description';
import AlertTitle from '@portfolio/design-system/alert-title';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import useApplicationTheme from '@portfolio/design-system/use-application-theme';
import { useEffect, useId, useState } from 'react';

interface MarkdownMermaidProps {
  chart: string;
  className?: string;
}

/**
 * Client-side component to render Mermaid diagrams with theme reactivity and lazy loading.
 * @param root0
 * @param root0.chart
 * @param root0.className
 */
export default function MarkdownMermaid({ chart, className }: MarkdownMermaidProps) {
  const theme = useApplicationTheme();
  const rawId = useId();
  const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const isDark = theme !== 'light';

    async function renderDiagram() {
      setIsLoading(true);
      setError(null);

      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          fontFamily: 'inherit',
          securityLevel: 'loose',
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          themeVariables: {
            fontFamily: 'inherit',
          },
        });

        const elementId = `mermaid-${cleanId}`;

        // Remove any stale mermaid temporary element if left by previous render
        const existing = document.getElementById(elementId) || document.getElementById(`d${elementId}`);
        if (existing) {
          existing.remove();
        }

        const { svg: renderedSvg } = await mermaid.render(elementId, chart.trim());

        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to render Mermaid diagram');
          setSvg(null);
          setIsLoading(false);
        }
      }
    }

    void renderDiagram();

    return () => {
      isMounted = false;
      const elementId = `mermaid-${cleanId}`;
      const tempElement = document.getElementById(elementId) || document.getElementById(`d${elementId}`);
      if (tempElement) {
        tempElement.remove();
      }
    };
  }, [chart, cleanId, theme]);

  if (error) {
    return (
      <div className={cn(tw`my-6 flex flex-col gap-2`, className)}>
        <Alert className={tw`border-danger/20 bg-danger/10 text-danger [&>svg]:text-danger`}>
          <WarningCircleIcon className="size-4" />
          <AlertTitle>Mermaid Diagram Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <pre className={tw`overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs text-muted-foreground`}>
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  if (isLoading || !svg) {
    return (
      <div
        className={cn(
          tw`my-6 flex min-h-[140px] w-full items-center justify-center rounded-lg border border-border/50 bg-card/50 p-6 text-muted-foreground`,
          className,
        )}
      >
        <CircleNotchIcon className={tw`size-6 animate-spin text-primary`} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        tw`mermaid-container my-6 flex w-full items-center justify-center overflow-x-auto rounded-lg border border-border/50 bg-card/50 p-6 [&>svg]:max-w-full [&>svg]:h-auto`,
        className,
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
