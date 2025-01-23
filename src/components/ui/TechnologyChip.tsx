interface TechnologyChip {
  icon: string;
  label: string;
  href?: string;
}

const TechnologyChip: React.FC<TechnologyChip> = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/50 bg-white/50 px-3 py-1 text-sm text-gray-600 hover:bg-blue-50 dark:border-gray-800/50 dark:bg-gray-900/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
  >
    <img src={icon} alt={label} className="h-4 w-4" />
    <span>{label}</span>
  </a>
);

export default TechnologyChip;
