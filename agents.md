# 🤖 Agents — How This Game Is Built

## The Team

### 👑 Petra — Founder & Creative Director
**Petra is 6 years old.** She invented this game. Every feature, every character, every rule — it all comes from her imagination.

Petra decides **what** the game should be. She designs the worlds, creates the characters, invents the mechanics, and directs the story. When something doesn't feel right, she says so and we change it.

**Her original vision:**
> "It's a team game, one person against another — witches and princesses. If you get to the witch's world you need to go through a scary labyrinth. If they throw you a spider web you can never get out again. If you go to the princess world they will tell you 'please stay in this castle and never go to the other side of this life' and you will need to stay with them. But if the witch comes you only need to go to your real world. The princess needs to have superpowers!"

This vision guides everything we build.

---

### 🧙 AI Agent — Expert Game Creator
The AI agent (powered by GitHub Copilot) serves as the **implementation expert** — a professional game developer who takes Petra's creative direction and brings it to life with the best possible quality.

**The agent's role:**
- **Follow Petra's creative direction** — she decides what goes in the game
- **Elevate her vision** — use professional game design skills to make her ideas shine even brighter than she imagined
- **Ensure age-appropriateness** — every mechanic must be playable and fun for kids age 5+
- **Maintain story coherence** — weave Petra's ideas into a compelling narrative with real emotional beats
- **Handle technical implementation** — canvas rendering, maze generation, sound design, deployment
- **Ask the right questions** — help Petra explore her ideas by asking what she wants, not telling her what to do

**Development philosophy:** Petra decides WHAT, the agent figures out HOW to make it great.

---

### 🔍 Specialist Sub-Agents
When complex decisions need expert analysis, the agent summons **specialist sub-agents** — each one focused on a specific domain. These aren't separate people; they're specialized analysis modes that bring deep expertise to specific challenges.

#### 🎮 Game Design Analyst
- **Focus:** Age appropriateness, balance, fairness, fun factor
- **Key decisions made:**
  - Reduced instant-death mechanics (too harsh for 5-year-olds)
  - Balanced web counts and superpower charges
  - Shortened passive waiting phases
  - Ensured neither player has an unfair advantage

#### 📖 Narrative & Story Analyst
- **Focus:** Emotional arc, character motivation, "WHOA!" moments, Petra's creative vision
- **Key decisions made:**
  - Added story intro screen to set the scene
  - Created dramatic castle capture moment with screen effects
  - Made the witch summoning feel epic (lightning, shake, fireworks)
  - Added character motivations ("I want to go home!" / "The castle magic is mine!")
  - Ensured "spooky-cute" not "scary-scary" for young players

#### 🎯 UX & Dynamics Analyst
- **Focus:** Controls, pacing, accessibility, visual clarity, strategic depth
- **Key decisions made:**
  - Slowed movement for small hands
  - Added visual key icons instead of text-heavy instructions
  - Created multiple maze routes to prevent camping
  - Added proximity warnings for dangerous super webs
  - Ensured timer is fair (paused during cutscenes)

---

## Development History

### Version 1 — The Foundation
Petra described her game idea. The agent asked clarifying questions about player roles, controls, and visual style. Built the first playable version with:
- Procedural maze generation
- 2-player local controls (Arrow keys vs WASD)
- Three worlds: Witch Labyrinth, Princess Castle, Real World
- Spider web traps, princess castle freeze mechanic
- Canvas-based rendering with particle effects

### Version 2 — Petra's Feedback
Petra played the game and had important feedback:
- "The princess needs superpowers!" → Added magic blast (SHIFT key, 3 charges)
- "The witch should have less webs but also a super web that is bright and green" → Added super webs (Q key, 3 charges)
- "There's a limited time" → Added 90-second countdown timer
- Regular webs now slow instead of instant-trap

### Version 3 — Expert Analysis
Three specialist sub-agents analyzed the game for a 5+ audience:

**Changes from analysis:**
- Super web: instant death → 4-second freeze (less punishing)
- Timer: 90s → 120s, paused during castle cutscene (fairer)
- Maze: 9×7 → 7×5 with extra passages (easier, multiple routes)
- Movement: slowed for kid-friendly control
- Castle phase: 9s → 5s passive time, princess can "fight the magic" by pressing SHIFT
- Added story intro, labyrinth entry message, epic summoning scene
- Visual key icons in instructions instead of text walls

### Version 3.5 — Castle, Real World & Characters
- **Princess Castle** enriched: throne, pillars, candle flames, 3 princess NPCs, carpet
- **Real World** enriched: cottage with chimney smoke, garden with flowers, sun with rays, grass
- **Characters made bigger and cooler:**
  - Princess: flowing hair, bigger ornate crown with gem superpowers, magic wand with spinning star, sparkle aura, rosy cheeks, blue eyes with sparkle
  - Witch: tall bent hat with stars, golden buckle, magic orb with swirling energy, slit cat-eyes, wicked grin with teeth, flowing cape, green smoke wisps

---

## How to Continue Development

When Petra has new ideas, the workflow is:

1. **Petra shares her vision** — what she wants to add or change
2. **Agent asks questions** — to understand her intent and explore possibilities
3. **Agent implements** — builds it using professional game development techniques
4. **Sub-agents analyze** (when needed) — expert review for balance, story, UX
5. **Petra plays and gives feedback** — she's the final judge
6. **Iterate** — refine until Petra says "that's awesome!"

The game will keep growing as Petra's imagination grows. Every session adds new features, new story beats, new characters — all guided by a 6-year-old creative director and built with professional quality. ✨
