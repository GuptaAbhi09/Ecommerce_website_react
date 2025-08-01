import * as React from "react";

export const Footer: React.FC = () => {
  const footerLinks = [
    { text: "About Us", href: "#" },
    { text: "Contact", href: "#" },
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ];

  const socialIcons = [
    {
      src: "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/1c0bf1a64c271c57eacac71ce610c2c026c95d72?placeholderIfAbsent=true",
      alt: "Facebook",
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/a0c08e38152bb471e7333fa32a0793f72f1f519f?placeholderIfAbsent=true",
      alt: "Twitter",
    },
    {
      src: "https://api.builder.io/api/v1/image/assets/7cf3537fa35d4fc79e00032bb1e43a7a/7f12c51c72ea09d62936d72e515fa47ec79af224?placeholderIfAbsent=true",
      alt: "Instagram",
    },
  ];

  return (
    <footer className="w-full bg-white text-slate-500 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
          {footerLinks.map((link, index) => (
            <a key={index} href={link.href} className="hover:text-black transition">
              {link.text}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          {socialIcons.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt={icon.alt}
              className="w-6 h-6 object-contain"
            />
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-center">
          © 2024 Tech Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
