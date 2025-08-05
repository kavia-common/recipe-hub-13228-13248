# Supabase Integration for Angular Recipe Frontend

This application uses Supabase for authentication, recipe storage, and favorites management.

## Environment Variables

- `NG_APP_SUPABASE_URL`: The URL of your Supabase instance.
- `NG_APP_SUPABASE_KEY`: The public API key for your Supabase project.

**Configured via Angular's environment or `.env` for builds. Both variables are required and must be present for the app to connect.**

### Example `.env` (not committed):
```
NG_APP_SUPABASE_URL=https://xyz-company.supabase.co
NG_APP_SUPABASE_KEY=your-public-anon-key
```

## Supabase Tables & Policies

### `recipes`
Stores user-generated recipes.

| Column      | Type                       | Description                    |
|-------------|----------------------------|--------------------------------|
| id          | uuid (PK, default uuid v4) | Unique recipe ID               |
| title       | text                       | Recipe title                   |
| description | text                       | Description of the recipe      |
| ingredients | jsonb                      | Array of ingredient strings    |
| instructions| text                       | Recipe instructions            |
| nutrition   | jsonb                      | (optional) Nutrition info      |
| imageUrl    | text                       | (optional) Image URL           |
| created_by  | uuid                       | User ID of creator             |
| created_at  | timestamptz DEFAULT now()  | Creation timestamp             |
| updated_at  | timestamptz DEFAULT now()  | Last updated timestamp         |

#### Row Level Security (RLS):
- All users may read all recipes.
- Only the creator (`created_by = auth.uid()`) may insert, update, or delete their recipes.

### `favorites`
Stores user favorite recipes.

| Column   | Type | Description             |
|----------|------|------------------------|
| user_id  | uuid | User ID referencing auth.users |
| recipe_id| uuid | Recipe ID referencing recipes.id |

#### RLS:
- Users can only manage their own favorites (user_id = auth.uid()).

### Required PG Extension:
- `uuid-ossp` enabled for `uuid_generate_v4()` in `recipes.id`.

## Authentication

- Uses Supabase Auth (email/password).
- Auth flows should always use the current site URL as the redirect destination.
- **Ensure allowed redirect URLs in Supabase dashboard**:  
  - For dev: `http://localhost:3000/**`  
  - For prod: `https://yourserver.com/**`

## Angular Integration Usage

- Uses `@supabase/supabase-js` SDK.
- Credentials (`NG_APP_SUPABASE_URL`, `NG_APP_SUPABASE_KEY`) are read from the build-time environment.
- Provided as runtime globals (`process.env` in SSR or via global window in browser).

## Implementation Notes

- `recipes` and `favorites` tables with RLS/policies are provisioned on the database.
- The Angular app supports create/read/update/delete of own recipes and favorites.
- No secrets or service keys are embedded in the frontend.
- Ensure site URLs are updated in Supabase dashboard to allow correct auth redirects.

For any changes to table structures, authentication, or site/environment URLs, update this documentation accordingly.
