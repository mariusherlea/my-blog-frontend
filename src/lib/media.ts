export const getMediaUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};
