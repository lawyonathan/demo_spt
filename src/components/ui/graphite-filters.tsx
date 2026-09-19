/**
 * Shared SVG filter primitives for the graphite kit. Render once per page
 * (GraphitePaper does this for you). Referenced from CSS as url(#id).
 *
 *  - graphite-rough  : low-frequency displacement, a steady hand's wobble
 *  - graphite-boil   : the same, with the noise seed stepping every few
 *                      frames ("boiling line", like animation shot on twos)
 *  - graphite-rub    : flat side-of-the-lead rub: the fill is eaten by paper
 *                      tooth noise, haloed by loose powder, then wobbled
 *  - graphite-chalk  : the rub's sparse, stippled cousin for the slate phase
 */
export function GraphiteFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <filter id="graphite-rough" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="graphite-boil" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="1" result="wobble">
            <animate attributeName="seed" values="1;5;9;13" dur="0.55s" calcMode="discrete" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="graphite-rub" x="-12%" y="-25%" width="124%" height="150%" colorInterpolationFilters="sRGB">
          {/* paper tooth eats holes out of the fill */}
          <feTurbulence type="fractalNoise" baseFrequency="0.7 0.9" numOctaves="3" seed="7" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -1.05" result="toothMask" />
          <feComposite in="SourceGraphic" in2="toothMask" operator="in" result="rubbed" />
          {/* loose powder halo around the mark */}
          <feGaussianBlur in="rubbed" stdDeviation="1.6" result="halo" />
          <feColorMatrix in="halo" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0" result="haloSoft" />
          <feMerge result="stack">
            <feMergeNode in="haloSoft" />
            <feMergeNode in="rubbed" />
          </feMerge>
          {/* hand wobble */}
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="2" result="wobble" />
          <feDisplacementMap in="stack" in2="wobble" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="graphite-chalk" x="-12%" y="-25%" width="124%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.8 1.1" numOctaves="2" seed="11" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.8 0 0 0 -0.95" result="toothMask" />
          <feComposite in="SourceGraphic" in2="toothMask" operator="in" result="rubbed" />
          <feGaussianBlur in="rubbed" stdDeviation="0.9" result="halo" />
          <feColorMatrix in="halo" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" result="haloSoft" />
          <feMerge result="stack">
            <feMergeNode in="haloSoft" />
            <feMergeNode in="rubbed" />
          </feMerge>
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed="5" result="wobble" />
          <feDisplacementMap in="stack" in2="wobble" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
