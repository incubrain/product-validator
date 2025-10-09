// shared/utils/social-links.ts

type SocialPlatform = 'youtube' | 'github' | 'x' | 'linkedin' | 'website';

interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

/**
 * Get social links by platform(s)
 * - Single platform string → returns object or undefined
 * - Array with one platform → returns object or undefined
 * - Array with multiple platforms → returns array
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
