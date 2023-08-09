import { validateToken } from "../lib/auth.js";

export const authMiddleware = async (req, res, next) => {
    const headers = req.headers;
    const authorization = headers.cookie;
    if (!authorization){
        console.log("check authorization", headers);
        return res.status(403).json({msg: "Authentifizierung fehlgeschlagen!"})
    }
    try {
        const token = authorization.split("=")[1];
        console.log("token validation",{token});
        if (!token){
            return res.status(403).json({msg: "Authentifizierung fehlgeschlagen! Token fehlerhaft."})
        }
        req.user = await validateToken(token);
        next();
    } catch (error) {
        return res.status(401).json({error, msg: "Authentifizierung fehlgeschlagen!"})
    }
}