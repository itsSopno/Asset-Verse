
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const admin = require('firebase-admin')


const port = process.env.PORT || 3000

// ------------------ Firebase Admin ------------------
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf-8')
const serviceAccount = JSON.parse(decoded)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const app = express()

// ------------------ Middleware ------------------
app.use(
  cors({
    origin: "http://localhost:5173" || " http://localhost:5174",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
)
app.use(express.json())

// ------------------ JWT Verify ------------------
const verifyJWT = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized!" })
  }

  const token = auth.split(" ")[1]
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.tokenEmail = decoded.email
    next()
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" })
  }
}

// ------------------ MongoDB ------------------
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
})

async function run() {
  try {
    const db = client.db('plantsDB')

    // ------------------ Collections ------------------
    const plantsCollection = db.collection('plants')
    const ordersCollection = db.collection('orders')
    const usersCollection = db.collection('users')
    const sellerRequestsCollection = db.collection('sellerRequests')
    const permissionRequestsCollection = db.collection('permissionRequests')
    const employeesCollection = db.collection('employees')
    const hrCollection = db.collection('hr')
    const plansCollection = db.collection('plans')
    const paymentsCollection = db.collection('payments') 
    const employeeAffiliationsCollection = db.collection('employeeAffiliations')

const assignedAssetsCollection = db.collection('assignedAssets')


    // ------------------ Role Middlewares (CHANGED) ------------------
    const verifyADMIN = async (req, res, next) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      if (user?.role !== 'hr') {
        return res.status(403).send({ message: 'Admin Only!' })
      }
      next()
    }

    // Removed verifySELLER usage — replaced with HR/Employee middlewares
    const verifyHR = async (req, res, next) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      if (user?.role !== 'hr') {
        return res.status(403).send({ message: 'HR access only!' })
      }
      next()
    }

    const verifyEmployee = async (req, res, next) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      if (user?.role !== 'employee') {
        return res.status(403).send({ message: 'Employee access only!' })
      }
      next()
    }

    const verifyHRorEmployee = async (req, res, next) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      if (user?.role === 'hr' || user?.role === 'employee') {
        return next()
      }
      return res.status(403).send({ message: 'Forbidden!' })
    }

    // ------------------ ADD PLANT (CHANGED: HR only) ------------------
    // Previously: verifySELLER -> caused HR/employee to be blocked.
    app.post('/plants', verifyJWT, verifyHR, async (req, res) => {
      const result = await plantsCollection.insertOne(req.body)
      res.send(result)
    })

    app.get('/plants', async (req, res) => {
      const result = await plantsCollection.find().toArray()
      res.send(result)
    })

    app.get('/plants/:id', async (req, res) => {
      const result = await plantsCollection.findOne({
        _id: new ObjectId(req.params.id),
      })
      res.send(result)
    })
app.post('/employee-affiliations', verifyJWT, verifyHR, async (req, res) => {
  const { employeeEmail, employeeName, companyLogo } = req.body

  const hr = await usersCollection.findOne({ email: req.tokenEmail })

  const exists = await employeeAffiliationsCollection.findOne({
    employeeEmail,
    hrEmail: hr.email,
    status: 'active'
  })

  if (exists) {
    return res.status(409).send({ message: 'Employee already affiliated' })
  }

  // Package limit check
  if (hr.currentEmployees >= hr.packageLimit) {
    return res.status(403).send({ message: 'Employee limit reached. Upgrade package.' })
  }

  const affiliationDoc = {
    employeeEmail,
    employeeName,
    hrEmail: hr.email,
    companyName: hr.companyName,
    companyLogo,
    affiliationDate: new Date(),
    status: 'active'
  }

  const result = await employeeAffiliationsCollection.insertOne(affiliationDoc)

  await usersCollection.updateOne(
    { email: hr.email },
    { $inc: { currentEmployees: 1 } }
  )

  res.send({ message: 'Employee affiliated successfully', result })
})
app.get('/employee-affiliations/check', verifyJWT, async (req, res) => {
  const { employeeEmail, hrEmail } = req.query

  const affiliation = await employeeAffiliationsCollection.findOne({
    employeeEmail,
    hrEmail,
    status: 'active'
  })

  res.send({ affiliated: !!affiliation })
})
app.get('/employee-affiliations', verifyJWT, verifyHR, async (req, res) => {
  try {
    const hrEmail = req.tokenEmail

    const result = await employeeAffiliationsCollection
      .find({ hrEmail })
      .sort({ affiliationDate: -1 })
      .toArray()

    res.send(result)
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch employee affiliations' })
  }
})

