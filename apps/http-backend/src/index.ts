import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"

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

    res.json({
        message: "You have signed up",
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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
    const token = req.headers.authorization;
    res.status(403).send({
        message: "Invalid username or password",
    });
});

app.listen(3001);
