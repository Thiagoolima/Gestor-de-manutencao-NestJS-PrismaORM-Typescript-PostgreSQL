import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    multer().any()(req, res, (err) => {
      if (err) {
        next(err);
      } else {
        console.log(req);
        next();
      }
    });
  }
}
