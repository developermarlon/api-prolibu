import Currency from '../database/models/Currency'

export const getAllCurrencys = async (req, res) => {
    try {
        const currencys = await Currency.find().select({ '_id': 0, 'createdAt': 0, 'updatedAt': 0 })
        res.status(200).json(currencys)
    } catch (error) {
        console.log(error)
    }
}