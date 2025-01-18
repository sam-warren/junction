export const BACKGROUND_LOGO_KEYFRAMES = `
@keyframes float-base {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  15% {
    transform: translateX(15vw);
    opacity: var(--opacity);
  }
  85% {
    transform: translateX(85vw);
    opacity: var(--opacity);
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
}
` as const;