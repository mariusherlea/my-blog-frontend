export const getMediaUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};
export function getCoverUrl(cover: any) {
  if (!cover) return "";
  if (cover.url) return cover.url; // detail page
  if (cover.data?.attributes?.url) return cover.data.attributes.url; // list page
  return "";
}