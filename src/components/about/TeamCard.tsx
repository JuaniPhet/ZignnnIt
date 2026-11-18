import Image from "next/image";
import type { TeamMember } from "@/data/team";
import type { Locale } from "@/i18n/routing";

type TeamCardProps = {
  member: TeamMember;
  locale: Locale;
  /** Resolved on the server: does public/<photo> exist yet? */
  hasPhoto: boolean;
  linkedinLabel: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** 4:5 portrait, greyscale → colour on hover; initials on cream until the photo is added. */
export default function TeamCard({ member, locale, hasPhoto, linkedinLabel }: TeamCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream dark:bg-white/5 border border-amber/20">
        {hasPhoto ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {/* Brand nod: the amber square of the logo behind the initials */}
            <span className="absolute h-24 w-40 -translate-y-8 bg-amber/25 transition-colors duration-500 group-hover:bg-amber/40" />
            <span className="relative font-display text-7xl font-extrabold text-carbon/80 dark:text-white/80">{initials(member.name)}</span>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl text-foreground">{member.name}</h3>
          <p className="mt-1 text-base text-muted-foreground">{member.role[locale]}</p>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkedinLabel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-xl text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <i className="ri-linkedin-fill" aria-hidden="true"></i>
          </a>
        )}
      </div>
    </article>
  );
}
