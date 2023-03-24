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
      get(_target, prop, receiver) {
        if (prop === "init") {
          return init;
        }

        if (!instance) {
          throw new Error("Singletone is not initialized");
        }

        return Reflect.get(instance, prop, receiver);
      },
    }
  ) as Singleton<Type>;
}

export default createSingleton;