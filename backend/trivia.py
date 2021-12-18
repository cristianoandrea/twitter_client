import random


class Question:
    def __init__(self, id: str, quiz: str, right: str, wrongs: list[str]):
        self._id: str = id
        self._quiz = quiz
        self._right = right
        self._wrongs = wrongs

    @property
    def id(self):
        return self._id

    @property
    def quiz(self):
        return self._quiz

    @property
    def right(self):
        return self._right

    @property
    def wrongs(self):
        return self._wrongs

    @property
    def suggested_text(self):
        text: str = f'#qst #{self.id} {self.quiz}\n'
        answers: list[str] = self.wrongs
        answers.append(self.right)
        random.shuffle(answers)
        for i in range(len(answers)):
            text += f'{i}) {answers[i]}\n'

        return text

questions: dict[str, Question] = { }
next_id: int = 0

def add_question(quiz: str, right: str, wrongs: list[str]) -> Question:
    global next_id, questions
    new_question: Question = Question(hex(next_id)[2:], quiz, right, wrongs)
    questions[new_question.id] = new_question
    next_id += 1

    return new_question