app.post('/assign-asset', verifyJWT, verifyHR, async (req, res) => {
  const { assetId, employeeEmail } = req.body

  const hr = await usersCollection.findOne({ email: req.tokenEmail })

  // 1️⃣ Check affiliation
  const affiliation = await employeeAffiliationsCollection.findOne({
    employeeEmail,
    hrEmail: hr.email,
    status: 'active'
  })

  if (!affiliation) {
    return res.status(403).send({ message: 'Employee not affiliated with your company' })
  }

  // 2️⃣ Check asset
  const asset = await plantsCollection.findOne({ _id: new ObjectId(assetId) })

  if (!asset || asset.availableQuantity <= 0) {
    return res.status(400).send({ message: 'Asset not available' })
  }

  // 3️⃣ Assign asset
  const assignDoc = {
    assetId: asset._id,
    assetName: asset.productName,
    assetImage: asset.productImage,
    assetType: asset.productType,
    employeeEmail,
    employeeName: affiliation.employeeName,
    hrEmail: hr.email,
    companyName: hr.companyName,
    assignmentDate: new Date(),
    returnDate: null,
    status: 'assigned'
  }

  await assignedAssetsCollection.insertOne(assignDoc)

  // 4️⃣ Reduce quantity
  await plantsCollection.updateOne(
    { _id: asset._id },
    { $inc: { availableQuantity: -1 } }
  )

  res.send({ message: 'Asset assigned successfully' })
})
app.get(
  '/assigned-assets',
  verifyJWT,
  async (req, res) => {
    const requesterEmail = req.tokenEmail
    const { employeeEmail } = req.query

    try {
   
      const user = await usersCollection.findOne({ email: requesterEmail })

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      let query = {}

     
      if (user.role === 'hr') {
        query.hrEmail = user.email

        if (employeeEmail) {
          query.employeeEmail = employeeEmail
        }
      }

    
      else if (user.role === 'employee') {
        query.employeeEmail = user.email
      }

      else {
        return res.status(403).send({ message: 'Access denied' })
      }

     
      const assignedAssets = await assignedAssetsCollection
        .find(query)
        .sort({ assignmentDate: -1 })
        .toArray()

      res.send(assignedAssets)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Failed to fetch assigned assets' })
    }
  }
)

    // ------------------ PLANS ROUTES ------------------
    app.get('/plans', async (req, res) => {
      try {
        const result = await plansCollection.find().toArray()
        res.send(result)
      } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message })
      }
    })

    app.post('/plans', async (req, res) => {
      try {
        const { name, employeeLimit, price, features } = req.body
        if (!name || !employeeLimit || !price || !Array.isArray(features)) {
          return res.status(400).send({ message: "Invalid payload!" })
        }

        const planDoc = { name, employeeLimit, price, features, createdAt: new Date() }
        const result = await plansCollection.insertOne(planDoc)
        res.send(result)
      } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message })
      }
    })

    // ------------------ STRIPE CHECKOUT ------------------
    app.post('/create-checkout-session', verifyJWT, async (req, res) => {
      try {
        const { packageName, employeeLimit, price, hrEmail } = req.body
        if (!packageName || !employeeLimit || !price || !hrEmail) {
          return res.status(400).send({ message: 'Missing fields' })
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: { name: packageName },
                unit_amount: price * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.CLIENT_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_DOMAIN}/payment-cancelled`,
          metadata: { hrEmail, packageName, employeeLimit },
        })

        await paymentsCollection.insertOne({
          hrEmail,
          packageName,
          employeeLimit,
          amount: price,
          transactionId: session.payment_intent || null,
          paymentDate: new Date(),
          status: 'pending',
        })

        res.send({ url: session.url })
      } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Stripe Error', error: err.message })
      }
    })

    // ------------------ PAYMENT SUCCESS ------------------
    app.post('/payment-success', verifyJWT, async (req, res) => {
      try {
        const { sessionId } = req.body
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        const hrEmail = session.metadata.hrEmail
        const packageName = session.metadata.packageName
        const employeeLimit = parseInt(session.metadata.employeeLimit)
        const amount = session.amount_total / 100

        // Update payment status
        await paymentsCollection.updateOne(
          { hrEmail, packageName, status: 'pending' },
          {
            $set: {
              status: session.payment_status === 'paid' ? 'completed' : 'failed',
              transactionId: session.payment_intent,
              paymentDate: new Date(),
              employeeLimit,
            },
          }
        )

        // Update HR package info
        await hrCollection.updateOne(
          { email: hrEmail },
          {
            $set: {
              packageLimit: employeeLimit,
              subscription: packageName.toLowerCase(),
            },
          }
        )

await usersCollection.updateMany(
  { email: hrEmail }, // filter by user email
  { $set: { packageLimit: employeeLimit } }
)

     res.send({
      message: 'Payment Recorded, HR & Users Updated',
      employeeLimit,
      subscription: packageName,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Payment Success Error', error: err.message })
  }
})
    // ------------------ MY ORDERS (CHANGED: Employee only) ------------------
    app.get('/my-orders', verifyJWT, verifyEmployee, async (req, res) => {
      const result = await ordersCollection
        .find({ customer: req.tokenEmail })
        .toArray()
      res.send(result)
    })

    // ------------------ MY INVENTORY (CHANGED: HR or Employee) ------------------
    app.get('/my-inventory', verifyJWT, verifyHRorEmployee, async (req, res) => {
      const result = await plantsCollection
        .find({ 'seller.email': req.tokenEmail })
        .toArray()
      res.send(result)
    })

    // ------------------ SAVE USER ------------------
    app.post('/user', async (req, res) => {
      const user = req.body
      const exists = await usersCollection.findOne({ email: user.email })

      if (exists) {
        await usersCollection.updateOne(
          { email: user.email },
          { $set: { last_loggedIn: new Date().toISOString() } }
        )
        return res.send({ message: 'User Updated' })
      }

      user.role = 'customer'
      user.created_at = new Date().toISOString()
      user.last_loggedIn = new Date().toISOString()

      const result = await usersCollection.insertOne(user)
      res.send(result)
    })

    // ------------------ USER ROLE ------------------
    app.get('/user/role', verifyJWT, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      res.send({ role: user?.role })
    })
// ------------------ USER PackageLimit ------------------
    app.get('/user/packageLimit', verifyJWT, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.tokenEmail })
      res.send({ PackageLimit: user?.packageLimit })
    })
// ------------------ USER PackageLimit ------------------
    app.get('/plans/employeeLimit', verifyJWT, async (req, res) => {
      const plans = await usersCollection.findOne({ email: req.tokenEmail })
      res.send({ employeeLimit: plans?.packageLimit })
    })
    // ------------------ BECOME SELLER ------------------
    app.post('/become-seller', verifyJWT, async (req, res) => {
      const email = req.tokenEmail
      const exists = await sellerRequestsCollection.findOne({ email })

      if (exists) {
        return res.status(409).send({ message: 'Already Requested' })
      }

      const result = await sellerRequestsCollection.insertOne({ email })
      res.send(result)
    })

    // ------------------ SELLER REQUESTS (ADMIN) ------------------
    app.get('/seller-requests', verifyJWT, verifyADMIN, async (req, res) => {
      const result = await sellerRequestsCollection.find().toArray()
      res.send(result)
    })

    // ------------------ ALL USERS (CHANGED: HR only) ------------------
    // User asked: manage-users should be HR-only -> updated
    app.get('/users', verifyJWT, verifyHR, async (req, res) => {
      const result = await usersCollection.find().toArray()
      res.send(result)
    })

    // ------------------ ASSET PERMISSION ------------------
    app.post('/asset-permission', verifyJWT, async (req, res) => {
      const body = req.body
      const email = req.tokenEmail

      const exists = await permissionRequestsCollection.findOne({
        'seller.email': email,
        'product.id': body.product.id
      })

      if (exists) {
        return res.status(409).send({ message: 'Already requested for this asset' })
      }

      const requestDoc = {
        seller: body.seller,
        product: body.product,
        status: 'pending',
        requestDate: new Date()
      }

      const result = await permissionRequestsCollection.insertOne(requestDoc)
      res.send({ message: 'Permission request submitted', result })
    })

    // ------------------ GET ALL REQUESTS (CHANGED: HR only) ------------------
    // Interpreting "all-request" as admin/resource requests listing -> HR-only as requested
    app.get('/asset-permission', verifyJWT, verifyHR, async (req, res) => {
      const requests = await permissionRequestsCollection.find().toArray()
      res.send(requests)
    })

    app.patch('/asset-permission/:id', verifyJWT, verifyHR, async (req, res) => {
      const { status } = req.body
      const { id } = req.params

      const result = await permissionRequestsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      )

      res.send(result)
    })

    // ------------------ EMPLOYEE JOIN (WITH USER UPDATE) ------------------
    app.post('/join-employee', verifyJWT, async (req, res) => {
      try {
        const { name, email, password, dateOfBirth } = req.body

        if (!name || !email || !password || !dateOfBirth) {
          return res.status(400).send({ message: 'All fields required' })
        }

        const exists = await employeesCollection.findOne({ email })
        if (exists) return res.status(409).send({ message: 'Employee exists' })

        const employeeDoc = {
          name,
          email,
          password,
          dateOfBirth,
          role: "employee",
          createdAt: new Date()
        }

        const result = await employeesCollection.insertOne(employeeDoc)

        await usersCollection.updateOne(
          { email },
          {
            $set: {
              role: "employee",
              dateOfBirth,
              createdAt: new Date()
            }
          }
        )

        res.send({ message: "Employee registered & user updated", result })
      } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message })
      }
    })

    // ------------------ HR JOIN (WITH USER UPDATE) ------------------
    app.post('/join-hr', verifyJWT, async (req, res) => {
      try {
        const { name, companyName, companyLogo, email, password, dateOfBirth } = req.body

        if (!name || !companyName || !companyLogo || !email || !password || !dateOfBirth) {
          return res.status(400).send({ message: 'All fields required' })
        }

        const exists = await hrCollection.findOne({ email })
        if (exists) return res.status(409).send({ message: 'HR exists' })

        const hrDoc = {
          name,
          companyName,
          companyLogo,
          email,
          password,
          dateOfBirth,
          role: "hr",
          packageLimit: 5,
          currentEmployees: 0,
          subscription: "basic",
          createdAt: new Date()
        }

        const result = await hrCollection.insertOne(hrDoc)

        await usersCollection.updateOne(
          { email },
          {
            $set: {
              role: "hr",
              companyName,
              packageLimit: 5
            }
          }
        )

        res.send({ message: "HR registered & user updated", result })
      } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message })
      }
    })

    // ------------------ ADMIN LIST ROUTES ------------------
    app.get('/employees', verifyJWT, verifyADMIN, async (req, res) => {
      const result = await employeesCollection.find().toArray()
      res.send(result)
    })

    app.get('/hr', verifyJWT, verifyADMIN, async (req, res) => {
      const result = await hrCollection.find().toArray()
      res.send(result)
    })

    // ------------------ UPDATE ROLE ------------------
    app.patch('/update-role', verifyJWT, verifyADMIN, async (req, res) => {
      const { email, role } = req.body

      const result = await usersCollection.updateOne(
        { email },
        { $set: { role } }
      )

      await sellerRequestsCollection.deleteOne({ email })

      res.send(result)
    })

    console.log("✅ MongoDB Connected Successfully!")
  } catch (err) {
    console.log(err)
  }
}
run()

app.get('/', (req, res) => res.send('Server Running Successfully'))
app.listen(port, () => console.log(`Server running on port ${port}`))
