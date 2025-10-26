//****************************************************
//  лайк
//****************************************************
import { Image } from "react-bootstrap"
import { fetchLike } from "../http/publicationAPI"
import LikeIcon from "../assets/like.png"

const Like = ({ publicationId, userId, whomId }) => {

  const add = async () => {
    fetchLike({
      publicationId, userId, whomId
    })
  }

  return (
    <Image
      height={30}
      width={30}
      src = {LikeIcon}
      onClick={add}
    />
  )
}

export default Like