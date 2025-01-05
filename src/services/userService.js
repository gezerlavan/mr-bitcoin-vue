export const userService = {
    getUser,
}

const user = {
    name: 'Satoshi McWallet',
    balance: 100,
    transactions: [],
}

function getUser() {
    return user
}
