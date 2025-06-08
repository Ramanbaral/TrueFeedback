import { Pagination } from "./Pagination";
import { FeedbackCard } from "./FeedbackCard";
import { getFeedbacks, countFeedbacks } from "../feedbacks";

export async function Feedbacks({ page }: { page: number }) {
  const feedbacks = await getFeedbacks(page);

  const totalFeedbacks = await countFeedbacks();

  return (
    <>
      <div className="m-10 my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks.map(feedback => (
          <FeedbackCard key={feedback.id} content={feedback.content} date={feedback.createdAt} />
        ))}
      </div>
      {totalFeedbacks > 9 && (
        <Pagination curPage={page} totalPage={Math.ceil(totalFeedbacks / 9)} />
      )}
    </>
  );
}
