import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
export { NFTController } from './nft.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { UsersController } from './users/users.controller';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/my-nest-app'),
    AuthModule, UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
