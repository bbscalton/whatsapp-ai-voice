# WhatsApp AI Voice Agent - Marketing Website

A premium, static marketing website for Neuereatec Enterprise's WhatsApp AI Voice Agent service. Designed for Guyanese small and medium businesses.

## Features

- **Static Site**: Plain HTML/CSS/vanilla JS - no build step required
- **Mobile-First**: Fully responsive design optimized for phones (375px) to desktop (1440px)
- **Premium Design**: Dark gradient hero, WhatsApp-green accents, smooth animations, glow effects
- **Accessibility**: Semantic HTML, proper contrast, alt text, respects `prefers-reduced-motion`
- **Fast**: No heavy frameworks, optimized for quick loading

## Structure

```
├── index.html          # Main landing page
├── styles.css          # All styles
├── script.js           # Interactions and animations
├── 404.html            # Custom 404 page
├── .nojekyll           # Disables Jekyll processing on GitHub Pages
├── assets/
│   ├── promo-video.mp4     # Promotional video (16:9)
│   ├── promo-video-vertical.mp4  # Vertical cut (9:16) for social
│   └── video-poster.jpg    # Video thumbnail
└── README.md
```

## Deployment

This site deploys directly to GitHub Pages from the `main` branch root:

1. Push to `main` branch
2. Go to repo Settings → Pages
3. Set Source to "Deploy from a branch" and select `main` / `(root)`
4. Site will be live at `https://<username>.github.io/<repo>/`

## Demo Number

The live demo number is configured as a constant in `script.js`:

```javascript
const DEMO_NUMBER = '+592 712 9487';
```

Update this constant to change the demo number across the site.

## Sections

1. **Hero**: Big promise headline with animated phone mockup
2. **Try It Live**: Call the AI demo directly on WhatsApp
3. **The Pain**: Missed calls = missed sales
4. **Video**: Promotional video showcasing the service
5. **How It Works**: 3-step process
6. **Features**: All capabilities
7. **Industries**: Business types served (restaurants, salons, clinics, etc.)
8. **Demo Conversation**: Animated AI conversation example
9. **Why Neuereatec**: Full-service installation and support
10. **Process**: From call to go-live timeline
11. **Pricing**: Custom packages with WhatsApp CTA
12. **FAQ**: Common questions accordion
13. **Final CTA**: Big call-to-action

## Contact

- **Company**: Neuereatec Enterprise
- **WhatsApp**: +592 712 9487
- **Website**: https://neuereatec.org

## Video Assets

The promotional video (`assets/promo-video.mp4`) is a code-generated motion graphics video created for this marketing site. It is original content created specifically for Neuereatec Enterprise.

## License

© 2024 Neuereatec Enterprise. All rights reserved.
