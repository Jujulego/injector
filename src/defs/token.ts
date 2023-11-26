import { AsyncRef, Ref, SyncRef } from 'kyrielle';

/**
 * Token managing instance creation
 */
export interface Token<out I = unknown> extends Ref<I> {}
export interface SyncToken<out I = unknown> extends SyncRef<I> {}
export interface AsyncToken<out I = unknown> extends AsyncRef<I> {}
