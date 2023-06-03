import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/utils/auth.utils';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  // if route is protected, there is a user set in auth.middleware
  if (request.user !== undefined) {
    return data !== undefined ? request.user[data] : request.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = request.headers.authorization
    ? (request.headers.authorization as string).split(' ')
    : null;
  if (token && token[1]) {
    const decoded: any = verify(token[1], JWT_SECRET);
    return data !== undefined ? decoded[data] : decoded.user;
  }
});
