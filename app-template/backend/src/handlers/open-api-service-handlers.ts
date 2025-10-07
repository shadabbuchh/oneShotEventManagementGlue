import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Services } from '../services/index';
import type { components, operations } from '../../../openapi/generated-types';

/**
 * OpenAPI operation handlers for fastify-openapi-glue
 *
 * Maps OpenAPI operationIds to service method calls.
 * Extend this class to add handlers for new entities.
 *
 * 🚨 CRITICAL: This is the ONLY place to implement business API handlers.
 * NEVER create manual route files (src/routes/*.route.ts) for business endpoints.
 * All business routes are auto-generated from OpenAPI spec.
 */
export class OpenAPIServiceHandlers {
  protected services: Services;

  constructor(services: Services) {
    this.services = services;
  }

  /**
   * Register a new user
   * operationId: registerUser
   */
  async registerUser(
    request: FastifyRequest<{
      Body: components["schemas"]["RegisterUserRequest"];
    }>,
    reply: FastifyReply
  ) {
    try {
      const { email, firstName, lastName } = request.body;
      const user: components["schemas"]["UserResponse"] = await this.services.users.registerUser({
        email,
        firstName,
        lastName,
      });
      return reply.status(201).send(user);
    } catch (error: any) {
      if (error.message === 'User with this email already exists') {
        return reply.status(409).send({
          code: 'CONFLICT',
          message: error.message,
        });
      }
      throw error;
    }
  }

  /**
   * List all events
   * operationId: listEvents
   */
  async listEvents(
    request: FastifyRequest<{
      Querystring: operations["listEvents"]["parameters"]["query"];
    }>,
    reply: FastifyReply
  ) {
    try {
      const {
        search,
        status,
        startDate,
        endDate,
        sortBy = 'date',
        sortOrder = 'desc',
        page = 1,
        limit = 25
      } = request.query || {};

      const filters = {
        search,
        status,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      };

      const sortOptions = {
        sortBy: sortBy as 'date' | 'name' | 'status',
        sortOrder: sortOrder as 'asc' | 'desc'
      };

      const pagination = {
        page: Number(page),
        limit: Number(limit)
      };

      const result = await this.services.events.getEvents(filters, sortOptions, pagination);

      return reply.status(200).send(result);
    } catch (error: any) {
      request.log.error(error);
      return reply.status(500).send({
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch events'
      });
    }
  }

  /**
   * Create a new event
   * operationId: createEvent
   */
  async createEvent(
    request: FastifyRequest<{
      Body: components["schemas"]["CreateEventRequest"];
    }>,
    reply: FastifyReply
  ) {
    try {
      const eventData = request.body;

      const event = await this.services.events.createEvent({
        ...eventData,
        startDate: new Date(eventData.startDate),
        endDate: new Date(eventData.endDate)
      });

      return reply.status(201).send(event);
    } catch (error: any) {
      if (error.message === 'End date must be after start date') {
        return reply.status(422).send({
          code: 'VALIDATION_ERROR',
          message: error.message
        });
      }
      request.log.error(error);
      return reply.status(500).send({
        code: 'INTERNAL_ERROR',
        message: 'Failed to create event'
      });
    }
  }
}
