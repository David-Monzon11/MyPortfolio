import './SpineSocials.css';

const SOCIALS = [
  {
    id: 'facebook',
    label: 'FACEBOOK',
    href: 'https://www.facebook.com/profile.php?id=61583648378739',
  },
  {
    id: 'GitHub',
    label: 'GITHUB',
    href: 'https://github.com/David-Monzon11/',
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
