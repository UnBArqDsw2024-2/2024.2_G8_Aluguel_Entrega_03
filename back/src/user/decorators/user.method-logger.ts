export class LogOnErrorUtil {
  static create(): MethodDecorator {
    return function (target, propertyKey, descriptor: any) {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.error(
            `Erro ao executar ${String(propertyKey)} com os parâmetros:`,
            args,
          );
          console.error('Detalhes do erro:', error);
          throw error;
        }
      };

      return descriptor;
    };
  }
}
