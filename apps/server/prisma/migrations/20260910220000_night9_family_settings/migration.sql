-- 第 9 夜：家长端设置 + 金句去重 + 共读卡夜键。
-- 1) 家庭级护眼设置（null=回落服务端默认 TAO_BEDTIME/300s）
ALTER TABLE "Family" ADD COLUMN "bedtimeMin" INTEGER;
ALTER TABLE "Family" ADD COLUMN "overtimeCapSec" INTEGER;
-- 2) 共读卡夜键（N4-007：同家庭同书同晚唯一，消费方不再读到重复卡）
ALTER TABLE "ParentPrompt" ADD COLUMN "nightKey" TEXT;
CREATE UNIQUE INDEX "parentprompt_night_unique" ON "ParentPrompt"("familyId", "bookId", "stage", "nightKey") WHERE "nightKey" IS NOT NULL;
-- 3) 金句去重（N7-002：同会话同来源同文本唯一；口述空文本不受影响因 text 非空约束在上层）。
-- 存量库可能已有重复行：先按 (cosessionId, source, text) 保留最早一行（rowid 最小），再建索引
DELETE FROM "HighlightStar"
WHERE "cosessionId" IS NOT NULL
  AND "rowid" NOT IN (
    SELECT MIN("rowid") FROM "HighlightStar"
    WHERE "cosessionId" IS NOT NULL
    GROUP BY "cosessionId", "source", "text"
  );
CREATE UNIQUE INDEX "highlightstar_unique_per_session" ON "HighlightStar"("cosessionId", "source", "text") WHERE "cosessionId" IS NOT NULL;
