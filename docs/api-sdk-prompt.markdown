# Prompt for Generating an API SDK Package

## Objective
Create a TypeScript-based API SDK package for the provided OpenAPI specification (`openapi-resolved.yaml`). The SDK should use **Axios** for HTTP requests, **Zod** for schema validation, follow **clean code principles**, and incorporate **design patterns** (e.g., Factory, Facade, Singleton) to ensure modularity, maintainability, and scalability. The SDK must include **logging** of request and response data for debugging and monitoring purposes.

## Requirements

### 1. Project Structure
Organize the SDK with a modular and clean structure. Use the following folder structure as a guideline:

```
/src
  /api
    /endpoints
      - integrations.ts       # API endpoint methods grouped by tag (e.g., Integrations)
      - pedidoCombustivel.ts # API endpoint methods for Pedido Combustível
    /models
      - schemas.ts           # Zod schemas for request/response validation
      - types.ts             # TypeScript interfaces for API data models
    /utils
      - httpClient.ts        # Axios client configuration with interceptors
      - logger.ts            # Logging utility for request/response data
      - errorHandler.ts      # Centralized error handling
    /services
      - apiService.ts        # Facade for API interactions
  index.ts                  # SDK entry point
```

### 2. Technologies and Libraries
- **TypeScript**: Use strict typing for all components.
- **Axios**: Configure an Axios instance with base URL (`http://web.qualityautomacao.com.br`) and interceptors for logging requests and responses.
- **Zod**: Define schemas for request bodies, query parameters, and responses based on the OpenAPI `components/schemas`.
- **Design Patterns**:
  - **Singleton**: Use for the Axios client to ensure a single instance across the SDK.
  - **Facade**: Implement an `ApiService` class to provide a simplified interface for API calls.
  - **Factory**: Use a factory pattern to create endpoint-specific methods (e.g., `IntegrationsApi`, `PedidoCombustivelApi`).
- **Clean Code**:
  - Follow SOLID principles (e.g., Single Responsibility, Open/Closed).
  - Use meaningful variable/function names and consistent formatting.
  - Break down complex logic into smaller, reusable functions.
  - Include JSDoc comments for public methods and interfaces.

### 3. Logging
- Implement a `Logger` class in `/utils/logger.ts` to log:
  - Request details: URL, method, headers, query parameters, and request body.
  - Response details: Status code, response data, and duration.
  - Errors: Error messages, status codes, and stack traces (if applicable).
- Use a configurable logging library (e.g., `winston` or `pino`) or a simple `console.log` with structured output.
- Ensure logs are only enabled in development or when a debug flag is set.

### 4. API Endpoints
- Group endpoints by their OpenAPI tags (`Integrations`, `Integração Pedido Combustível`).
- Create separate classes for each tag (e.g., `IntegrationsApi`, `PedidoCombustivelApi`) in `/api/endpoints`.
- Implement methods for all endpoints in the OpenAPI spec, including:
  - **PUT** `/INTEGRACAO/RECEBER_TITULO`, `/INTEGRACAO/RECEBER_TITULO_CONVERTIDO`, etc.
  - **POST** `/INTEGRACAO/REVENDEDORES_ANP`, `/INTEGRACAO/PEDIDO_COMBUSTIVEL/PEDIDO`, etc.
  - **GET** `/INTEGRACAO/TRANSFERENCIA_BANCARIA`, `/INTEGRACAO/CLIENTE`, etc.
  - **PATCH** `/INTEGRACAO/TITULO_PAGAR/PAGAR`, `/INTEGRACAO/CARTAO/{id}`, etc.
  - **DELETE** `/INTEGRACAO/CARTAO/{id}`, `/INTEGRACAO/PEDIDO_COMBUSTIVEL/PEDIDO/{id}`, etc.
- Each method should:
  - Use Axios to make the HTTP request.
  - Validate request data using Zod schemas before sending.
  - Validate response data using Zod schemas to ensure type safety.
  - Log request and response details using the `Logger` class.
  - Handle errors using a centralized `ErrorHandler` class.

### 5. Schema Validation
- In `/models/schemas.ts`, define Zod schemas for all schemas listed in the OpenAPI `components/schemas` (e.g., `IntegracaoReceberTitulo`, `RetornoPaginadoIntegracaoTransferencia`, `ClienteRede`, etc.).
- Ensure schemas handle nested objects, arrays, and optional fields correctly.
- Use Zod's `safeParse` method to validate request and response data, throwing custom errors for invalid data.
- Generate TypeScript interfaces from Zod schemas using `z.infer` for type safety.

### 6. HTTP Client
- In `/utils/httpClient.ts`, create a Singleton Axios client with:
  - Base URL: `http://web.qualityautomacao.com.br`.
  - Default headers: `Content-Type: application/json` (override for `multipart/form-data` endpoints like `/INTEGRACAO/ENVIO_WHATSAPP`).
  - Request interceptor to log request details (method, URL, params, body).
  - Response interceptor to log response details (status, data) and handle errors.
