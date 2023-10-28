import { AsyncRef, Ref, SyncRef } from '@jujulego/aegis';

export type Token<I = unknown> = Ref<I>;
export type SyncToken<I = unknown> = SyncRef<I>;
export type AsyncToken<I = unknown> = AsyncRef<I>;
