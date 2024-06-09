import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// This is an array containing a provider object that configures and initializes a TypeORM DataSource.
export const getTypeOrmConfig  = 
    (configService: ConfigService):TypeOrmModuleOptions =>
        ({
            name: 'default',
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true,
            logging:true,
            namingStrategy: new SnakeNamingStrategy(),
      })
