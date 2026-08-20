<div align="center">

# 🎵 Live Discord Activity & Music Card

A real-time, animated SVG status card for GitHub Profile READMEs and websites.  
Showcases your **live Discord Rich Presence, currently playing music (BTL Music / ArchiveTune / Spotify), animated equalizer waveforms, and live ticking progress bars.**

<br />

[![Live Card Preview](https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782)](https://discord.com/users/1402595333120458782)

<br />

[![Vercel Deployment](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new)
[![GitHub Stars](https://img.shields.io/github/stars/Balajitechlabs/discord-music?style=for-the-badge&color=22c55e)](https://github.com/Balajitechlabs/discord-music/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- ⏱️ **Live Ticking Seconds Timer:** Rolling odometer timer that counts up second-by-second in real-time (`00:08` ➔ `00:09` ➔ `00:10`...).
- 📊 **Animated Equalizer Waveforms:** Jumping audio visualizer sound waves right next to the song title.
- ⚡ **Real-Time Sliding Progress Bar:** CSS-animated progress bar that slides smoothly forward for the exact duration of the track.
- 🎨 **High-DPI Glassmorphism Design:** Dark linear gradients (`#18181b` to `#09090b`), ambient album art shadows, and crisp Retina typography.
- 🌙 **Dedicated Offline & Idle States:** Displays a clean music player idle screen with your profile logo and music badge when you're between tracks or offline.
- 🚀 **0-Second Cache Delay:** Optimized `Cache-Control` headers ensuring instant song updates upon visiting your profile.
- 🎛️ **Fully Customizable:** Customize background colors, borders, text, progress bar colors, and profile visibility.

---

## 🚀 Quick Start (Add to your GitHub Profile)

Paste the following Markdown snippet into your **`README.md`**:

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
   git clone https://github.com/Balajitechlabs/discord-music.git
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
| `bg` | `18181b` | Card background color (hex without `#`) |
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

Add this script to your portfolio website for seamless background auto-refreshing without page reloads:

```html
<div class="live-music-card">
  <img 
    id="btl-music-player"
    src="https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782" 
    alt="Live Music Player"
    style="width: 100%; max-width: 400px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"
  />
</div>

<script>
  // Automatically refresh card every 5 seconds seamlessly
  setInterval(() => {
    const card = document.getElementById("btl-music-player");
    if (card) card.src = "https://discord-activity-card-balajitechlabs-07.vercel.app/api/status/1402595333120458782?t=" + Date.now();
  }, 5000);
</script>
```

---

## 🤝 Credits & Acknowledgements

- [Lanyard](https://github.com/phineas/lanyard) — Real-time Discord presence API.
- [AdityaLF](https://github.com/AdityaLF/discord-activity-card) — Base concept & structure.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.