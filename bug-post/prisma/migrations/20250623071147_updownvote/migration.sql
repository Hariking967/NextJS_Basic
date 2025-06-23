-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "downvote" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
CREATE SEQUENCE bug_answered_seq;
ALTER TABLE "Bug" ALTER COLUMN "answered" SET DEFAULT nextval('bug_answered_seq');
ALTER SEQUENCE bug_answered_seq OWNED BY "Bug"."answered";
