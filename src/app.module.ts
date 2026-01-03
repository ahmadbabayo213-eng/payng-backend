import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Loads .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: false,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
}),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}