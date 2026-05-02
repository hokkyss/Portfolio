import tw from '@portfolio/design-system/tw';
import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';

const CONTACTS = [
  {
    href: 'https://link.hokkyss.com/mail-me',
    icon: EnvelopeIcon,
    id: 'contact-email',
    label: 'hokkyss2@gmail.com',
    title: 'Email',
  },
  {
    href: 'https://link.hokkyss.com/github',
    icon: GithubLogoIcon,
    id: 'contact-github',
    label: 'hokkyss',
    title: 'GitHub',
  },
  {
    href: 'https://link.hokkyss.com/linkedin',
    icon: LinkedinLogoIcon,
    id: 'contact-linkedin',
    label: 'Hokki Suwanda',
    title: 'LinkedIn',
  },
] as const;

/**
 * Minimal contact section with links to email, GitHub, and LinkedIn.
 */
export default function ContactSection() {
  return (
    <section className={tw`mx-auto max-w-6xl px-6 py-24`} id="contact">
      <p className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}>
        $ curl -X POST /api/contact
      </p>
      <h2 className={tw`mb-4 text-4xl font-bold tracking-tight`}>Let's Connect</h2>
      <p className={tw`mb-12 max-w-xl text-muted-foreground`}>
        Open to new opportunities, collaborations, and interesting conversations. Feel free to
        reach out.
      </p>

      <div className={tw`flex flex-wrap gap-4`}>
        {CONTACTS.map(({ href, icon: Icon, id, label, title }) => (
          <a
            aria-label={`${title}: ${label}`}
            className={tw`flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary`}
            href={href}
            id={id}
            key={id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon size={18} weight="duotone" />
            <div>
              <div className={tw`text-xs text-muted-foreground`}>{title}</div>
              <div>{label}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
