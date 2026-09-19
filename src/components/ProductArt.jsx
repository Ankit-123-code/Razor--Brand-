import { useId } from 'react';

// Original, scalable product illustrations for the demonstration catalogue.
export default function ProductArt({ category, color = '#282c31', className = '' }) {
  const id = useId().replaceAll(':', '');
  return (
    <svg
      className={`product-art ${className}`}
      viewBox="0 0 360 250"
      role="img"
      aria-label={`${category.replaceAll('-', ' ')} product illustration`}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2=".7" y2="1">
          <stop stopColor="#747b83" />
          <stop offset=".3" stopColor={color} />
          <stop offset=".75" stopColor="#17191d" />
          <stop offset="1" stopColor="#454b51" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f7f8f8" />
          <stop offset=".25" stopColor="#9babb8" />
          <stop offset=".5" stopColor="#e9eff3" />
          <stop offset=".65" stopColor="#657786" />
          <stop offset="1" stopColor="#dbe4e9" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e8f5ff" />
          <stop offset=".42" stopColor="#b5c8d4" />
          <stop offset=".52" stopColor="#f4f9fa" />
          <stop offset=".8" stopColor="#738999" />
          <stop offset="1" stopColor="#d6e3e9" />
        </linearGradient>
        <linearGradient id={`${id}-amber`} x1="0" y1="0" x2=".5" y2="1">
          <stop stopColor="#ffcb67" />
          <stop offset=".3" stopColor="#ffa321" />
          <stop offset=".8" stopColor="#dc5c0e" />
          <stop offset="1" stopColor="#ab3c05" />
        </linearGradient>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2=".6" y2="1">
          <stop stopColor="#ea7770" />
          <stop offset=".3" stopColor={color} />
          <stop offset="1" stopColor="#16191c" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" floodOpacity=".19" />
        </filter>
      </defs>
      <ellipse cx="180" cy="211" rx="99" ry="9" fill="#14191e" opacity=".07" />
      <g filter={`url(#${id}-shadow)`}>
        {category === 'headlight' && (
          <g transform="rotate(-8 180 125)">
            <path
              d="M87 89 102 62 143 45 214 48 249 65 274 112 253 176 219 203 124 192 89 161Z"
              fill={`url(#${id}-body)`}
              stroke="#171c22"
              strokeWidth="3"
            />
            <path
              d="m102 87 46-27 64 3 38 25 9 34-23 53-23 13-81-9-30-31Z"
              fill={`url(#${id}-metal)`}
              stroke="#090c10"
              strokeWidth="7"
            />
            <path
              d="m112 92 38-24 59 4 33 21 8 29-20 45-21 13-68-9-27-27Z"
              fill={`url(#${id}-glass)`}
              stroke="#e8edf1"
              strokeWidth="2"
            />
            <path
              d="m123 93 21 73m-6-83 20 88m-4-93 20 96m-3-98 19 99m-2-99 17 95m-1-89 16 80m-1-70 15 49"
              stroke="#71899b"
              strokeWidth="2"
              opacity=".5"
            />
            <path
              d="m119 110 121 14m-119 2 112 13m-104 2 99 12"
              stroke="#fff"
              strokeWidth="2"
              opacity=".6"
            />
            <ellipse
              cx="180"
              cy="123"
              rx="23"
              ry="25"
              fill={`url(#${id}-metal)`}
              stroke="#66808f"
              strokeWidth="3"
            />
            <ellipse
              cx="181"
              cy="121"
              rx="9"
              ry="11"
              fill="#dce6ec"
              stroke="#526575"
              strokeWidth="3"
            />
            <path d="m82 100-9 10 5 34 16 8m164-62 21 7 3 26-14 13" fill="#252a2f" />
            <path d="m125 80 22-12 59 6" fill="none" stroke="white" strokeWidth="4" opacity=".8" />
          </g>
        )}
        {category === 'indicator' && (
          <g>
            <g transform="translate(-8 -12) rotate(-19 180 125)">
              <path d="m111 126 109 13 23 13-4 14-26-3-111-15Z" fill={`url(#${id}-body)`} />
              <path d="m225 144 27 7-2 14-27-7Z" fill={`url(#${id}-metal)`} />
              <path
                d="M86 81c-24 4-29 39-14 55 15 17 47 24 70 19l29-48c-24-17-60-29-85-26Z"
                fill="#181d23"
                stroke="#454b50"
                strokeWidth="3"
              />
              <path
                d="M84 89c-16 5-21 28-10 40 17 14 40 20 63 18l25-36c-27-17-58-28-78-22Z"
                fill={`url(#${id}-amber)`}
              />
              <path
                d="m90 95-5 40m19-35-5 43m20-37-6 41m19-34-7 35m20-28-7 24"
                stroke="#ffd685"
                opacity=".7"
                strokeWidth="3"
              />
            </g>
            <g transform="translate(70 58) rotate(-19 140 120) scale(.8)">
              <path d="m110 126 109 13 23 13-4 14-26-3-111-15Z" fill={`url(#${id}-body)`} />
              <path d="m225 144 27 7-2 14-27-7Z" fill={`url(#${id}-metal)`} />
              <path
                d="M86 81c-24 4-29 39-14 55 15 17 47 24 70 19l29-48c-24-17-60-29-85-26Z"
                fill="#181d23"
                stroke="#454b50"
                strokeWidth="3"
              />
              <path
                d="M84 89c-16 5-21 28-10 40 17 14 40 20 63 18l25-36c-27-17-58-28-78-22Z"
                fill={`url(#${id}-amber)`}
              />
              <path
                d="m90 95-5 40m19-35-5 43m20-37-6 41m19-34-7 35m20-28-7 24"
                stroke="#ffd685"
                opacity=".7"
                strokeWidth="3"
              />
            </g>
          </g>
        )}
        {category === 'mud-guard' && (
          <g transform="rotate(-18 180 125)">
            <path
              d="M64 152c2-59 69-110 139-107 54 2 88 49 95 113l-33 17c-6-58-31-86-72-81-39 5-69 35-83 74Z"
              fill={`url(#${id}-body)`}
              stroke="#24282d"
              strokeWidth="2"
            />
            <path
              d="M68 147c15-53 65-91 124-94 42-2 70 27 86 72"
              fill="none"
              stroke="#969ea7"
              strokeWidth="3"
              opacity=".7"
            />
            <path
              d="M91 156c21-59 69-93 119-86"
              fill="none"
              stroke="#ced2d8"
              strokeWidth="5"
              opacity=".25"
            />
            <path
              d="m164 102-9 49 22 9 12-60m43 10 16 45 21-5-16-40"
              fill="#22272c"
              stroke="#4b5158"
              strokeWidth="2"
            />
            <circle cx="169" cy="143" r="4" fill="#111" />
            <circle cx="251" cy="145" r="4" fill="#111" />
          </g>
        )}
        {category === 'side-panel' && (
          <g transform="rotate(-11 180 125)">
            <path
              d="m62 80 69-20 119 23 48 37-43 71-96-4-73-61Z"
              fill={`url(#${id}-paint)`}
              stroke="#282b31"
              strokeWidth="2"
            />
            <path d="m64 81 69-15 114 25 34 26-113 26-68-22Z" fill={color} opacity=".9" />
            <path d="m73 88 57-15 108 24-67 27Z" fill="white" opacity=".12" />
            <path d="m116 132 56 9 93-20-34 39-63 9Z" fill="#181e25" />
            <path d="m175 143 82-18-15 13-63 17Z" fill="#d9dde1" />
            <path d="m185 160 51-18-13 16-32 11Z" fill="#989da3" />
            <path d="m96 99 59 24" stroke="#fff" opacity=".5" strokeWidth="2" />
            <circle cx="91" cy="91" r="4" fill="#161a21" />
            <circle cx="259" cy="119" r="4" fill="#161a21" />
          </g>
        )}
        {category === 'tail-guard' && (
          <g transform="rotate(-15 180 125)">
            <path
              d="m76 84 38-26 60 23 104-10 19 27-47 38-36 61-42 7-36-70-38-5Z"
              fill={`url(#${id}-body)`}
              stroke="#171b20"
              strokeWidth="3"
            />
            <path d="m90 84 27-13 53 25 108-12-30 32-71 9-38-7Z" fill="#4b525a" />
            <path d="m157 134 26 55 25-5 25-53Z" fill="#14171c" />
            <path
              d="m123 80 48 25 86-9"
              stroke="#a7adb5"
              strokeWidth="3"
              fill="none"
              opacity=".6"
            />
            <path d="m169 130 31 10 36-19" stroke="#c8493e" strokeWidth="7" fill="none" />
            <circle cx="111" cy="84" r="4" fill="#0d1015" />
            <circle cx="269" cy="95" r="4" fill="#0d1015" />
          </g>
        )}
      </g>
    </svg>
  );
}
