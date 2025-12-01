import { createComponent } from './input-list-component.js';

export function createSection(componentElem) {
  const templateElem = componentElem.querySelector(
    '.add-cmp-section-component',
  );

  if (templateElem === null) {
    throw new Error('Template .add-cmp-section-component is not found');
  }

  const sectionListContainer = templateElem.parentElement;

  if (sectionListContainer === null) {
    throw new Error('Template .add-cmp-section-component does not have parent');
  }

  const regenerateSection = () => {
    [...sectionListContainer.querySelectorAll('.app-cmp-section')].forEach(
      (sectionContainer, index, items) => {
        [...sectionContainer.querySelectorAll('.app-title-section')].forEach(
          (elem) => (elem.textContent = `${index + 1}`),
        );

        [
          ...sectionContainer.querySelectorAll('.app-cmd-remove-section'),
        ].forEach((elem) => (elem.disabled = items.length === 1));
      },
    );
  };

  const createSectionComponent = () => {
    const sectionContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    sectionContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-section') ?? false) {
        sectionContainer.remove();

        regenerateSection();
      }
    });

    createComponent(sectionContainer);
    sectionListContainer.append(sectionContainer);

    regenerateSection();
  };

  componentElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createSectionComponent();
    }
  });

  createSectionComponent();

  return componentElem;
}
