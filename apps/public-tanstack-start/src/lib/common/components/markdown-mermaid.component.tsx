'use client';

import { CircleNotchIcon, WarningCircleIcon } from '@phosphor-icons/react';
import Alert from '@portfolio/design-system/alert';
import AlertDescription from '@portfolio/design-system/alert-description';
import AlertTitle from '@portfolio/design-system/alert-title';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import useApplicationTheme from '@portfolio/design-system/use-application-theme';
import { tryit } from '@portfolio/utils';
import { useEffect, useId, useState, useTransition } from 'react';

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
  'use no memo';

  const theme = useApplicationTheme();
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/:/g, '')}`;
  const [svg, setSvg] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isCancelled = false;
    const isDark = theme !== 'light';

    startTransition(async () => {
      setError(null);

      const [mermaidModule, importErr] = await tryit(import('mermaid'));
      if (isCancelled) return;

      if (importErr || !mermaidModule?.default) {
        setError(importErr instanceof Error ? importErr.message : 'Failed to load Mermaid');
        setSvg(null);
        return;
      }

      const mermaid = mermaidModule.default;

      mermaid.initialize({
        fontFamily: 'inherit',
        securityLevel: 'loose',
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        themeVariables: {
          fontFamily: 'inherit',
        },
      });

      const [result, err] = await tryit(mermaid.render(id, chart.trim()));
      if (isCancelled) return;

      if (err) {
        setError(err instanceof Error ? err.message : 'Failed to render Mermaid diagram');
        setSvg(null);
      } else {
        setSvg(result.svg);
        setError(null);
      }
    });

    return () => {
      isCancelled = true;
      setError(null);
      setSvg(null);
    };
  }, [chart, id, theme]);

  if (error) {
    return (
      <div className={cn(
        tw`my-6 flex flex-col gap-2`,
        className,
      )}
      >
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

  if (isPending) {
    return (
      <div className={cn(
        tw`my-6 flex min-h-35 w-full items-center justify-center rounded-lg border border-border/50 bg-card/50 p-6 text-muted-foreground`,
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
        tw`my-6 flex mermaid-container w-full items-center justify-center overflow-x-auto rounded-lg border border-border/50 bg-card/50 p-6 [&>svg]:max-w-full [&>svg]:h-auto`,
        className,
      )}
      // we trust mermaid's strings
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: svg ?? '' }}
    />
  );
}
