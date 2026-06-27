import type { ComponentPropsWithoutRef } from 'react';
import { InfoIcon, LightbulbIcon, ProhibitIcon, WarningCircleIcon, WarningIcon } from '@phosphor-icons/react/ssr';
import ApplicationError from '@portfolio/common/errors/application-error';
import Alert from '@portfolio/design-system/alert';
import AlertDescription from '@portfolio/design-system/alert-description';
import AlertTitle from '@portfolio/design-system/alert-title';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import { createIsomorphicFn } from '@tanstack/react-start';

type CalloutType = 'caution' | 'important' | 'note' | 'tip' | 'warning';

interface MarkdownCalloutProps extends ComponentPropsWithoutRef<'div'> {
  'data-callout-type'?: CalloutType;
}

const ICON_MAP: Record<CalloutType, typeof InfoIcon> = {
  caution: ProhibitIcon,
  important: WarningCircleIcon,
  note: InfoIcon,
  tip: LightbulbIcon,
  warning: WarningIcon,
};

const STYLE_MAP: Record<CalloutType, string> = {
  caution: tw`bg-danger/10 text-danger border-danger/20 [&>svg]:text-danger`,
  important: tw`bg-important/10 text-important border-important/20 [&>svg]:text-important`,
  note: tw`bg-info/10 text-info border-info/20 [&>svg]:text-info`,
  tip: tw`bg-success/10 text-success border-success/20 [&>svg]:text-success`,
  warning: tw`bg-warning/10 text-warning border-warning/20 [&>svg]:text-warning`,
};

const MarkdownCallout = createIsomorphicFn()
  .server(function MarkdownCalloutServer(props: MarkdownCalloutProps) {
    if (props.className === 'markdown-callout') {
      const type = props['data-callout-type'] ?? 'note';
      const Icon = ICON_MAP[type];

      return (
        <Alert className={cn(STYLE_MAP[type])}>
          <Icon className="size-4" />
          {props.children}
        </Alert>
      );
    }

    if (props.className === 'markdown-callout-title') {
      return <AlertTitle>{props.children}</AlertTitle>;
    }

    if (props.className === 'markdown-callout-description') {
      return <AlertDescription>{props.children}</AlertDescription>;
    }

    return <div {...props} />;
  })
  .client(() => {
    throw new ApplicationError(500, 'MarkdownCallout component cannot be used on the client side!');
  });

export default MarkdownCallout;
