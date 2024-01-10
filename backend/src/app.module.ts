import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
export { NFTController } from './nft.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { WebhookModule } from './webhook/webhook.module';

import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configurations';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
//import { RabbitMQModule } from './common/rabbitMQ/rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true, // Makes ConfigService available throughout the application
    }),
    //RabbitMQModule,
    // RabbitMQModule.forRoot({
    //   exchanges: [
    //     {
    //       name: 'order-exchange',
    //       type: 'direct',
    //     },
    //   ],
    //   uri: 'amqp://guest:guest@localhost:5672', // Update with global config
    // }),
    
    //MongooseModule.forRoot('mongodb://localhost/my-nest-app'),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule, UsersModule, OrdersModule, WebhookModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI:', mongoUri); // Logging the URI for debugging
        return { uri: mongoUri };
        //uri: configService.get<string>('MONGODB_URI'),
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  
})
export class AppModule {}
