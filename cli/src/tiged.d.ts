declare module 'tiged' {
  interface DegetOptions {
    cache?: boolean;
    force?: boolean;
    verbose?: boolean;
  }

  interface Emitter {
    clone(dest: string): Promise<void>;
  }

  function degit(src: string, opts?: DegetOptions): Emitter;

  export = degit;
}
