-- CreateTable
CREATE TABLE "public"."Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_subdomain_key" ON "public"."Tenant"("subdomain");
