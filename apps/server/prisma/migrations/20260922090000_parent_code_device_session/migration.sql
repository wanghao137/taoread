-- 审计 T02/F01+F04：家长码（独立于家庭码的家长身份凭据）+ 可撤销设备会话
-- 旧家庭 parentCode 保持 NULL：不得把已知儿童设备自动提升为家长；
-- 家长码由首个家长会话懒生成（创建家庭即生成）。
ALTER TABLE "Family" ADD COLUMN "parentCode" TEXT;
CREATE UNIQUE INDEX "Family_parentCode_key" ON "Family"("parentCode");

-- 设备会话：令牌 sid 绑定；家庭注销级联删除，旧令牌随之失效
CREATE TABLE "DeviceSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familyId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "deviceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" DATETIME,
    CONSTRAINT "DeviceSession_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "DeviceSession_familyId_idx" ON "DeviceSession"("familyId");
