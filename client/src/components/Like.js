//****************************************************
//  лайк
//****************************************************
import {Image} from "react-bootstrap "
import {Like} from "../assets/like. png"
import {addLike} from "../http/publicationAPI"
const Like = ({ publicationId, userId, whomId }) => {

const add = async () {
  addLike({
    publicationId, userId, whomId
  })
}

return (
<Image
  src={Like}
  onClick={add}
/>
)
}

export default Like;