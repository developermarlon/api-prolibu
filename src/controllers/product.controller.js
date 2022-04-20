import Product from '../database/models/Product'

export const filterProducts = async (req, res) => {
    try {
        const { text } = req.body
        const products = await Product.find().or({ sku: { $regex: String(text).trim(), $options: 'i' } }).or({ name: { $regex: String(text).trim(), $options: 'i' } }).select({ 'createdAt': 0, 'updatedAt': 0 })
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}