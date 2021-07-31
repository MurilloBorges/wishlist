import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'User collection API',
      description: 'User collection API information',
      version: '1.0.0',
      contact: {
        name: 'Murillo Borges',
        email: 'murilloborges@squads.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host: 'localhost:3333',
    schemes: ['http'],
    basePath: '/',
    consumes: ['application/json'],
    produces: ['application/json'],
    responses: {},
    parameters: {},
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Authenticate',
        description:
          'User authentication in the api, to generate the jwt token bearer',
      },
      {
        name: 'Users',
        description: 'User collection',
      },
      {
        name: 'Profiles',
        description: 'Collection of user profiles',
      },
    ],
    paths: {
      '/authenticate': {
        post: {
          tags: ['Authenticate'],
          summary: 'user authentication',
          operationId: 'userAuthentication',
          description: 'Here you can authenticate your user in the system',
          security: [],
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'user to authentication',
              required: true,
              schema: {
                $ref: '#/definitions/Authenticate',
              },
            },
          ],
          responses: {
            200: {
              description: 'user autenticated',
            },
            400: {
              description: 'object invalid || invalid password',
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description:
                'internal server error when trying to user authentication',
            },
          },
        },
      },
      '/users': {
        post: {
          tags: ['Users'],
          summary: 'insert user',
          operationId: 'insertUser',
          description: 'Here you can register a new user in the system',
          security: [],
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'user to add',
              required: true,
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: {
                    $ref: '#/schemas/user/name',
                  },
                  email: {
                    $ref: '#/schemas/user/email',
                  },
                  password: {
                    $ref: '#/schemas/user/password',
                  },
                },
              },
            },
          ],
          responses: {
            201: {
              description: 'user created',
            },
            400: {
              description: 'object invalid || existing user',
            },
            500: {
              description: 'internal server error when trying to create user',
            },
          },
        },
        get: {
          tags: ['Users'],
          summary: 'searches users',
          operationId: 'searchUsers',
          description:
            'When making a request, you can get all users registered in the system',
          security: [],
          responses: {
            200: {
              description: 'users were obtained',
              schema: {
                $ref: '#/definitions/Users',
              },
            },
            500: {
              description:
                'internal server error when trying to searches users',
            },
          },
        },
      },
      '/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'searches user',
          operationId: 'searchUser',
          description:
            'By passing a valid ID, you can obtain the corresponding user',
          security: [],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'address obtained by zip code',
              schema: {
                $ref: '#/definitions/User',
              },
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to searche user',
            },
          },
        },
        patch: {
          tags: ['Users'],
          summary: 'change user',
          operationId: 'changeUser',
          description:
            'By passing a valid ID, you can change the corresponding user',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
            {
              in: 'body',
              name: 'user',
              description: 'user to change',
              required: true,
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: {
                    $ref: '#/schemas/user/name',
                  },
                  oldPassword: {
                    $ref: '#/schemas/user/password',
                  },
                  password: {
                    $ref: '#/schemas/user/newPassword',
                  },
                  confirmationPassword: {
                    $ref: '#/schemas/user/newPassword',
                  },
                },
              },
            },
          ],
          responses: {
            204: {
              description: 'changed user',
            },
            400: {
              description:
                'invalid input path || object invalid || passwords do not match',
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to change user',
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'delete user',
          operationId: 'deleteUser',
          description:
            'By passing a valid ID, you can delete the corresponding user',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            204: {
              description: 'deleted user',
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to delete user',
            },
          },
        },
      },
      '/profiles': {
        get: {
          tags: ['Profiles'],
          summary: 'searches profiles by users',
          operationId: 'searchProfiles',
          description:
            'When making a request, you can get all the profiles of the users registered in the system',
          responses: {
            200: {
              description: 'profiles were obtained',
              schema: {
                $ref: '#/definitions/Profiles',
              },
            },
            500: {
              description:
                'internal server error when trying to searches profiles',
            },
          },
        },
      },
      '/profiles/{id}': {
        get: {
          tags: ['Profiles'],
          summary: 'searches profile',
          operationId: 'searchProfile',
          description:
            'By passing a valid ID, you can obtain the corresponding profile',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'profile id',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'address obtained by zip code',
              schema: {
                $ref: '#/definitions/Profile',
              },
            },
            404: {
              description: 'profile not found',
            },
            500: {
              description:
                'internal server error when trying to searche profile',
            },
          },
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        description: 'JWT Token | usar: Bearer {token}',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    definitions: {
      Authenticate: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            $ref: '#/schemas/user/email',
          },
          password: {
            $ref: '#/schemas/user/password',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            $ref: '#/schemas/user/_id',
          },
          name: {
            $ref: '#/schemas/user/name',
          },
          email: {
            $ref: '#/schemas/user/email',
          },
          password: {
            $ref: '#/schemas/user/password',
          },
          createdAt: {
            $ref: '#/schemas/user/createdAt',
          },
          updatedAt: {
            $ref: '#/schemas/user/updatedAt',
          },
        },
      },
      Users: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      Profile: {
        type: 'object',
        properties: {
          _id: {
            $ref: '#/schemas/user/_id',
          },
          createdAt: {
            $ref: '#/schemas/user/createdAt',
          },
          updatedAt: {
            $ref: '#/schemas/user/updatedAt',
          },
          user: {
            type: 'object',
            $ref: '#/definitions/User',
          },
        },
      },
      Profiles: {
        type: 'object',
        properties: {
          profiles: {
            type: 'array',
            items: {
              $ref: '#/definitions/Profile',
            },
          },
        },
      },
    },
    schemas: {
      user: {
        _id: {
          type: 'string',
          description: 'user id',
          example: '5f440f8e054f0e7dc1262f19',
        },
        name: {
          type: 'string',
          description: 'user name',
          example: 'Murillo Borges',
        },
        email: {
          type: 'string',
          description: 'user email for authentication',
          example: 'murilloborges@squads.gs',
        },
        createdAt: {
          type: 'string',
          description: 'user creation date',
          format: 'date - time',
          example: '2020-08-24T19:05:50.793Z',
        },
        updatedAt: {
          type: 'string',
          description: 'date of last user change',
          format: 'date - time',
          example: '2020-08-24T19:05:50.793Z',
        },
        password: {
          type: 'string',
          description: 'user password for authentication',
          example: '123456',
        },
        newPassword: {
          type: 'string',
          description: 'new user password for authentication',
          example: 'd290f1ee',
        },
      },
    },
  },
  apis: ['.routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
