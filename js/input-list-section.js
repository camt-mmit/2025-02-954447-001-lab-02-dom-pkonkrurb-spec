import createInputComponent  from "./input-list-component";
/**
 * Create input-list component.
 *
 * @param {HTMLElement} componentElem
 *
 * @returns {HTMLElement}
 */
export function createSection(componentElem) {
  const templateElem = componentElem.querySelector('.app-tmp-number-component');

  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  const sectionListContainer = templateElem.parentElement;

  if (sectionListContainer === null) {
    throw new Error('Template .app-tmp-number-component does not have parent');
  }

  
  const createSectionComponent = () => {
    const sectionContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    sectionContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-section') ?? false) {
        inputContainer.remove();

        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    createSection
    inputListContainer.append(sectionContainer);

    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  componentElem.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createSectionComponent();
    }
  });

  createSectionComponent();

  return componentElem;
}