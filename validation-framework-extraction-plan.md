# Validation Framework Extraction Plan

## High-Level Explanation
The goal of this initiative is to decouple the "Product Validator" methodology (the specific 6-stage validation process) from the underlying "Lead Funnel Template" (the technical engine). Currently, the codebase is hardcoded to serve the specific needs of the Product Validator course. By separating these, we create a powerful, generic open-source template that can be used for *any* stage-based funnel or product launch, while preserving the Product Validator as a specific *configuration* of this template.

Think of it as separating the "Game Engine" (Template) from the "Game" (Product Validator).

## Key Objectives

1.  **Decouple Methodology from Code:** Remove hardcoded references to specific stages like 'identity', 'traffic', 'demand' from the core logic and types.
2.  **Enable Configurable Stages:** Allow users to define their own stages (e.g., "Pre-launch", "Launch", "Post-launch") and visibility rules.
3.  **Create a "Starter" Experience:** Provide a minimal, clean example for new users that isn't burdened by the complex 6-stage validator content.
4.  **Preserve Backward Compatibility:** Ensure the existing "Product Validator" setup continues to work perfectly as a configuration of the new generic system.

## Considerations

*   **Type Safety vs. Flexibility:** Currently, `ValidationStage` is a strict union type. Moving to a generic string type reduces strict type safety but is necessary for flexibility. We need to ensure runtime checks or schema validation replace this lost compile-time safety.
*   **Configuration Complexity:** We must avoid making the configuration so complex that it becomes a barrier to entry. Defaults should be sensible.
*   **Migration Path:** Existing deployments (if any besides the main one) will need clear instructions on how to migrate to the new configuration format.
*   **Content Management:** Moving content to `examples/` might affect how Nuxt Content resolves files. We need to ensure the `content/` directory structure remains intuitive.

## Core Steps

### Phase 1: Configuration Refactor (The "Engine" Work)

1.  **Generalize Types:**
    *   Refactor `ValidationStage` in `shared/types/config.ts` to be a generic string or a configurable type.
    *   Update `VISIBILITY_UNLOCK_STAGES` and `STAGE_ORDER` in `shared/config/settings.ts` to be default exports that can be overridden.

2.  **Runtime Configuration:**
    *   Introduce a new configuration layer (likely in `app.config.ts` or `nuxt.config.ts`) that accepts a "Stage Definition" object.
    *   This object will define:
        *   Available stages.
        *   Order of stages.
        *   Visibility rules (which sections unlock at which stage).

3.  **Update Composables:**
    *   Refactor `useSectionVisibility.ts` to consume the injected configuration instead of importing hardcoded settings.
    *   Ensure `useMagnetProgress.ts` works with dynamic stage lists.

### Phase 2: Content Separation (The "Game" Work)

1.  **Create `examples/starter`:**
    *   Build a minimal directory structure with a simple 3-step funnel (e.g., "Interest", "Offer", "Purchase").
    *   Include basic placeholder content.

2.  **Migrate Validator Content:**
    *   Ensure all `magnet` content, specific founder stories, and methodology documentation are strictly located in `examples/validator`.
    *   Verify that the root `content/` directory contains only generic template content or is a symlink/copy of the active example.

### Phase 3: Documentation & Polish

1.  **Update Documentation:**
    *   Rewrite `README.md` to focus on the generic template capabilities.
    *   Create `docs/CONFIGURATION.md` explaining how to define custom stages.
2.  **Verify Configurations:**
    *   Test the "Starter" config to ensure it runs cleanly.
    *   Test the "Validator" config to ensure no regression in the main product.
