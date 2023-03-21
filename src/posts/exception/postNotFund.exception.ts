// import { HttpException, HttpStatus } from '@nestjs/common';

// class PostNotFoundException extends HttpException {
//   constructor(postId: number) {
//     super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
//   }
// }

import { NotFoundException } from '@nestjs/common';

class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`);
  }
}

export default PostNotFoundException;
