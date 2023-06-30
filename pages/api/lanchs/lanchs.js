import { db } from "@/services/firebase"
import { child, get, ref, set } from "firebase/database"
import { v4 } from "uuid"


export default function handler(req, res) {
    if (req.method == "GET") {
        get(child(ref(db), "lanchs")).then(
            snapshot => {
                const Return = []

                snapshot.forEach(element => {

                    Return.push(element.val())
                });
                
                res.status(200).json(Return)
            }
        )

    } else if (req.method == "POST") {
        const uuid = v4()
        const dados = req.body
        dados.id = uuid
        set(ref(db, "lanchs/" + uuid), dados)
    }
}