import { AsyncRef, Ref, SyncRef } from '@jujulego/aegis';

export type Token<I> = Ref<I>;
export type SyncToken<I> = SyncRef<I>;
export type AsyncToken<I> = AsyncRef<I>;