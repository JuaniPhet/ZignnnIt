"use client"

import { memo, useEffect, useRef } from "react";
import { initZgHero } from "./hero-animations";
import "./hero-animations.css";

/**
 * Animated hero illustration (inline SVG — an <img> could not be styled or scripted).
 * - Every id/class comes from docs/hero/hero-illustration.svg: CSS and JS target them.
 * - clipPath/mask/gradient ids are prefixed `zg-` to avoid clashes with other SVGs.
 * - initZgHero drives the clock, screen story, lamp and parallax; its cleanup
 *   (returned from the effect) stops the loop and listeners on unmount.
 * - title: translated accessible name (the language comes from the page).
 * - memo: the SVG only re-renders if the title changes, so React never resets the attributes
 *   the animation script writes on each frame.
 */
function HeroIllustration({ title }: { title: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return initZgHero(ref.current);
  }, []);

  return (
    <svg ref={ref} id="zg-hero" className="block w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1720 1220" role="img" aria-labelledby="zg-hero-title">
      <title id="zg-hero-title">{title}</title>
      <style>{`
        #zg-hero{--zg-outline:#2A2623;--zg-carbon:#1C1A18;--zg-carbon2:#3A3430;--zg-amber:#F59E0B;--zg-amber-l:#FCD34D;--zg-amber-d:#D97706;--zg-cream:#FAF7F2;--zg-light:#ECE6DC;--zg-gray:#8F8882;--zg-sage:#8AA37B;--zg-sage-d:#5E7A52;--zg-steam:#D9D2C7;--zg-bulb:#FFF6DC;--zg-arm:#2A2623;--zg-editor:#121110;overflow:visible}
        #zg-hero .ol{stroke:var(--zg-outline);stroke-width:5;stroke-linejoin:round;stroke-linecap:round}
        #zg-hero .ol-thin{stroke:var(--zg-outline);stroke-width:3.5;stroke-linejoin:round;stroke-linecap:round}
        #zg-hero .f-carbon{fill:var(--zg-carbon)}
        #zg-hero .f-carbon2{fill:var(--zg-carbon2)}
        #zg-hero .f-amber{fill:var(--zg-amber)}
        #zg-hero .f-amber-l{fill:var(--zg-amber-l)}
        #zg-hero .f-amber-d{fill:var(--zg-amber-d)}
        #zg-hero .f-cream{fill:var(--zg-cream)}
        #zg-hero .f-light{fill:var(--zg-light)}
        #zg-hero .f-gray{fill:var(--zg-gray)}
        #zg-hero .f-sage{fill:var(--zg-sage)}
        #zg-hero .f-bulb{fill:var(--zg-bulb)}
        #zg-hero .f-editor{fill:var(--zg-editor)}
        #zg-hero .s-outline{stroke:var(--zg-outline)}
        #zg-hero .s-arm{stroke:var(--zg-arm)}
        #zg-hero .s-gray{stroke:var(--zg-gray)}
        #zg-hero .s-sage-d{stroke:var(--zg-sage-d)}
        #zg-hero .s-amber{stroke:var(--zg-amber)}
        #zg-hero .steam-path{fill:none;stroke:var(--zg-steam);stroke-width:20;stroke-linecap:round}
      `}</style>

      <defs>
        <clipPath id="zg-clip-clock"><rect x="767" y="42" width="236" height="236" rx="10"/></clipPath>
        <clipPath id="zg-clip-screen"><rect x="525" y="525" width="760" height="380" rx="12"/></clipPath>
        <clipPath id="zg-clip-canvas"><rect x="605" y="605" width="475" height="282" rx="6"/></clipPath>
        <radialGradient id="zg-light-grad" cx="400" cy="667" r="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FCD34D" stopOpacity=".55"/>
          <stop offset=".55" stopColor="#F59E0B" stopOpacity=".16"/>
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="zg-steam-fade" x1="0" y1="830" x2="0" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000"/>
          <stop offset=".12" stopColor="#fff"/>
          <stop offset=".6" stopColor="#fff" stopOpacity=".7"/>
          <stop offset="1" stopColor="#000"/>
        </linearGradient>
        <mask id="zg-steam-mask" maskUnits="userSpaceOnUse" x="1380" y="440" width="220" height="400">
          <rect x="1380" y="440" width="220" height="400" fill="url(#zg-steam-fade)"/>
        </mask>
      </defs>

      {/* ============ HORLOGE ============ */}
      <g id="layer-clock">
        <g id="clock">
          <rect id="clock-frame" x="745" y="20" width="280" height="280" rx="22" className="f-carbon ol"/>
          <rect id="clock-face" x="767" y="42" width="236" height="236" rx="10" className="f-cream ol-thin"/>
          <g clipPath="url(#zg-clip-clock)" opacity=".55">
            <polygon points="767,200 925,42 965,42 767,240" fill="#fff"/>
            <polygon points="800,278 1003,75 1003,110 835,278" fill="#fff"/>
          </g>
          <g id="clock-ticks">
            <rect x="879" y="56" width="12" height="26" rx="6" className="f-amber"/>
            <rect x="879" y="238" width="12" height="26" rx="6" className="f-amber"/>
            <rect x="781" y="154" width="26" height="12" rx="6" className="f-amber"/>
            <rect x="963" y="154" width="26" height="12" rx="6" className="f-amber"/>
            <g className="f-gray">
              <circle cx="937" cy="70" r="5"/><circle cx="975" cy="108" r="5"/>
              <circle cx="975" cy="212" r="5"/><circle cx="937" cy="250" r="5"/>
              <circle cx="833" cy="250" r="5"/><circle cx="795" cy="212" r="5"/>
              <circle cx="795" cy="108" r="5"/><circle cx="833" cy="70" r="5"/>
            </g>
          </g>
          <line id="clock-hand-hour" x1="885" y1="172" x2="885" y2="102" strokeWidth="13" strokeLinecap="round" className="s-outline" transform="rotate(300 885 160)"/>
          <line id="clock-hand-minute" x1="885" y1="176" x2="885" y2="72" strokeWidth="8" strokeLinecap="round" className="s-outline" transform="rotate(60 885 160)"/>
          <line id="clock-hand-second" x1="885" y1="185" x2="885" y2="66" strokeWidth="4" strokeLinecap="round" className="s-amber" transform="rotate(180 885 160)"/>
          <circle id="clock-center" cx="885" cy="160" r="10" className="f-amber ol-thin"/>
        </g>
      </g>

      {/* ============ LAMPE ============ */}
      <g id="layer-lamp">
        <path id="lamp-base" d="M24 1108 L300 1150 L300 1172 L24 1196 Q2 1152 24 1108 Z" className="f-amber ol"/>
        <g id="lamp-arm">
          <line x1="56" y1="1150" x2="98" y2="800" strokeWidth="15" className="s-arm" strokeLinecap="round"/>
          <line x1="86" y1="1150" x2="128" y2="800" strokeWidth="15" className="s-arm" strokeLinecap="round"/>
          <circle cx="72" cy="1150" r="42" className="f-amber ol"/>
          <circle cx="72" cy="1150" r="15" className="f-carbon"/>
          <line x1="98" y1="796" x2="240" y2="534" strokeWidth="15" className="s-arm" strokeLinecap="round"/>
          <line x1="126" y1="810" x2="268" y2="550" strokeWidth="15" className="s-arm" strokeLinecap="round"/>
          <circle cx="112" cy="802" r="44" className="f-amber ol"/>
          <circle cx="112" cy="802" r="16" className="f-carbon"/>
        </g>
        <g id="lamp-head">
          <polygon id="lamp-light" points="468,587 1010,1190 400,1190 333,748" fill="url(#zg-light-grad)"/>
          <circle cx="255" cy="545" r="34" className="f-amber ol"/>
          <circle cx="255" cy="545" r="12" className="f-carbon"/>
          <circle cx="281" cy="566" r="30" className="f-amber-d ol"/>
          <polygon id="lamp-shade" points="300,537 468,587 333,748 256,591" className="f-amber ol"/>
          <polygon points="300,537 468,587 452,606 292,552" className="f-amber-l" opacity=".8"/>
          <ellipse cx="400" cy="667" rx="105" ry="30" transform="rotate(-50 400 667)" className="f-amber-d ol"/>
          <ellipse id="lamp-bulb" cx="404" cy="664" rx="70" ry="18" transform="rotate(-50 404 664)" className="f-bulb"/>
        </g>
      </g>

      {/* ============ ÉCRAN ============ */}
      <g id="layer-monitor">
        <g id="monitor">
          <path d="M790 1020 L1020 1020 L1042 1100 L768 1100 Z" className="f-light ol"/>
          <rect x="740" y="1096" width="330" height="26" rx="7" className="f-light ol"/>
          <rect x="505" y="505" width="800" height="520" rx="26" className="f-light ol"/>
          <rect x="525" y="525" width="760" height="380" rx="12" className="f-carbon"/>
          <rect id="monitor-brand" x="887" y="952" width="36" height="24" rx="3" className="f-amber ol-thin"/>
        </g>

        <g id="screen-ui" clipPath="url(#zg-clip-screen)">
          <rect x="545" y="545" width="720" height="46" rx="8" className="f-carbon2"/>
          <circle cx="572" cy="568" r="8" className="f-gray"/>
          <circle cx="600" cy="568" r="8" className="f-gray"/>
          <circle cx="628" cy="568" r="8" className="f-gray"/>
          <rect x="652" y="560" width="26" height="16" rx="2" className="f-amber"/>
          <rect x="1140" y="562" width="110" height="12" rx="6" className="f-gray" opacity=".5"/>

          <g id="scene-design">
          <rect x="545" y="605" width="46" height="282" rx="6" className="f-carbon2"/>
          <rect x="556" y="618" width="24" height="24" rx="4" className="f-amber"/>
          <rect x="556" y="662" width="24" height="24" rx="4" className="f-gray" opacity=".7"/>
          <rect x="556" y="706" width="24" height="24" rx="4" className="f-gray" opacity=".7"/>
          <rect x="556" y="750" width="24" height="24" rx="4" className="f-gray" opacity=".7"/>
          <rect x="556" y="794" width="24" height="24" rx="4" className="f-gray" opacity=".7"/>
          <rect x="556" y="838" width="24" height="24" rx="4" className="f-gray" opacity=".7"/>

          <rect x="1094" y="605" width="171" height="126" rx="6" className="f-carbon2"/>
          <rect x="1110" y="625" width="130" height="8" rx="4" className="f-gray" opacity=".6"/>
          <rect x="1110" y="649" width="100" height="8" rx="4" className="f-gray" opacity=".6"/>
          <rect x="1110" y="673" width="120" height="8" rx="4" className="f-amber" opacity=".9"/>
          <rect x="1110" y="697" width="80" height="8" rx="4" className="f-gray" opacity=".6"/>

          <rect x="1094" y="742" width="171" height="145" rx="6" className="f-carbon2"/>
          <g id="palette-swatches">
            <rect className="swatch f-amber" x="1110" y="756" width="40" height="36" rx="5" style={{ animationDelay: "0s" }}/>
            <rect className="swatch f-amber-l" x="1158" y="756" width="40" height="36" rx="5" style={{ animationDelay: ".25s" }}/>
            <rect className="swatch f-amber-d" x="1206" y="756" width="40" height="36" rx="5" style={{ animationDelay: ".5s" }}/>
            <rect className="swatch" fill="#C2410C" x="1110" y="798" width="40" height="36" rx="5" style={{ animationDelay: ".75s" }}/>
            <rect className="swatch f-cream" x="1158" y="798" width="40" height="36" rx="5" style={{ animationDelay: "1s" }}/>
            <rect className="swatch f-gray" x="1206" y="798" width="40" height="36" rx="5" style={{ animationDelay: "1.25s" }}/>
            <rect className="swatch f-sage" x="1110" y="840" width="40" height="36" rx="5" style={{ animationDelay: "1.5s" }}/>
            <rect className="swatch f-light" x="1158" y="840" width="40" height="36" rx="5" style={{ animationDelay: "1.75s" }}/>
            <rect className="swatch f-carbon s-gray" strokeWidth="2" x="1206" y="840" width="40" height="36" rx="5" style={{ animationDelay: "2s" }}/>
          </g>

          <rect id="screen-canvas" x="605" y="605" width="475" height="282" rx="6" className="f-cream"/>
          <g clipPath="url(#zg-clip-canvas)">
            <g id="art-circle">
              <circle id="art-circle-fill" cx="745" cy="760" r="88" className="f-amber-l"/>
              <path id="art-circle-stroke" d="M745 672 A88 88 0 1 1 745 848 A88 88 0 1 1 745 672" fill="none" className="s-outline" strokeWidth="5" strokeLinecap="round"/>
              <g id="art-handles">
                <line x1="688" y1="672" x2="802" y2="672" className="s-gray" strokeWidth="3"/>
                <rect x="680" y="664" width="16" height="16" className="f-cream ol-thin"/>
                <rect x="794" y="664" width="16" height="16" className="f-cream ol-thin"/>
                <circle cx="745" cy="672" r="8" className="f-cream ol-thin"/>
              </g>
              <g id="art-pen" transform="translate(745 672) rotate(-20)">
                <rect x="-13" y="-104" width="26" height="44" rx="5" className="f-carbon2 ol-thin"/>
                <polygon points="0,0 -17,-38 -11,-62 11,-62 17,-38" className="f-light ol-thin"/>
                <line x1="0" y1="-2" x2="0" y2="-30" className="s-outline" strokeWidth="3"/>
                <circle cx="0" cy="-32" r="4.5" className="f-carbon"/>
              </g>
            </g>
            <g id="art-rocket" transform="translate(885 790) rotate(-25)">
              <path className="flame f-amber" d="M4 -9 Q-46 0 4 9 Z"/>
              <polygon points="22,-13 2,-36 -8,-31 10,-7" className="f-amber-d ol-thin"/>
              <polygon points="22,13 2,36 -8,31 10,7" className="f-amber-d ol-thin"/>
              <path d="M0 0 C30 -24 92 -24 122 0 C92 24 30 24 0 0 Z" className="f-light ol-thin"/>
              <path d="M40 -17 L58 -17 L58 17 L40 17 Z" className="f-amber"/>
              <circle cx="86" cy="0" r="9" className="f-carbon2 ol-thin"/>
            </g>
          </g>

          </g>
          <g id="scene-code" visibility="hidden">
            <rect x="545" y="605" width="120" height="282" rx="6" className="f-carbon2"/>
            <rect x="558" y="622" width="12" height="10" rx="2" className="f-amber"/>
            <rect x="576" y="623" width="70" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="572" y="646" width="12" height="10" rx="2" className="f-amber"/>
            <rect x="590" y="647" width="56" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="549" y="664" width="112" height="22" rx="4" className="f-amber" opacity=".18"/>
            <rect x="572" y="670" width="10" height="11" rx="2" className="f-gray" opacity=".7"/>
            <rect x="590" y="671" width="64" height="8" rx="4" className="f-cream" opacity="1"/>
            <rect x="572" y="694" width="10" height="11" rx="2" className="f-gray" opacity=".7"/>
            <rect x="590" y="695" width="48" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="558" y="718" width="12" height="10" rx="2" className="f-amber"/>
            <rect x="576" y="719" width="60" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="572" y="742" width="10" height="11" rx="2" className="f-gray" opacity=".7"/>
            <rect x="590" y="743" width="52" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="572" y="766" width="10" height="11" rx="2" className="f-gray" opacity=".7"/>
            <rect x="590" y="767" width="70" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="558" y="790" width="10" height="11" rx="2" className="f-gray" opacity=".7"/>
            <rect x="576" y="791" width="58" height="8" rx="4" className="f-gray" opacity="0.6"/>
            <rect x="675" y="605" width="590" height="200" rx="6" className="f-editor"/>
            <rect x="675" y="605" width="590" height="26" rx="6" className="f-carbon2"/>
            <rect x="675" y="605" width="118" height="26" className="f-editor"/>
            <rect x="675" y="605" width="118" height="3" className="f-amber"/>
            <rect x="690" y="614" width="70" height="8" rx="4" className="f-cream" opacity=".85"/>
            <rect x="808" y="614" width="62" height="8" rx="4" className="f-gray" opacity=".6"/>
            <rect x="886" y="614" width="54" height="8" rx="4" className="f-gray" opacity=".6"/>
            <g id="code-lines">
              <rect x="686" y="644" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="712" data-y="644">
                <rect className="f-amber" x="712" y="643" width="46" height="9" rx="4.5" data-w="46"/>
                <rect className="f-cream" x="767" y="643" width="70" height="9" rx="4.5" data-w="70"/>
                <rect className="f-amber" x="846" y="643" width="34" height="9" rx="4.5" data-w="34"/>
                <rect className="f-sage" x="889" y="643" width="92" height="9" rx="4.5" data-w="92"/>
              </g>
              <rect x="686" y="660" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="712" data-y="660">
                <rect className="f-amber" x="712" y="659" width="46" height="9" rx="4.5" data-w="46"/>
                <rect className="f-cream" x="767" y="659" width="54" height="9" rx="4.5" data-w="54"/>
                <rect className="f-amber" x="830" y="659" width="34" height="9" rx="4.5" data-w="34"/>
                <rect className="f-sage" x="873" y="659" width="112" height="9" rx="4.5" data-w="112"/>
              </g>
              <rect x="686" y="676" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="712" data-y="676">
              </g>
              <rect x="686" y="692" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="712" data-y="692">
                <rect className="f-amber" x="712" y="691" width="58" height="9" rx="4.5" data-w="58"/>
                <rect className="f-amber" x="779" y="691" width="66" height="9" rx="4.5" data-w="66"/>
                <rect className="f-cream" x="854" y="691" width="84" height="9" rx="4.5" data-w="84"/>
                <rect className="f-gray" x="947" y="691" width="18" height="9" rx="4.5" data-w="18"/>
              </g>
              <rect x="686" y="708" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="734" data-y="708">
                <rect className="f-amber" x="734" y="707" width="50" height="9" rx="4.5" data-w="50"/>
                <rect className="f-gray" x="793" y="707" width="14" height="9" rx="4.5" data-w="14"/>
              </g>
              <rect x="686" y="724" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="756" data-y="724">
                <rect className="f-amber-l" x="756" y="723" width="72" height="9" rx="4.5" data-w="72"/>
                <rect className="f-cream" x="837" y="723" width="64" height="9" rx="4.5" data-w="64"/>
                <rect className="f-sage" x="910" y="723" width="98" height="9" rx="4.5" data-w="98"/>
              </g>
              <rect x="686" y="740" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="778" data-y="740">
                <rect className="f-amber-l" x="778" y="739" width="40" height="9" rx="4.5" data-w="40"/>
                <rect className="f-cream" x="827" y="739" width="128" height="9" rx="4.5" data-w="128"/>
                <rect className="f-amber-l" x="964" y="739" width="40" height="9" rx="4.5" data-w="40"/>
              </g>
              <rect x="686" y="756" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="778" data-y="756">
                <rect className="f-gray" x="778" y="755" width="150" height="9" rx="4.5" data-w="150"/>
              </g>
              <rect x="686" y="772" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="756" data-y="772">
                <rect className="f-amber-l" x="756" y="771" width="86" height="9" rx="4.5" data-w="86"/>
              </g>
              <rect x="686" y="788" width="10" height="7" rx="3" className="f-gray" opacity=".45"/>
              <g className="code-line" data-x="734" data-y="788">
                <rect className="f-gray" x="734" y="787" width="14" height="9" rx="4.5" data-w="14"/>
              </g>
            </g>
            <rect id="code-cursor" x="712" y="641" width="3" height="14" className="f-amber"/>
            <rect x="675" y="814" width="590" height="73" rx="6" className="f-carbon2"/>
            <polygon points="690,830 698,835 690,840" className="f-amber"/>
            <rect id="code-cmd" x="706" y="831" width="150" height="8" rx="4" className="f-gray" opacity=".8"/>
            <g id="code-build" opacity="0">
              <circle cx="694" cy="860" r="8" className="f-sage"/>
              <path d="M690 860 l3 3 l6 -6" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="710" y="856" width="128" height="8" rx="4" className="f-cream"/>
              <rect x="846" y="856" width="52" height="8" rx="4" className="f-amber"/>
            </g>
          </g>
          <g id="screen-wipe" visibility="hidden">
            <rect x="525" y="525" width="760" height="380" className="f-amber"/>
            <rect x="1045" y="525" width="60" height="380" className="f-amber-l"/>
          </g>

          <g id="screen-glare">
            <polygon className="band" points="640,525 790,525 610,905 460,905" fill="#fff" opacity=".09"/>
            <polygon className="band" points="820,525 860,525 680,905 640,905" fill="#fff" opacity=".07"/>
          </g>
        </g>

        <g id="keyboard">
          <rect x="380" y="1100" width="520" height="36" rx="7" className="f-light ol"/>
          <rect x="398" y="1112" width="484" height="8" rx="4" className="f-gray" opacity=".45"/>
        </g>
      </g>

      {/* ============ CACTUS ============ */}
      <g id="layer-cactus">
        <g id="cactus">
          <path d="M296 992 Q250 992 250 952 L250 938 Q250 916 268 916 Q286 916 286 938 L286 954 Q286 964 296 964 Z" className="f-sage ol"/>
          <path d="M348 1012 Q400 1012 400 968 L400 952 Q400 930 382 930 Q364 930 364 952 L364 976 Q364 986 348 986 Z" className="f-sage ol"/>
          <rect x="292" y="878" width="60" height="172" rx="30" className="f-sage ol"/>
          <g className="s-sage-d" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M310 912 l6 6 M334 940 l-6 6 M308 978 l6 6 M334 1010 l-6 6 M262 940 l6 4 M386 956 l-6 4"/>
          </g>
          <circle cx="322" cy="874" r="11" className="f-amber ol-thin"/>
        </g>
        <g id="pot">
          <polygon points="250,1052 394,1052 380,1140 264,1140" className="f-cream ol"/>
          <rect x="240" y="1036" width="164" height="20" rx="6" className="f-light ol"/>
          <g className="s-gray" strokeWidth="3" opacity=".6">
            <line x1="286" y1="1064" x2="290" y2="1130"/><line x1="322" y1="1064" x2="322" y2="1130"/><line x1="358" y1="1064" x2="354" y2="1130"/>
          </g>
        </g>
      </g>

      {/* ============ DROITE : CARNET, FEUTRE, TASSE, VAPEUR, SOURIS ============ */}
      <g id="layer-right">
        <g id="notebook">
          <rect x="1105" y="1112" width="420" height="26" rx="5" className="f-carbon2 ol"/>
          <rect x="1160" y="1119" width="90" height="12" rx="3" className="f-light"/>
          <rect x="1370" y="1119" width="90" height="12" rx="3" className="f-light"/>
        </g>
        <g id="marker">
          <polygon points="1202,1068 1168,1080 1202,1092" className="f-gray ol-thin"/>
          <rect x="1198" y="1060" width="214" height="40" rx="18" className="f-carbon2 ol"/>
          <rect x="1240" y="1070" width="62" height="20" rx="4" className="f-amber"/>
          <rect x="1366" y="1057" width="72" height="46" rx="20" className="f-cream ol"/>
        </g>
        <g id="steam" mask="url(#zg-steam-mask)">
          <g id="steam-sway">
            <path id="steam-1" className="steam-path" d="M1470 805 C1430 745 1520 705 1480 645 S1440 565 1490 505"/>
            <path id="steam-2" className="steam-path" d="M1516 812 C1478 752 1566 712 1528 652 S1490 572 1538 512"/>
          </g>
        </g>
        <g id="cup">
          <polygon points="1396,880 1580,880 1560,1136 1416,1136" className="f-carbon ol"/>
          <polygon points="1402,955 1574,955 1566,1060 1410,1060" className="f-amber ol"/>
          <rect x="1468" y="990" width="40" height="27" rx="3" className="f-carbon"/>
          <rect x="1378" y="845" width="220" height="40" rx="9" className="f-cream ol"/>
          <polygon points="1406,845 1418,814 1558,814 1570,845" className="f-light ol"/>
        </g>
        <g id="mouse">
          <path d="M1526 1138 Q1526 1046 1612 1040 Q1698 1046 1698 1138 Z" className="f-cream ol"/>
          <line x1="1534" y1="1104" x2="1690" y2="1104" className="s-gray" strokeWidth="3"/>
        </g>
      </g>
    </svg>
  );
}

export default memo(HeroIllustration);
