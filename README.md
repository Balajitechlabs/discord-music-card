<div align="center">

# 🎵 Live Discord Activity & BTL-Music Card

A real-time, animated SVG status card and React widget for GitHub Profile READMEs, portfolios, and websites.  
Showcases your **live Discord Rich Presence, currently playing music (BTL-Music / Spotify / Apple Music), dynamic album glow, animated equalizer waveforms, and live ticking progress bars.**

<br />

[![Live Card Preview](https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782)](https://discord.com/users/1402595333120458782)

<br />

[![Vercel Deployment](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new)
[![GitHub Stars](https://img.shields.io/github/stars/balajitechlabs/discord-music-card?style=for-the-badge&color=22c55e)](https://github.com/balajitechlabs/discord-music-card/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- ⏱️ **Live Ticking Seconds Timer:** Rolling odometer timer that counts up second-by-second in real-time (`00:08` ➔ `00:09` ➔ `00:10`...).
- 📊 **Animated Equalizer Waveforms:** Real-time animated audio visualizer sound wave bars pulsing next to the track title.
- ⚡ **Real-Time Sliding Progress Bar:** CSS-animated progress bar that slides smoothly forward for the exact duration of the track.
- 🎨 **Dynamic Album Glow & Glassmorphism:** Ambient lighting aura and top raycast beams matching the active album art colors.
- 🎵 **BTL-Music & Spotify Support:** Automatically sanitizes and formats Rich Presence activities from BTL-Music, Spotify, and custom RPC clients.
- 🌙 **Dedicated Offline & Idle States:** Displays a clean music player idle screen with your profile avatar and music badge when you're between tracks or offline.
- 🚀 **0-Second Cache Delay:** Optimized `Cache-Control` headers ensuring instant track changes upon visiting your profile.
- 📱 **Mobile & Retina-Optimized:** Fluid responsive layouts with high-DPI crisp album artwork.

---

## 🚀 Quick Start (Add to your GitHub Profile)

Paste the following Markdown snippet into your GitHub Profile **`README.md`**:

```markdown
<a href="https://discord.com/users/YOUR_DISCORD_USER_ID">
  <img src="https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/YOUR_DISCORD_USER_ID" alt="Live Music Activity" />
</a>
```

> [!IMPORTANT]
> Make sure you have joined the [Lanyard Discord Server](https://discord.gg/lanyard) once so the Lanyard API can broadcast your Discord presence.

---

## 🛠️ Deploy Your Own on Vercel (1-Click)

You can host your own private instance for maximum uptime and zero rate-limits:

1. **Fork or Clone this repository:**
   ```bash
   git clone https://github.com/balajitechlabs/discord-music-card.git
   ```
2. **Deploy to Vercel:**
   - Import your repository into [Vercel](https://vercel.com).
   - Click **Deploy** (No environment variables required).
3. **Use your custom URL:**
   ```markdown
   <img src="https://your-project-name.vercel.app/api/status/YOUR_DISCORD_ID" />
   ```

---

## 🎛️ Customization & URL Parameters

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `profile` | `false` | Show your Discord Avatar & decoration header |
| `small_image` | `true` | Show the small app/status badge on the cover art |
| `name_type` | `display` | Set to `username` or `display` (Global Display Name) |
| `bg` | `141416` | Card background color (hex without `#`) |
| `border` | `27272a` | Card border color |
| `title` | `ffffff` | Song / Activity title color |
| `text` | `b0b0b0` | Artist & Album details color |
| `time` | `b0b0b0` | Timer & timestamp color |
| `bar_fg` | `22c55e` | Progress bar active fill color |
| `bar_bg` | `27272a` | Progress bar background track color |

### Example with Custom Theme:
```markdown
<img src="https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782?bar_fg=1DB954&title=ffffff" />
```

---

## 🌐 Embed on your Website / Portfolio

### 1. Simple HTML Embed with Auto-Refresh:

```html
<div class="live-music-card">
  <img 
    id="btl-music-player"
    src="https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782" 
    alt="Live Music Player"
    style="width: 100%; max-width: 400px; border-radius: 14px; box-shadow: 0 16px 40px rgba(0,0,0,0.35);"
  />
</div>

<script>
  // Refresh card every 5 seconds seamlessly
  setInterval(() => {
    const card = document.getElementById("btl-music-player");
    if (card) card.src = "https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782?t=" + Date.now();
  }, 5000);
</script>
```

### 2. React / Next.js Component (Tailwind CSS):

```tsx
import React, { useState, useEffect } from "react";

export default function DiscordMusicCard({ discordId = "1402595333120458782" }: { discordId?: string }) {
  const [src, setSrc] = useState(`https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/${discordId}`);

  useEffect(() => {
    const interval = setInterval(() => {
      setSrc(`https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/${discordId}?t=${Date.now()}`);
    }, 5000);
    return () => clearInterval(interval);
  }, [discordId]);

  return (
    <a
      href={`https://discord.com/users/${discordId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform duration-300 hover:scale-[1.02]"
    >
      <img
        src={src}
        alt="Live Discord Music Activity"
        className="w-full max-w-[420px] rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
      />
    </a>
  );
}
```

---

## 🤝 Credits & Acknowledgements

- [Lanyard](https://github.com/phineas/lanyard) — Real-time Discord presence API.
- [balajitechlab.com](https://balajitechlab.com) — Portfolio & live music player integration.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.  
Copyright © 2026 `||BTL||™` ([balajitechlabs](https://github.com/balajitechlabs)).