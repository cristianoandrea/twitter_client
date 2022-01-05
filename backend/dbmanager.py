import json


DIR = './db/'
QUESTIONS = 'questions.json'


def save_list_of_records(records: list[dict], target: str):
    """ Accede al db per salvare la lista di records passati in input.
        Questa è da intendersi come una funzione privata e non dovrebbe essere
        chiamata al di fuori di questo modulo.

        Parametri
        ---------
        records: list[dict]
            La lista di record da dover salvare

        target: str
            Il path del file da accedere"""
    file = open(target, 'w')
    file.seek(0)
    json.dump(records, file)
    file.close()


def load_list_of_records(target: str) -> list[dict]:
    """ Accede al db per caricare una lista di record dal file specificato.
        Questa è da intendersi come una funzione privata e non dovrebbe essere
        chiamata al di fuori di questo modulo.

        Parametri
        ---------
        target: str
            Il path del file da accedere

        Ritorna
        -------
        La lista dei record trovati"""
    file = open(target, 'r')
    records = json.load(file)
    file.close()
    return records


def save_questions(questions: list[dict]):
    """ Accede al db per sovrascrivere le domande trivia con quelle passate
        in input

        Parametri
        ---------
        questions : list[dict]
            Lista dei record delle domande da salvare nel db"""
    save_list_of_records(questions, f'{DIR}{QUESTIONS}')


def load_questions() -> list[dict]:
    """ Accede al db in modo da caricare la lista di record di domande
        trivia registrate.

        Ritorna
        -------
        Una lista di dizionari da usare per poter istanziare le domande"""
    return load_list_of_records(f'{DIR}{QUESTIONS}')
