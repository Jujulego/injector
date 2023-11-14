import { AsyncRef, Ref, SyncRef } from '@jujulego/aegis';

/**
 * Token managing instance creation
 */
export type Token<I = unknown> = Ref<I>;
export type SyncToken<I = unknown> = SyncRef<I>;
export type AsyncToken<I = unknown> = AsyncRef<I>;
