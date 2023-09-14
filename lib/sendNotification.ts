import { subscribe } from 'diagnostics_channel'
import webpush from 'web-push'

const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
    privateKey: process.env.VAPID_PRIVATE_KEY  || '',
}
  
interface Subscription {
        endpoint: string
        keys: {
            auth: string
            p256dh: string
        }
}

interface DataToSend {
    title: string
    options: {
        body: string
        [key: string]: any
    }
}

export const sendNotification = async (subscription: Subscription, dataToSend: DataToSend) => {
webpush.setVapidDetails(
    'mailto:timvan0118@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
webpush.sendNotification(subscription, JSON.stringify(dataToSend))
}