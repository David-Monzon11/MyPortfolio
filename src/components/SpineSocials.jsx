import './SpineSocials.css';

const SOCIALS = [
  {
    id: 'facebook',
    label: 'FACEBOOK',
    href: 'https://www.facebook.com/profile.php?id=61583648378739',
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    href: 'https://www.instagram.com/monzy_david/?hl=en',
  },
  {
    id: 'tiktok',
    label: 'TIKTOK',
    href: 'https://www.tiktok.com/@13_10_v_9_4',
  },
  {
    id: 'email',
    label: 'EMAIL',
    href: 'mailto:davidmonzon156@gmail.com',
  },
];

export default function SpineSocials() {
  return (
    <aside className="spine-socials" aria-label="Social links">
      {SOCIALS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target={s.id !== 'email' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="spine-socials__link"
          aria-label={s.label}
        >
          {s.label}
        </a>
      ))}
    </aside>
  );
}
