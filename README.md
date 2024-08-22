Para configurar sua aplicação, primeiro instale o NestJS CLI globalmente usando npm i -g @nestjs/cli. Em seguida, crie o arquivo .env e configure as variáveis de ambiente necessárias: adicione o link do banco de dados (DB_URL="link"), defina o segredo do JWT (JWT_SECRET) e o tempo de expiração do JWT (JWT_EXPIRES).

Depois, instale as dependências necessárias com os seguintes comandos:

bash Copiar código npm i mongoose @nestjs/mongoose @nestjs/config --save npm i --save class-validator class-transformer npm i --save @nestjs/passport passport passport-local npm i --save-dev @types/passport-local npm i @nestjs/jwt --save npm i bcryptjs --save npm i passport-jwt --save Finalmente, para rodar o projeto, utilize o comando npm run start:dev.
