
import { EventEmitter } from 'events';
import { FirestorePermissionError } from './errors';

type Events = {
  'permission-error': (error: FirestorePermissionError) => void;
};

class TypedEventEmitter<T> {
  private emitter = new EventEmitter();

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): boolean {
    return this.emitter.emit(event as string, ...args);
  }

  on<K extends keyof T>(event: K, listener: T[K]): this {
    this.emitter.on(event as string, listener as any);
    return this;
  }
}

export const errorEmitter = new TypedEventEmitter<Events>();
