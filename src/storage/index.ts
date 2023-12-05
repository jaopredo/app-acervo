'use client'
import { Preferences } from '@capacitor/preferences'

export default class LocalStorage {
    // JSON "set" example
    static async save(key: string, data: any) {
        if (typeof window !== 'undefined') {
            await Preferences.set({
                key,
                value: JSON.stringify(data)
            })
        }
    }

    // JSON "get" example
    static async get(key: string) {
        const retrieve = await Preferences.get({ key });
        if (retrieve.value) {
            return JSON.parse(retrieve.value);
        }
    }

    // JSON "remove" example
    static async remove (key: string) {
        await Preferences.remove({ key })
    }
}
