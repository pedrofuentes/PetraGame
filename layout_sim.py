"""Simulates pixel layout of drawInstructions() in index.html (lines 1720-1878).
Computes vertical bounding boxes for each draw call and reports overlaps."""

CANVAS_W = 540
CANVAS_H = 684
MAX_SUPERPOWERS = 3
MAX_WEBS = 8
MAX_SUPER_WEBS = 3
GAME_TIME_SEC = 120

# Approx character width factor for Georgia (proportional). We only need vert
# bounds, but track horizontal too for completeness.
def text_w(text, size):
    return len(text) * size * 0.55

def text_box(text, x, y, size, bold=False, align='center'):
    """fillText baseline is at y. Ascender ~ size*0.8, descender ~ size*0.2."""
    w = text_w(text, size)
    if align == 'center':
        x0 = x - w/2
    else:
        x0 = x
    y0 = y - size * 0.8
    y1 = y + size * 0.2
    return (x0, y0, x0 + w, y1, f'TEXT "{text}" ({size}px{" bold" if bold else ""})')

def key_box(x, y, w, h, label):
    return (x, y, x + w, y + h, f'KEY [{label}] ({w}x{h})')


def simulate(is_touch, game_mode, player_role):
    elements = []
    cx = CANVAS_W / 2
    y = 30

    # Title
    elements.append(text_box('How to Play', cx, y, 22, bold=True))
    y += 38

    if is_touch:
        # Princess header
        elements.append(text_box('👑 Princess', cx, y, 16, bold=True))
        y += 6
        elements.append(text_box('"I want to go home!"', cx, y + 14, 11))
        y += 34

        dx = cx - 55
        elements.append(key_box(dx + 20, y, 30, 24, '▲'))
        elements.append(key_box(dx, y + 28, 30, 24, '◀'))
        elements.append(key_box(dx + 20, y + 28, 30, 24, '▼'))
        elements.append(key_box(dx + 40, y + 28, 30, 24, '▶'))
        elements.append(text_box('D-Pad (left side)', dx + 80, y + 22, 11, align='left'))
        elements.append(key_box(dx + 5, y + 62, 50, 30, '✨'))
        elements.append(text_box('✨ Magic Blast!', dx + 65, y + 78, 11, align='left'))
        elements.append(text_box(f'💎×{MAX_SUPERPOWERS} — destroys webs', dx + 65, y + 92, 10, align='left'))
        y += 110

        if game_mode == '2p':
            elements.append(text_box('🧙 Witch (Player 2)', cx, y, 16, bold=True))
            y += 6
            elements.append(text_box('"The castle magic is mine!"', cx, y + 14, 11))
            y += 34
            wx = cx - 55
            elements.append(key_box(wx + 20, y, 30, 24, '▲'))
            elements.append(key_box(wx, y + 28, 30, 24, '◀'))
            elements.append(key_box(wx + 20, y + 28, 30, 24, '▼'))
            elements.append(key_box(wx + 40, y + 28, 30, 24, '▶'))
            elements.append(text_box('D-Pad (right side)', wx + 80, y + 22, 11, align='left'))
            elements.append(key_box(wx, y + 62, 30, 24, '🕸️'))
            elements.append(text_box(f'Web (×{MAX_WEBS})', wx + 40, y + 78, 11, align='left'))
            elements.append(key_box(wx, y + 92, 30, 24, '☠'))
            elements.append(text_box(f'SUPER (×{MAX_SUPER_WEBS})', wx + 40, y + 108, 11, align='left'))
            y += 128
        elif player_role == 'witch':
            elements.append(text_box('🧙 Witch (You!)', cx, y, 16, bold=True))
            y += 6
            elements.append(text_box('"The castle magic is mine!"', cx, y + 14, 11))
            y += 34
            wx = cx - 55
            elements.append(key_box(wx + 20, y, 30, 24, '▲'))
            elements.append(key_box(wx, y + 28, 30, 24, '◀'))
            elements.append(key_box(wx + 20, y + 28, 30, 24, '▼'))
            elements.append(key_box(wx + 40, y + 28, 30, 24, '▶'))
            elements.append(text_box('D-Pad', wx + 80, y + 22, 11, align='left'))
            elements.append(key_box(wx + 5, y + 62, 50, 30, '🕸️'))
            elements.append(text_box(f'Web (×{MAX_WEBS})', wx + 65, y + 78, 11, align='left'))
            elements.append(key_box(wx + 5, y + 96, 50, 30, '☠'))
            elements.append(text_box(f'SUPER (×{MAX_SUPER_WEBS})', wx + 65, y + 112, 11, align='left'))
            y += 144
            elements.append(text_box('👑 Princess (AI)', cx, y, 14, bold=True))
            y += 18
            elements.append(text_box('She tries to escape on her own!', cx, y, 11))
            y += 30
        else:  # 1p princess
            elements.append(text_box('🧙 Witch (AI)', cx, y, 16, bold=True))
            y += 22
            elements.append(text_box('Difficulty: ⚔️ Medium', cx, y, 12))
            y += 20
            elements.append(text_box('The witch moves on her own!', cx, y, 11))
            y += 40
    else:
        # Keyboard - princess
        elements.append(text_box('👑 Princess', cx, y, 16, bold=True))
        y += 6
        elements.append(text_box('"I want to go home!"', cx, y + 14, 11))
        y += 32
        kx, ky = cx - 55, y
        elements.append(key_box(kx + 20, ky, 30, 24, '↑'))
        elements.append(key_box(kx, ky + 28, 30, 24, '←'))
        elements.append(key_box(kx + 20, ky + 28, 30, 24, '↓'))
        elements.append(key_box(kx + 40, ky + 28, 30, 24, '→'))
        elements.append(text_box('Move', kx + 80, ky + 22, 11, align='left'))
        elements.append(key_box(kx, ky + 62, 70, 24, 'SHIFT'))
        elements.append(text_box('✨ Magic Blast!', kx + 80, ky + 78, 11, align='left'))
        elements.append(text_box(f'💎×{MAX_SUPERPOWERS} — destroys webs', kx + 80, ky + 92, 10, align='left'))
        y += 110
        # Witch
        elements.append(text_box('🧙 Witch', cx, y, 16, bold=True))
        y += 6
        elements.append(text_box('"The castle magic is mine!"', cx, y + 14, 11))
        y += 32
        wx, wy = cx - 55, y
        elements.append(key_box(wx + 20, wy, 30, 24, 'W'))
        elements.append(key_box(wx, wy + 28, 30, 24, 'A'))
        elements.append(key_box(wx + 20, wy + 28, 30, 24, 'S'))
        elements.append(key_box(wx + 40, wy + 28, 30, 24, 'D'))
        elements.append(text_box('Move', wx + 80, wy + 22, 11, align='left'))
        elements.append(key_box(wx, wy + 62, 30, 24, 'E'))
        elements.append(text_box(f'🕸️ Web (×{MAX_WEBS}) — slows', wx + 40, wy + 78, 11, align='left'))
        elements.append(key_box(wx, wy + 92, 30, 24, 'Q'))
        elements.append(text_box(f'☠ SUPER (×{MAX_SUPER_WEBS}) — 4s trap!', wx + 40, wy + 108, 11, align='left'))
        y += 128

    # Timer + footer
    elements.append(text_box(f'⏱️ You have {GAME_TIME_SEC} seconds!', cx, y, 14, bold=True))
    y += 30
    elements.append(text_box('Tap to continue' if is_touch else 'Press SPACE', cx, y, 14))

    return elements, y


