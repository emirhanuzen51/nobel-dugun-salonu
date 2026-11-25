// Netlify derleme sırasında sitenin birincil adresini URL ortam değişkeniyle verir.
// Özel alan adı bağlandığında Netlify bu değeri otomatik günceller.
export const siteUrl = (process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
