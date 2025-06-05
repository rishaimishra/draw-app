import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"

const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {

    const data = CreateUserSchema.safeParse(req.body)

    if (!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }

    try {
        prismaClient.user.create({
        data
    })
    } catch (error) {
        res.json({
            error:error
        })
    }

    res.json({
        message: "You have signed up",
    });
});

app.post("/signin", (req, res) => {
   const data = SigninSchema.safeParse(req.body)

    if (!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }

    const user = 1;

    if (user) {
        const token = jwt.sign(
            {
                username: user,
            },
            JWT_SECRET
        );

        res.send({
            token,
        });
    } else {
        res.status(403).send({
            message: "Invalid username or password",
        });
    }
});

app.get("/room", middleware, (req, res) => {

     const data = CreateRoomSchema.safeParse(req.body)

    if (!data.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }
    const token = req.headers.authorization;
    res.status(403).send({
        message: "Invalid username or password",
    });
});

app.listen(3001);
