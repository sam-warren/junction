import githubIcon from '@/assets/github.svg'  // or '@/assets/github.svg' if @ alias is configured
import linkedinIcon from '@/assets/linkedin.svg'

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/sam-warren/junction",
    icon: githubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/junctiontech",
    icon: linkedinIcon,
  },
] as const;
