import { IResolver } from './index.d';

function HResolver(options: Partial<IResolver> = {}) {
  const { isDev = false } = options;

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('H')) {
        const partialName = name.slice(1);
        let sideEffects = `@htht/components/es/${`H${partialName}`}/style/index.css`;

        if (isDev) {
          sideEffects = `@htht/components/${`H${partialName}`}/style/index.scss`;
        }
        return {
          name: `H${partialName}`,
          from: `@htht/components`,
          sideEffects,
        };
      }

      return false;
    },
  };
}

export default { HResolver };
