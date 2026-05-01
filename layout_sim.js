// Simulates pixel layout of drawInstructions() for all 5 paths.
const CANVAS_W = 540, CANVAS_H = 684;
const MAX_SUPERPOWERS = 3, MAX_WEBS = 8, MAX_SUPER_WEBS = 3, GAME_TIME_SEC = 120;

const tw = (t, s) => [...t].length * s * 0.55;
const T = (text, x, y, size, bold = false, align = 'center') => {
  const w = tw(text, size);
  const x0 = align === 'center' ? x - w / 2 : x;
  return { x0, y0: y - size * 0.8, x1: x0 + w, y1: y + size * 0.2,
           label: `TEXT "${text}" (${size}px${bold ? ' bold' : ''})` };
};
const K = (x, y, w, h, label) =>
  ({ x0: x, y0: y, x1: x + w, y1: y + h, label: `KEY [${label}] (${w}x${h})` });

function simulate(isTouch, gameMode, playerRole) {
  const E = [];
  const cx = CANVAS_W / 2;
  let y = 30;
  E.push(T('How to Play', cx, y, 22, true)); y += 38;

  if (isTouch) {
    E.push(T('👑 Princess', cx, y, 16, true)); y += 6;
    E.push(T('"I want to go home!"', cx, y + 14, 11)); y += 34;
    const dx = cx - 55;
    E.push(K(dx + 20, y, 30, 24, '▲'));
    E.push(K(dx, y + 28, 30, 24, '◀'));
    E.push(K(dx + 20, y + 28, 30, 24, '▼'));
    E.push(K(dx + 40, y + 28, 30, 24, '▶'));
    E.push(T('D-Pad (left side)', dx + 80, y + 22, 11, false, 'left'));
    E.push(K(dx + 5, y + 62, 50, 30, '✨'));
    E.push(T('✨ Magic Blast!', dx + 65, y + 78, 11, false, 'left'));
    E.push(T(`💎×${MAX_SUPERPOWERS} — destroys webs`, dx + 65, y + 92, 10, false, 'left'));
    y += 110;

    if (gameMode === '2p') {
      E.push(T('🧙 Witch (Player 2)', cx, y, 16, true)); y += 6;
      E.push(T('"The castle magic is mine!"', cx, y + 14, 11)); y += 34;
      const wx = cx - 55;
      E.push(K(wx + 20, y, 30, 24, '▲'));
      E.push(K(wx, y + 28, 30, 24, '◀'));
      E.push(K(wx + 20, y + 28, 30, 24, '▼'));
      E.push(K(wx + 40, y + 28, 30, 24, '▶'));
      E.push(T('D-Pad (right side)', wx + 80, y + 22, 11, false, 'left'));
      E.push(K(wx, y + 62, 30, 24, '🕸️'));
      E.push(T(`Web (×${MAX_WEBS})`, wx + 40, y + 78, 11, false, 'left'));
      E.push(K(wx, y + 92, 30, 24, '☠'));
      E.push(T(`SUPER (×${MAX_SUPER_WEBS})`, wx + 40, y + 108, 11, false, 'left'));
      y += 128;
    } else if (playerRole === 'witch') {
      E.push(T('🧙 Witch (You!)', cx, y, 16, true)); y += 6;
      E.push(T('"The castle magic is mine!"', cx, y + 14, 11)); y += 34;
      const wx = cx - 55;
      E.push(K(wx + 20, y, 30, 24, '▲'));
      E.push(K(wx, y + 28, 30, 24, '◀'));
      E.push(K(wx + 20, y + 28, 30, 24, '▼'));
      E.push(K(wx + 40, y + 28, 30, 24, '▶'));
      E.push(T('D-Pad', wx + 80, y + 22, 11, false, 'left'));
      E.push(K(wx + 5, y + 62, 50, 30, '🕸️'));
      E.push(T(`Web (×${MAX_WEBS})`, wx + 65, y + 78, 11, false, 'left'));
      E.push(K(wx + 5, y + 96, 50, 30, '☠'));
      E.push(T(`SUPER (×${MAX_SUPER_WEBS})`, wx + 65, y + 112, 11, false, 'left'));
      y += 144;
      E.push(T('👑 Princess (AI)', cx, y, 14, true)); y += 18;
      E.push(T('She tries to escape on her own!', cx, y, 11)); y += 30;
    } else {
      E.push(T('🧙 Witch (AI)', cx, y, 16, true)); y += 22;
      E.push(T('Difficulty: ⚔️ Medium', cx, y, 12)); y += 20;
      E.push(T('The witch moves on her own!', cx, y, 11)); y += 40;
    }
  } else {
    E.push(T('👑 Princess', cx, y, 16, true)); y += 6;
    E.push(T('"I want to go home!"', cx, y + 14, 11)); y += 32;
    const kx = cx - 55, ky = y;
    E.push(K(kx + 20, ky, 30, 24, '↑'));
    E.push(K(kx, ky + 28, 30, 24, '←'));
    E.push(K(kx + 20, ky + 28, 30, 24, '↓'));
    E.push(K(kx + 40, ky + 28, 30, 24, '→'));
    E.push(T('Move', kx + 80, ky + 22, 11, false, 'left'));
    E.push(K(kx, ky + 62, 70, 24, 'SHIFT'));
    E.push(T('✨ Magic Blast!', kx + 80, ky + 78, 11, false, 'left'));
    E.push(T(`💎×${MAX_SUPERPOWERS} — destroys webs`, kx + 80, ky + 92, 10, false, 'left'));
    y += 110;
    E.push(T('🧙 Witch', cx, y, 16, true)); y += 6;
    E.push(T('"The castle magic is mine!"', cx, y + 14, 11)); y += 32;
    const wx = cx - 55, wy = y;
    E.push(K(wx + 20, wy, 30, 24, 'W'));
    E.push(K(wx, wy + 28, 30, 24, 'A'));
    E.push(K(wx + 20, wy + 28, 30, 24, 'S'));
    E.push(K(wx + 40, wy + 28, 30, 24, 'D'));
    E.push(T('Move', wx + 80, wy + 22, 11, false, 'left'));
    E.push(K(wx, wy + 62, 30, 24, 'E'));
    E.push(T(`🕸️ Web (×${MAX_WEBS}) — slows`, wx + 40, wy + 78, 11, false, 'left'));
    E.push(K(wx, wy + 92, 30, 24, 'Q'));
    E.push(T(`☠ SUPER (×${MAX_SUPER_WEBS}) — 4s trap!`, wx + 40, wy + 108, 11, false, 'left'));
    y += 128;
  }

  E.push(T(`⏱️ You have ${GAME_TIME_SEC} seconds!`, cx, y, 14, true)); y += 30;
  E.push(T(isTouch ? 'Tap to continue' : 'Press SPACE', cx, y, 14));
  return { elements: E, finalY: y };
}

