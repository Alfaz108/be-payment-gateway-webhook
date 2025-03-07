// src/multer/multer.module.ts

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MulterModule as NestMulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({})
export class MulterModule {
    static register(options: {
        destination: string;
        acceptedMimeTypes: string[];
        maxFileSize?: number;
        errorMessages: string;
    }) {
        return {
            module: MulterModule,
            imports: [
                NestMulterModule.register({
                    dest: options.destination,
                    fileFilter: (_req, file, callback) => {


                        if (options.acceptedMimeTypes.includes(file.mimetype)) {
                            //check the file size
                            callback(null, true); // Accept the file
                        } else {
                            callback(new Error('Only specific file types are allowed.'), false);
                        }
                    },
                    storage: diskStorage({
                        destination: options.destination,
                        filename: (_req, file, callback) => {
                            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                            const extension = extname(file.originalname);
                            const filename = `file-${uniqueSuffix}${extension}`;
                            callback(null, filename);
                        },
                    }),
                }),
                HttpModule,
            ],
            exports: [NestMulterModule],
        };
    }
}
