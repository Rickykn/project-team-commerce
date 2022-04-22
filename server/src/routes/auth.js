const router = require("express").Router()
const { User } = require("../lib/sequelize")
const  bcrypt = require("bcrypt")
const { generateToken } = require("../lib/jwt")

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        const findUser = await User.findOne({
            where: {
                username
            }
        })

        if (!findUser) {
            return res.status(400).json({
                message: "Wrong username or password"
            })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, findUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Wrong username or password"
            })
        }

        delete findUser.dataValues.password

        const token = generateToken(
            {
                id: findUser.id,
                role: findUser.role
            }
        )

        return res.status(200).json({
            message: "Logged in user",
            result: {
                user: findUser,
                token
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server error"
        })
    }
})

router.get("/refresh-token", async (req, res) => {
    try {
        const { token } = req

        const renewedToken = generateToken({ id: token.id })

        const findUser = await findByPk(token.id)

        delete findUser.dataValues.password

        return res.status(200).json({
            message: "Renewed user token",
            result: {
                user: findUser,
                token: renewedToken
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router