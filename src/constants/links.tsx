import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export const navbarLinks = [
  {
    id: 1,
    title: "Inicio",
    href: "/",
  },
  {
    id: 2,
    title: "Productos",
    href: "/productos",
  },
  {
    id: 3,
    title: "Sobre nosotros",
    href: "/nosotros",
  },
];

export const socialLinks = [

  {
    id: 1,
    title: 'Facebook',
    href: 'https://web.facebook.com/ropaintimacarolcolombia#',
    icon: <FaFacebookF />
  },

  {
    id: 2,
    title: 'Instagram',
    href: 'https://www.instagram.com/ropaintima.carol/',
    icon: <FaInstagram />
  },

  {
    id: 3,
    title: 'Tiktok',
    href: 'https://www.tiktok.com/@ropa_lntima_carol',
    icon: <FaTiktok />
  },

  {
    id: 4,
    title: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=',
    icon: <FaWhatsapp />
  },

]