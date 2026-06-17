import rateLimit from 'express-rate-limit'

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    status_code: 429,
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const fundRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    status_code: 429,
    success: false,
    message: 'Too many fund requests. Please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const transferRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    status_code: 429,
    success: false,
    message: 'Too many transfer requests. Please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