- Allow configuration for custom headers (e.g., `destinatario`, `filial` for `/INTEGRACAO/ENVIO_WHATSAPP`).

### 7. Error Handling
- In `/utils/errorHandler.ts`, implement an `ErrorHandler` class to:
  - Catch and format Axios errors (e.g., network errors, 4xx/5xx responses).
  - Map HTTP status codes to custom error messages (e.g., 204: "No Content", 400: "Bad Request").
  - Throw typed errors with details for easier debugging.
- Ensure all API methods use the `ErrorHandler` for consistent error handling.

### 8. Facade Pattern
- In `/services/apiService.ts`, create an `ApiService` class as a Facade to:
  - Initialize endpoint classes (e.g., `IntegrationsApi`, `PedidoCombustivelApi`).
  - Provide a single entry point for consumers to access all API methods.
  - Example usage:
    ```typescript
    const api = new ApiService();
    const response = await api.integrations.receberTitulo({ /* data */ });
    ```

### 9. Example Code Snippets
Provide example implementations for key components:

#### HTTP Client (`/utils/httpClient.ts`)
```typescript
import axios, { AxiosInstance } from 'axios';
import { Logger } from './logger';

export class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://web.qualityautomacao.com.br',
      headers: { 'Content-Type': 'application/json' },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        Logger.log({
          method: config.method,
          url: config.url,
          params: config.params,
          data: config.data,
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        Logger.log({
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        Logger.error(error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
}
```

#### Zod Schema Example (`/models/schemas.ts`)
```typescript
import { z } from 'zod';

export const IntegracaoReceberTituloSchema = z.object({
  // Define schema based on OpenAPI IntegracaoReceberTitulo
  // Example fields
  empresaCodigo: z.number().int().optional(),
  valor: z.number(),
  dataMovimento: z.string().datetime(),
});

export type IntegracaoReceberTitulo = z.infer<typeof IntegracaoReceberTituloSchema>;
```

#### Endpoint Example (`/api/endpoints/integrations.ts`)
```typescript
import { AxiosInstance } from 'axios';
import { z } from 'zod';
import { HttpClient } from '../../utils/httpClient';
import { ErrorHandler } from '../../utils/errorHandler';
import { IntegracaoReceberTituloSchema } from '../../models/schemas';

export class IntegrationsApi {
  private client: AxiosInstance;

  constructor() {
    this.client = Http,'Client.getInstance().getAxios();
  }

  /**
   * Sends a PUT request to /INTEGRACAO/RECEBER_TITULO
   * @param data - Request body for receiving a title
   * @returns Promise<void>
   */
  async receberTitulo(data: z.infer<typeof IntegracaoReceberTituloSchema>): Promise<void> {
    try {
      const validatedData = IntegracaoReceberTituloSchema.parse(data);
      await this.client.put('/INTEGRACAO/RECEBER_TITULO', validatedData);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
```

#### Facade Example (`/services/apiService.ts`)
```typescript
import { IntegrationsApi } from '../api/endpoints/integrations';
import { PedidoCombustivelApi } from '../api/endpoints/pedidoCombustivel';

export class ApiService {
  public integrations: IntegrationsApi;
  public pedidoCombustivel: PedidoCombustivelApi;

  constructor() {
    this.integrations = new IntegrationsApi();
    this.pedidoCombustivel = new PedidoCombustivelApi();
  }
}
```

### 10. Additional Features
- **Type Safety**: Ensure all API methods return typed responses using Zod-inferred types.
- **Pagination Handling**: For endpoints returning `RetornoPaginado*` schemas, include methods to handle pagination (e.g., `fetchNextPage`) using `ultimoCodigo` and `limite`.
- **Multipart Support**: For endpoints like `/INTEGRACAO/ENVIO_WHATSAPP` and `/INTEGRACAO/ENVIO_EMAIL`, support `multipart/form-data` using FormData.
- **Configuration**: Allow SDK consumers to pass custom configurations (e.g., base URL, headers, debug mode) during initialization.

### 11. Deliverables
- A complete TypeScript SDK package with the structure outlined above.
- A `README.md` with:
  - Installation instructions (e.g., `npm install`).
  - Usage examples for key endpoints.
  - Configuration options (e.g., enabling debug logs).
- A `package.json` with dependencies (`axios`, `zod`, `typescript`) and scripts for building and testing.
- Unit tests using a framework like `jest` to cover key functionality (e.g., schema validation, HTTP client).

### 12. Notes
- Ensure all endpoints from the OpenAPI spec are implemented, including query parameters, path parameters, and request bodies.
- Handle edge cases, such as missing optional parameters or invalid responses.
- Use the provided OpenAPI schemas to generate accurate Zod schemas and TypeScript interfaces.
- Keep the code DRY by reusing common utilities and schemas.