

import dbmanager


class Tale:
    def __init__(self, id, creator: str, text: str):
        self._id = id
        self._creator: str = creator
        self._text: str = text

    @property
    def id(self):
        return self._id

    @property
    def creator(self):
        return self._creator

    @property
    def text(self):
        return self._text

    def toDict(self):
        d = {}
        d['id'] = self.id
        d['creator'] = self.creator
        d['text'] = self.text


class Contest:
    def __init__(self, id, tales: list[str], organizer: str):
        self._id = id
        self._tales: list[str] = tales
        self._organizer: str = organizer

    @property
    def id(self):
        return self._id

    @property
    def tales(self) -> list[str]:
        return self._tales

    @property
    def organizer(self) -> str:
        return self._organizer

    def add_tale(self, tale: Tale):
        self._tales.append(tale)

    def toDict(self):
        d = {}
        d['tales'] = self.tales
        d['id'] = self.id


next_contest_id: int = 0
next_tale_id: int = 0
initialized: bool = False
contests: dict[str, Contest] = {}
tales: dict[str, Tale] = {}


def module_init():
    if not initialized:


        initialized = True


def get_contest_list() -> list[dict]:
    l: list[dict] = []
    for contest in contests.values():
        l.append(contest.toDict())

    return l


def save_contests():
    contest_list: list[dict] = get_contest_list()
    dbmanager.save_contests()

def save_tales():
    tale_list: list[dict] = get_tale_list()
    dbmanager.save_tales()


def register_contest(organizer: str):
    #istanziare un nuovo contest
    c: Contest = Contest(next_contest_id, [], organizer)
    #metterlo nel dizionario
    contests[c.id] = c
    #aggiornare l'id
    next_contest_id += 1
    #memorizzarlo su disco
    save_contests()

    return c


def register_tale(creator: str, text: str):
    t: Tale = Tale(next_tale_id, creator, text)
    tales[t.id] = t
    next_tale_id += 1
    save_tales()

    return t


def add_tale_to(tale_id: str, contest_id: str):
    c: Contest = contests[contest_id]
    Contest.append(tale_id)
    save_contests()




module_init()
