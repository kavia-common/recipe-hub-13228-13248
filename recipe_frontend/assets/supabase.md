# Supabase Integration for Angular Recipe Frontend

This application uses Supabase for authentication, recipe storage, and favorites management.

## Environment Variables

- `NG_APP_SUPABASE_URL`: The URL of your Supabase instance.
- `NG_APP_SUPABASE_KEY`: The public API key for your Supabase project.

These must be defined in the environment configuration or via a `.env` file for the build system.

## Supabase Tables

- `recipes`: Stores recipe data (id, title, description, ingredients, instructions, nutrition, imageUrl, created_by, created_at, updated_at).
- `favorites`: Stores user favorites (user_id, recipe_id).
- Authentication is handled via Supabase Auth (email/password).

## Usage

The frontend interacts with Supabase directly using the `@supabase/supabase-js` SDK.
Reads credentials from the environment variables `NG_APP_SUPABASE_URL` and `NG_APP_SUPABASE_KEY`.
