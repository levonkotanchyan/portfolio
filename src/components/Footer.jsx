import { FiGithub, FiSend, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

const socials = [
    { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/levonkotanchyan' },
    { icon: <FiSend />, label: 'Telegram', href: 'https://t.me/levonkotanchyan' },
    { icon: <FiMail />, label: 'Email', href: 'mailto:leva.lepmov2008@gmail.com' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container footer__inner">
                <div className="footer__socials">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__link"
                            aria-label={s.label}
                            id={`footer-${s.label.toLowerCase()}`}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <p className="footer__copy">
                    Built with <FiHeart className="footer__heart" /> and lots of coffee
                </p>

                <p className="footer__year">© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
