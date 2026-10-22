# DetailX Car Care

A responsive, static one-page website for a premium automotive detailing studio. It uses local image assets and plain HTML, CSS, and JavaScript; no build step or third-party package is required.

## Preview

Open `index.html` in a browser, or from this folder run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing

- Replace each visible `ADD PRICE` label in `index.html` with a confirmed price and currency.
- Add the confirmed WhatsApp number and call number to `DETAILX_CONTACT` at the top of `script.js`. WhatsApp should use digits only, including the country code; the phone value can include `+`, spaces, and punctuation.
- Replace the studio address and opening-hours placeholders in `index.html`.
- Replace the three testimonial quote and attribution placeholders with approved, real customer feedback—or remove those cards.
- Connect the appointment form to a form endpoint or booking service. The current form validates in the browser and displays a success message, but does not send or store submissions.
- Review the service descriptions, package inclusions, and contact copy to make sure they match the actual business.

## Deploy

This repository is structured as the site root. Connect the repository to a static website host and publish the root directory. Keep `index.html`, `styles.css`, `script.js`, and the `assets` folder together. There is no build command.

## Files

- `index.html` — page content, SEO metadata, and editable business placeholders
- `styles.css` — responsive layout, colors, typography, and reduced-motion styles
- `script.js` — mobile navigation, contact link setup, and appointment form validation
- `assets/` — generated automotive detailing imagery

The hero image prompt was: “A deep charcoal luxury sports coupe receiving meticulous paint correction and ceramic coating in a modern detailing bay; wide cinematic composition with dark negative space on the left, subtle electric-blue reflections, no logos or text.” The gallery images were generated for close-up paint correction and a clean dark vehicle interior in the same visual style.
