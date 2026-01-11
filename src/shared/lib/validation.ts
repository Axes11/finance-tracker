import { z } from 'zod';

// Environment variables validation schema
export const envSchema = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1, 'Supabase key is required'),
	NEXT_PUBLIC_DEFAULT_URL: z.string().url('Invalid default URL'),
	NEXT_PUBLIC_ALPHAVANTAGE_API_KEY: z.string().optional(),
});

// Transaction validation schema
export const transactionSchema = z.object({
	account_id: z.string().uuid('Invalid account ID'),
	amount: z.number().finite('Amount must be a valid number'),
	description: z.string().max(500, 'Description must be less than 500 characters').trim(),
	currency: z.string().min(1).max(10).toUpperCase().trim(),
	category: z.string().max(100).trim(),
	type: z.enum(['crypto', 'stocks', 'bank']),
	date: z.string().datetime('Invalid date format'),
});

// Account validation schema
export const accountSchema = z.object({
	type: z.enum(['crypto', 'stocks', 'bank']),
	name: z.string().min(1).max(100).trim(),
	description: z.string().max(500).trim(),
});

// User authentication validation schemas
export const loginSchema = z.object({
	email: z.string().email('Invalid email address').max(255),
	password: z.string().min(8, 'Password must be at least 8 characters').max(255),
});

export const registerSchema = z.object({
	email: z.string().email('Invalid email address').max(255),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(255)
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
});

export const updatePasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(255)
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
	access_token: z.string().min(1),
	refresh_token: z.string().min(1),
});

export const emailSchema = z.object({
	email: z.string().email('Invalid email address').max(255),
});
