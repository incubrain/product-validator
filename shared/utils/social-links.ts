// shared/utils/social-links.ts

type SocialPlatform = 'youtube' | 'github' | 'x' | 'linkedin' | 'website';

interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

/**
 * Filter social links by platform
 * 
 * @param links - Array of social links from site config
 * @param platforms - Array of platform names to filter by (e.g., ['youtube', 'github', 'x'])
 * @returns Filtered array of social links matching the specified platforms
 * 
 * @example
 * ```ts
 * const links = pickSocialLinks(configData.social.links, ['youtube', 'github']);
 * // Returns only YouTube and GitHub links
 * ```
 */
export function pickSocialLinks(
  links: SocialLink[],
  platforms: SocialPlatform[],
): SocialLink[] {
  const filtered = links.filter((link) =>
    platforms.includes(link.platform as SocialPlatform),
  );

  return filtered;
}
