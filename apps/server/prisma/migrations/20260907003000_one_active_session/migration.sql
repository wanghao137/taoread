-- 部分唯一索引：每个孩子同时最多一场未收尾共读（第 6 夜 N6-003，防并发双开）。
-- 注意：Prisma 不建模 partial index，本索引用 raw SQL 维护；
-- 未来 prisma migrate dev 若提示 drift，请保留本索引（见 nightly-log 第 6 夜关键决策）。
CREATE UNIQUE INDEX "cosession_one_active_per_child" ON "Cosession"("childId") WHERE "endedAt" IS NULL;