const hOver = (a, b) => !(a.x1 <= b.x0 || b.x1 <= a.x0);
const vOver = (a, b) => !(a.y1 <= b.y0 || b.y1 <= a.y0);
const pad = (n, w) => String(n.toFixed(1)).padStart(w);

function report(name, isTouch, gameMode, playerRole) {
  console.log(`\n${'='.repeat(72)}\nPATH: ${name}\n${'='.repeat(72)}`);
  const { elements, finalY } = simulate(isTouch, gameMode, playerRole);
  const sorted = [...elements].sort((a, b) => a.y0 - b.y0);
  for (const e of sorted) {
    console.log(`  y=${pad(e.y0,6)}-${pad(e.y1,6)}  x=${pad(e.x0,6)}-${pad(e.x1,6)}  ${e.label}`);
  }
  const maxBot = Math.max(...elements.map(e => e.y1));
  console.log(`\n  Final y accumulator : ${finalY}`);
  console.log(`  Max element bottom  : ${maxBot.toFixed(1)}`);
  console.log(`  Canvas height       : ${CANVAS_H}`);
  if (maxBot > CANVAS_H) console.log(`  ❌ CONTENT EXCEEDS CANVAS HEIGHT by ${(maxBot-CANVAS_H).toFixed(1)}px`);

  const overlaps = [], tight = [];
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const a = elements[i], b = elements[j];
      if (!hOver(a, b)) continue;
      if (vOver(a, b)) overlaps.push([a, b]);
      else {
        const gap = Math.min(Math.abs(a.y1 - b.y0), Math.abs(b.y1 - a.y0));
        if (gap < 2) tight.push([a, b, gap]);
      }
    }
  }
  if (overlaps.length) {
    console.log(`\n  ⚠️  OVERLAPS (${overlaps.length}):`);
    for (const [a, b] of overlaps) {
      console.log(`    • ${a.label}  y=${a.y0.toFixed(1)}-${a.y1.toFixed(1)}`);
      console.log(`      ⨯ ${b.label}  y=${b.y0.toFixed(1)}-${b.y1.toFixed(1)}`);
    }
  } else console.log(`\n  ✅ No overlaps`);
  if (tight.length) {
    console.log(`\n  ⚠️  TIGHT SPACING <2px (${tight.length}):`);
    for (const [a, b, g] of tight) console.log(`    • gap=${g.toFixed(2)}px: ${a.label} ↔ ${b.label}`);
  }
}

report('Touch + 2-player',       true,  '2p', null);
report('Touch + 1P as princess', true,  '1p', 'princess');
report('Touch + 1P as witch',    true,  '1p', 'witch');
report('Keyboard + 2-player',    false, '2p', null);
report('Keyboard + 1-player',    false, '1p', 'princess');
