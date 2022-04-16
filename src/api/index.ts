import bookText from "./data/bookText-2.txt";

class Item<T> {
    private key: string;
    private defaultValue: T;

    constructor(key: string, defaultValue: T) {
        this.key = key;
        this.defaultValue = defaultValue;
    }

    get() {
        const item = localStorage.getItem(this.key);
        const value = item ? (JSON.parse(item) as T) : this.defaultValue;
        return value;
    }

    set(value: T) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
}

interface IRange {
    firstCharId: number;
    lastCharId: number;
    text: string;
}

interface INote {
    id: number;
    text: string;
    time: number;
    firstCharId: number;
    lastCharId: number;
}

interface IUser {
    id: number;
    name: string;
    avatarUrl: string;
}

class Api {
    private bookmarks: Item<number[]> = new Item("bookmarks", []);
    private lastRead: Item<number> = new Item("lastRead", 1);
    private notes: Item<INote[]> = new Item("notes", []);

    async getBookmarks() {
        return this.bookmarks.get();
    }

    async addBookmark(pageNumber: number) {
        this.bookmarks.set(this.bookmarks.get().concat(pageNumber));
    }

    async removeBookmark(pageNumber: number) {
        this.bookmarks.set(this.bookmarks.get().filter((value) => value !== pageNumber));
    }

    async getBookText() {
        return bookText;
    }

    async getLastRead() {
        return this.lastRead.get();
    }

    async setLastRead(pageNumber: number) {
        this.lastRead.set(pageNumber);
    }

    async getNotes() {
        return this.notes.get();
    }

    async addNote(range: IRange) {
        const { firstCharId, lastCharId, text } = range;
        const _notes = this.notes.get();
        const note: INote = {
            id: _notes.length === 0 ? 1 : _notes[_notes.length - 1].id + 1,
            time: Date.now(),
            text,
            firstCharId,
            lastCharId,
        };
        this.notes.set(_notes.concat(note));
        return note;
    }

    async deleteNote(noteId: number) {
        const _notes = this.notes.get().filter((note) => note.id !== noteId);
        this.notes.set(_notes);
    }

    async getUserInfo() {
        const userInfo: IUser = {
            id: 1,
            name: "小明",
            avatarUrl: "",
        };

        return userInfo;
    }
}

const api = new Api();

export default api;
