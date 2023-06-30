import { db } from "@/services/firebase"
import { child, get, ref, remove, update } from "firebase/database"

export default function handler(req, res) {
    const id = req.query.id

    console.log(id)

    if (req.method == "GET") {
        get(child(ref(db), `pedidos/${id}`)).then(
            snapshot => {
                res.status(200).json(snapshot.val())
            }
        )

    } else if (req.method == "PUT") {
        const dados = req.body

        update(ref(db, `pedidos/${id}`), dados)
    } else if (req.method == "DELETE") {

        remove(ref(db, "pedidos/" + id))

        res.status(200).json(id)
    }
}