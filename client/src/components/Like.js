//****************************************************
//  лайк
//****************************************************
import { Image } from "react-bootstrap"
import { fetchLike } from "../http/publicationAPI"

const Like = ({ publicationId, userId, whomId }) => {

  const add = async () => {
    fetchLike({
      publicationId, userId, whomId
    })
  }

  return (
    <Image
      src = "../assets/like.png"
      onClick={add}
    />
  )
}

export default Like