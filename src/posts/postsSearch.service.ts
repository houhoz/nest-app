import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import Post from './entities/post.entity';
import PostSearchResult from './types/postSearchResponse.interface';
import PostSearchBody from './types/postSearchBody.interface';

@Injectable()
export default class PostsSearchService {
  index = 'posts';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(post: Post) {
    return this.elasticsearchService.index<PostSearchBody>({
      index: this.index,
      body: {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author.id,
      },
    });
  }
  async search(text: string) {
    // TODO PostSearchBody 这个类型的定义有问题
    const response = await this.elasticsearchService.search<PostSearchBody>({
      index: this.index,
      // body: {
      //   query: {
      //     match: {
      //       // 假设你想在 "title" 字段中搜索
      //       title: text,
      //     },
      //   },
      // },
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content'], // 在这两个字段上进行搜索
            type: 'best_fields', // 匹配最佳字段
            fuzziness: 'AUTO', // 开启模糊搜索
          },
        },
      },
    });
    const hits = response.hits.hits;
    const arr = hits.map((item) => item._source);
    return arr;
  }

  async remove(postId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: postId,
          },
        },
      },
    });
  }

  async update(post: Post) {
    const newBody: PostSearchBody = {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author.id,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      script: {
        // inline: script,
        source: script,
        lang: 'painless',
      },
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
      },
    });
  }
}
