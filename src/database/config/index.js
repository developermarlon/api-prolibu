import User from "../models/User"
import UserPermission from "../models/UserPermission"
import Currency from "../models/Currency"
import Product from "../models/Product"
import bcrypt from "bcryptjs"
import geoip from 'geoip-lite'
import extIP from 'ext-ip'
import currencys from "../../constants/currencys"
import products from "../../constants/products"

const createProducts = async () => {
  try {
    const totalPorducts = await Product.estimatedDocumentCount()

    if (totalPorducts > 0) return

    await Product.insertMany(products)

    console.info('Products created successful')
  } catch (error) {
    console.error(error)
  }
}

const createCurrencys = async () => {
  try {
    const totalCurrencys = await Currency.estimatedDocumentCount()

    if (totalCurrencys > 0) return

    await Currency.insertMany(currencys)

    console.info('Currencys created successful')
  } catch (error) {
    console.error(error)
  }
}

const createRoles = async () => {
  try {
    const totalRoles = await UserPermission.estimatedDocumentCount()
    if (totalRoles > 0) return

    await Promise.all([
      new UserPermission({ name: "superadmin" }).save(),
      new UserPermission({ name: "client" }).save()
    ])

    console.info('Roles created successful')
  } catch (error) {
    console.error(error)
  }
}

const createAdmin = async () => {
  const user = await User.findOne({ email: "admin@localhost" })
  if (user) return

  const permissions = await UserPermission.find({ name: { $in: ["superadmin", "client"] } })
  const ip = await extIP().get()
  const geo = await geoip.lookup(ip)

  await User.create({
    fullname: 'Superuser',
    email: 'admin@localhost',
    ip,
    geo,
    password: await bcrypt.hash('admin', 10),
    permissions: permissions.map((role) => role._id),
  });

  console.info('Superuser created')
}

export default (async () => {
  await createRoles()
  await createAdmin()
  await createCurrencys()
  await createProducts()
})()

