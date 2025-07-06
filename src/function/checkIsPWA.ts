export default function checkIsPWA() {
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-ignore
    window.navigator.standalone === true ||
    document.referrer.includes("android-app://");

  return isStandalone;
}
