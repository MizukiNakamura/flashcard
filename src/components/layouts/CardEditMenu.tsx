import { type FC, type MouseEventHandler, type Dispatch, type SetStateAction } from "react";
import CloseButton from "../elements/CloseButton";
import LinkedText from "../elements/LinkedText";
import ClickableText from "../elements/ClickableText";
import { deleteFlashcard } from "@/utils/server-actions/delete-flashcard";
import { moveFlashcardForward } from "@/utils/server-actions/move-flashcard-forward";
import { moveFlashcardBackward } from "@/utils/server-actions/move-flashcard-backward";

type Props = {
  flashcardId: number;
  title: string;
  isFirst: boolean;
  isLast: boolean;
  setContentType: Dispatch<SetStateAction<"top" | "edit">>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const CardEditMenu: FC<Props> = ({
  flashcardId,
  title,
  isFirst,
  isLast,
  setContentType,
  onClick,
}) => {
  return (
    <div className="relative px-[30px] py-[16px]">
      <div className="absolute right-[8px] top-[8px]">
        <CloseButton onClick={onClick} />
      </div>

      <h2 className="text-center text-primary">{title}</h2>

      <div className="mt-[16px] flex justify-center">
        <form>
          <ul>
            <li>
              <LinkedText text="編集" href={`/flashcards/${flashcardId}/edit`} />
            </li>
            <li className="mt-[8px]">
              <LinkedText text="問題の一覧" href={`/flashcards/${flashcardId}/qa`} />
              <LinkedText
                text="問題の追加"
                href={`/flashcards/${flashcardId}/qa/new`}
                className="ml-4"
              />
            </li>
            <li className="mt-[8px]">
              {isFirst || (
                <ClickableText
                  text="順番を前へ"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  formAction={async () => {
                    setContentType("top");
                    await moveFlashcardForward(flashcardId);
                  }}
                />
              )}
              {isLast || (
                <ClickableText
                  text="順番を後ろへ"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  formAction={async () => {
                    setContentType("top");
                    await moveFlashcardBackward(flashcardId);
                  }}
                  className={isFirst ? "" : "ml-4"}
                />
              )}
            </li>
            <li className="mt-[8px]">
              <ClickableText
                text="削除"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                formAction={async () => {
                  setContentType("top");
                  await deleteFlashcard(flashcardId);
                }}
              />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default CardEditMenu;
