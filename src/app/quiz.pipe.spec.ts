import { QuizPipe } from './quiz.pipe';
import { Quiz } from './entities/quiz';

describe('QuizPipe', () => {
  it('create an instance', () => {
    const pipe = new QuizPipe();
    expect(pipe).toBeTruthy();
  });


  it('search for word and check if it returns quiz'), () => {
    const pipe = new QuizPipe();
    let quiz = { title: 'first', questions: [] } as Quiz;
    let quiz2 = { title: 'second', questions: [] } as Quiz;
  
    let quizzes = [quiz,quiz2]
    let quizzes2 = pipe.transform(quizzes,'second')

    expect(quizzes2.length).toBe(1);
    expect(quizzes2[0].title).toBe('second');
  }
});
