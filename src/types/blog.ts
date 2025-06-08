export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  content?: string;
  component?: React.ComponentType;
}

export interface BlogMetadata {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  description?: string;
} 