import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertGoogleDriveUrl(url: string): string {
  const fileId = url.match(/\/d\/(.*?)\/view/)?.[1];

  if (!fileId) return url;

  // Format using lh3.googleusercontent.com for direct embed
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}