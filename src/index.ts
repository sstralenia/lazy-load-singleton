type InitFunction<T> = {
  init(...args: any[]): T;
};

type ClassType<T> = new (...args: any[]) => T;

type Singleton<T> = T & InitFunction<T>;

function createSingleton<Type extends object>(
  Class: ClassType<Type>
): Singleton<Type> {
  let instance: Type;

  function init(...args: any[]): Type {
    if (!instance) {
      instance = new Class(...args);
    }

    return instance;
  }

  return new Proxy(
    {},
    {
      get(_target, prop, _receiver) {
        if (prop === 'init') {
          return init;
        }

        if (!instance) {
          throw new Error("Singletone is not initialized");
        }

        // Reflect.get(instance, prop, _receiver) does not work here
        // for classes with private(#var) properties
        const propValue = instance[prop as keyof Type] as unknown;

        if (typeof propValue === 'function') {
          return propValue.bind(instance);
        }

        return propValue;
      },
    }
  ) as Singleton<Type>;
}

export default createSingleton;
