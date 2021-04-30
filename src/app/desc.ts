export const Desc = (wat: (obj: any) => void) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // anonymous function, not arrow
    descriptor.value = function (...args: any[]) {
      console.log(this, wat);
      wat(this);
      const result = originalMethod.apply(this, args);
      return result;
    };
  };
};
