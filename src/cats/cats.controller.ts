import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

// Request 对象代表 HTTP 请求，并具有查询字符串，请求参数参数，HTTP 标头（HTTP header） 和 正文（HTTP body）的属性

@Controller('cats')
export class CatsController {
  // Nest 将 catsService 通过创建并返回一个实例来解析 CatsService
  constructor(private catsService: CatsService) {}

  @Get(':id')
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }
  // findOne(@Param('id') id: string): string {
  //   return `This action returns a #${id} cat`;
  // }
  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  // 路径前缀 customers 与装饰器 @Get('profile') 组合会为 GET /customers/profile 请求生成路由映射。
  // @Get('cat')
  @Get()
  // 路由与处理函数命名无关
  // 当对此端点发出 GET 请求时， Nest 会将请求路由到我们的自定义的 findAll() 方法。
  // 可以在处理函数的签名中使用 @Req() 装饰器，指示 Nest 将请求对象注入处理程序。
  // findAll(@Req() request: Request): string {
  async findAll(): Promise<Cat[]> {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // 使用这个内置方法，当请求处理程序返回一个 JavaScript 对象或数组时，它将自动序列化为 JSON。但是，当它返回一个 JavaScript 基本类型（例如string、number、boolean）时， Nest 将只发送值，而不尝试序列化它。这使响应处理变得简单：只需要返回值，其余的由 Nest 负责。
    return this.catsService.findAll();
  }
}
