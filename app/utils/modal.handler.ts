// utils/modal.handler.ts
import type { EventPayload } from '#shared/types/events';
import { IModalBottomThird, IModalWindowed, IModalFullscreen } from '#components';

/**
 * Modal component registry
 * Maps modal types to their components
 */
const MODAL_COMPONENTS = {
  bottomThird: () => IModalBottomThird,
  windowed_modal: () => IModalWindowed,
  fullscreen_modal: () => IModalFullscreen,
  // Add more modals as needed
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;

/**
 * Generic modal handler
 * Opens modals based on event payload data
 */
export const modalHandler = async (payload: EventPayload) => {
  // Only run on client
  if (import.meta.server) return;

  const modalType = payload.data?.action as ModalType;
  const modalProps = payload.data || {};

  if (!modalType) {
    console.warn('[modalHandler] No modalType specified in payload.data');
    return;
  }

  const componentLoader = MODAL_COMPONENTS[modalType];
  if (!componentLoader) {
    console.warn(`[modalHandler] Unknown modal type: ${modalType}`);
    return;
  }

  const overlay = useOverlay();

  // Lazy load the modal component
  const component = await componentLoader();

  // Open modal with props from event
  const modal = overlay.create(component, {
    props: modalProps,
  });

  modal.open();
};
