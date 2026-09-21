# Color Cue

Color Cue is a mobile party game: say the printed word on a white card, and say
the card's color on every other card.

## Downloadable Android APK

Every push to the `work` branch triggers the **Build Android APK** GitHub Actions
workflow. When it completes, open that workflow run and download the
`color-cue-debug-apk` artifact. It contains `app-debug.apk`, which can be copied
to an Android device and installed after allowing installs from that source.

To create the same APK locally, install Android SDK Platform 35 and run:

```bash
gradle assembleDebug
```

The generated file is `app/build/outputs/apk/debug/app-debug.apk`.

The Android wrapper loads the same `index.html`, `styles.css`, and `app.js` that
power the browser version, so gameplay stays consistent across both versions.
