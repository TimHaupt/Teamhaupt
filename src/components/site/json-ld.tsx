/**
 * Rendert strukturierte Daten als JSON-LD.
 *
 * Der Inhalt stammt ausschliesslich aus eigenen, typisierten Datenquellen
 * (src/lib/schema.ts), nie aus Nutzereingaben – deshalb ist das Einsetzen
 * per dangerouslySetInnerHTML hier unbedenklich. `<` wird dennoch escaped,
 * damit ein Wert niemals das Script-Tag schliessen kann.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
