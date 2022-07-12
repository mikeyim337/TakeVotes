import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(['questions.get-by-id', { id }]);

  if (!isLoading && !data) {
    return <div>Question not found</div>;
  }

  return (
    <div className='p-8 flex flex-col'>
      <div className='text-2xl font-bold'>{data?.question}</div>
      <div>
        {(data?.options as string[]).map((option, index) => (
          <div key={index}>{option}</div>
        ))}
      </div>
    </div>
  );
};

export const QuestionPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== 'string') {
    return <div>No ID</div>;
  }

  return <QuestionsPageContent id={id} />;
};

export default QuestionPage;
