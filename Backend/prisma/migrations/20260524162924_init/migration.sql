-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `homeTeam` VARCHAR(191) NOT NULL,
    `awayTeam` VARCHAR(191) NOT NULL,
    `sport` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `status` ENUM('SCHEDULED', 'LIVE', 'FINISHED') NOT NULL DEFAULT 'SCHEDULED',
    `homeScore` INTEGER NOT NULL DEFAULT 0,
    `awayScore` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Match_status_idx`(`status`),
    INDEX `Match_sport_idx`(`sport`),
    INDEX `Match_startTime_idx`(`startTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commentary` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` INTEGER NOT NULL,
    `actor` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `minute` INTEGER NOT NULL,
    `sequenceNo` INTEGER NOT NULL,
    `details` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Commentary_matchId_idx`(`matchId`),
    INDEX `Commentary_matchId_sequenceNo_idx`(`matchId`, `sequenceNo`),
    INDEX `Commentary_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Commentary` ADD CONSTRAINT `Commentary_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
