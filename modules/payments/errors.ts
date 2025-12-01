import type { PaymentProvider } from './types'
import { createError } from 'h3'

/**
 * Base error class for all payment-related errors
 */
export class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider?: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message)
    this.name = 'PaymentError'
  }
}

/**
 * Errors during checkout creation
 */
export class CheckoutError extends PaymentError {
  constructor(
    message: string,
    provider?: string,
    data?: any
  ) {
    super(message, 'CHECKOUT_ERROR', provider, 500, data)
    this.name = 'CheckoutError'
  }
}

/**
 * Errors during webhook processing
 */
export class WebhookError extends PaymentError {
  constructor(
    message: string,
    provider?: string,
    public isRetryable: boolean = false,
    data?: any
  ) {
    super(
      message,
      'WEBHOOK_ERROR',
      provider,
      isRetryable ? 500 : 400,  // 500 for retryable, 400 for permanent
      data
    )
    this.name = 'WebhookError'
  }
}

/**
 * Error when signature verification fails
 */
export class SignatureVerificationError extends WebhookError {
  constructor(provider?: string) {
    super('Invalid webhook signature', provider, false)
    this.name = 'SignatureVerificationError'
    this.code = 'INVALID_SIGNATURE'
    this.statusCode = 401
  }
}

/**
 * Error when provider is not found or not registered
 */
export class ProviderNotFoundError extends PaymentError {
  constructor(providerName: string) {
    super(
      `Payment provider "${providerName}" not found or not enabled`,
      'PROVIDER_NOT_FOUND',
      providerName,
      400
    )
    this.name = 'ProviderNotFoundError'
  }
}

/**
 * Error when product is not found in configuration
 */
export class ProductNotFoundError extends PaymentError {
  constructor(productId: string) {
    super(
      `Product "${productId}" not found in configuration`,
      'PRODUCT_NOT_FOUND',
      undefined,
      404,
      { productId }
    )
    this.name = 'ProductNotFoundError'
  }
}

/**
 * Error when user is not authenticated
 */
export class UnauthorizedError extends PaymentError {
  constructor(message: string = 'Authentication required') {
    super(message, 'UNAUTHORIZED', undefined, 401)
    this.name = 'UnauthorizedError'
  }
}

/**
 * Error when storage operations fail
 */
export class StorageError extends PaymentError {
  constructor(
    message: string,
    public isRetryable: boolean = true
  ) {
    super(
      message,
      'STORAGE_ERROR',
      undefined,
      isRetryable ? 500 : 400
    )
    this.name = 'StorageError'
  }
}

/**
 * Error when configuration is invalid or missing
 */
export class ConfigurationError extends PaymentError {
  constructor(message: string, data?: any) {
    super(message, 'CONFIGURATION_ERROR', undefined, 500, data)
    this.name = 'ConfigurationError'
  }
}

/**
 * Helper to convert errors to H3 error format
 */
export function toH3Error(error: unknown) {
  if (error instanceof PaymentError) {
    return createError({
      statusCode: error.statusCode,
      message: error.message,
      data: {
        code: error.code,
        provider: error.provider,
        ...error.data
      }
    })
  }
  
  // Unknown error
  return createError({
    statusCode: 500,
    message: error instanceof Error ? error.message : 'Unknown error',
    data: { code: 'UNKNOWN_ERROR' }
  })
}

/**
 * Type guard to check if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof WebhookError) {
    return error.isRetryable
  }
  if (error instanceof StorageError) {
    return error.isRetryable
  }
  // By default, assume server errors are retryable
  if (error instanceof PaymentError) {
    return error.statusCode >= 500
  }
  return false
}
