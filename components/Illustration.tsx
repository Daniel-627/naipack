/**
 * Simple drawings used until a real photo is added for a product in the Studio.
 * Matched by product slug; unknown slugs get a generic box.
 */
export function Illustration({ slug, title }: { slug: string; title: string }) {
  switch (slug) {
    case "bags":
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <ellipse cx="180" cy="262" rx="110" ry="9" fill="rgba(10,43,40,.18)" />
          <polygon points="250,70 280,56 280,250 250,258" fill="#A87F55" />
          <rect x="110" y="70" width="140" height="188" fill="#C9A27A" />
          <polygon points="110,70 250,70 280,56 140,56" fill="#8F6B47" />
          <rect x="110" y="70" width="140" height="8" fill="#B48C62" />
          <path d="M140 62 C140 12 220 12 220 62" fill="none" stroke="#7A5A3A" strokeWidth="4" strokeLinecap="round" />
          <text x="180" y="160" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="22" fill="#0F3D38">
            BRAND
          </text>
          <line x1="158" x2="202" y1="176" y2="176" stroke="#0F3D38" strokeWidth="2" opacity=".5" />
        </svg>
      );
    case "cards":
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <g transform="rotate(-6 160 124)">
            <rect x="70" y="70" width="180" height="108" rx="8" fill="#0F3D38" />
            <rect x="90" y="92" width="60" height="8" rx="2" fill="#C9A27A" />
            <rect x="90" y="140" width="100" height="5" rx="2" fill="#9DB8B3" />
            <rect x="90" y="152" width="76" height="5" rx="2" fill="#9DB8B3" />
          </g>
          <g transform="rotate(5 200 174)">
            <rect x="110" y="120" width="180" height="108" rx="8" fill="#fff" stroke="#C5D3CF" strokeWidth="2" />
            <rect x="130" y="142" width="70" height="9" rx="2" fill="#0F3D38" />
            <rect x="130" y="160" width="46" height="5" rx="2" fill="#4A6561" />
            <rect x="130" y="190" width="104" height="5" rx="2" fill="#9DB8B3" />
            <rect x="130" y="202" width="82" height="5" rx="2" fill="#9DB8B3" />
          </g>
        </svg>
      );
    case "brochures":
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <ellipse cx="180" cy="256" rx="130" ry="9" fill="rgba(10,43,40,.15)" />
          <polygon points="60,66 134,74 134,226 60,218" fill="#fff" stroke="#C5D3CF" strokeWidth="2" />
          <polygon points="134,74 226,74 226,226 134,226" fill="#EAF1EF" stroke="#C5D3CF" strokeWidth="2" />
          <polygon points="226,74 300,66 300,218 226,226" fill="#0F3D38" />
          <rect x="76" y="96" width="42" height="8" rx="2" fill="#0F3D38" />
          <rect x="76" y="116" width="42" height="4" rx="2" fill="#9DB8B3" />
          <rect x="76" y="126" width="32" height="4" rx="2" fill="#9DB8B3" />
          <rect x="152" y="98" width="56" height="8" rx="2" fill="#0F3D38" />
          <rect x="152" y="118" width="56" height="4" rx="2" fill="#9DB8B3" />
          <rect x="152" y="128" width="46" height="4" rx="2" fill="#9DB8B3" />
          <rect x="152" y="138" width="52" height="4" rx="2" fill="#9DB8B3" />
          <rect x="244" y="98" width="40" height="8" rx="2" fill="#C9A27A" />
          <rect x="244" y="118" width="42" height="4" rx="2" fill="#9DB8B3" />
          <rect x="244" y="128" width="30" height="4" rx="2" fill="#9DB8B3" />
        </svg>
      );
    case "delivery-notes":
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <rect x="124" y="68" width="160" height="196" rx="4" fill="#EAD9C1" />
          <rect x="112" y="58" width="160" height="196" rx="4" fill="#F3E7D6" />
          <rect x="100" y="48" width="160" height="196" rx="4" fill="#fff" stroke="#C5D3CF" strokeWidth="2" />
          <rect x="100" y="48" width="160" height="38" rx="4" fill="#0F3D38" />
          <text x="114" y="72" fontFamily="Poppins, sans-serif" fontWeight="600" fontSize="11" fill="#fff">
            DELIVERY NOTE
          </text>
          <text x="246" y="72" textAnchor="end" fontFamily="Poppins, sans-serif" fontWeight="500" fontSize="11" fill="#C9A27A">
            No. 0001
          </text>
          <rect x="116" y="104" width="60" height="5" rx="2" fill="#4A6561" />
          <line x1="116" x2="244" y1="136" y2="136" stroke="#C5D3CF" strokeWidth="2" />
          <line x1="116" x2="244" y1="158" y2="158" stroke="#C5D3CF" strokeWidth="2" />
          <line x1="116" x2="244" y1="180" y2="180" stroke="#C5D3CF" strokeWidth="2" />
          <line x1="116" x2="244" y1="202" y2="202" stroke="#C5D3CF" strokeWidth="2" />
          <rect x="116" y="220" width="52" height="5" rx="2" fill="#9DB8B3" />
        </svg>
      );
    case "thank-you-cards":
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <ellipse cx="180" cy="258" rx="100" ry="9" fill="rgba(10,43,40,.18)" />
          <rect x="108" y="46" width="160" height="204" rx="6" fill="#082826" />
          <rect x="100" y="38" width="160" height="204" rx="6" fill="#0F3D38" />
          <text x="180" y="146" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" fontSize="40" fill="#fff">
            Thank you
          </text>
          <line x1="156" x2="204" y1="166" y2="166" stroke="#C9A27A" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 360 280" role="img" aria-label={`Illustration of ${title.toLowerCase()}`}>
          <ellipse cx="180" cy="256" rx="110" ry="9" fill="rgba(10,43,40,.18)" />
          <polygon points="110,110 250,110 250,250 110,250" fill="#C9A27A" />
          <polygon points="110,110 250,110 280,84 140,84" fill="#B48C62" />
          <polygon points="250,110 280,84 280,224 250,250" fill="#A87F55" />
          <rect x="164" y="110" width="32" height="140" fill="#0F3D38" opacity=".85" />
        </svg>
      );
  }
}
