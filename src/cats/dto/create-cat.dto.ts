export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

// 我们在这里推荐使用类。为什么？类是 JavaScript ES6 标准的一部分，因此它们在编译后的 JavaScript 中被保留为实际实体。另一方面，由于 TypeScript 接口在转换过程中被删除，所以 Nest 不能在运行时引用它们。
