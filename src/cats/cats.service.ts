import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// 控制器应处理 HTTP 请求并将更复杂的任务委托给 providers。Providers 是纯粹的 JavaScript 类，在其类声明之前带有 @Injectable()装饰器。

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
