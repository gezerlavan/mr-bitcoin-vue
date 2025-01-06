import axios from 'axios'
import { storageService } from './storage.service'

const STORAGE_KEY = 'bitcoinDB'

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate() {
    const bitcoinDB = storageService.load(STORAGE_KEY) || {}
    if (!bitcoinDB.rate) {
        console.warn('Fetching with axios')
        const res = await axios.get(
            'https://blockchain.info/tobtc?currency=USD&value=1'
        )
        bitcoinDB.rate = res.data
        storageService.save(STORAGE_KEY, bitcoinDB)
    }

    return bitcoinDB.rate
}

async function getMarketPriceHistory() {
    const bitcoinDB = storageService.load(STORAGE_KEY) || {}
    if (!bitcoinDB.history) {
        console.warn('Fetching with axios')
        const res = await axios.get(
            'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
        )
        bitcoinDB.history = res.data
        storageService.save(STORAGE_KEY, bitcoinDB)
    }

    return bitcoinDB.history
}

async function getAvgBlockSize() {
    const bitcoinDB = storageService.load(STORAGE_KEY) || {}
    if (!bitcoinDB.avgBlock) {
        console.warn('Fetching with axios')
        const res = await axios.get(
            'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'
        )
        bitcoinDB.avgBlock = res.data
        storageService.save(STORAGE_KEY, bitcoinDB)
    }

    return bitcoinDB.avgBlock
}