def horizontally_overlap(a, b):
    return not (a[2] <= b[0] or b[2] <= a[0])


def vertically_overlap(a, b, tol=0):
    return not (a[3] <= b[1] + tol or b[3] <= a[1] + tol)


def report(name, is_touch, game_mode, player_role):
    print(f"\n{'='*70}\nPATH: {name}\n{'='*70}")
    elements, final_y = simulate(is_touch, game_mode, player_role)
    sorted_elems = sorted(elements, key=lambda e: e[1])
    for e in sorted_elems:
        print(f"  y={e[1]:6.1f}-{e[3]:6.1f}  x={e[0]:6.1f}-{e[2]:6.1f}  {e[4]}")

    print(f"\n  Final y accumulator: {final_y}")
    print(f"  Max element bottom : {max(e[3] for e in elements):.1f}")
    print(f"  Canvas height      : {CANVAS_H}")
    if max(e[3] for e in elements) > CANVAS_H:
        print(f"  ❌ CONTENT EXCEEDS CANVAS HEIGHT!")

    # Find overlaps (only flag pairs that also overlap horizontally — different
    # columns can share y-rows safely)
    overlaps = []
    tight = []
    for i, a in enumerate(elements):
        for b in elements[i+1:]:
            if not horizontally_overlap(a, b):
                continue
            if vertically_overlap(a, b):
                overlaps.append((a, b))
            else:
                gap = min(abs(a[3] - b[1]), abs(b[3] - a[1]))
                if gap < 2:
                    tight.append((a, b, gap))

    if overlaps:
        print(f"\n  ⚠️  OVERLAPS DETECTED ({len(overlaps)}):")
        for a, b in overlaps:
            print(f"    • {a[4]} (y={a[1]:.1f}-{a[3]:.1f})")
            print(f"      ⨯ {b[4]} (y={b[1]:.1f}-{b[3]:.1f})")
    else:
        print("\n  ✅ No overlaps")
    if tight:
        print(f"\n  ⚠️  TIGHT SPACING <2px ({len(tight)}):")
        for a, b, g in tight:
            print(f"    • gap={g:.2f}px: {a[4]} ↔ {b[4]}")


if __name__ == '__main__':
    report("Touch + 2-player",         True,  '2p', None)
    report("Touch + 1P as princess",   True,  '1p', 'princess')
    report("Touch + 1P as witch",      True,  '1p', 'witch')
    report("Keyboard + 2-player",      False, '2p', None)
    report("Keyboard + 1-player",      False, '1p', 'princess')
