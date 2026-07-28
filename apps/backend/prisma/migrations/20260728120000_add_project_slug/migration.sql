-- Add slug column to Project (nullable first so existing rows can be backfilled)
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;

-- Backfill: derive a slug from the title for any existing rows
-- (lowercase, collapse non-alphanumeric runs to a hyphen, trim leading/trailing hyphens)
UPDATE "Project"
SET "slug" = trim(both '-' from regexp_replace(lower("title"), '[^a-z0-9]+', '-', 'g'))
WHERE "slug" IS NULL;

-- Enforce NOT NULL and uniqueness (matches the Prisma schema: slug String @unique)
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
