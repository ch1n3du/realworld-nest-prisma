import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token === null) {
      throw new UnauthorizedException(
        { message: 'Unauthorized', body: ["No JWT found"] },
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET!,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload;
    } catch {
      throw new UnauthorizedException(
        { message: 'Unauthorized', body: [] },
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    let rawAuthHeader: string | undefined = request.headers['authorization'];

    if (rawAuthHeader === undefined) {
      throw new UnauthorizedException({ message: "Unauthorized", body: ["Expected a JWT"] })
    }
    const authHeader: string = request.headers['authorization'];
    if (authHeader.includes('Token')) {
      return authHeader.split(' ')[1];
    }
    return null
  }
}
