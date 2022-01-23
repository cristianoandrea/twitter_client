

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
        return d

    @staticmethod
    def fromDict(d: dict):
        return Tale(d['id'], d['creator'], d['text'])


class Contest:
    def __init__(self, id, tales: list, organizer: str, name: str):
        self._id = id
        self._tales: list = tales
        self._organizer: str = organizer
        self._name: str = name

    @property
    def id(self):
        return self._id

    @property
    def tales(self) -> list[str]:
        return self._tales

    @property
    def organizer(self) -> str:
        return self._organizer

    @property
    def name(self):
        return self._name

    @property
    def is_active(self):
        return True

    def add_tale(self, tale: Tale):
        self._tales.append(tale)

    def toDict(self):
        d = {}
        d['tales'] = self.tales
        d['id'] = self.id
        d['organizer'] = self.organizer
        d['name'] = self.name
        return d

    @staticmethod
    def fromDict(d: dict):
        return Contest(d['id'], d['tales'], d['organizer'], d['name'])


next_contest_id: int = 0
next_tale_id: int = 0
initialized: bool = False
contests: dict[int, Contest] = {}
tales: dict[int, Tale] = {}


def module_init():
    global initialized

    for tale_dict in dbmanager.load_tales():
        tale = Tale.fromDict(tale_dict)
        tales[tale.id] = tale

    if not initialized:
        for contest_dict in dbmanager.load_contests():
            contest = Contest.fromDict(contest_dict)
            contests[contest.id] = contest

        initialized = True


def get_contest_list(active=False) -> list[dict]:
    l: list[dict] = []
    for contest in contests.values():
        if contest.is_active:
            l.append(contest.toDict())

    return l


def get_tale_list() -> list[dict]:
    t: list[dict] = []
    for tale in tales.values():
        t.append(tale.toDict())

    return t


def save_contests():
    contest_list: list[dict] = get_contest_list()
    dbmanager.save_contests(contest_list)


def save_tales():
    tale_list: list[dict] = get_tale_list()
    dbmanager.save_tales(tale_list)


def register_contest(organizer: str, name: str) -> Contest:
    global next_contest_id

    c: Contest = Contest(next_contest_id, [], organizer, name)
    contests[c.id] = c
    next_contest_id += 1
    #memorizzarlo su disco
    #save_contests()

    return c


def register_tale(creator: str, text: str):
    global next_tale_id

    t: Tale = Tale(next_tale_id, creator, text)
    tales[t.id] = t
    next_tale_id += 1
    save_tales()

    return t


def add_tale_to(tale_id: int, contest_id: int):
    c: Contest = contests[contest_id]
    c.tales.append(tale_id)
    save_contests()


def is_tale_registered(tale_id: int) -> bool:
    return tale_id in tales


def is_contest_registered(contest_id: int) -> bool:
    return contest_id in contests


module_init()
