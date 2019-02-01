export function updateTitle(title: string) {
  window.document.title = `Octopus - ${title}`;
}

export function resetTitle() {
  window.document.title = 'Octopus';
}
