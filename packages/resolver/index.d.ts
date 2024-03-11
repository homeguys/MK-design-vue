export interface IResolver {
  isDev?: boolean;
}

export declare function HResolver({ isDev }?: Partial<IResolver>);

declare module '@htht/resolver';
