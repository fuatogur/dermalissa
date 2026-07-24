// Arapça (RTL) metin içine gömülü LTR parçaları — Latin kelimeler, sayılar ve onlara
// bağlı noktalama — bidi algoritması yeniden sıralayıp bozabiliyor. Örnekler:
//   "15–20"   → görsel "20–15" (aralık tersine)
//   "SPF 50+" → "+" sola kaçıyor
//   "5 %"     → "% 5"
// Bu yardımcı, bu parçaları <bdi dir="ltr"> ile izole edip doğru okunmalarını sağlar;
// RTL yerleşimi bozulmaz, sadece parça içi sıralama LTR olur. LTR dillerde no-op.
// Bir LTR parça: Latin/rakam ile başlar (hemen öncesinde varsa açılış parantezini de
// içine alır), aralarda bağlayıcı noktalama/boşluk olabilir, Latin/rakam/%/+/) ile biter.
const LTR_RUN = /\(?[A-Za-z0-9][A-Za-z0-9%+\-–—.,:/()'"\s]*[A-Za-z0-9%+)]|[A-Za-z0-9]/g;

export function isolateLtr(text, lang) {
  if (lang !== "ar" || typeof text !== "string" || !/[A-Za-z0-9]/.test(text)) {
    return text;
  }
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;
  LTR_RUN.lastIndex = 0;
  while ((m = LTR_RUN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <bdi key={key++} dir="ltr">
        {m[0]}
      </bdi>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
