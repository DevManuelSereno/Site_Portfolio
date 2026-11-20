/**
 * Texto do script inline do `<head>` que decide a abertura antes da primeira
 * pintura (etapa 4 do docs/PLANO-MOVIMENTO.md) e mantém a rota estática.
 *
 * É montado no servidor com o `toString()` das próprias funções de
 * `intro-policy.ts` e `capability.ts`, e as constantes entram como literais:
 * uma regra só, sem cópia escrita à mão. Por isso aquelas funções não podem
 * citar nada do módulo (o minificador renomeia, e o `<script>` não tem imports).
 */
import {
  LOW_MEMORY_GB,
  lowMotionReason,
  readMotionSignals,
  type LowMotionReason,
} from './capability.ts'
import {
  INTRO_REVISIT_DAYS,
  INTRO_STORAGE_KEY,
  getLocalStorage,
  isIntroForced,
  markVisit,
  readLastVisit,
  shouldShowIntro,
  type IntroReason,
} from './intro-policy.ts'

/**
 * `show` é "abertura pendente": volta a `false` quando ela acaba ou é
 * abandonada, e é só ele que o Hero lê. A abertura só existe na home.
 *
 * A visita só é gravada (`markSeen`) quando não havia abertura a mostrar ou
 * quando ela termina sozinha. Abandono (prazo, erro, aba oculta) não conta,
 * para a pessoa ter outra chance de vê-la na visita seguinte.
 */
export interface IntroGate {
  show: boolean
  reason: IntroReason | LowMotionReason | 'not-home' | 'hidden' | 'timeout' | 'error'
  playing?: boolean
  markSeen?: () => void
}

declare global {
  interface Window {
    __introGate?: IntroGate
  }
}

/**
 * Se o JS da página não começar a abertura até aqui (bundle bloqueado, rede
 * lenta, erro na hidratação), o próprio script tira o overlay. Curto de
 * propósito: quanto mais tarde ela começasse, mais passaria do teto de 3 s.
 */
export const INTRO_LOAD_BUDGET_MS = 1500

const helpers = {
  shouldShowIntro,
  isIntroForced,
  getLocalStorage,
  readLastVisit,
  markVisit,
  lowMotionReason,
  readMotionSignals,
}

const definitions = Object.entries(helpers)
  .map(([name, fn]) => `var ${name}=${fn.toString()};`)
  .join('')

const key = JSON.stringify(INTRO_STORAGE_KEY)

export const introGateScript = `(function(){${definitions}
var g={show:false,reason:'error'};window.__introGate=g;
try{
if(location.pathname!=='/'){g.reason='not-home'}
else if(document.visibilityState==='hidden'){g.reason='hidden'}
else{
var s=getLocalStorage(),v=readLastVisit(s,${key}),now=Date.now();
var low=lowMotionReason(readMotionSignals(),${LOW_MEMORY_GB});
var r=low?{show:false,reason:low}:shouldShowIntro({now:now,lastVisit:v.lastVisit,storageAvailable:v.storageAvailable,forced:isIntroForced(location.search)},${INTRO_REVISIT_DAYS});
g.show=r.show;g.reason=r.reason;
g.markSeen=function(){markVisit(s,${key},Date.now())};
if(!g.show)g.markSeen();
}
}catch(e){g.show=false}
if(g.show){
var d=document.documentElement;d.classList.add('intro-on');
setTimeout(function(){if(!g.show||g.playing)return;g.show=false;g.reason='timeout';d.classList.remove('intro-on');window.dispatchEvent(new CustomEvent('intro:done'))},${INTRO_LOAD_BUDGET_MS});
}
})()`
